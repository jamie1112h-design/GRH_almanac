// grhAlmanac_supabase.js
// Fetches live initiative data from Supabase and maps it into the same
// DATA array shape grhAlmanac_index.html and grhAlmanac_detail.html
// already expect -- so no other rendering code needed to change.
//
// Also fetches the `valuations` table (via the `latest_valuations` view)
// and groups it per initiative into { methods: [...] }, the exact shape
// grhAlmanac_detail.html's renderValuationTable already expected but had
// nothing to read until now. Initiatives with no valuation rows yet keep
// falling through to the existing "Not yet modeled" empty state.
//
// All writes route through SECURITY DEFINER functions (checkAdminPassword,
// adminUpdateStaticField, adminInsertAttribute) that verify the admin
// password server-side before touching any table. This key can never
// read or write any table directly -- RLS default-denies the public
// role on every table; these three functions are the only doorway
// (Decisions 61, 67, 69). The `valuations` table follows the same
// public-read/no-public-write RLS pattern as the other attribute tables;
// admin write-wiring for it (mirroring adminInsertAttribute) is not yet
// built -- new/edited valuation rows go in directly via SQL for now,
// the same as this initial population.

const SUPABASE_URL = "https://hwcrapebwttyhvwsymbr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_qg-YWKvSI21k8AnTfRxNEQ_qGmLw_nq";

async function callRpc(fnName, body) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/${fnName}`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    // Postgres RAISE EXCEPTION (e.g. wrong password) surfaces here as a
    // non-2xx response with a message -- surface it to the caller rather
    // than swallowing it.
    let detail = res.statusText;
    try { detail = (await res.json()).message || detail; } catch (_) {}
    throw new Error(detail);
  }
  return res.json();
}

async function checkAdminPassword(input) {
  return callRpc("check_admin_password", { input_password: input });
}

// Static fields (Decision 2, 6): a real overwrite, but only if the
// version passed still matches what's live -- returns false (not a
// thrown error) on a stale write, so the caller can tell "someone
// else edited this" apart from a genuine failure.
async function adminUpdateStaticField(password, initiativeId, field, value, expectedVersion) {
  return callRpc("admin_update_static_field", {
    input_password: password,
    p_initiative_id: initiativeId,
    p_field: field,
    p_value: value,
    p_expected_version: expectedVersion,
  });
}

// Attribute-tracked fields (Decision 2, 9): always a new row, never an
// overwrite.
async function adminInsertAttribute(password, initiativeId, attrTable, value, note) {
  return callRpc("admin_insert_attribute", {
    input_password: password,
    p_initiative_id: initiativeId,
    p_attr_table: attrTable,
    p_value: value,
    p_note: note || null,
  });
}

async function loadValuations() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/latest_valuations?select=*`,
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

  // Group flat rows (one per method) by initiative_id into the
  // { methods: [...] } shape grhAlmanac_detail.html's renderValuationTable
  // already expects.
  const byInitiative = {};
  for (const r of rows) {
    if (!byInitiative[r.initiative_id]) {
      byInitiative[r.initiative_id] = { methods: [] };
    }
    byInitiative[r.initiative_id].methods.push({
      name: r.method_name,
      assumptions: r.assumptions,
      year1: r.year1,
      year3: r.year3,
      year5: r.year5,
    });
  }
  return byInitiative;
}

async function loadInitiatives() {
  const [initiativesRes, valuationsByInitiative] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/initiative_records?select=*`, {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
    }),
    loadValuations(),
  ]);

  if (!initiativesRes.ok) {
    throw new Error(`Supabase fetch failed: ${initiativesRes.status} ${initiativesRes.statusText}`);
  }

  const rows = await initiativesRes.json();

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    category: r.category,
    entity: r.entity,
    opportunity: r.opportunity,
    buildStatus: r.build_status,
    competitors: r.competitors,
    summary: r.summary,
    version: r.version, // needed client-side for the optimistic-concurrency write check
    // Decision 19: "Updated On" is backend-driven, not a hardcoded string --
    // this is the real updated_at timestamp, maintained automatically by
    // the version-bump trigger on every write (Decision 59).
    lastUpdated: new Date(r.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    url: r.url,
    manualRank: r.manual_rank,
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
    // Grouped from the `valuations` table (via latest_valuations) above.
    // Initiatives with no rows yet simply have no key here, so the
    // existing "Not yet modeled" fallback on the detail page still
    // applies unchanged.
    valuation: valuationsByInitiative[r.id],
  }));
}
