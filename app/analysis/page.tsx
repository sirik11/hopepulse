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
  { group: "Head, Neck & Thoracic", types: [
    { value: "head_neck",    label: "Head & Neck Cancer" },
    { value: "esophageal",  label: "Esophageal Cancer" },
    { value: "mesothelioma",label: "Mesothelioma" },
  ]},
  { group: "Urological & Other", types: [
    { value: "testicular",  label: "Testicular Cancer" },
    { value: "myeloma",     label: "Multiple Myeloma" },
    { value: "other",       label: "Other (describe in notes)" },
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
      cancerType: "Breast Cancer", stage, ageGroup: age,
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
      cancerType: "Lung Cancer", stage, ageGroup: age,
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
      cancerType: "Prostate Cancer", stage, ageGroup: age,
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
      cancerType: "Colorectal Cancer", stage, ageGroup: age,
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
      cancerType: "Melanoma", stage, ageGroup: age,
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
      cancerType: "Thyroid Cancer", stage, ageGroup: age,
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
      cancerType: "Ovarian Cancer", stage, ageGroup: age,
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
      cancerType: "Cervical Cancer", stage, ageGroup: age,
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
      cancerType: "Pancreatic Cancer", stage, ageGroup: age,
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

  // ===== STOMACH CANCER =====
  if (type === "stomach") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [70, 32, 20, 5];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Stomach (Gastric) Cancer", stage, ageGroup: age,
      bestCase: { label: s <= 2 ? "Surgical cure with D2 resection" : "Response to FLOT chemotherapy", pct: Math.min(pct + 15, 75), desc: s <= 2 ? "Early gastric cancer (EGC) detected by endoscopy has excellent outcomes. D2 gastrectomy is curative in most cases. Endoscopic submucosal dissection (ESD) for T1a tumors avoids surgery entirely." : "Perioperative FLOT chemotherapy (before and after surgery) has significantly improved resectable Stage 3 outcomes — 45% 5-year survival in FLOT4 trial." },
      typicalCase: { label: s <= 2 ? "D2 gastrectomy ± adjuvant chemo" : "Perioperative FLOT + surgery", pct, desc: s <= 2 ? "Total or subtotal gastrectomy with D2 lymph node dissection. Adjuvant chemotherapy (S-1 or capecitabine + oxaliplatin) for Stage 2–3." : "Perioperative FLOT (docetaxel, oxaliplatin, leucovorin, fluorouracil) x4 cycles before and after surgery. HER2+ tumors: add trastuzumab." },
      worstCase: { label: "Metastatic progression", pct: 100 - pct, desc: "Gastric cancer spreads to peritoneum, liver, and lymph nodes. First-line: FOLFOX or XELOX ± trastuzumab (HER2+) or nivolumab (CheckMate 649). Median survival 12–18 months for Stage 4 with modern regimens." },
      treatmentOverview: [
        "**Surgery**: Total or subtotal gastrectomy + D2 lymphadenectomy — the most important curative step",
        "**Perioperative FLOT**: 4 cycles before and 4 cycles after surgery for Stage 2–3 (FLOT4 trial — superior to ECF)",
        "**Adjuvant capecitabine + oxaliplatin (CAPOX)**: Alternative post-operative regimen",
        "**HER2 testing**: ~15–20% of gastric tumors are HER2+ — add trastuzumab to chemotherapy",
        "**PD-L1 testing**: Nivolumab + chemotherapy improves OS for PD-L1 CPS ≥5 (CheckMate 649)",
        "**Metastatic**: FOLFOX or XELOX + immunotherapy backbone",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **~${pct}%**`,
        "HER2+ (~15–20%): trastuzumab added to chemo — improves survival",
        "Perioperative FLOT achieved median OS 50 months vs 35 months for ECF (FLOT4 trial)",
        "Early gastric cancer detected by endoscopy screening: >90% cure rate",
        "MSI-H gastric cancer: excellent response to pembrolizumab",
      ],
      hopefulNote: s <= 2 ? "Early-stage gastric cancer treated with D2 surgery is highly curable. Regular endoscopy screening in high-risk populations catches these at Stage 1–2." : "Perioperative FLOT chemotherapy has significantly improved outcomes for resectable Stage 2–3 gastric cancer. HER2+ and MSI-H subtypes now have targeted treatment options.",
      timeToTreatment: "HER2 and MSI testing while staging. Perioperative chemo starts 2–3 weeks after diagnosis for resectable disease.",
      waitingTips: ["HER2 testing on biopsy — urgent, changes treatment plan", "Nutritional assessment — gastric cancer often causes weight loss, needs pre-treatment optimization", "Ask about staging laparoscopy before committing to surgery — detects occult peritoneal metastases", "MSI/MMR testing — guides immunotherapy eligibility"],
    };
  }

  // ===== ENDOMETRIAL (UTERINE) CANCER =====
  if (type === "endometrial") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [95, 77, 56, 17];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Endometrial (Uterine) Cancer", stage, ageGroup: age,
      bestCase: { label: s <= 2 ? "Surgical cure with hysterectomy" : "Complete response to chemo-immunotherapy", pct: Math.min(pct + 10, 98), desc: s <= 2 ? "Stage 1 endometrial cancer treated with hysterectomy + bilateral salpingo-oophorectomy is curable in ~95% of cases. Most are low-grade endometrioid — an excellent prognosis." : "MMR-deficient (MSI-H) Stage 3–4 tumors respond dramatically to pembrolizumab — with some complete responses." },
      typicalCase: { label: s <= 2 ? "Robotic hysterectomy ± brachytherapy" : "Carboplatin/paclitaxel ± pembrolizumab", pct, desc: s <= 2 ? "Minimally invasive (robotic or laparoscopic) hysterectomy + BSO + pelvic lymph node dissection. Vaginal brachytherapy for high-intermediate risk Stage 1." : "Carboplatin + paclitaxel x6 cycles. Pembrolizumab added for MMR-deficient/MSI-H tumors (KEYNOTE-158, DUO-E). Lenvatinib + pembrolizumab for MMR-proficient Stage 4." },
      worstCase: { label: "Recurrent or metastatic disease", pct: 100 - pct, desc: "High-grade histologies (serous, clear cell, carcinosarcoma) have poorer outcomes. Stage 3C (lymph node positive) requires full systemic therapy. Pelvic recurrence may be treated with chemoradiation." },
      treatmentOverview: [
        "**Surgery**: Minimally invasive hysterectomy + BSO + sentinel lymph node mapping — standard for all stages if operable",
        "**Brachytherapy**: Vaginal cuff brachytherapy for high-intermediate risk Stage 1",
        "**External beam radiation**: For Stage 3 disease with lymph node involvement",
        "**Chemotherapy**: Carboplatin + paclitaxel for Stage 3–4 or high-grade histology",
        "**Pembrolizumab**: For MMR-deficient (MSI-H) endometrial cancer — excellent response",
        "**Lenvatinib + pembrolizumab**: For MMR-proficient Stage 4 (KEYNOTE-775) — significant OS benefit",
        "**Hormone therapy**: Progestins for low-grade recurrent disease (fertility-sparing in select cases)",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **${pct}%**`,
        "MMR deficiency / MSI-H (25–30% of endometrial cancers): excellent response to pembrolizumab",
        "Lenvatinib + pembrolizumab: improves OS regardless of MMR status for advanced disease",
        "Most common gynecologic cancer in developed countries — usually detected early due to bleeding",
        "Lynch syndrome: MMR gene mutation — colonoscopy surveillance critical",
      ],
      hopefulNote: s <= 2 ? "Stage 1 endometrial cancer is one of the most curable gynecologic cancers. Most patients are cured with minimally invasive surgery and return to normal life within weeks." : "Endometrial cancer treatment has been transformed by immunotherapy. Pembrolizumab for MSI-H disease and lenvatinib + pembrolizumab for advanced disease have dramatically improved options.",
      timeToTreatment: "Surgery typically within 2–4 weeks. MMR/MSI testing and molecular profiling important before systemic therapy decisions.",
      waitingTips: ["MMR/MSI testing on biopsy — guides treatment planning", "POLE mutation testing — ultra-mutated tumors have excellent prognosis", "Lynch syndrome testing if MMR-deficient — family counseling essential", "Discuss sentinel lymph node biopsy technique with surgical team"],
    };
  }

  // ===== AML =====
  if (type === "aml") {
    const isSenior = age === "senior";
    return {
      cancerType: "Acute Myeloid Leukemia (AML)", stage: stage || "Newly Diagnosed", ageGroup: age,
      bestCase: { label: "Complete remission and long-term cure", pct: isSenior ? 30 : 55, desc: isSenior ? "Fit older patients treated with venetoclax + azacitidine achieve complete remission in ~65% of cases. Molecular remission is achievable." : "Young/fit patients with favorable cytogenetics (inv(16), t(8;21), NPM1-mutated without FLT3-ITD) achieve CR in 70–80%, with long-term cure rates of 50–60%." },
      typicalCase: { label: "Complete remission with induction chemotherapy", pct: isSenior ? 20 : 40, desc: isSenior ? "Venetoclax + azacitidine for unfit older patients — CR/CRi ~65%, manageable toxicity. Median OS ~15 months." : "7+3 induction (cytarabine + daunorubicin/idarubicin). CR achieved in ~70–80% of younger patients. Consolidation with high-dose cytarabine or allo-SCT for high-risk." },
      worstCase: { label: "Refractory disease or relapse", pct: isSenior ? 60 : 40, desc: "AML relapse requires salvage chemotherapy (MEC, FLAG-IDA) followed by allogeneic stem cell transplant for eligible patients. FLT3-ITD mutation, complex karyotype, and secondary AML carry worse prognosis." },
      treatmentOverview: [
        "**Cytogenetic/molecular testing**: Essential before treatment — determines risk category and targeted options",
        "**Induction (fit patients)**: 7+3 (cytarabine + anthracycline) — 7 days cytarabine + 3 days daunorubicin",
        "**Targeted additions**: Midostaurin (FLT3-mutated), Gemtuzumab (CD33+, favorable cytogenetics)",
        "**Consolidation**: High-dose cytarabine x3–4 cycles or allogeneic stem cell transplant for high-risk",
        "**Older/unfit patients**: Venetoclax + azacitidine (VIALE-A trial) — dramatically improved outcomes",
        "**IDH1/IDH2 mutations**: Ivosidenib (IDH1), enasidenib (IDH2) — targeted oral agents",
        "**Relapsed/refractory**: Salvage chemo + allo-SCT for eligible; gilteritinib for FLT3+ relapse",
      ],
      keyFacts: [
        `5-year survival (younger adults): **35–50%** (varies by molecular subtype)`,
        "NPM1 mutation without FLT3-ITD: favorable — may not need transplant in CR1",
        "FLT3-ITD: higher relapse risk — midostaurin added to induction, transplant often recommended",
        "Venetoclax + azacitidine: transformed treatment for older adults (VIALE-A trial)",
        "IDH1/IDH2 mutations (~20%): targeted oral agents available",
      ],
      hopefulNote: "AML treatment has been transformed by molecular testing and targeted therapy. Venetoclax-based regimens for older patients and targeted agents for FLT3, IDH1/IDH2, and NPM1 mutations have meaningfully improved outcomes across age groups. High-risk patients achieving remission should discuss stem cell transplant.",
      timeToTreatment: "Treatment starts within days to 1 week of diagnosis. Rapid molecular testing (48–72 hours) needed to guide treatment.",
      waitingTips: ["Cytogenetic (karyotype) and molecular panel (FLT3, NPM1, IDH1/2, CEBPA) testing is urgent and happens at diagnosis", "HLA typing for potential stem cell transplant — can be done at diagnosis", "Fertility preservation if applicable — discuss before starting induction chemotherapy", "Ask about FLT3 inhibitor (midostaurin) addition to induction if FLT3-mutated"],
    };
  }

  // ===== CML =====
  if (type === "cml") {
    return {
      cancerType: "Chronic Myeloid Leukemia (CML)", stage: stage || "Chronic Phase", ageGroup: age,
      bestCase: { label: "Deep molecular remission (DMR) — treatment-free", pct: 90, desc: "Most CML patients in chronic phase achieve complete cytogenetic response (CCyR) and then deep molecular response (DMR/MR4.5) with modern TKIs (imatinib, dasatinib, nilotinib). 40–60% of patients achieving sustained DMR can successfully stop TKI ('treatment-free remission')." },
      typicalCase: { label: "Major molecular response (MMR) on TKI therapy", pct: 85, desc: "Oral BCR-ABL tyrosine kinase inhibitor (imatinib, dasatinib, or nilotinib) taken daily. Responses monitored by PCR. Most patients achieve MMR within 12–18 months and continue therapy long-term — or stop if sustained deep remission." },
      worstCase: { label: "Resistance or progression to accelerated/blast phase", pct: 10, desc: "~15–20% of patients develop resistance or intolerance to first-line TKI. Second/third-line TKIs (ponatinib, bosutinib) available. T315I mutation requires ponatinib or asciminib. Blast crisis is rare with appropriate treatment but resembles acute leukemia." },
      treatmentOverview: [
        "**First-line TKI**: Imatinib (Gleevec) 400mg/day OR dasatinib 100mg/day OR nilotinib 300mg BD — all highly effective",
        "**Second-line TKIs**: Dasatinib, nilotinib, bosutinib — for imatinib failure",
        "**Ponatinib or asciminib**: For T315I mutation or multiple TKI failures",
        "**PCR monitoring**: BCR-ABL1 transcript levels every 3 months — guides response and treatment adjustment",
        "**Treatment-free remission (TFR)**: Can attempt TKI discontinuation after ≥2 years of sustained MR4.5",
        "**Blast crisis**: Treated as acute leukemia + TKI; allo-SCT if remission achieved",
      ],
      keyFacts: [
        "CML in chronic phase: **life expectancy now equivalent to general population** with TKI therapy",
        "BCR-ABL (Philadelphia chromosome t(9;22)): the driver mutation — highly targetable",
        "Imatinib introduced 2001 — transformed CML from fatal to manageable chronic disease",
        "40–60% of patients in sustained DMR can stop TKI — treatment-free remission is a real goal",
        "Asciminib (STAMP inhibitor): new mechanism — effective for resistant/intolerant cases",
      ],
      hopefulNote: "CML is one of oncology's greatest success stories. Imatinib and subsequent TKIs have transformed it from a fatal leukemia into a manageable chronic condition. Most patients in chronic phase achieve excellent responses, live normal lifespans, and many can eventually stop medication. This is genuinely excellent news.",
      timeToTreatment: "TKI starts within 1–2 weeks of confirmed BCR-ABL diagnosis. Rapid relief of symptoms once TKI started.",
      waitingTips: ["BCR-ABL quantitative PCR and cytogenetics at diagnosis — baseline for monitoring", "Discuss which TKI is best for you — imatinib vs dasatinib vs nilotinib based on comorbidities and goals", "Ask about treatment-free remission (TFR) goal from the start", "Fertility counseling — imatinib is not recommended in pregnancy; dasatinib is teratogenic"],
    };
  }

  // ===== NHL (Non-Hodgkin's Lymphoma) =====
  if (type === "nhl") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const isAggressive = true; // DLBCL most common
    return {
      cancerType: "Non-Hodgkin's Lymphoma (NHL)", stage, ageGroup: age,
      bestCase: { label: "Complete remission — potentially cured", pct: s <= 2 ? 75 : 55, desc: s <= 2 ? "Early-stage aggressive NHL (DLBCL) treated with R-CHOP x3–4 cycles + radiation achieves cure in ~75% of cases. Indolent lymphomas (follicular) may never require treatment." : "R-CHOP x6–8 cycles achieves CR in ~60–70% of Stage 3–4 DLBCL. Event-free at 2 years is a major milestone — correlates strongly with cure." },
      typicalCase: { label: "R-CHOP chemotherapy → complete remission", pct: s <= 2 ? 65 : 50, desc: "Rituximab + CHOP (cyclophosphamide, doxorubicin, vincristine, prednisone) — standard backbone for B-cell NHL. Anti-CD20 therapy (rituximab) added in 2000 dramatically improved DLBCL outcomes. Polatuzumab-R-CHP (pola-R-CHP) now standard for high-risk DLBCL." },
      worstCase: { label: "Refractory or relapsed NHL", pct: s <= 2 ? 25 : 40, desc: "Relapsed/refractory DLBCL: salvage chemotherapy (R-ICE, R-DHAP) + autologous stem cell transplant. CAR-T cell therapy (axicabtagene, tisagenlecleucel, lisocabtagene) — transformative results for relapsed DLBCL. Indolent NHL may transform to aggressive histology (Richter transformation)." },
      treatmentOverview: [
        "**DLBCL (most common)**: Pola-R-CHP x6 cycles (polatuzumab + rituximab + CHP) — improved EFS vs R-CHOP",
        "**Stage 1–2 DLBCL**: R-CHOP x3–4 cycles + involved-site radiation — highly curative",
        "**Follicular lymphoma**: Often watch-and-wait for low-burden disease; R-CHOP or BR for high-burden",
        "**Mantle cell lymphoma**: R-CHOP + rituximab maintenance; BTK inhibitors (ibrutinib) for relapse",
        "**CNS prophylaxis**: Intrathecal MTX or CNS-directed therapy for high-risk DLBCL",
        "**CAR-T cell therapy**: Axicabtagene, tisagenlecleucel — standard second-line for relapsed DLBCL in eligible patients",
        "**BTK inhibitors**: Ibrutinib, zanubrutinib — for mantle cell, CLL/SLL, marginal zone lymphoma",
      ],
      keyFacts: [
        `5-year survival DLBCL Stage ${s}: **~${s <= 2 ? 75 : 55}%** (improving with CAR-T for relapse)`,
        "2-year event-free survival (EFS) is a strong predictor of cure in DLBCL",
        "CD20+ B-cell NHL: rituximab dramatically improved outcomes from 2000 onward",
        "CAR-T cell therapy: 40% of relapsed/refractory DLBCL achieve durable complete remission",
        "Follicular lymphoma: indolent — median survival 12–15 years with modern treatment",
      ],
      hopefulNote: s <= 2 ? "Early-stage aggressive NHL is highly curable with modern chemo-immunotherapy. Many patients achieve durable complete remission." : "Advanced NHL has been transformed by rituximab, polatuzumab, and CAR-T cell therapy. Even relapsed/refractory DLBCL now has curative options with CAR-T.",
      timeToTreatment: "Biopsy for immunophenotyping/molecular typing needed before treatment. Aggressive histologies (DLBCL): treatment starts within 1–2 weeks. Indolent: may observe.",
      waitingTips: ["Biopsy adequate tissue for full immunophenotyping (CD20, BCL2, BCL6, MYC, Ki-67)", "PET-CT for staging is essential before treatment", "Double-hit lymphoma (BCL2+MYC rearrangement): needs more aggressive induction — ask specifically", "Hepatitis B testing — rituximab can reactivate HBV; antiviral prophylaxis needed if positive"],
    };
  }

  // ===== BRAIN TUMOR =====
  if (type === "brain") {
    const grade = parseInt(stage.replace(/\D/g, "")) || 2;
    const isGBM = grade === 4;
    const pcts = [90, 75, 35, 15];
    const pct = pcts[Math.min(grade - 1, 3)];
    return {
      cancerType: "Brain Tumor / Glioma", stage: stage || `Grade ${grade}`, ageGroup: age,
      bestCase: { label: isGBM ? "Extended survival with temozolomide + tumor-treating fields" : "Long-term remission with surgery ± radiation", pct: Math.min(pct + 15, 95), desc: isGBM ? "GBM with MGMT promoter methylation (~45%): median OS 22–24 months with temozolomide + radiation, with a subset achieving 5+ year survival. MGMT methylation is the strongest positive prognostic factor." : "IDH-mutant Grade 2–3 gliomas have 10+ year median survival with surgery, radiation, and PCV or temozolomide chemotherapy. Some patients remain disease-free for decades." },
      typicalCase: { label: isGBM ? "Surgery + chemoradiation + maintenance temozolomide" : "Maximal safe resection + radiation ± chemo", pct, desc: isGBM ? "Maximal safe resection → concurrent temozolomide + radiation (Stupp protocol) → 6 months adjuvant temozolomide + tumor-treating fields (Optune device). Median OS 16–22 months." : "IDH-mutant Grade 2: surgery + radiation + 12 cycles temozolomide (or PCV). IDH-mutant Grade 3: more aggressive approach. Regular MRI every 3–6 months." },
      worstCase: { label: "Early recurrence or progression", pct: 100 - pct, desc: isGBM ? "GBM almost universally recurs. Second-line options: bevacizumab (reduces edema/improves QoL), lomustine, re-irradiation. Clinical trials are important at recurrence." : "IDH-mutant gliomas may transform to higher grade at recurrence. Secondary GBM from IDH-mutant Grade 2–3 has better outcomes than primary GBM." },
      treatmentOverview: [
        isGBM
          ? "**Surgery**: Maximal safe resection — improve QoL, reduce mass effect, confirm diagnosis"
          : "**Surgery**: Maximal safe resection — larger extent of resection → better outcomes",
        isGBM
          ? "**Stupp protocol**: Concurrent temozolomide + radiation (60 Gy/30 fractions) → 6 months adjuvant temozolomide"
          : "**Radiation**: 54–59.4 Gy for Grade 3; sometimes deferred for Grade 2 IDH-mutant",
        "**Tumor-treating fields (Optune)**: Wearable device — improves OS in GBM when added to temozolomide",
        "**IDH1 inhibitor (ivosidenib)**: For IDH1-mutant gliomas — vorasidenib (IDH1/2) approved 2023",
        "**MGMT methylation testing**: Most important GBM biomarker — guides temozolomide benefit",
        "**Bevacizumab**: For recurrent GBM — reduces edema, improves symptoms",
        "**Clinical trials**: Immunotherapy, CAR-T, oncolytic viruses — active research",
      ],
      keyFacts: [
        isGBM
          ? "GBM 5-year survival: **~10%** overall; **~20–25%** with MGMT methylation"
          : `Grade ${grade} IDH-mutant glioma: median survival **${grade === 2 ? "12–15 years" : "5–7 years"}**`,
        "IDH mutation (Grade 2–3 gliomas): strongest positive prognostic factor",
        "MGMT methylation: predicts temozolomide benefit in GBM — test at diagnosis",
        "Tumor-treating fields: portable device worn on scalp — improves GBM OS (EF-14 trial)",
        "Vorasidenib: first IDH-targeted therapy approved specifically for low-grade glioma (2023)",
      ],
      hopefulNote: isGBM ? "GBM is the hardest brain tumor to treat — honesty matters here. But outcomes are improving: MGMT-methylated GBM has a subset of long-term survivors, and tumor-treating fields have extended median survival. Clinical trials are actively testing immunotherapy and targeted approaches." : "IDH-mutant Grade 2–3 gliomas are slow-growing cancers where many patients live 10–15+ years with treatment. Vorasidenib (2023) offers the first targeted oral therapy. Modern surgery and radiation preserve function while controlling disease.",
      timeToTreatment: "Surgery often within 1–2 weeks. Post-op pathology including IDH, MGMT, and 1p/19q takes 2–3 weeks. Treatment planning follows.",
      waitingTips: ["IDH1/2 mutation, MGMT methylation, 1p/19q codeletion, TERT promoter testing — critical molecular profiling", "Dexamethasone for brain swelling — discuss dose tapering plan", "Ask about awake craniotomy if tumor near speech/motor areas — preserves function", "Tumor-treating fields (Optune) — discuss eligibility before finishing radiation"],
    };
  }

  // ===== NEUROBLASTOMA =====
  if (type === "neuroblastoma") {
    const isPediatric = age === "child" || age === "teen";
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const isHighRisk = s >= 4;
    return {
      cancerType: "Neuroblastoma", stage, ageGroup: age,
      bestCase: { label: isHighRisk ? "Complete response to intensive multimodal therapy" : "Surgical cure — observation only", pct: isHighRisk ? 50 : 95, desc: isHighRisk ? "High-risk neuroblastoma treated with induction chemo + surgery + tandem ASCT + dinutuximab + isotretinoin: ~50% long-term EFS in recent COG trials. MYCN amplification worsens prognosis but patients can still be cured." : "Low-risk (Stage 1–2A/B without MYCN amplification): surgery alone is curative in >95% of cases. Stage 4S infants often undergo spontaneous regression." },
      typicalCase: { label: isHighRisk ? "Induction chemo → surgery → ASCT → immunotherapy" : "Surgery ± observation", pct: isHighRisk ? 40 : 90, desc: isHighRisk ? "COG ANBL1232/1801 protocol: 6 cycles induction (carboplatin, cyclophosphamide, etoposide, doxorubicin) → surgery → tandem ASCT → radiation → dinutuximab + GM-CSF + IL-2 + isotretinoin maintenance." : "Low-risk: surgical resection. Intermediate-risk (Stage 3 without MYCN): 4–8 cycles carboplatin/cyclophosphamide/doxorubicin/etoposide then reassess." },
      worstCase: { label: "Refractory or relapsed high-risk disease", pct: isHighRisk ? 50 : 5, desc: "High-risk neuroblastoma relapse has poor prognosis. Options: naxitamab (anti-GD2), DFMO (eflornithine), lorlatinib for ALK-mutated, MIBG therapy. Clinical trials essential. Humanized anti-GD2 antibodies are showing promise." },
      treatmentOverview: [
        "**Low-risk**: Surgery alone — watch and wait for Stage 4S (may spontaneously regress)",
        "**Intermediate-risk**: 4–8 cycles moderate chemotherapy + surgery",
        "**High-risk induction**: 6 cycles intensive chemotherapy (COG ANBL protocol)",
        "**Surgery**: Resection of primary tumor after induction",
        "**Tandem ASCT**: Two autologous stem cell transplants — improves survival vs single",
        "**Radiation**: To primary tumor bed and MIBG-avid sites",
        "**Dinutuximab (anti-GD2)**: Immunotherapy maintenance — FDA approved, improves EFS by 20%",
        "**Isotretinoin (13-cis-retinoic acid)**: 6 months differentiation therapy post-transplant",
      ],
      keyFacts: [
        `High-risk neuroblastoma 5-year EFS: **~45–50%** with modern protocol`,
        "MYCN amplification: high-risk feature regardless of stage",
        "Stage 4S infants <18 months: often spontaneously regress — watch and wait",
        "Dinutuximab (anti-GD2) immunotherapy: FDA approved — improved EFS in high-risk (COG trial)",
        "ALK mutation (~10%): targetable with crizotinib/lorlatinib — clinical trials",
      ],
      hopefulNote: isHighRisk ? "High-risk neuroblastoma is one of the most challenging childhood cancers, but outcomes have genuinely improved. Tandem transplant protocols and dinutuximab immunotherapy have improved 5-year survival to ~50% in recent trials. Clinical trials are actively advancing new targeted and immunotherapy approaches." : "Low-risk neuroblastoma is highly curable with surgery, and Stage 4S infants often spontaneously regress — a remarkable biological feature unique to this cancer.",
      timeToTreatment: "High-risk disease: chemotherapy starts within 1–2 weeks. Staging includes MIBG scan, bone marrow biopsy, MYCN amplification testing.",
      waitingTips: ["MYCN amplification testing — most critical risk-stratification factor", "MIBG (iobenguane) scan for staging — different from standard PET", "Bilateral bone marrow biopsies for staging", "Consider enrollment in COG ANBL clinical trials — best outcomes at specialist centers"],
    };
  }

  // ===== OSTEOSARCOMA =====
  if (type === "osteosarcoma") {
    const s = parseInt(stage.replace(/\D/g, "")) || 2;
    const hasMetastases = s >= 4 || stage.includes("4");
    return {
      cancerType: "Osteosarcoma", stage, ageGroup: age,
      bestCase: { label: "Limb-salvage surgery + cure with neoadjuvant chemo", pct: hasMetastases ? 25 : 70, desc: hasMetastases ? "~20–30% of metastatic osteosarcoma patients are long-term survivors if metastases are resectable. Complete surgical resection of all disease is the key factor." : "Good histological response to neoadjuvant chemotherapy (≥90% necrosis): 5-year survival ~70–80%. Limb-salvage surgery preserves function in ~85% of patients." },
      typicalCase: { label: "MAP chemotherapy + limb-salvage surgery", pct: hasMetastases ? 20 : 60, desc: hasMetastases ? "Metastatic OS: 3-year EFS ~20–30%. Surgical resection of all metastatic sites (typically lung) + chemotherapy. Gemcitabine + docetaxel, sorafenib active as second-line." : "MAP protocol: methotrexate + doxorubicin + cisplatin (10 weeks neoadjuvant) → surgery → 18 weeks adjuvant MAP. Histological response assessed at surgery." },
      worstCase: { label: "Poor chemo response or unresectable disease", pct: hasMetastases ? 75 : 35, desc: "Poor responders (<90% necrosis) to neoadjuvant chemo have worse outcomes but still treated with full protocol. Relapsed osteosarcoma: median survival 6–12 months. Samarium-153, sorafenib, regorafenib, mifamurtide — active second-line options." },
      treatmentOverview: [
        "**Neoadjuvant MAP chemotherapy**: 10 weeks before surgery (methotrexate + doxorubicin + cisplatin)",
        "**Limb-salvage surgery**: Resection + endoprosthetic reconstruction — preserves function in ~85%",
        "**Amputation**: Only if limb-salvage not feasible — equivalent survival, but different functional outcome",
        "**Histological response**: ≥90% necrosis = good responder; guides adjuvant treatment discussion",
        "**Adjuvant MAP**: 18 further weeks post-surgery",
        "**Mifamurtide (MTP-PE)**: Immunomodulator — approved in Europe, some evidence for improved OS",
        "**Metastatic**: Surgical resection of lung mets + chemotherapy; gemcitabine/docetaxel for relapse",
      ],
      keyFacts: [
        `Localized osteosarcoma 5-year survival: **~65–70%**`,
        "Metastatic at diagnosis (~20%): 5-year survival ~20–30%",
        "Histological response to neoadjuvant chemo is the strongest prognostic factor",
        "Limb-salvage surgery achieves equivalent survival to amputation — preferred when feasible",
        "Peak incidence: teenagers during growth spurt — most common primary bone tumor in children/teens",
      ],
      hopefulNote: "Localized osteosarcoma treated at specialist centers with MAP chemotherapy and limb-salvage surgery achieves long-term cure in ~65–70% of patients. Most patients keep their limb and return to active lives. For the remaining patients, modern salvage approaches and clinical trials continue to advance outcomes.",
      timeToTreatment: "Biopsy should be done at treating center — improper biopsy compromises surgery. Neoadjuvant chemo starts within 2 weeks of diagnosis.",
      waitingTips: ["Biopsy MUST be done at the treating orthopedic oncology center — tunnel biopsy by specialist is critical", "Staging CT chest for lung metastases before treatment", "Bone scan or PET for skip lesions and distant bone involvement", "Hearing assessment before cisplatin — ototoxicity monitoring throughout treatment"],
    };
  }

  // ===== RHABDOMYOSARCOMA =====
  if (type === "rhabdomyosarcoma") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    return {
      cancerType: "Rhabdomyosarcoma (RMS)", stage, ageGroup: age,
      bestCase: { label: "Surgical cure ± chemotherapy (low-risk)", pct: s <= 2 ? 85 : 50, desc: s <= 2 ? "Low-risk RMS (embryonal histology, Stage 1–2, completely resected): 5-year OS >85% with VAC chemotherapy ± radiation. Orbital RMS has excellent outcomes with chemotherapy alone." : "Intermediate-risk RMS: 5-year OS ~65–75%. Complete resection + VAC or VI chemotherapy. Favorable sites (orbit, head/neck non-parameningeal): better outcomes." },
      typicalCase: { label: "VAC chemotherapy + surgery ± radiation", pct: s <= 2 ? 75 : 45, desc: "Vincristine + actinomycin-D + cyclophosphamide (VAC) — backbone chemotherapy. Surgery to achieve R0 resection when possible. Radiation for incompletely resected or high-risk disease. Total therapy duration 9–12 months." },
      worstCase: { label: "Metastatic or alveolar histology with PAX-FOXO1 fusion", pct: s >= 4 ? 70 : 20, desc: "Metastatic RMS: 5-year OS ~20–30%. PAX-FOXO1 fusion-positive alveolar RMS: aggressive — requires intensified treatment. Relapsed RMS has poor prognosis — clinical trials essential." },
      treatmentOverview: [
        "**Risk stratification**: Low / intermediate / high-risk based on stage, histology, site, resection status",
        "**VAC chemotherapy**: Vincristine + actinomycin-D + cyclophosphamide — standard backbone (COG protocols)",
        "**Surgery**: R0 resection if feasible without major functional loss",
        "**Radiation**: For intermediate/high-risk, unresected, or Group III disease",
        "**Orbital RMS**: Chemotherapy + radiation — surgery avoided to preserve eye",
        "**Alveolar histology**: More aggressive — check PAX-FOXO1 fusion status",
        "**High-risk / relapsed**: Irinotecan + temozolomide, vinorelbine, clinical trials",
      ],
      keyFacts: [
        `Low-risk embryonal RMS 5-year OS: **>85%**`,
        "Alveolar histology with PAX-FOXO1 fusion: higher risk — intensified treatment",
        "Orbital location: excellent prognosis — chemotherapy + radiation preserves vision",
        "Parameningeal sites (nasopharynx, middle ear): needs cranial radiation due to meningeal risk",
        "Embryonal histology: better prognosis than alveolar",
      ],
      hopefulNote: "Low-risk rhabdomyosarcoma, especially embryonal histology, has excellent outcomes with modern chemotherapy protocols. Many children are cured and return to normal lives. Even intermediate-risk disease achieves good outcomes at specialist pediatric oncology centers.",
      timeToTreatment: "Biopsy for histology and fusion testing before treatment. Chemotherapy typically starts within 2 weeks.",
      waitingTips: ["Histological subtype (embryonal vs alveolar) and PAX-FOXO1 fusion testing critical before treatment", "Consider enrollment in COG ARST clinical trials", "Fertility preservation discussion before chemotherapy", "MRI for local staging — CT chest for pulmonary metastases"],
    };
  }

  // ===== BLADDER CANCER =====
  if (type === "bladder") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const pcts = [96, 47, 36, 5];
    const pct = pcts[Math.min(s - 1, 3)];
    return {
      cancerType: "Bladder Cancer", stage, ageGroup: age,
      bestCase: { label: s <= 2 ? "TURBT + BCG → durable remission" : "Radical cystectomy → cure", pct: Math.min(pct + 10, 98), desc: s <= 2 ? "Non-muscle-invasive bladder cancer (NMIBC): TURBT resection + intravesical BCG immunotherapy achieves durable remission in ~60–70% of high-risk cases." : "Muscle-invasive bladder cancer (MIBC): neoadjuvant cisplatin-based chemo + radical cystectomy achieves cure in 40–60%." },
      typicalCase: { label: s <= 2 ? "TURBT + intravesical BCG" : "Neoadjuvant chemo + cystectomy", pct, desc: s <= 2 ? "Transurethral resection (TURBT) to remove visible tumor + intravesical BCG instillations (6-week induction + maintenance). Regular cystoscopy surveillance." : "Neoadjuvant gemcitabine + cisplatin x3–4 cycles → radical cystectomy (robotic) + urinary diversion. Pembrolizumab maintenance for high-risk Stage 2 (IMvigor011 trial)." },
      worstCase: { label: "Recurrence requiring cystectomy (early) or metastatic disease (advanced)", pct: 100 - pct, desc: "NMIBC recurrence is common (~50–70%) — progression to MIBC in ~15–20% of high-grade cases. Metastatic urothelial: enfortumab vedotin + pembrolizumab (EV-302 trial) — significant OS benefit, now first-line standard." },
      treatmentOverview: [
        "**NMIBC (T1/Ta/Tis)**: TURBT + intravesical BCG (6-week induction + 1–3 year maintenance)",
        "**BCG-unresponsive NMIBC**: Pembrolizumab, nadofaragene (gene therapy), nogapendekin alfa",
        "**MIBC (T2+)**: Neoadjuvant cisplatin-based chemo + radical cystectomy",
        "**Bladder preservation**: Trimodal therapy (TURBT + chemoradiation) for select MIBC",
        "**Metastatic 1st-line**: Enfortumab vedotin + pembrolizumab (EV-302) — improved OS vs chemo",
        "**FGFR3 mutation (~15%)**: Erdafitinib targeted therapy for FGFR-altered urothelial cancer",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **~${pct}%**`,
        "Non-muscle-invasive bladder cancer: high recurrence but low progression with BCG",
        "Enfortumab vedotin + pembrolizumab: transformed metastatic urothelial cancer (EV-302 trial)",
        "FGFR3 mutation: targetable with erdafitinib — test at diagnosis of metastatic disease",
        "Bladder-preserving trimodal therapy: equivalent to cystectomy in selected patients",
      ],
      hopefulNote: s <= 2 ? "Non-muscle-invasive bladder cancer is highly manageable with TURBT and BCG. Most patients keep their bladder and with regular surveillance maintain excellent quality of life." : "Muscle-invasive bladder cancer outcomes have improved significantly. Neoadjuvant chemotherapy before surgery improves survival, and new immunotherapy combinations have transformed metastatic disease.",
      timeToTreatment: "TURBT typically within 2–4 weeks of diagnosis. BCG starts 3–4 weeks after TURBT. MIBC: neoadjuvant chemo starts 2–3 weeks after staging.",
      waitingTips: ["Pathology must specify T-stage, grade, and presence of LVI — request complete report", "CT urogram to look for upper tract urothelial tumors", "Cisplatin eligibility assessment (renal function, ECOG performance) before neoadjuvant chemo", "Ask about bladder-preservation trimodal therapy if cystectomy not acceptable"],
    };
  }

  // ===== KIDNEY (RENAL CELL) CANCER =====
  if (type === "kidney") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const pcts = [93, 74, 55, 13];
    const pct = pcts[Math.min(s - 1, 3)];
    return {
      cancerType: "Kidney (Renal Cell) Cancer", stage, ageGroup: age,
      bestCase: { label: s <= 2 ? "Surgical cure with partial nephrectomy" : "Durable complete response to immunotherapy", pct: Math.min(pct + 10, 99), desc: s <= 2 ? "Stage 1 RCC (<7cm): partial nephrectomy (kidney-sparing) is curative in >90% of patients. Active surveillance appropriate for small (<3cm) incidental tumors in elderly." : "Metastatic RCC with nivolumab + ipilimumab (CheckMate 214) or cabozantinib + nivolumab: ~10–15% complete responses, many durable for 5+ years." },
      typicalCase: { label: s <= 2 ? "Partial or radical nephrectomy" : "Combination immunotherapy (ipi/nivo or cabo/nivo)", pct, desc: s <= 2 ? "Robotic partial nephrectomy for T1–T2 tumors. No adjuvant therapy standard for Stage 1–2 (pembrolizumab adjuvant for high-risk Stage 2–3: KEYNOTE-564)." : "First-line: nivolumab + ipilimumab (CheckMate 214) for intermediate/poor risk; cabozantinib + nivolumab or axitinib + pembrolizumab for favorable risk. Regular CT restaging." },
      worstCase: { label: "Rapid progression or poor-risk features", pct: 100 - pct, desc: "Poor-risk metastatic RCC (Heng criteria) has median OS ~12–18 months with modern combinations. Non-clear cell RCC (papillary, chromophobe): less responsive — everolimus, cabozantinib, clinical trials." },
      treatmentOverview: [
        "**Stage 1 (≤7cm)**: Partial nephrectomy (kidney-sparing) — standard of care",
        "**Stage 2–3**: Radical or partial nephrectomy; adjuvant pembrolizumab for high-risk (KEYNOTE-564)",
        "**Metastatic clear cell**: Doublet immunotherapy — ipi/nivo (CheckMate 214) or PD-1 + VEGFR TKI",
        "**Cabozantinib + nivolumab**: Excellent across all IMDC risk groups (CheckMate 9ER)",
        "**Axitinib + pembrolizumab**: Strong option — KEYNOTE-426 trial",
        "**VHL mutation (clear cell)**: Belzutifan (HIF-2α inhibitor) for VHL disease-associated RCC",
        "**Second-line**: Cabozantinib, everolimus, or clinical trial",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **~${pct}%**`,
        "Clear cell RCC (~75%): responds well to immunotherapy combinations",
        "Complete responses with ipi/nivo in 10–15%: some are durable at 5+ years",
        "Adjuvant pembrolizumab: reduces recurrence risk in high-risk Stage 2–3 (KEYNOTE-564)",
        "VHL/HIF-2α pathway: belzutifan approved for VHL disease-associated RCC and beyond",
      ],
      hopefulNote: s <= 2 ? "Early-stage kidney cancer is highly curable with minimally invasive surgery. Most patients keep their kidney function and return to normal life." : "Metastatic kidney cancer outcomes have been transformed by combination immunotherapy. Durable complete responses — effectively cured — are seen in 10–15% of patients with ipi/nivo. Many others achieve years of disease control.",
      timeToTreatment: "Surgery for localized disease typically within 2–4 weeks. Systemic therapy for metastatic: starts within 2–4 weeks of staging.",
      waitingTips: ["IMDC risk score calculation guides choice between immunotherapy combinations", "Pathology confirmation of clear cell vs non-clear cell — guides treatment algorithm", "VHL mutation testing for potential belzutifan eligibility", "Ask about active surveillance for small (<3cm) incidental tumors in older patients"],
    };
  }

  // ===== LIVER (HCC) =====
  if (type === "liver") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [70, 50, 15, 5];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Liver Cancer (HCC)", stage, ageGroup: age,
      bestCase: { label: s <= 2 ? "Surgical resection or transplant — potential cure" : "Immunotherapy + anti-VEGF response", pct: Math.min(pct + 15, 80), desc: s <= 2 ? "Early HCC (BCLC Stage A): resection or liver transplantation (Milan criteria) is potentially curative. Ablation (RFA/MWA) for small tumors. Transplant: 5-year survival ~70–80%." : "Atezolizumab + bevacizumab (IMbrave150) achieves objective response in ~27% with improved OS vs sorafenib. Complete responses seen in a subset." },
      typicalCase: { label: s <= 2 ? "Resection / TACE / ablation" : "Atezolizumab + bevacizumab (IMbrave150)", pct, desc: s <= 2 ? "Surgical resection for single tumors with preserved liver function (Child-Pugh A). TACE (transarterial chemoembolization) for intermediate stage. RFA for lesions <3cm." : "First-line: atezolizumab 1200 mg + bevacizumab 15 mg/kg q3w (IMbrave150 — improved OS and PFS vs sorafenib). Sorafenib or lenvatinib as alternatives." },
      worstCase: { label: "Cirrhosis limiting treatment + progression", pct: 100 - pct, desc: "Underlying cirrhosis significantly limits treatment options. Child-Pugh B/C patients may not tolerate systemic therapy. Sorafenib provides modest benefit. Best supportive care including pain management and ascites control are important for advanced disease." },
      treatmentOverview: [
        "**BCLC staging**: A (early) → surgery/ablation; B (intermediate) → TACE; C (advanced) → systemic therapy",
        "**Surgery**: Hepatic resection for single lesion, preserved liver function — potential cure",
        "**Liver transplant**: Milan criteria (single ≤5cm or ≤3 lesions, none >3cm) — best long-term outcome",
        "**TACE**: Intermediate stage — doxorubicin-lipiodol or drug-eluting beads",
        "**Ablation (RFA/MWA)**: Lesions <3cm — equivalent to resection for BCLC 0–A",
        "**First-line systemic**: Atezolizumab + bevacizumab (IMbrave150) — superior to sorafenib",
        "**Second-line**: Ramucirumab (AFP >400), cabozantinib, regorafenib",
      ],
      keyFacts: [
        `5-year survival BCLC Stage ${s}: **~${pct}%** (highly dependent on liver function)`,
        "Liver cirrhosis is present in ~80% — limits resection and tolerance of systemic therapy",
        "Alpha-fetoprotein (AFP): tumor marker — guides surveillance and treatment monitoring",
        "HBV/HCV treatment reduces HCC risk: antiviral therapy essential",
        "Atezolizumab + bevacizumab (IMbrave150): improved OS vs sorafenib — new standard of care",
      ],
      hopefulNote: s <= 2 ? "Early liver cancer detected through surveillance (ultrasound + AFP every 6 months) is resectable and potentially curable. Liver transplantation within Milan criteria offers 70–80% 5-year survival." : "Advanced HCC treatment has improved significantly with immunotherapy combinations. Regular AFP and ultrasound surveillance in at-risk patients (cirrhosis, chronic hepatitis B) is the most important intervention.",
      timeToTreatment: "Urgent multidisciplinary team review. Resection or TACE typically within 3–4 weeks.",
      waitingTips: ["Child-Pugh scoring guides treatment eligibility — liver function is as important as tumor stage", "Hepatitis B/C treatment if active viral hepatitis — reduces further liver damage", "Portal vein thrombosis assessment before TACE — contraindication if severe", "AFP and triphasic CT/MRI surveillance every 6 months if cirrhosis diagnosed"],
    };
  }

  // ===== WILMS TUMOR =====
  if (type === "wilms") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [99, 98, 94, 86];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Wilms Tumor (Nephroblastoma)", stage, ageGroup: age,
      bestCase: { label: "Surgical cure — excellent long-term survival", pct, desc: "Wilms tumor has one of the best outcomes of any childhood cancer. Stage 1–2 treated with nephrectomy ± short chemotherapy achieves near-100% cure rates. Even Stage 4 (lung metastases) is cured in >85% of children." },
      typicalCase: { label: "Nephrectomy + EE-4A chemotherapy (COG protocol)", pct: Math.max(pct - 5, 80), desc: "Radical nephrectomy (or pre-operative chemo for bilateral disease) + actinomycin-D + vincristine (EE-4A) for favorable histology. Radiation added for Stage 3–4 and diffuse anaplasia." },
      worstCase: { label: "Relapsed or diffuse anaplastic histology", pct: s >= 4 ? 20 : 5, desc: "Diffuse anaplastic histology or relapsed Wilms has more challenging outcomes. Salvage with ICE or other regimens. Radiotherapy and transplant used in some protocols. Even relapsed favorable histology Wilms can be successfully re-treated." },
      treatmentOverview: [
        "**Surgery**: Radical nephrectomy (COG approach) — primary surgery first for most stages",
        "**EE-4A (Stage 1–2 FH)**: Actinomycin-D + vincristine × 18 weeks — minimal side effects",
        "**DD-4A (Stage 3–4 FH)**: Adds doxorubicin + abdominal radiation for Stage 3",
        "**Whole lung irradiation (WLI)**: For Stage 4 with lung metastases — still achieves high cure rates",
        "**Bilateral Wilms (Stage 5)**: Pre-operative chemo to preserve kidney function, nephron-sparing surgery",
        "**Diffuse anaplastic**: Intensified regimen (UH-1: vincristine, actinomycin, doxorubicin, cyclophosphamide, etoposide)",
        "**WT1/CTNNB1 testing**: Molecular markers guide risk stratification",
      ],
      keyFacts: [
        `4-year OS Wilms Stage ${s} favorable histology: **~${pct}%** (COG AREN protocols)`,
        "Wilms tumor: most common kidney tumor in children — peak age 3–4 years",
        "Bilateral Wilms (5–7%): requires nephron-sparing surgery — preserve both kidneys",
        "Lung metastases (Stage 4): whole lung irradiation achieves cure in >85%",
        "Late effects monitoring: remaining kidney function, anthracycline cardiac effects",
      ],
      hopefulNote: "Wilms tumor has one of the highest cure rates of any childhood cancer — even Stage 4 with lung spread is cured in the majority of children. The COG has refined protocols over decades to maximize cure while minimizing long-term side effects. This is genuinely excellent news for families facing this diagnosis.",
      timeToTreatment: "Surgery within 1 week in most cases. Preoperative chemotherapy for bilateral or unresectable disease.",
      waitingTips: ["CT chest for lung metastases before surgery", "Echocardiogram before doxorubicin-containing regimens", "Bilateral renal imaging to rule out bilateral Wilms before nephrectomy", "Enroll in COG AREN trials at a pediatric oncology center"],
    };
  }

  // ===== MEDULLOBLASTOMA =====
  if (type === "medulloblastoma") {
    const grade = parseInt(stage.replace(/\D/g, "")) || 2;
    const isHighRisk = stage.includes("4") || stage.includes("3") || stage.includes("Grade 4");
    return {
      cancerType: "Medulloblastoma", stage, ageGroup: age,
      bestCase: { label: "WNT subgroup — near-100% survival", pct: isHighRisk ? 60 : 85, desc: "WNT-activated medulloblastoma has the best prognosis with 5-year OS >95%. DNMB trials are de-escalating therapy in WNT patients to reduce late effects. Standard-risk medulloblastoma (no metastases) has 80–85% 5-year survival." },
      typicalCase: { label: "Craniospinal radiation + vincristine/cisplatin/CCNU", pct: isHighRisk ? 50 : 78, desc: "Maximal safe resection → craniospinal irradiation (CSI) 23.4–36 Gy → maintenance chemotherapy (vincristine, cisplatin, CCNU or cyclophosphamide). Molecular subgroup determines prognosis and future de-escalation trials." },
      worstCase: { label: "Group 3 metastatic or TP53-mutant", pct: isHighRisk ? 40 : 20, desc: "Group 3 medulloblastoma with metastases and large cell/anaplastic histology: 5-year OS ~40–50%. TP53-mutant WNT (rare): very poor prognosis. Salvage with high-dose chemo and stem cell transplant used in relapsed settings." },
      treatmentOverview: [
        "**Surgery**: Maximal safe resection — extent of resection correlates with outcome",
        "**Craniospinal irradiation (CSI)**: 23.4 Gy (standard-risk) or 36 Gy (high-risk) + posterior fossa boost",
        "**Chemotherapy**: Vincristine concurrent + maintenance CCNU/vincristine/cisplatin",
        "**Molecular subgroups**: WNT, SHH, Group 3, Group 4 — defines prognosis",
        "**WNT subgroup**: De-escalation trials underway — may need less radiation",
        "**SHH subgroup**: Vismodegib (hedgehog inhibitor) in trials for recurrent SHH-driven cases",
        "**Infants (<3 years)**: Intensive chemotherapy to delay/avoid craniospinal radiation",
      ],
      keyFacts: [
        `Medulloblastoma 5-year OS (standard risk): **~80–85%** (improving with molecular-guided therapy)`,
        "WNT subgroup: best prognosis — >95% OS in some trials",
        "Group 3 metastatic: most challenging — 5-year OS ~40–60%",
        "Late effects of craniospinal radiation: cognitive effects, growth hormone deficiency, hearing loss",
        "Most common malignant brain tumor in children — COG ACNS protocols",
      ],
      hopefulNote: "Medulloblastoma is the most common malignant brain tumor in children, and the majority are cured with surgery, radiation, and chemotherapy. The WNT subgroup — about 10% of cases — has near-100% survival. Molecular subgrouping now allows more precise risk-stratification and de-escalation of late-effect-causing treatments.",
      timeToTreatment: "Urgent surgery for raised intracranial pressure. Post-op MRI and molecular testing guides radiation/chemo planning.",
      waitingTips: ["Molecular subgrouping (WNT/SHH/Group 3/Group 4) — essential for prognosis and trial eligibility", "Craniospinal MRI post-surgery to assess metastases before radiation planning", "Endocrine assessment before and after craniospinal radiation", "Neuropsychological baseline before treatment — guides educational support"],
    };
  }

  // ===== EWING SARCOMA =====
  if (type === "ewing") {
    const s = parseInt(stage.replace(/\D/g, "")) || 2;
    const hasMetastases = s >= 4 || stage.includes("4");
    return {
      cancerType: "Ewing Sarcoma", stage, ageGroup: age,
      bestCase: { label: "Localized disease cure with VAC/IE", pct: hasMetastases ? 30 : 70, desc: hasMetastases ? "Metastatic Ewing with pulmonary-only metastases: ~30% long-term EFS. High-dose chemotherapy + stem cell transplant in some protocols. Complete surgical resection of all disease improves outcomes." : "Localized Ewing sarcoma: 5-year EFS ~70–75% with VAC/IE chemotherapy + surgery ± radiation. Pelvic location has worse outcomes than extremity tumors." },
      typicalCase: { label: "VAC/IE alternating chemotherapy + local treatment", pct: hasMetastases ? 20 : 60, desc: hasMetastases ? "EURO-EWING 99 high-risk protocol: intensive induction followed by high-dose busulfan/melphalan + stem cell transplant for metastatic disease." : "VAC (vincristine, actinomycin-D, cyclophosphamide) alternating with IE (ifosfamide, etoposide) × 14–17 cycles. Surgery for local control (preferred over radiation when feasible)." },
      worstCase: { label: "Multiple metastases or bone marrow involvement", pct: hasMetastases ? 75 : 30, desc: "Bone marrow or multi-site metastatic Ewing: 5-year EFS <20%. Relapsed Ewing: median survival 6–12 months. Gemcitabine + docetaxel, irinotecan + temozolomide active in relapse. Clinical trials essential." },
      treatmentOverview: [
        "**VAC/IE chemotherapy**: Alternating cycles — 10 weeks of induction before local treatment",
        "**Surgery**: Wide resection preferred over radiation when feasible — better local control",
        "**Radiation**: IMRT/SBRT for unresectable or pelvic primaries (54–55.8 Gy)",
        "**EURO-EWING high-risk**: High-dose busulfan/melphalan + ASCT for metastatic disease",
        "**Proton therapy**: Preferred over IMRT for pelvic/spinal primaries — reduces late effects",
        "**Genomic testing**: EWSR1 translocation (FISH) confirms diagnosis in >90%",
        "**Relapsed**: Irinotecan + temozolomide, gemcitabine/docetaxel, cabozantinib — clinical trials",
      ],
      keyFacts: [
        `Localized Ewing sarcoma 5-year EFS: **~68–72%** with VAC/IE`,
        "Metastatic at diagnosis (~25%): 5-year EFS ~20–30% for pulmonary mets",
        "EWSR1-FLI1 translocation: present in >85% — diagnostic hallmark",
        "Age <10: better prognosis than adolescents/young adults",
        "Pelvic primary: worse outcomes, higher local relapse — proton therapy preferred",
      ],
      hopefulNote: "Localized Ewing sarcoma is curable in ~70% of patients with intensive chemotherapy and surgery. Even the challenging pelvic location can be controlled with modern radiation techniques. For metastatic disease, intensive protocols including stem cell transplant are pursued aggressively — and a meaningful minority of patients achieve long-term cure.",
      timeToTreatment: "Biopsy before chemotherapy. Start chemotherapy within 1–2 weeks — local treatment after initial chemotherapy response.",
      waitingTips: ["EWSR1 FISH confirmation required before treatment — rules out other small round cell tumors", "MRI for local staging + CT chest for pulmonary metastases before treatment", "Bone marrow biopsy for staging in high-risk disease", "Enroll in EURO-EWING or COG AEWS trials if available"],
    };
  }

  // ===== MULTIPLE MYELOMA =====
  if (type === "myeloma") {
    const s = parseInt(stage.replace(/\D/g, "")) || 2;
    const isFit = age !== "senior";
    return {
      cancerType: "Multiple Myeloma", stage, ageGroup: age,
      bestCase: { label: isFit ? "Deep MRD-negative remission with ASCT + maintenance" : "VGPR/CR on VRd → long-term disease control", pct: s <= 2 ? 60 : 40, desc: isFit ? "Transplant-eligible patients: VRd induction → ASCT → lenalidomide maintenance (DETERMINATION trial). MRD-negative patients have 5-year PFS ~65%. Daratumumab quadruplet (Dara-VRd) improves MRD negativity further." : "Transplant-ineligible: VRd or daratumumab-Rd (MAIA trial). Daratumumab + Rd improved OS vs Rd alone — median OS >65 months. Very good partial response achievable in most patients." },
      typicalCase: { label: isFit ? "VRd induction → ASCT → lenalidomide maintenance" : "Daratumumab + lenalidomide + dexamethasone (MAIA)", pct: s <= 2 ? 50 : 30, desc: isFit ? "VRd × 4 cycles → high-dose melphalan + autologous stem cell transplant → lenalidomide 10 mg maintenance until progression. Median PFS ~66 months in DETERMINATION trial." : "Daratumumab-Rd until progression (MAIA trial). Bortezomib-based VRd also standard. Monthly zoledronic acid for bone protection." },
      worstCase: { label: "Early relapse or high-risk cytogenetics", pct: s >= 3 ? 60 : 30, desc: "High-risk myeloma: del(17p), t(4;14), t(14;16), gain(1q). ISS Stage 3 + high-risk FISH: median OS ~3 years. Relapsed disease: daratumumab, carfilzomib, elotuzumab, CAR-T (ide-cel, cilta-cel) — multiple lines of active therapy." },
      treatmentOverview: [
        "**Transplant-eligible**: VRd or Dara-VRd induction × 4 → ASCT → lenalidomide maintenance",
        "**Transplant-ineligible**: Daratumumab + Rd (MAIA) or VRd until progression",
        "**Bone protection**: Zoledronic acid q4w — prevents skeletal events",
        "**Autologous SCT**: High-dose melphalan + stem cell rescue — deepens and prolongs remission",
        "**Lenalidomide maintenance**: After ASCT — extends PFS significantly",
        "**Relapse (1st)**: Daratumumab-based or carfilzomib-based triplet",
        "**CAR-T**: Ide-cel (BCMA CAR-T) and cilta-cel — for later-line relapsed/refractory myeloma",
      ],
      keyFacts: [
        `Myeloma is not currently curable but is highly manageable — median OS with modern therapy: **5–10+ years**`,
        "ISS staging (I–III) + FISH cytogenetics determine risk — del(17p) is highest risk",
        "MRD negativity: strongest predictor of long-term remission",
        "Multiple effective lines of therapy at relapse — CAR-T now available for later-line",
        "Smoldering myeloma: active surveillance — no treatment until CRAB criteria met",
      ],
      hopefulNote: "Multiple myeloma is not curable in most patients, but it is one of oncology's most actively developing fields. Treatment has transformed from median survival 3 years to 8–10+ years with modern triplet induction, ASCT, and maintenance. Many patients live with good quality of life for a decade or more. CAR-T therapy and bispecific antibodies are now available at relapse.",
      timeToTreatment: "FISH cytogenetics and ISS staging guide initial treatment choice. Therapy starts within 2–4 weeks.",
      waitingTips: ["FISH cytogenetics on bone marrow biopsy — risk stratification is essential", "Baseline imaging: whole-body low-dose CT or PET-CT for lytic lesions", "Dental evaluation before bisphosphonates (osteonecrosis of jaw prevention)", "Discuss transplant eligibility and sperm/egg preservation before starting treatment"],
    };
  }

  // ===== TESTICULAR CANCER =====
  if (type === "testicular") {
    const s = parseInt(stage.replace(/\D/g, "")) || 1;
    const survivals = [99, 96, 80, 74];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Testicular Cancer", stage, ageGroup: age,
      bestCase: { label: "Surgical cure — one of the most curable cancers at any stage", pct, desc: s <= 2 ? "Stage 1–2 testicular cancer: orchidectomy alone or with 1–2 cycles adjuvant BEP cures >99% of patients. Active surveillance is safe for Stage 1 seminoma with relapse rate ~15–20%, all retreatable." : "Even Stage 3 non-seminoma GCT treated with BEP chemotherapy achieves cure in ~70–80%. Good-risk disease (IGCCCG): cure rate ~95%." },
      typicalCase: { label: s <= 2 ? "Orchidectomy + surveillance or adjuvant BEP" : "BEP × 3–4 cycles → RPLND if residual", pct: Math.max(pct - 5, 70), desc: s <= 2 ? "Radical orchidectomy + 5 years surveillance (Stage 1A seminoma) or single-cycle carboplatin adjuvant. Stage 2A seminoma: radiation or carboplatin. Marker normalization after orchidectomy is essential." : "BEP × 3 cycles (good risk) or 4 cycles (intermediate risk) per IGCCCG risk stratification. Post-BEP RPLND for residual mass >1cm in non-seminoma." },
      worstCase: { label: "Late relapse or poor-risk IGCCCG disease", pct: 100 - pct, desc: "Poor-risk IGCCCG (AFP >10,000, non-pulmonary visceral metastases): 5-year survival ~50%. Salvage: TIP (paclitaxel, ifosfamide, cisplatin) or high-dose VeIP + ASCT. Late relapse (>2 years): surgery first if resectable." },
      treatmentOverview: [
        "**Orchidectomy**: Radical orchidectomy via inguinal incision — first step for all stages",
        "**Stage 1 seminoma**: Active surveillance (preferred) or single carboplatin cycle or radiation",
        "**Stage 1 non-seminoma**: Surveillance (preferred for pT1) or BEP × 1–2 cycles",
        "**Stage 2A/B**: Radiation (seminoma) or BEP × 3 cycles (non-seminoma)",
        "**Stage 3 (good risk)**: BEP × 3 cycles — cure rate ~95% (IGCCCG)",
        "**RPLND**: Retroperitoneal lymph node dissection for residual mass post-chemo",
        "**Salvage**: TIP chemotherapy or high-dose VeIP + stem cell transplant",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **~${pct}%** — testicular cancer is one of the most curable solid tumors`,
        "Good-risk Stage 3 (IGCCCG): ~95% cure with BEP × 3 cycles",
        "Tumor markers: AFP, beta-hCG, LDH — essential for staging, monitoring, and follow-up",
        "Regular self-examination: most tumors found by self-exam, many at Stage 1",
        "Sperm banking before chemotherapy: essential for young men",
      ],
      hopefulNote: "Testicular cancer is one of oncology's great success stories — curable in ~95–99% of cases at Stage 1–2, and even Stage 3 good-risk disease achieves ~95% cure with chemotherapy. This is a cancer where the expected outcome is cure, not just control. Sperm banking before treatment preserves fertility for most patients.",
      timeToTreatment: "Orchidectomy within 1–2 weeks. Chemotherapy (if needed) starts 2–3 weeks after surgery once markers trend.",
      waitingTips: ["Sperm banking BEFORE chemotherapy — essential for young men", "Tumor markers (AFP, beta-hCG, LDH) at diagnosis and after orchidectomy — trend guides stage", "CT chest/abdomen/pelvis staging after orchidectomy", "Consider IGCCCG risk calculator before starting BEP — guides number of cycles"],
    };
  }

  // ===== HEAD & NECK CANCER =====
  if (type === "head_neck") {
    const s = parseInt(stage.replace(/\D/g, "")) || 2;
    const survivals = [90, 74, 55, 35];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Head & Neck Cancer", stage, ageGroup: age,
      bestCase: { label: "HPV-positive disease — excellent chemoradiation cure rates", pct: Math.min(pct + 10, 95), desc: s <= 2 ? "Early-stage head and neck SCC (T1–T2): surgery or radiotherapy alone achieves 5-year survival >85%. HPV-positive oropharyngeal cancer has far better outcomes than HPV-negative — chemoRT achieves 80–90% cure at Stage 3." : "HPV-positive oropharyngeal SCC: chemoradiation achieves CR in >80% with 5-year OS ~80%. De-escalation trials underway to reduce late effects in this excellent-prognosis group." },
      typicalCase: { label: s <= 2 ? "Surgery or RT alone" : "Cisplatin-based chemoradiation (70 Gy)", pct, desc: s <= 2 ? "Transoral robotic surgery (TORS) or radiotherapy alone for Stage 1–2 oropharyngeal cancer. Equivalently curative with different toxicity profiles." : "Concurrent cisplatin 100 mg/m² q3w (or weekly 40 mg/m²) + IMRT 70 Gy/35 fractions. PET-CT response assessment at 12 weeks. Neck dissection if residual nodes >3cm." },
      worstCase: { label: "HPV-negative, heavy smoker — higher recurrence risk", pct: 100 - pct, desc: "HPV-negative HNSCC in heavy smokers has worse prognosis. Laryngeal/hypopharyngeal cancers have lower survival than oropharyngeal. Platinum-refractory recurrent/metastatic HNSCC: pembrolizumab + chemotherapy improves OS (KEYNOTE-048)." },
      treatmentOverview: [
        "**HPV testing (p16)**: Essential in oropharyngeal SCC — transforms prognosis and guides trials",
        "**Early stage (T1–T2)**: Surgery (TORS) or radiation alone — equivalent outcomes",
        "**Locally advanced (T3–T4, N+)**: Concurrent cisplatin + IMRT (70 Gy) — standard of care",
        "**Cetuximab + RT**: Alternative to cisplatin for platinum-ineligible patients",
        "**Larynx preservation**: Chemoradiation for Stage 3 laryngeal cancer avoids laryngectomy",
        "**Metastatic / recurrent**: Pembrolizumab + platinum/5-FU (KEYNOTE-048); cetuximab + platinum",
        "**PD-L1 testing**: Guides first-line immunotherapy choice",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **~${pct}%** (HPV+ oropharyngeal significantly better)`,
        "HPV-positive oropharyngeal SCC: 5-year OS ~80–85% vs ~40–50% for HPV-negative",
        "Smoking cessation: dramatically reduces HNSCC risk and improves treatment response",
        "IMRT: reduces xerostomia and dysphagia vs older radiation techniques",
        "Pembrolizumab: improved OS for recurrent/metastatic HNSCC (KEYNOTE-048 trial)",
      ],
      hopefulNote: s <= 2 ? "Early head and neck cancer is highly curable with surgery or radiation. HPV-positive oropharyngeal cancer at any stage has significantly better outcomes than HPV-negative — and treatment can often be de-escalated." : "Locally advanced head and neck cancer treated with combined chemoradiation achieves cure in a substantial proportion of patients — especially HPV-positive disease. Swallowing and voice preservation are increasingly achievable with modern IMRT techniques.",
      timeToTreatment: "Panendoscopy and biopsy first. HPV testing. PET-CT staging. Treatment within 3–4 weeks.",
      waitingTips: ["HPV/p16 testing on biopsy — changes prognosis and de-escalation trial eligibility", "Dental assessment before radiation — tooth extractions post-radiation risk osteoradionecrosis", "Swallowing therapy before and during treatment prevents dysphagia", "PEG tube planning — many patients need nutritional support during chemoradiation"],
    };
  }

  // ===== ESOPHAGEAL CANCER =====
  if (type === "esophageal") {
    const s = parseInt(stage.replace(/\D/g, "")) || 2;
    const survivals = [50, 35, 20, 5];
    const pct = survivals[Math.min(s - 1, 3)];
    return {
      cancerType: "Esophageal Cancer", stage, ageGroup: age,
      bestCase: { label: "Complete pathological response to CROSS + surgery", pct: Math.min(pct + 15, 65), desc: s <= 2 ? "CROSS protocol (carboplatin/paclitaxel + 41.4 Gy) → Ivor Lewis esophagectomy: complete pathological response (~29%); 5-year survival CROSS trial ~47%. Complete pCR patients have significantly better survival." : "Definitive chemoradiation for unresectable Stage 3: complete clinical response achievable in ~40%. Nivolumab maintenance after chemoRT (ATTRACTION-3 data supports immunotherapy role)." },
      typicalCase: { label: s <= 2 ? "CROSS neoadjuvant chemoRT → esophagectomy" : "Cisplatin/5-FU + 50.4 Gy → surveillance", pct, desc: s <= 2 ? "Weekly carboplatin AUC2 + paclitaxel 50 mg/m² × 5 weeks concurrent with 41.4 Gy radiation → Ivor Lewis or transhiatal esophagectomy. Post-operative nivolumab for non-pCR (CheckMate 577)." : "Definitive chemoradiation (RTOG 85-01 regimen or modern IMRT equivalent) for T4b/unresectable. CheckMate 648: nivolumab + chemotherapy for metastatic SCC." },
      worstCase: { label: "R1/R2 resection or metastatic progression", pct: 100 - pct, desc: "Non-curative (R1/R2) resection or metastatic esophageal cancer: median OS ~12–15 months with chemotherapy + immunotherapy. FLOT may be used for GEJ (gastroesophageal junction) adenocarcinoma. HER2+ GEJ: trastuzumab added to chemo (ToGA trial)." },
      treatmentOverview: [
        "**CROSS protocol**: Weekly carboplatin + paclitaxel × 5 weeks + 41.4 Gy → surgery — standard for resectable",
        "**Ivor Lewis esophagectomy**: Gold standard for mid/lower esophageal cancer",
        "**Adjuvant nivolumab (CheckMate 577)**: For residual disease post-CROSS — improves DFS",
        "**Definitive chemoRT**: For inoperable or patient-choice larynx/esophagus preservation",
        "**HER2 testing**: ~20% of GEJ adenocarcinomas HER2+ — trastuzumab adds survival (ToGA)",
        "**First-line metastatic SCC**: Nivolumab + platinum/5-FU (CheckMate 648) — improved OS",
        "**First-line metastatic adenocarcinoma**: FLOT or FOLFOX ± trastuzumab/nivolumab",
      ],
      keyFacts: [
        `5-year survival Stage ${s}: **~${pct}%** (improving with CROSS + immunotherapy)`,
        "CROSS trial: neoadjuvant chemoRT improved 5-year OS from 34% to 47% vs surgery alone",
        "CheckMate 577: adjuvant nivolumab for residual disease doubles disease-free survival",
        "HER2+ GEJ adenocarcinoma (~20%): trastuzumab significantly improves survival",
        "Complete pathological response (pCR) to CROSS: strongly predicts long-term survival",
      ],
      hopefulNote: s <= 2 ? "Resectable esophageal cancer treated with the CROSS protocol — neoadjuvant chemoradiation before surgery — has significantly improved outcomes. Complete pathological response is seen in ~29% and these patients have excellent long-term survival." : "While advanced esophageal cancer is challenging, immunotherapy has transformed the metastatic treatment landscape. Nivolumab-based regimens improve survival, and maintaining swallowing function is a key quality-of-life goal throughout treatment.",
      timeToTreatment: "EUS for T-staging. HER2 testing. Nutritional optimization (often a stent or NJ tube). CROSS starts 2–3 weeks after work-up.",
      waitingTips: ["Endoscopic ultrasound (EUS) for accurate T-staging before CROSS", "Nutritional support — most patients are malnourished; NJ feeding tube or stent may be needed", "HER2 testing on biopsy — guides systemic therapy choice", "PFTs and cardiac assessment before major esophageal surgery"],
    };
  }

  // ===== MESOTHELIOMA =====
  if (type === "mesothelioma") {
    return {
      cancerType: "Mesothelioma (Pleural)", stage, ageGroup: age,
      bestCase: { label: "Early resectable disease + trimodal therapy", pct: 40, desc: "Early-stage epithelioid mesothelioma treated with pleurectomy/decortication + chemotherapy + radiation (trimodal) achieves median OS 25–30 months. Immunotherapy (nivolumab + ipilimumab) has improved first-line outcomes vs chemotherapy." },
      typicalCase: { label: "Nivolumab + ipilimumab (CheckMate 743 — first line)", pct: 25, desc: "CheckMate 743: nivolumab 360 mg q3w + ipilimumab 1 mg/kg q6w improved median OS vs pemetrexed/platinum (18.1 vs 14.1 months) — now standard first-line. Epithelioid histology benefits most. Pemetrexed + cisplatin/carboplatin if immunotherapy not suitable." },
      worstCase: { label: "Sarcomatoid histology or rapid progression", pct: 70, desc: "Sarcomatoid mesothelioma is rare but aggressive — median OS <1 year with any treatment. Advanced disease with peritoneal spread: supportive care + symptom control. Indwelling pleural catheter relieves breathlessness effectively." },
      treatmentOverview: [
        "**Pleurectomy/decortication (P/D)**: Lung-sparing surgery for early resectable disease",
        "**Extrapleural pneumonectomy (EPP)**: Radical resection — high morbidity, falling out of favor",
        "**First-line systemic**: Nivolumab + ipilimumab (CheckMate 743) — improved OS vs chemo",
        "**Chemotherapy**: Pemetrexed + cisplatin/carboplatin — previous standard, still used",
        "**Hemithoracic radiation**: Post-P/D for local control in selected patients",
        "**Indwelling pleural catheter (IPC)**: Drainage of symptomatic effusion — improves QoL",
        "**Genetic testing (BAP1, NF2)**: Germline BAP1 mutation found in ~15% — family counseling",
      ],
      keyFacts: [
        "Mesothelioma median OS with modern immunotherapy (CheckMate 743): **~18 months**",
        "Epithelioid histology: better prognosis than sarcomatoid or biphasic",
        "Asbestos exposure: cause in >80% — latency 20–50 years",
        "BAP1 germline mutation: ~15% of cases — hereditary risk, family genetic counseling",
        "Indwelling pleural catheter: effective palliative approach for effusion control",
      ],
      hopefulNote: "Mesothelioma is a difficult cancer, but the CheckMate 743 trial has provided the first significant survival improvement in two decades. Nivolumab + ipilimumab immunotherapy has replaced chemotherapy as the preferred first-line approach. Symptom control — particularly breathlessness from pleural effusion — is very achievable with indwelling catheters.",
      timeToTreatment: "VATS pleural biopsy for tissue diagnosis. Immunotherapy can start within 2–3 weeks of diagnosis.",
      waitingTips: ["Histological subtype (epithelioid vs sarcomatoid) critical — determines treatment and prognosis", "BAP1 germline testing — family may benefit from surveillance", "Indwelling pleural catheter early if effusion causing breathlessness", "Occupational history and asbestos documentation for compensation/benefit eligibility"],
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
