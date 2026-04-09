"use client";

import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Minus, AlertCircle, ChevronRight, ArrowRight, MessageCircleHeart, Info, Users } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const CANCER_TYPES = [
  { group: "Blood & Lymphatic", types: [
    { value: "hodgkin",  label: "Hodgkin's Lymphoma" },
    { value: "nhl",      label: "Non-Hodgkin's Lymphoma" },
    { value: "all",      label: "Leukemia — ALL" },
    { value: "aml",      label: "Leukemia — AML" },
    { value: "cll",      label: "Leukemia — CLL" },
    { value: "cml",      label: "Leukemia — CML" },
  ]},
  { group: "Adult Solid Tumors", types: [
    { value: "breast",     label: "Breast Cancer" },
    { value: "lung",       label: "Lung Cancer" },
    { value: "prostate",   label: "Prostate Cancer" },
    { value: "colorectal", label: "Colorectal Cancer" },
    { value: "melanoma",   label: "Melanoma (Skin)" },
    { value: "ovarian",    label: "Ovarian Cancer" },
    { value: "cervical",   label: "Cervical Cancer" },
    { value: "thyroid",    label: "Thyroid Cancer" },
    { value: "pancreatic", label: "Pancreatic Cancer" },
    { value: "bladder",    label: "Bladder Cancer" },
    { value: "kidney",     label: "Kidney (Renal) Cancer" },
    { value: "stomach",    label: "Stomach Cancer" },
    { value: "liver",      label: "Liver Cancer" },
    { value: "brain",      label: "Brain Tumor / Glioma" },
    { value: "endometrial",label: "Endometrial (Uterine) Cancer" },
  ]},
  { group: "Pediatric Cancers", types: [
    { value: "wilms",          label: "Wilms Tumor" },
    { value: "neuroblastoma",  label: "Neuroblastoma" },
    { value: "medulloblastoma",label: "Medulloblastoma" },
    { value: "rhabdomyosarcoma",label:"Rhabdomyosarcoma" },
    { value: "osteosarcoma",   label: "Osteosarcoma" },
    { value: "ewing",          label: "Ewing Sarcoma" },
  ]},
  { group: "Other", types: [
    { value: "other", label: "Other (describe in notes)" },
  ]},
];

const STAGES = [
  "Stage 1", "Stage 1A", "Stage 1B",
  "Stage 2", "Stage 2A", "Stage 2B",
  "Stage 3", "Stage 3A", "Stage 3B", "Stage 3C",
  "Stage 4", "Stage 4A", "Stage 4B",
  "Grade 1", "Grade 2", "Grade 3", "Grade 4",
  "Limited", "Extensive",
];

interface OutcomeData {
  cancerType: string;
  stage: string;
  ageGroup: string;
  bestCase: { label: string; pct: number; desc: string };
  typicalCase: { label: string; pct: number; desc: string };
  worstCase: { label: string; pct: number; desc: string };
  treatmentOverview: string[];
  keyFacts: string[];
  hopefulNote: string;
  timeToTreatment: string;
  waitingTips: string[];
}

