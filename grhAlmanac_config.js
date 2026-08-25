// grhAlmanac_config.js
// Static presentation config shared by grhAlmanac_index.html and
// grhAlmanac_detail.html -- status/entity display metadata and category
// descriptors. Row content itself now lives in Supabase (see
// grhAlmanac_supabase.js), not here -- this file only covers config
// that isn't per-row data.


const STATUS_META = {
  strong:     { label: "Strong",       color: "#6B9B6E", score: 4 },
  developing: { label: "Developing",   color: "#C9A227", score: 3 },
  early:      { label: "Early Signal", color: "#8A93A6", score: 2 },
  idea:       { label: "Idea Stage",   color: "#5B6272", score: 1 },
};

const ENTITY_META = {
  grht:  { label: "GRHT",  full: "Grand River Hills Technologies",       cls: "entity-grht" },
  grhi:  { label: "GRHI",  full: "Grand River Hills Inc.",               cls: "entity-grhi" },
  grhp:  { label: "GRHP",  full: "Grand River Hills Publishing",         cls: "entity-grhp" },
  grhcy: { label: "GRHCy", full: "Grand River Hills Cybernetics",        cls: "entity-grhcy" },
  grhci: { label: "GRHCi", full: "Grand River Hills Cinematics",         cls: "entity-grhci" },
  grhns: { label: "GRHNS", full: "Grand River Hills Nutrient Superfoods", cls: "entity-grhns" },
  grhbc: { label: "GRHBC", full: "Grand River Hills BioChem",            cls: "entity-grhbc" },
};

// Category descriptors used in the row-expand entity-source line. Falls back
// to the plain category name when no override is registered.
const CATEGORY_DESCRIPTORS = {
  "Cybernetics": "Command and Control Programming, Sensors, Circuitry Based",
  "Gateway Series": "Gateway Series Titles",
  "Q-Brand Platform": "AI-Powered SaaS Platforms and Services",
  "New Venture": "Early-Stage Business Concepts and Physical Products",
  "Nutrient Superfoods": "Freeze-Dried and Functional Nutrition Products",
  "Præying Zone Series": "The Præying Zone Franchise and Mythology",
  "Publishing": "Standalone Book Titles",
  "Proprietary Framework": "Internal IP Frameworks and Methodologies",
};

function entitySourceLine(item) {
  const ent = ENTITY_META[item.entity];
  const desc = CATEGORY_DESCRIPTORS[item.category] || item.category;
  return `${ent.full} – ${desc} (${ent.label})`;
}

