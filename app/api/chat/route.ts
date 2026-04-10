import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { cases } from "@/lib/casesData";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// ── RAG: find relevant cases based on message keywords ──────────────────────

function findRelevantCases(message: string): typeof cases {
  const lower = message.toLowerCase();

  // Cancer type keyword map → cancerType values
  const cancerKeywords: Record<string, string[]> = {
    hodgkin:             ["hodgkin", "hodgkins", "hodgkin's"],
    nhl:                 ["non-hodgkin", "nhl", "dlbcl", "diffuse large", "follicular lymphoma", "lymphoma"],
    all:                 ["all ", "acute lymphoblastic", "lymphoblastic leukemia"],
    aml:                 ["aml", "acute myeloid", "myeloid leukemia"],
    cll:                 ["cll", "chronic lymphocytic"],
    cml:                 ["cml", "chronic myeloid", "philadelphia chromosome", "imatinib", "gleevec"],
    breast:              ["breast"],
    lung:                ["lung", "nsclc", "sclc", "egfr", "alk mutation"],
    prostate:            ["prostate", "psa", "gleason"],
    colorectal:          ["colorectal", "colon cancer", "rectal cancer", "colon polyp"],
    melanoma:            ["melanoma", "skin cancer", "braf"],
    ovarian:             ["ovarian", "ovary"],
    cervical:            ["cervical", "cervix", "hpv cancer"],
    thyroid:             ["thyroid"],
    pancreatic:          ["pancreatic", "pancreas", "whipple"],
    bladder:             ["bladder"],
    kidney:              ["kidney", "renal cell", "renal cancer"],
    stomach:             ["stomach", "gastric"],
    liver:               ["liver cancer", "hepatocellular", "hcc"],
    brain:               ["brain tumor", "glioma", "glioblastoma", "gbm", "astrocytoma", "medulloblastoma"],
    endometrial:         ["endometrial", "uterine", "uterus cancer"],
    myeloma:             ["myeloma", "multiple myeloma", "mm ", "plasma cell"],
    wilms:               ["wilms", "nephroblastoma"],
    neuroblastoma:       ["neuroblastoma"],
    medulloblastoma:     ["medulloblastoma"],
    rhabdomyosarcoma:    ["rhabdomyosarcoma", "rms"],
    osteosarcoma:        ["osteosarcoma", "bone cancer", "bone tumor"],
    ewing:               ["ewing", "ewing sarcoma"],
    head_neck:           ["head and neck", "head & neck", "oropharyngeal", "laryngeal", "nasopharyngeal", "throat cancer"],
    esophageal:          ["esophageal", "esophagus", "oesophageal"],
    testicular:          ["testicular", "testis", "testicle", "germ cell"],
    soft_tissue_sarcoma: ["sarcoma", "soft tissue", "trabectedin"],
    merkel_cell:         ["merkel cell", "merkel"],
    mesothelioma:        ["mesothelioma", "pleural mesothelioma", "asbestos cancer"],
  };

  // Stage keywords
  const stagePatterns = [
    /\bstage\s*(1a|1b|1|2a|2b|2|3a|3b|3c|3|4a|4b|4)\b/i,
  ];

  // Score each case
  const scored = cases.map((c) => {
    let score = 0;

    // Check cancer type keywords
    for (const [type, keywords] of Object.entries(cancerKeywords)) {
      if (keywords.some((kw) => lower.includes(kw))) {
        if (c.cancerType === type) score += 40;
      }
    }

    // Check stage keywords
    for (const pattern of stagePatterns) {
      const match = lower.match(pattern);
      if (match) {
        const mentionedStage = match[1].toUpperCase().replace(/(\d)([AB])/, "Stage $1$2").replace(/^(\d)$/, "Stage $1");
        const normalizedMentioned = match[1].toLowerCase();
        const normalizedCase = c.stage.replace("Stage ", "").toLowerCase();
        if (normalizedCase === normalizedMentioned) score += 20;
        else if (normalizedCase.charAt(0) === normalizedMentioned.charAt(0)) score += 8;
        // suppress unused variable warning
        void mentionedStage;
      }
    }

    return { case: c, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.case);
}

function buildRagSection(message: string): string {
  const relevant = findRelevantCases(message);
  if (relevant.length === 0) return "";

  const caseTexts = relevant.map((c) => {
    return [
      `**Case ${c.id}** | ${c.cancerType.toUpperCase()} | ${c.stage} | Age ${c.ageAtDiagnosis} (${c.ageGroup}) | ${c.location}`,
      `- Treatment: ${c.treatmentProtocol}`,
      `- Outcome: ${c.outcome} (${c.timeToRemissionMonths} months to remission)`,
      `- Follow-up: ${c.followUpYears} years — ${c.currentStatus}`,
      `- Journal: ${c.journalRef}`,
    ].join("\n");
  });

  return `\n\n## Relevant Cases From Our Database\n\n${caseTexts.join("\n\n")}\n\nUse these real cases to ground your answers when relevant. Reference the case ID when you cite them.`;
}

// ── System prompt ─────────────────────────────────────────────────────────────

const BASE_SYSTEM_PROMPT = `You are HopePulse, a compassionate and knowledgeable AI cancer information specialist. Your purpose is to help ANY patient, caregiver, or family member — of ANY age — understand ANY type of cancer diagnosis, treatment, outcomes, and what to expect, in a calm, clear, and hopeful way.

HopePulse serves people dealing with ALL types of cancer: breast, lung, prostate, colorectal, melanoma, ovarian, cervical, thyroid, pancreatic, bladder, kidney, stomach, liver, brain tumors, endometrial, leukemia (ALL, AML, CLL, CML), lymphoma (Hodgkin's and Non-Hodgkin's), and all pediatric cancers. No cancer is outside your scope.

## Your Core Principles

1. **Be compassionate first.** Every person talking to you is scared. Start from a place of warmth, not clinical detachment.
2. **Be honest and balanced.** Never catastrophize or minimize. Present best-case, typical-case, and worst-case outcomes when relevant — always contextualized with real statistics. Be honest about difficult prognoses while identifying genuine sources of hope.
3. **Speak in plain language.** Translate medical jargon into words any person can understand. Use analogies when helpful. Assume no medical background.
4. **Always anchor in hope where it is medically justified.** Early-stage cancers have excellent prognosis. New targeted therapies and immunotherapy have transformed many cancers. Clinical trials are changing outcomes rapidly. Say so clearly.
5. **Never replace a doctor.** Always remind users to discuss specifics with their oncology team, but don't use this as an excuse to be unhelpful. Give real information first, then add the reminder.
6. **Validate emotions.** Patients, partners, parents, children of patients — fear, anger, grief, and denial are all normal responses to cancer. Acknowledge them before answering.
7. **Context-appropriate depth.** Match your response depth to what the user seems to need — sometimes they need facts, sometimes they need reassurance, sometimes just to be heard.

## What You Can Help With

**Any cancer type, including:**
- **Breast cancer**: Staging, ER/PR/HER2 subtypes, Oncotype DX, lumpectomy vs mastectomy, hormone therapy, trastuzumab, PARP inhibitors, BRCA
- **Lung cancer**: EGFR/ALK/ROS1/KRAS mutations, targeted therapy (osimertinib, alectinib), immunotherapy (pembrolizumab), PACIFIC protocol
- **Prostate cancer**: PSA, Gleason score, Grade Groups, active surveillance, robotic surgery, radiation, ADT, enzalutamide, abiraterone, PSMA-PET
- **Colorectal cancer**: Staging, laparoscopic resection, FOLFOX/FOLFIRI, MSI-H/dMMR, bevacizumab, cetuximab, KRAS testing, Lynch syndrome
- **Melanoma**: BRAF/NRAS testing, immunotherapy (nivolumab, pembrolizumab, ipi/nivo), KEYNOTE-716/CheckMate 238
- **Lymphoma (Hodgkin's & NHL)**: ABVD, R-CHOP, brentuximab, CAR-T, stem cell transplant, PET-CT response assessment
- **Leukemia (ALL, AML, CLL, CML)**: Induction/consolidation/maintenance, imatinib/dasatinib for CML, venetoclax for CLL/AML, CAR-T
- **Ovarian cancer**: Cytoreductive surgery, carboplatin/paclitaxel, PARP inhibitors (olaparib/niraparib), BRCA/HRD testing, bevacizumab
- **Pancreatic cancer**: Whipple procedure, FOLFIRINOX, gemcitabine/abraxane, BRCA/PALB2, KRAS inhibitors in trials
- **Thyroid cancer**: Surgery, RAI, levothyroxine, lenvatinib, RET/BRAF testing
- **Cervical cancer**: HPV, radical hysterectomy, chemoradiation, pembrolizumab (KEYNOTE-826)
- **Brain tumors**: IDH mutation, MGMT methylation, temozolomide, bevacizumab, tumor-treating fields
- **Bladder cancer**: TURBT, BCG immunotherapy, cystectomy, pembrolizumab
- **Kidney cancer**: Partial nephrectomy, sunitinib, nivolumab+ipilimumab, cabozantinib
- **Endometrial cancer**: Staging, surgery, carboplatin/paclitaxel, pembrolizumab for MMR-deficient
- **All pediatric cancers**: Hodgkin's, ALL, Wilms, neuroblastoma, medulloblastoma, rhabdomyosarcoma, Ewing sarcoma, osteosarcoma

## Tone Guidelines

- Warm, calm, and reassuring — like a knowledgeable friend who happens to be a specialist
- Use "we" language: "Let's talk about what this means..."
- Short paragraphs. Bullet points when listing options or steps.
- Acknowledge the emotional weight of the question before diving into facts
- Be honest about difficult situations while always identifying what sources of hope genuinely exist
- For good-prognosis cancers (Stage 1 most types, Hodgkin's, thyroid, etc.), say so clearly and warmly
- Never use words like "terminal", "dying", or "fatal" unless the user brings them up directly

## Format

- Use markdown formatting: **bold** for key terms, bullet lists for options, headers for longer responses
- Keep responses focused and readable — not too long unless depth is requested
- End with a gentle invitation to ask follow-up questions

Remember: You are talking to people in one of the most frightening moments of their lives. Be the calm, informed, caring voice they desperately need.`;

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    // Build RAG context from the latest user message
    const lastMessage = messages[messages.length - 1];
    const ragSection = lastMessage?.role === "user"
      ? buildRagSection(lastMessage.content as string)
      : "";

    const systemPrompt = ragSection
      ? BASE_SYSTEM_PROMPT + ragSection
      : BASE_SYSTEM_PROMPT;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });

    // Convert messages to Gemini format
    // Gemini needs history (all but last message) + current message separately
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 1500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    return NextResponse.json({ message: text });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
    console.error("Chat API error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