function getOutcomeData(type: string, stage: string, age: string): OutcomeData | null {
  // Hodgkin's Lymphoma — our primary focus
  if (type === "hodgkin") {
    const isEarly = stage.includes("1") || stage.includes("2A");
    const isStage1A = stage === "Stage 1A";
    const isPediatric = age === "child" || age === "teen";

    if (isStage1A && isPediatric) {
      return {
        cancerType: "Hodgkin's Lymphoma",
        stage: "Stage 1A",
        ageGroup: age === "child" ? "Child (under 12)" : "Teen (12–18)",
        bestCase: {
          label: "Complete remission after first treatment",
          pct: 95,
          desc: "Most children with Stage 1A Hodgkin's Lymphoma achieve complete remission with 2–4 cycles of ABVD chemotherapy. Many remain cancer-free for life.",
        },
        typicalCase: {
          label: "Remission with standard treatment",
          pct: 90,
          desc: "Standard ABVD chemotherapy over 3–4 months leads to complete remission. Regular follow-up scans monitor for recurrence.",
        },
        worstCase: {
          label: "Requires additional treatment if relapse",
          pct: 5,
          desc: "A small percentage may have refractory disease or relapse, requiring additional chemotherapy or stem cell transplant. Even then, outcomes are often still very good.",
        },
        treatmentOverview: [
          "**ABVD chemotherapy**: 2–4 cycles (each cycle is 4 weeks). Drugs: Adriamycin, Bleomycin, Vinblastine, Dacarbazine.",
          "**Involved-field radiation**: Sometimes given after chemo — only to the affected lymph node region.",
          "**PET-CT scan** after 2 cycles to assess response (interim PET). If excellent response, treatment may be shortened.",
          "**Modern protocols** increasingly avoid radiation in children to reduce long-term side effects.",
          "Total treatment duration: typically **3–6 months**.",
        ],
        keyFacts: [
          "5-year survival rate for pediatric Hodgkin's Stage 1A: **95–98%**",
          "Type A (no B-symptoms) is a **positive prognostic factor**",
          "Single lymph node region affected — the most localized and treatable presentation",
          "Hodgkin's Lymphoma has one of the **highest cure rates** of any cancer",
          "Children generally tolerate chemotherapy better than adults",
        ],
        hopefulNote:
          "Stage 1A Hodgkin's Lymphoma in a child is one of the most treatable cancer diagnoses. The vast majority of children are cured and go on to live completely normal, healthy lives. This is genuinely, medically good news.",
        timeToTreatment: "Treatment typically starts 2–4 weeks after confirmed diagnosis, once staging scans are complete.",
        waitingTips: [
          "**Maintain good nutrition**: High-protein foods help the body through treatment. No need for extreme diets.",
          "**Stay as active as comfortable**: Light activity is beneficial. Don't force bed rest unless medically advised.",
          "**Prepare questions for the oncologist**: Ask about treatment protocol, port placement, school during chemo, anti-nausea options.",
          "**Arrange childcare logistics**: Treatment days are long. Plan for siblings, school absences.",
          "**Connect with a pediatric oncology social worker**: They help with logistics, emotional support, and resources — at no cost.",
          "**Don't over-restrict**: Children need some normalcy. Let them see friends, play, and feel like a child.",
          "**Take care of yourself too**: Parental stress affects children. Find your own support.",
        ],
      };
    }

    // Hodgkin's general
    return {
      cancerType: "Hodgkin's Lymphoma",
      stage,
      ageGroup: age,
      bestCase: {
        label: "Complete remission",
        pct: isEarly ? 90 : 75,
        desc: `${isEarly ? "Early-stage" : "Advanced-stage"} Hodgkin's Lymphoma responds well to chemotherapy. Many patients achieve complete remission.`,
      },
      typicalCase: {
        label: "Remission with treatment",
        pct: isEarly ? 85 : 65,
        desc: "Standard chemotherapy (ABVD or escalated BEACOPP for advanced) leads to remission in most patients.",
      },
      worstCase: {
        label: "Refractory or relapse",
        pct: isEarly ? 10 : 25,
        desc: "Some patients may have refractory disease or relapse, requiring salvage chemotherapy and possibly stem cell transplant.",
      },
      treatmentOverview: [
        isEarly
          ? "**ABVD chemotherapy**: 2–4 cycles for early stage"
          : "**ABVD or escalated BEACOPP**: 4–6 cycles for advanced disease",
        "**PET-CT scan** to assess response after 2 cycles",
        "**Radiation therapy** may be added for localized disease",
        "**Stem cell transplant** considered for relapse/refractory cases",
      ],
      keyFacts: [
        `5-year survival: ${isEarly ? "90–95%" : "70–85%"} for ${stage}`,
        "Hodgkin's has one of the highest cure rates of any cancer",
        "Type A (no B-symptoms) is a positive prognostic factor",
      ],
      hopefulNote: "Hodgkin's Lymphoma is considered one of the most curable cancers. Even advanced stages respond well to treatment.",
      timeToTreatment: "Treatment typically starts 2–4 weeks after confirmed diagnosis.",
      waitingTips: [
        "Complete all staging scans (PET-CT, bone marrow biopsy if needed)",
        "Get a port placed if recommended — it makes chemo much easier",
        "Meet with the oncology team to understand the treatment plan",
        "Connect with a social worker for support resources",
      ],
    };
  }

  // ALL
  if (type === "all") {
    const isPediatric = age === "child" || age === "teen";
    return {
      cancerType: "Acute Lymphoblastic Leukemia (ALL)",
      stage: stage || "Newly Diagnosed",
      ageGroup: age,
      bestCase: { label: "Complete remission and cure", pct: isPediatric ? 90 : 75, desc: "Most children with ALL achieve complete remission with chemotherapy." },
      typicalCase: { label: "Long-term remission", pct: isPediatric ? 85 : 65, desc: "Standard multi-agent chemotherapy over 2–3 years. Most children are cured." },
      worstCase: { label: "Relapse requiring additional treatment", pct: isPediatric ? 15 : 30, desc: "Relapse is more common in adults and high-risk subtypes. Options include immunotherapy, CAR-T, and stem cell transplant." },
      treatmentOverview: [
        "**Induction phase**: ~4 weeks of intensive chemo to achieve remission",
        "**Consolidation/intensification**: Several months of continued treatment",
        "**Maintenance phase**: 2–3 years of lower-intensity oral chemotherapy",
        "**CNS prophylaxis**: Intrathecal chemo or cranial radiation to prevent brain involvement",
        "**Targeted therapy**: Imatinib for Philadelphia chromosome-positive ALL",
      ],
      keyFacts: [
        `Pediatric ALL cure rate: ${isPediatric ? "85–90%" : "40–50% in adults"}`,
        "Most common childhood cancer — well-studied with excellent protocols",
        "Regular blood counts and bone marrow tests monitor response",
      ],
      hopefulNote: isPediatric
        ? "Pediatric ALL has one of the best treatment outcomes of any cancer. Most children are cured and return to completely normal lives."
        : "ALL is a serious diagnosis but treatment has improved dramatically. Many patients achieve long-term remission.",
      timeToTreatment: "Treatment starts within days to 1–2 weeks of diagnosis.",
      waitingTips: [
        "Treatment starts very quickly — focus on getting admitted to a pediatric oncology center",
        "Bring comfort items for your child — they will spend time in hospital",
        "Ask about the PICU/oncology floor setup and what family support is available",
      ],
    };
  }

  // ===== BREAST CANCER =====
  if (type === "breast") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [99, 99, 86, 29];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Breast Cancer", stage, ageGroup,
      bestCase: { label: "Long-term remission / cure", pct, desc: s <= 2 ? "Early-stage breast cancer is highly curable. Lumpectomy or mastectomy + radiation ± chemotherapy typically achieves durable remission." : "With surgery, chemotherapy and targeted therapy, remission is achievable even in advanced stages." },
      typicalCase: { label: s <= 2 ? "Surgery + adjuvant therapy → remission" : "Chemotherapy + targeted therapy → disease control", pct: Math.max(pct - 8, 20), desc: s <= 2 ? "Standard treatment: surgery, 3–5 weeks radiation, hormone therapy for ER+ tumors. Chemo added for higher-risk cases." : "Neoadjuvant chemo often shrinks tumor before surgery. Targeted agents (trastuzumab, PARP inhibitors) improve outcomes significantly." },
      worstCase: { label: "Recurrence or metastatic progression", pct: 100 - pct, desc: "Recurrence risk depends on subtype (ER+, HER2+, TNBC), stage, and molecular markers. Even metastatic breast cancer is treatable — many patients live years on systemic therapy." },
      treatmentOverview: [
        "**Surgery**: lumpectomy (breast-conserving) or mastectomy ± reconstruction",
        "**Radiation**: typically 3–5 weeks after lumpectomy",
        "**Hormone therapy**: 5–10 years tamoxifen or aromatase inhibitor for ER+ tumors",
        "**Chemotherapy**: for high-risk, triple-negative, or HER2+ breast cancer",
        "**Targeted therapy**: trastuzumab (Herceptin) for HER2+ — dramatically improves outcomes",
        "**PARP inhibitors**: olaparib/talazoparib for BRCA-mutated breast cancer",
        "**Oncotype DX / genomic testing** helps decide whether chemo is needed",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **${pct}%** (US SEER data)`,
        "ER/PR/HER2 receptor status is the most important prognostic factor",
        "HER2+ breast cancer has been transformed by targeted therapy",
        "BRCA mutation testing guides treatment choices and family counseling",
        "Stage 1–2 breast cancer is highly curable in most cases",
      ],
      hopefulNote: s <= 2 ? "Early-stage breast cancer is one of the most successfully treated cancers. The vast majority of patients with Stage 1–2 breast cancer achieve long-term remission." : s === 3 ? "Stage 3 breast cancer is intensive to treat but many patients achieve remission. Modern neoadjuvant chemotherapy often dramatically reduces tumor size before surgery." : "Metastatic breast cancer is not curable in most cases, but it is treatable — many patients live years with good quality of life on modern therapies.",
      timeToTreatment: "Surgery typically within 2–4 weeks of diagnosis. Neoadjuvant chemo may start first for larger tumors or HER2+/TNBC subtypes.",
      waitingTips: ["Ask about genetic testing (BRCA1/2) — guides surgery choice and informs family members", "Discuss fertility preservation if premenopausal and planning chemotherapy", "Ask about Oncotype DX genomic testing if ER+/HER2- — may eliminate need for chemo", "Get a second opinion at a breast cancer specialist center for complex cases"],
    };
  }

  // ===== LUNG CANCER =====
  if (type === "lung") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [68, 47, 26, 8];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Lung Cancer", stage, ageGroup,
      bestCase: { label: s <= 2 ? "Surgical cure" : "Long-term disease control", pct: Math.min(pct + 15, 90), desc: s <= 2 ? "Early-stage lung cancer treated with surgery (lobectomy) has 5-year survival up to 80–90% for Stage 1A. EGFR/ALK mutations respond dramatically to targeted therapy." : "With immunotherapy and/or targeted therapy, many Stage 3–4 patients achieve years of disease control." },
      typicalCase: { label: s <= 2 ? "Surgery + adjuvant targeted/immunotherapy" : "Chemoimmunotherapy → disease control", pct, desc: s <= 2 ? "VATS lobectomy (minimally invasive). Adjuvant osimertinib for EGFR+ Stage 1B–3A improves DFS significantly." : "Pembrolizumab + chemotherapy (KEYNOTE-189) for non-squamous; PD-L1 high tumors can respond to immunotherapy alone." },
      worstCase: { label: "Rapid progression", pct: 100 - pct, desc: "Lung cancer without driver mutations and low PD-L1 has more limited options. Stage 4 without actionable mutations is challenging, though combination immunotherapy has improved median survival." },
      treatmentOverview: [
        "**Molecular testing is essential**: EGFR, ALK, ROS1, KRAS, PD-L1 — guides treatment choice",
        "**Early stage (1–2)**: Surgery (VATS lobectomy) + adjuvant osimertinib for EGFR+",
        "**Stage 3**: Concurrent chemoradiation + durvalumab (PACIFIC trial)",
        "**Stage 4 with driver mutation**: Targeted oral therapy (osimertinib, alectinib, lorlatinib)",
        "**Stage 4 no driver mutation**: Pembrolizumab ± chemotherapy",
        "**SBRT (stereotactic radiation)**: Curative option for early-stage patients unfit for surgery",
      ],
      keyFacts: [
        `5-year survival Stage ${s} NSCLC: **~${pct}%** (improving with new therapies)`,
        "EGFR mutation (found in ~15% of NSCLC): oral targeted therapy — transforms prognosis",
        "PD-L1 high (≥50%): immunotherapy alone may be curative in some Stage 4 cases",
        "Low-dose CT screening for current/former smokers 50–80 finds cancers much earlier",
        "Never-smokers often have driver mutations — excellent targeted therapy options",
      ],
      hopefulNote: s <= 2 ? "Early-stage lung cancer is increasingly curable, especially with targeted therapy for EGFR/ALK mutations. Surgery remains the best option for eligible patients." : s === 3 ? "Stage 3 lung cancer treated with chemoradiation + durvalumab (PACIFIC) has 5-year survival approaching 40% — a remarkable recent improvement." : "Stage 4 lung cancer is now a chronic disease for many patients with driver mutations. Median survival with EGFR-targeted therapy exceeds 3–4 years.",
      timeToTreatment: "Molecular testing takes 1–2 weeks. Surgery or systemic therapy typically starts 2–4 weeks after confirmed diagnosis.",
      waitingTips: ["Insist on full molecular profiling (next-generation sequencing) before starting treatment", "Quit smoking if applicable — improves treatment response and quality of life", "Ask about clinical trials — lung cancer has more active trials than almost any cancer", "Pulmonary function tests needed before surgery — start walking/breathing exercises"],
    };
  }

  // ===== PROSTATE CANCER =====
  if (type === "prostate") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [99, 99, 99, 32];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Prostate Cancer", stage, ageGroup,
      bestCase: { label: s <= 3 ? "Cure with primary treatment" : "Long-term disease control", pct, desc: s <= 3 ? "Prostate cancer Stage 1–3 is highly curable with surgery or radiation. PSA monitoring detects recurrence early." : "Metastatic prostate cancer is managed with hormonal therapy + newer agents (enzalutamide, abiraterone, docetaxel). Many patients live 5+ years." },
      typicalCase: { label: s <= 2 ? "Surgery or radiation → undetectable PSA" : "Hormonal therapy → disease control", pct: Math.max(pct - 5, 25), desc: s <= 2 ? "Robotic prostatectomy or external beam radiation (EBRT + brachytherapy) achieve equivalent long-term results." : "ADT (hormonal therapy) is the backbone; newer ARPIs (abiraterone, enzalutamide) dramatically improve survival in advanced disease." },
      worstCase: { label: "Biochemical recurrence or progression", pct: Math.min(100 - pct + 15, 70), desc: "PSA rise after treatment (biochemical recurrence) can be managed with salvage radiation or ADT. Castration-resistant prostate cancer (CRPC) has multiple effective treatments." },
      treatmentOverview: [
        "**Active surveillance**: For low-risk disease — monitoring PSA + biopsies, no immediate treatment",
        "**Surgery**: Robotic radical prostatectomy — same-day/next-day discharge, PSA should become undetectable",
        "**Radiation**: EBRT or brachytherapy — equivalent to surgery for localized disease",
        "**Hormonal therapy (ADT)**: LHRH agonists/antagonists — first line for advanced disease",
        "**Newer agents**: Abiraterone, enzalutamide, darolutamide — dramatically improve survival in metastatic disease",
        "**PSMA-PET imaging**: New imaging finds recurrence earlier than CT/bone scan",
        "**PARP inhibitors**: For BRCA-mutated metastatic CRPC",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **${pct}%** (US SEER data)`,
        "Gleason score / Grade Group (1–5) is as important as stage for prognosis",
        "PSA testing enables detection at curable stage — regular screening for men 50+",
        "Active surveillance is safe for low-risk disease — avoids unnecessary treatment",
        "Metastatic castration-sensitive prostate cancer (mCSPC): triplet therapy extends survival significantly",
      ],
      hopefulNote: s <= 3 ? "Prostate cancer Stage 1–3 is among the most treatable cancers with near-100% 5-year survival. Even many Stage 3 cases are cured with aggressive local treatment." : "Metastatic prostate cancer has been transformed by new drugs. Many patients live 5–10 years with good quality of life. BRCA mutation testing opens additional targeted options.",
      timeToTreatment: "Low-risk disease: active surveillance appropriate. Intermediate/high-risk: treatment typically within 4–8 weeks. Metastatic disease: hormonal therapy often starts within 1–2 weeks.",
      waitingTips: ["PSMA-PET scan if available — better staging than conventional imaging", "Ask about testosterone levels and fertility/sexual function implications of ADT", "Consider genetic testing (BRCA1/2, Lynch syndrome) if family history of cancer", "For low-risk disease, active surveillance is a valid choice — not every prostate cancer needs immediate treatment"],
    };
  }

  // ===== COLORECTAL CANCER =====
  if (type === "colorectal") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [91, 82, 61, 12];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Colorectal Cancer", stage, ageGroup,
      bestCase: { label: "Surgical cure / long-term remission", pct, desc: "Surgery alone for Stage 1–2 colon cancer (without lymph node involvement) achieves cure in most cases. MSI-H (microsatellite unstable) tumors have better prognosis and respond to immunotherapy." },
      typicalCase: { label: s <= 3 ? "Surgery + FOLFOX chemotherapy → remission" : "FOLFOX or FOLFIRI ± bevacizumab/cetuximab", pct: Math.max(pct - 8, 10), desc: s <= 2 ? "Laparoscopic/robotic colectomy + 6 months adjuvant FOLFOX for higher-risk Stage 2 or Stage 3. Cure rates remain good." : "For metastatic disease, combination chemotherapy + biologics controls disease for 1–2+ years. Liver-limited metastases are potentially curable with surgery." },
      worstCase: { label: "Recurrence or distant metastases", pct: 100 - pct, desc: "Recurrence typically occurs within first 3 years. Liver metastases develop in ~50% of Stage 4 cases — some are resectable. RAS/BRAF mutation status guides choice of biologic therapy." },
      treatmentOverview: [
        "**Surgery**: Laparoscopic/robotic colectomy or rectal resection — minimally invasive, faster recovery",
        "**Stage 1–2 colon**: Surgery alone often curative (no lymph nodes involved)",
        "**Stage 3**: 6 months adjuvant FOLFOX (oxaliplatin + fluorouracil) chemotherapy post-surgery",
        "**Rectal cancer**: Neoadjuvant chemoradiation → surgery → adjuvant chemo",
        "**Stage 4**: FOLFOX or FOLFIRI ± bevacizumab (Avastin) or cetuximab (for RAS wild-type)",
        "**MSI-H tumors**: Pembrolizumab immunotherapy — excellent response",
        "**Liver metastases**: Surgical resection if limited — potentially curative",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **${pct}%**`,
        "Colonoscopy screening at 45+ prevents colorectal cancer by removing polyps",
        "MSI-H status (mismatch repair deficient): great response to immunotherapy",
        "KRAS/RAS testing mandatory before starting cetuximab or panitumumab",
        "Lynch syndrome: hereditary CRC — genetic testing important for family members",
      ],
      hopefulNote: s <= 2 ? "Stage 1–2 colorectal cancer is highly curable with surgery. The key message: colonoscopy screening prevents it, and early detection saves lives." : s === 3 ? "Stage 3 colorectal cancer requires surgery plus 6 months of chemotherapy, but cure is achievable — especially with MSI-H tumors and modern protocols." : "Stage 4 colorectal cancer with liver-only metastases can sometimes be cured surgically. Even unresectable disease responds well to modern regimens.",
      timeToTreatment: "Surgery typically within 2–4 weeks. RAS/MSI testing takes 1–2 weeks but should not delay surgery for resectable disease.",
      waitingTips: ["Ask for MSI/MMR testing and RAS mutation status — determines eligibility for immunotherapy and biologics", "Clear liquid diet prep instructions before surgery", "Stoma counseling if rectal cancer surgery might involve a temporary or permanent stoma", "Genetic counseling if diagnosed under 50 or family history of CRC"],
    };
  }

  // ===== MELANOMA =====
  if (type === "melanoma") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [98, 90, 68, 30];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Melanoma", stage, ageGroup,
      bestCase: { label: "Surgical cure + immunotherapy protection", pct, desc: s <= 2 ? "Wide local excision cures most Stage 1–2 melanomas. Adjuvant pembrolizumab for Stage 2B+ reduces recurrence risk by 35%." : "Immunotherapy (ipi/nivo or pembrolizumab) achieves complete responses in 15–20% of Stage 4 patients — some are durable for 10+ years." },
      typicalCase: { label: s <= 2 ? "WLE + SLNB ± adjuvant immunotherapy" : "Immunotherapy or BRAF/MEK targeted therapy", pct: Math.max(pct - 10, 15), desc: s <= 3 ? "Surgery + sentinel lymph node biopsy. Adjuvant nivolumab or pembrolizumab for Stage 3–4A/B." : "First-line: pembrolizumab or nivolumab ± ipilimumab (if BRAF wild-type). BRAF V600E+: dabrafenib + trametinib targeted therapy." },
      worstCase: { label: "Recurrence or brain metastases", pct: 100 - pct, desc: "Brain metastases are common in advanced melanoma. Stereotactic radiosurgery and immunotherapy can control CNS disease. Overall, modern immunotherapy has transformed Stage 4 outcomes dramatically." },
      treatmentOverview: [
        "**Surgery**: Wide local excision (WLE) with clear margins — primary treatment",
        "**SLNB (sentinel lymph node biopsy)**: Staging procedure for tumors > 0.8 mm",
        "**Adjuvant immunotherapy**: Pembrolizumab or nivolumab for Stage 2B–3 (reduces recurrence)",
        "**BRAF testing**: V600E mutation (~50%) — eligible for dabrafenib + trametinib targeted therapy",
        "**Metastatic (Stage 4)**: Combination nivolumab + ipilimumab (ipi/nivo) for high-risk disease",
        "**Brain metastases**: Stereotactic radiosurgery (SRS) + systemic therapy",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **${pct}%** (dramatically improved with immunotherapy)`,
        "BRAF V600E mutation: targeted therapy (BRAF/MEK inhibitors) — rapid response",
        "Complete durable response to immunotherapy in ~15–20% of Stage 4 — effectively cured",
        "Sun protection + annual skin checks prevent and detect melanoma early",
        "Melanoma can occur on non-sun-exposed skin — any changing mole needs assessment",
      ],
      hopefulNote: s <= 2 ? "Early melanoma is highly curable with surgery. Adjuvant immunotherapy for Stage 2B+ has meaningfully reduced recurrence." : s === 3 ? "Stage 3 melanoma is treated aggressively — surgery plus a year of immunotherapy — with many patients achieving long-term remission." : "Stage 4 melanoma outcomes have been revolutionized by immunotherapy. Complete durable responses (effectively cured) are seen in 15–20% of patients. Even partial responders often live many years.",
      timeToTreatment: "Excision within 2–4 weeks of biopsy confirmation. BRAF testing and staging imaging needed before starting systemic therapy.",
      waitingTips: ["BRAF testing on the biopsy specimen — essential before systemic therapy", "Full skin exam for additional primary melanomas", "Ophthalmology exam — uveal melanoma is a different disease", "Sun protection is essential — both for prevention and reducing recurrence risk"],
    };
  }

  // ===== THYROID CANCER =====
  if (type === "thyroid") {
    return {
      cancerType: "Thyroid Cancer", stage, ageGroup,
      bestCase: { label: "Surgical cure — long-term disease-free", pct: 99, desc: "Papillary and follicular thyroid cancers (the most common types) have near-100% 5-year survival for Stage 1–2. Surgery is curative for the vast majority." },
      typicalCase: { label: "Thyroidectomy ± RAI → undetectable Tg", pct: 97, desc: "Total thyroidectomy + radioactive iodine (RAI) for intermediate/high-risk disease. Thyroglobulin (Tg) monitoring detects recurrence. Lifelong levothyroxine replacement." },
      worstCase: { label: "Recurrence or rare aggressive histology", pct: 5, desc: "Rare cases of poorly differentiated or anaplastic thyroid cancer are more aggressive. Medullary thyroid cancer (MTC) requires different treatment (not RAI-sensitive). Recurrence in well-differentiated cancer is generally treatable." },
      treatmentOverview: [
        "**Surgery**: Hemithyroidectomy (lobectomy) for low-risk, total thyroidectomy for higher-risk",
        "**Radioactive iodine (RAI)**: Post-surgery for intermediate/high-risk differentiated thyroid cancer",
        "**Levothyroxine**: Lifelong thyroid hormone replacement + TSH suppression",
        "**Lenvatinib/sorafenib**: For RAI-refractory advanced differentiated thyroid cancer",
        "**Cabozantinib/vandetanib**: For medullary thyroid cancer",
        "**RET/BRAF testing**: For targeted therapy eligibility",
      ],
      keyFacts: [
        "Thyroid cancer Stage 1–2: **5-year survival ~99–100%**",
        "Papillary thyroid cancer (80% of cases) is the most indolent and curable",
        "Anaplastic thyroid cancer is rare but aggressive — very different prognosis",
        "BRAF V600E: 50% of papillary thyroid cancer — may guide treatment",
        "Hereditary MTC: RET mutation testing important for family members",
      ],
      hopefulNote: "Thyroid cancer is one of the most successfully treated cancers. Most patients are cured with surgery and live normal lives on a daily thyroid hormone pill. The 10-year survival for papillary thyroid cancer Stage 1–2 approaches 100%.",
      timeToTreatment: "Surgery typically 2–4 weeks after confirmed diagnosis.",
      waitingTips: ["Ultrasound staging of remaining thyroid and lymph nodes before surgery", "No iodine-rich foods if RAI is planned (sushi, iodized salt)", "Ask about fertility and pregnancy implications before RAI if planning family", "Vocal cord assessment before and after surgery (recurrent laryngeal nerve monitoring)"],
    };
  }

  // ===== OVARIAN CANCER =====
  if (type === "ovarian") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [93, 70, 41, 31];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Ovarian Cancer", stage, ageGroup,
      bestCase: { label: "Surgical debulking + complete response", pct: Math.min(pct + 15, 99), desc: s <= 2 ? "Stage 1 ovarian cancer detected early (often incidentally) is highly curable with surgery ± chemotherapy." : "Optimal debulking surgery (no visible residual) + platinum-based chemo + PARP inhibitor maintenance (for BRCA-mutated) dramatically improves outcomes." },
      typicalCase: { label: "Surgery + carboplatin/paclitaxel + maintenance", pct, desc: "Total abdominal hysterectomy + bilateral salpingo-oophorectomy + omentectomy + peritoneal staging. Carboplatin/paclitaxel x6 cycles. PARP inhibitor maintenance for BRCA+ or HRD+ patients." },
      worstCase: { label: "Platinum-resistant recurrence", pct: 100 - pct, desc: "Most Stage 3–4 ovarian cancers relapse. Platinum-sensitive recurrence has more treatment options. Platinum-resistant disease is more challenging. Bevacizumab, PARP inhibitors, and clinical trials offer options." },
      treatmentOverview: [
        "**Cytoreductive surgery**: Remove all visible tumor ('optimal debulking') — most important prognostic factor",
        "**Chemotherapy**: Carboplatin + paclitaxel x6 cycles — standard backbone",
        "**PARP inhibitors**: Olaparib, niraparib, rucaparib — maintenance for BRCA+ or HRD+ (dramatically improve PFS)",
        "**Bevacizumab**: Anti-angiogenic — added for advanced disease, continued as maintenance",
        "**IP (intraperitoneal) chemotherapy**: For optimally debulked Stage 3",
        "**BRCA1/2 testing**: Essential — guides maintenance therapy and family counseling",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **${pct}%**`,
        "BRCA1/2 mutation: PARP inhibitor maintenance extends PFS dramatically (SOLO-1 trial)",
        "No effective screening test — most ovarian cancers diagnosed at Stage 3+",
        "CA-125 and HE4 used to monitor treatment response, not diagnosis",
        "BRCA+ Stage 3C patients on olaparib: 5-year PFS ~48% (vs 21% without) — transformative",
      ],
      hopefulNote: s <= 2 ? "Stage 1–2 ovarian cancer detected early is highly curable. Surgery alone or with short chemotherapy achieves excellent outcomes." : "Advanced ovarian cancer outcomes have been transformed by PARP inhibitors for BRCA-mutated patients. Olaparib maintenance has turned a 1–2 year median PFS into 5+ years for many women.",
      timeToTreatment: "BRCA testing urgently. Surgery typically within 2–4 weeks or neoadjuvant chemo if not immediately resectable.",
      waitingTips: ["BRCA1/2 germline testing — urgent, changes treatment and family implications", "HRD (homologous recombination deficiency) testing — even BRCA-negative patients may benefit from PARP inhibitors", "Fertility-sparing surgery only appropriate for select Stage 1 cases — discuss early", "Ask about IP chemotherapy eligibility after optimal debulking"],
    };
  }

  // ===== CERVICAL CANCER =====
  if (type === "cervical") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [92, 76, 51, 18];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Cervical Cancer", stage, ageGroup,
      bestCase: { label: "Surgical cure", pct, desc: s <= 2 ? "Stage 1–2A cervical cancer treated with radical hysterectomy or chemoradiation achieves cure in most cases. Pap smear screening detects pre-cancerous lesions before cancer develops." : "Concurrent chemoradiation (cisplatin + radiation) is the standard for Stage 2B–4A. Pembrolizumab has transformed metastatic cervical cancer." },
      typicalCase: { label: s <= 2 ? "Radical hysterectomy or chemoradiation" : "Chemoradiation ± pembrolizumab", pct: Math.max(pct - 10, 10), desc: s <= 2 ? "Robotic radical hysterectomy + pelvic lymph node dissection for Stage 1B–2A. Equivalent results with chemoradiation." : "Cisplatin-based chemoradiation x5–6 weeks. Pembrolizumab added for PD-L1 CPS ≥1 (KEYNOTE-826 trial) — significantly improves survival." },
      worstCase: { label: "Locally advanced or metastatic progression", pct: 100 - pct, desc: "Locally recurrent or metastatic cervical cancer is challenging. Pembrolizumab + platinum chemotherapy (KEYNOTE-826) significantly improves outcomes. Bevacizumab adds survival benefit in first-line metastatic disease." },
      treatmentOverview: [
        "**HPV vaccine**: Prevents ~90% of cervical cancers — Gardasil 9 for ages 9–26",
        "**Stage 1A**: Cone biopsy or simple hysterectomy (fertility-sparing options exist)",
        "**Stage 1B–2A**: Radical hysterectomy (robotic) or chemoradiation — equivalent",
        "**Stage 2B–4A**: Concurrent cisplatin + external beam radiation + brachytherapy",
        "**Metastatic**: Pembrolizumab + platinum/paclitaxel ± bevacizumab (KEYNOTE-826)",
        "**PD-L1 testing**: Guides immunotherapy use",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **${pct}%**`,
        "HPV-associated in >99% of cases — HPV vaccination prevents it",
        "Pap smear + HPV co-testing every 5 years (age 30+) — most effective screening",
        "Pembrolizumab + chemo: improved OS in metastatic cervical cancer (KEYNOTE-826)",
        "Fertility-sparing surgery (trachelectomy) possible for Stage 1A–1B1",
      ],
      hopefulNote: s <= 2 ? "Early cervical cancer is highly curable. This is why Pap smear screening is so important — it can detect pre-cancer before it becomes invasive." : "Modern chemoradiation + immunotherapy has significantly improved outcomes for advanced cervical cancer.",
      timeToTreatment: "Surgery or start of chemoradiation typically within 2–4 weeks.",
      waitingTips: ["Fertility counseling before radical hysterectomy or radiation (radiation causes infertility)", "Brachytherapy planning consultation — specialised radiotherapy component", "HPV testing for family members — consider vaccination", "MRI pelvis for accurate staging before treatment decision"],
    };
  }

  // ===== PANCREATIC CANCER =====
  if (type === "pancreatic") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [44, 15, 12, 3];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Pancreatic Cancer", stage, ageGroup,
      bestCase: { label: "Resection + adjuvant chemo — long-term survivor", pct: s <= 2 ? 35 : 12, desc: s <= 2 ? "Approximately 20–25% of patients with resected pancreatic cancer are alive at 5 years. FOLFIRINOX adjuvant therapy improves this to ~35% in fit patients. Some long-term survivors exist." : "A minority of patients with locally advanced or metastatic disease respond exceptionally well to FOLFIRINOX, achieving conversion to resectability." },
      typicalCase: { label: s <= 2 ? "Whipple + FOLFIRINOX → disease-free interval" : "FOLFIRINOX or gem/abraxane → disease control", pct, desc: s <= 2 ? "Pancreaticoduodenectomy (Whipple procedure) followed by 6 months mFOLFIRINOX or gemcitabine + capecitabine adjuvant chemotherapy." : "FOLFIRINOX or gemcitabine + nab-paclitaxel. Second-line: FOLFOX or nanoliposomal irinotecan (nal-IRI). Median survival 8–12 months for Stage 4." },
      worstCase: { label: "Early progression", pct: 100 - pct, desc: "Pancreatic cancer often progresses quickly. PS2 patients may not tolerate FOLFIRINOX — gemcitabine monotherapy is an alternative. Supportive care including pain management and biliary stent placement are important." },
      treatmentOverview: [
        "**Surgery (Whipple)**: Only ~20% are resectable at diagnosis — if eligible, pursue urgently",
        "**Adjuvant chemo**: mFOLFIRINOX (6 months) for fit patients after Whipple — improves OS",
        "**Borderline resectable**: Neoadjuvant FOLFIRINOX ± radiation to convert to resectable",
        "**Metastatic**: FOLFIRINOX (fit patients) or gemcitabine + nab-paclitaxel (less fit)",
        "**BRCA/PALB2 testing**: PARP inhibitors for BRCA-mutated metastatic disease (POLO trial)",
        "**KRAS G12C**: New targeted agents in trials",
        "**Palliative**: Biliary stent, pain control — quality of life is paramount",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **~${pct}%** (improving with surgery + modern chemo)`,
        "Only ~20% are resectable at diagnosis — this is the critical factor",
        "BRCA1/2 or PALB2 mutations: olaparib maintenance improves PFS (POLO trial)",
        "KRAS mutation (~95%): new KRAS inhibitors showing promise in trials",
        "Genetic testing important — family members may benefit from surveillance",
      ],
      hopefulNote: s <= 2 ? "Resectable pancreatic cancer with surgery + modern chemotherapy gives a meaningful chance of long-term survival. ~35% of fit patients treated with mFOLFIRINOX adjuvant therapy are alive at 5 years." : "Pancreatic cancer is challenging, and honesty matters here. But treatment has improved — FOLFIRINOX extended median survival, PARP inhibitors help BRCA+ patients, and clinical trials offer real hope. Seek a specialist center.",
      timeToTreatment: "Urgent referral to pancreatic surgery specialist. If resectable — surgery ASAP. If borderline — neoadjuvant chemo first.",
      waitingTips: ["Seek a high-volume pancreatic surgery center — surgical expertise significantly affects outcomes", "BRCA1/2 and PALB2 germline testing — important for treatment and family", "Biliary obstruction (jaundice): biliary stent may be needed before chemo", "Nutritional support — pancreatic enzyme replacement often needed after Whipple"],
    };
  }

  // ===== GENERIC FALLBACK =====
  // Generic fallback
  return {
    cancerType: CANCER_TYPES.flatMap(g => g.types).find((c) => c.value === type)?.label ?? type,
    stage,
    ageGroup: age,
    bestCase: { label: "Complete remission", pct: 75, desc: "Many patients achieve complete remission with appropriate treatment." },
    typicalCase: { label: "Partial or complete response", pct: 65, desc: "Standard treatment protocols provide meaningful response in most patients." },
    worstCase: { label: "Progressive or refractory disease", pct: 25, desc: "Some patients may require escalated treatment or clinical trial participation." },
    treatmentOverview: ["Treatment varies significantly based on specific subtype and individual factors.", "Your oncology team will create a personalized treatment plan."],
    keyFacts: ["Outcomes vary widely by specific cancer type and subtype", "Consult your oncologist for prognosis specific to your case"],
    hopefulNote: "Oncology treatment advances rapidly. Clinical trials offer additional options. Work closely with a specialized oncology team.",
    timeToTreatment: "Timing varies by cancer type. Discuss urgency with your oncology team.",
    waitingTips: ["Get a second opinion at a major cancer center if possible", "Connect with a social worker for support resources", "Ask your doctor what you can do while awaiting treatment"],
  };
}

export default function AnalysisPage() {
  const [form, setForm] = useState({ type: "", stage: "", age: "", notes: "" });
  const [result, setResult] = useState<OutcomeData | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type || !form.age) return;
    const data = getOutcomeData(form.type, form.stage || "Stage 1A", form.age);
    setResult(data);
    setSubmitted(true);
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const reset = () => {
    setForm({ type: "", stage: "", age: "", notes: "" });
    setResult(null);
    setSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 badge bg-amber-100 text-amber-700 mb-4">
          <Search className="w-3.5 h-3.5" />
          Diagnosis Analysis
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Understand Your Diagnosis</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Enter the diagnosis details and get a clear, balanced view of outcomes — best case, typical case, and what to watch for.
          No horror stories. Just honest, hopeful information.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 mb-8">
        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          This analysis is based on published medical statistics and is for educational purposes. Your specific outcome depends on many individual factors. Always discuss prognosis with your oncologist.
        </p>
      </div>

      {/* Form */}
      {!submitted ? (
        <div className="card">
          <h2 className="font-bold text-slate-800 text-xl mb-6">Enter diagnosis details</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cancer Type *</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full border border-hope-200 rounded-xl px-3 py-2.5 text-sm bg-hope-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-hope-300"
                  required
                >
                  <option value="">Select cancer type...</option>
                  {CANCER_TYPES.map((group) => (
                    <optgroup key={group.group} label={group.group}>
                      {group.types.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Stage</label>
                <select
                  value={form.stage}
                  onChange={(e) => setForm({ ...form, stage: e.target.value })}
                  className="w-full border border-hope-200 rounded-xl px-3 py-2.5 text-sm bg-hope-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-hope-300"
                >
                  <option value="">Select stage (if known)...</option>
                  {STAGES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Patient Age Group *</label>
                <select
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  className="w-full border border-hope-200 rounded-xl px-3 py-2.5 text-sm bg-hope-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-hope-300"
                  required
                >
                  <option value="">Select age group...</option>
                  <option value="child">Child (under 12)</option>
                  <option value="teen">Teen (12–18)</option>
                  <option value="adult">Adult (18–60)</option>
                  <option value="senior">Senior (60+)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Additional notes (optional)</label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g. Type A, single lymph node..."
                  className="w-full border border-hope-200 rounded-xl px-3 py-2.5 text-sm bg-hope-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-hope-300 placeholder-slate-400"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full sm:w-auto flex items-center gap-2 justify-center">
              <Search className="w-4 h-4" />
              Analyze Diagnosis
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-end mb-4">
          <button onClick={reset} className="btn-secondary text-sm py-2">
            Analyze a different diagnosis
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div id="results" className="mt-8 space-y-6 animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-hope-600 to-hope-800 rounded-2xl p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{result.cancerType}</h2>
                <p className="text-hope-200 mt-1">{result.stage} · {result.ageGroup}</p>
              </div>
            </div>
            <div className="mt-4 bg-white/15 rounded-xl p-4">
              <p className="text-sm font-medium text-white leading-relaxed">{result.hopefulNote}</p>
            </div>
          </div>

          {/* Outcomes */}
          <div>
            <h3 className="font-bold text-slate-800 text-lg mb-4">Outcome Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Best case */}
              <div className="card border-l-4 border-l-emerald-400">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Best Case</span>
                </div>
                <div className="text-3xl font-black text-emerald-600 mb-1">{result.bestCase.pct}%</div>
                <div className="text-sm font-semibold text-slate-800 mb-2">{result.bestCase.label}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{result.bestCase.desc}</p>
                <div className="mt-3 bg-emerald-50 rounded-lg h-2">
                  <div className="bg-emerald-400 h-2 rounded-lg transition-all" style={{ width: `${result.bestCase.pct}%` }} />
                </div>
              </div>

              {/* Typical case */}
              <div className="card border-l-4 border-l-hope-400">
                <div className="flex items-center gap-2 mb-2">
                  <Minus className="w-4 h-4 text-hope-600" />
                  <span className="text-xs font-bold text-hope-700 uppercase tracking-wide">Typical Case</span>
                </div>
                <div className="text-3xl font-black text-hope-600 mb-1">{result.typicalCase.pct}%</div>
                <div className="text-sm font-semibold text-slate-800 mb-2">{result.typicalCase.label}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{result.typicalCase.desc}</p>
                <div className="mt-3 bg-hope-50 rounded-lg h-2">
                  <div className="bg-hope-400 h-2 rounded-lg transition-all" style={{ width: `${result.typicalCase.pct}%` }} />
                </div>
              </div>

              {/* Worst case */}
              <div className="card border-l-4 border-l-amber-400">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Challenging Case</span>
                </div>
                <div className="text-3xl font-black text-amber-600 mb-1">{result.worstCase.pct}%</div>
                <div className="text-sm font-semibold text-slate-800 mb-2">{result.worstCase.label}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{result.worstCase.desc}</p>
                <div className="mt-3 bg-amber-50 rounded-lg h-2">
                  <div className="bg-amber-400 h-2 rounded-lg transition-all" style={{ width: `${result.worstCase.pct}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Key facts */}
          <div className="card">
            <h3 className="font-bold text-slate-800 mb-4">Key Facts</h3>
            <ul className="space-y-2">
              {result.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 bg-hope-400 rounded-full mt-2 flex-shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: fact.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                </li>
              ))}
            </ul>
          </div>

          {/* Treatment overview */}
          <div className="card">
            <h3 className="font-bold text-slate-800 mb-4">Treatment Overview</h3>
            <ul className="space-y-3">
              {result.treatmentOverview.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <ChevronRight className="w-4 h-4 text-hope-500 flex-shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-slate-800'>$1</strong>") }} />
                </li>
              ))}
            </ul>
          </div>

          {/* While you wait */}
          <div className="card bg-gradient-to-r from-hope-50 to-amber-50 border-hope-200">
            <h3 className="font-bold text-slate-800 mb-1">While You Wait for Treatment</h3>
            <p className="text-xs text-slate-500 mb-4">{result.timeToTreatment}</p>
            <ul className="space-y-3">
              {result.waitingTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="text-hope-600 font-bold text-xs mt-0.5 flex-shrink-0">0{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: tip.replace(/\*\*(.*?)\*\*/g, "<strong class='text-slate-800'>$1</strong>") }} />
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          {/* Similar cases CTA */}
          <div className="bg-gradient-to-r from-hope-50 to-amber-50 border border-hope-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-hope-600" />
              <h3 className="font-bold text-slate-800">See Real Cases Like This One</h3>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Browse anonymized cases from published medical literature that match this diagnosis — how they were treated, how long it took, and what happened.
            </p>
            <Link
              href={`/cases?type=${form.type}&stage=${encodeURIComponent(form.stage || "Stage 1A")}&ageGroup=${form.age}`}
              className="btn-primary inline-flex items-center gap-2 text-sm py-2.5"
            >
              <Users className="w-4 h-4" />
              Find Similar Cases
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-hope-900 rounded-2xl p-6 text-center text-white">
            <h3 className="font-bold text-lg mb-2">Have more questions?</h3>
            <p className="text-hope-300 text-sm mb-4">
              Our AI specialist can answer specific questions about this diagnosis, treatment, and what to expect.
            </p>
            <Link href="/chat" className="inline-flex items-center gap-2 bg-white text-hope-700 font-bold px-6 py-3 rounded-xl hover:bg-hope-50 transition-colors">
              <MessageCircleHeart className="w-4 h-4" />
              Ask HopePulse AI
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
