import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour

const BASE = "https://clinicaltrials.gov/api/v2/studies";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const condition = searchParams.get("condition") || "hodgkin lymphoma";
  const ageGroup = searchParams.get("ageGroup") || "child";
  const status = searchParams.get("status") || "RECRUITING";

  // Build age filter based on group
  const ageFilter =
    ageGroup === "child"
      ? "AREA[MaximumAge]RANGE[1 Year, 17 Years]"
      : ageGroup === "teen"
      ? "AREA[MaximumAge]RANGE[12 Years, 17 Years]"
      : ageGroup === "adult"
      ? "AREA[MinimumAge]RANGE[18 Years, 65 Years]"
      : "";

  const params = new URLSearchParams({
    "query.cond": condition,
    "filter.overallStatus": status,
    "fields":
      "NCTId,BriefTitle,OfficialTitle,OverallStatus,Phase,LeadSponsorName,BriefSummary,Condition,InterventionName,EligibilityCriteria,MinimumAge,MaximumAge,StartDate,PrimaryCompletionDate,LocationFacility,LocationCity,LocationCountry",
    "pageSize": "10",
    "sort": "LastUpdatePostDate:desc",
  });

  if (ageFilter) {
    params.append("query.patient", ageFilter);
  }

  try {
    const res = await fetch(`${BASE}?${params.toString()}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`ClinicalTrials API responded with ${res.status}`);
    }

    const data = await res.json();
    const studies = (data.studies || []).map((s: Record<string, unknown>) => {
      const proto = (s.protocolSection as Record<string, unknown>) || {};
      const ident = (proto.identificationModule as Record<string, unknown>) || {};
      const status = (proto.statusModule as Record<string, unknown>) || {};
      const desc = (proto.descriptionModule as Record<string, unknown>) || {};
      const design = (proto.designModule as Record<string, unknown>) || {};
      const eligibility = (proto.eligibilityModule as Record<string, unknown>) || {};
      const contacts = (proto.contactsLocationsModule as Record<string, unknown>) || {};
      const sponsor = (proto.sponsorCollaboratorsModule as Record<string, unknown>) || {};

      const phases = (design.phases as string[]) || [];
      const locations = (contacts.locations as Record<string, unknown>[] || []).slice(0, 3);

      return {
        nctId: ident.nctId as string,
        title: (ident.briefTitle as string) || (ident.officialTitle as string),
        status: status.overallStatus as string,
        phase: phases.join("/") || "N/A",
        sponsor: (sponsor.leadSponsor as Record<string, unknown>)?.name as string,
        summary: desc.briefSummary as string,
        startDate: (status.startDateStruct as Record<string, unknown>)?.date as string,
        minAge: eligibility.minimumAge as string,
        maxAge: eligibility.maximumAge as string,
        locations: locations.map((l) => ({
          facility: l.facility as string,
          city: l.city as string,
          country: l.country as string,
        })),
      };
    });

    return NextResponse.json({ studies, total: data.totalCount || 0 });
  } catch (error) {
    console.error("ClinicalTrials API error:", error);
    // Return fallback data if API fails
    return NextResponse.json({
      studies: [],
      total: 0,
      error: "Could not fetch live trial data. Please visit clinicaltrials.gov directly.",
    });
  }
}
