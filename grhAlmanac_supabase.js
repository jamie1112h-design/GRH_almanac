// grhAlmanac_supabase.js
// Fetches live initiative data from Supabase and maps it into the same
// DATA array shape grhAlmanac_index.html and grhAlmanac_detail.html
// already expect -- so no other rendering code needed to change.
//
// Read-only: this key is a publishable/anon key, restricted to SELECT
// by Row Level Security policies on the database side (Decision 59/RLS
// migration). It cannot write, regardless of what's in this file.

const SUPABASE_URL = "https://hwcrapebwttyhvwsymbr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_qg-YWKvSI21k8AnTfRxNEQ_qGmLw_nq";

async function loadInitiatives() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/initiative_records?select=*`,
    {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Supabase fetch failed: ${res.status} ${res.statusText}`);
  }

  const rows = await res.json();

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    category: r.category,
    entity: r.entity,
    opportunity: r.opportunity,
    buildStatus: r.build_status,
    competitors: r.competitors,
    summary: r.summary,
    body: {
      market: r.market,
      differentiation: r.differentiation,
      frictionPoints: r.friction_points,
      nextDecision: r.next_decision,
      valueProposition: r.value_proposition,
      mvpDescription: r.mvp_description,
      productEnhancements: r.product_enhancements,
      marketingSummary: r.marketing_summary,
      competitiveLandscape: r.competitive_landscape,
    },
    // No valuation data in Supabase yet -- omitted here so the existing
    // "Not yet modeled" fallback on the detail page keeps working as-is.
  }));
}
