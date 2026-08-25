// grhAlmanac_data.js
// Shared data source for the GRH Almanac dashboard (grhAlmanac_index.html)
// and each initiative's detail page (grhAlmanac_detail.html).
// Single source of truth -- edit rows here, both pages read from this file.

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

const DATA = [
  {
    id: "quvivant", name: "QuVivant SaaS Portfolio", entity: "grht",
    category: "Q-Brand Platform", buildStatus: "Live, Multi-Service, Active Dev",
    opportunity: "strong",
    competitors: "Fragmented – no single direct rival across the full suite",
    lastUpdated: "Aug 2026",
    summary: "The umbrella brand for Business Clarity, Personal Clarity, Investment Parallax, and Corporate Prediction – multiple services live or in active build on a shared Netlify / Supabase / Stripe / Claude stack.",
    body: {
      market: "QuVivant occupies a rare position – a single founder running a coordinated suite of SMB-facing decision tools rather than one product. The domain cutovers to quvivant.com and quvive.com put a real brand front door on work that was previously scattered under the retired L3V3L name.",
      differentiation: "The differentiation is the suite itself. Individually, a business mastermind tool or a prediction engine has direct competitors. Bundled under one identity with a consistent architecture and font system, the portfolio reads as a platform rather than a product – which is a harder position for a single competitor to attack.",
      blockers: "Corporate Prediction still needs UI polish and BDL updates through v1.8. Investment Parallax has closed all design decisions but has five major components – Goals Intake, Sign-in, scoring pipeline, Comparison Engine, results page – still unbuilt. The Personal Clarity security exposure (abandoned Mastermind Personal infrastructure with live keys) is an open item that should be closed before any external push.",
      nextDecision: "Whether to sequence Investment Parallax's build order around the Frontier Multiplier / deterministic tiering question before Step 2, or defer it and unblock the Goals Intake page first."
    }
  },
  {
    id: "investmentparallax", name: "QuVivant Investment Parallax", entity: "grht",
    category: "Q-Brand Platform", buildStatus: "Front-End Chain Live, Backend Scoring Engine Unbuilt",
    opportunity: "strong",
    competitors: "No direct rival offering plain-language, cross-domain investment comparison (traditional financial assets vs. business stakes, collectibles, human capital, etc.) on a single universal parameter framework",
    lastUpdated: "Aug 2026",
    summary: "A comparison tool that lets an investor describe any two investments in their own words and receive a structured, goal-weighted comparison across a validated 41-parameter universal framework, spanning 18 domain classes from public equities to human capital.",
    body: {
      market: "No existing tool compares wildly different investment types (a bond vs. a business stake vs. a collectible vs. one's own career capital) on a single consistent framework. The 41-parameter pool was adversarially tested against the hardest-breaking domain (Human Capital) specifically to validate it holds across genuinely dissimilar investment types, not just adjacent financial products.",
      differentiation: "Free-text description in, no forced category picker – the investor describes the investment as they'd explain it to a friend, and entity resolution / domain classification happens behind the scenes (Mechanism 2, batched and gated to guard against stale or misclassified public-entity facts). Seven direct Layer 1 questions populate 13 of the 41 cells through deliberately merged, adversarially-tested question wording; the rest populate via domain defaults, AI-reasoning from already-known cells, or a one-time investor profile question – minimizing what the investor has to answer directly.",
      blockers: "The front-end intake chain (Index, Description, Verification, Adaptive+Domain Questions) and four of its Edge Functions (`save-intake` v2.1.0, `classify-and-resolve` v2.0.0, `generate-adaptive-questions` v1.2.0, `populate-cells` v1.1.0) are confirmed live and verified byte-for-byte against the deployed source. Real work still ahead: Goals Intake (seven picker-based questions, no file built yet), the Divergence/Frontier Multiplier scoring step, the Comparison Engine synthesis itself, and a live-data-connected Output page – none of these exist yet beyond the approved static output mockup. `populate-cells` is deployed but has not yet been run against a real end-to-end session. Materiality weights for the 41 parameters also don't exist yet – required before any real score can compute. All three pre-`populate-cells` Edge Functions still carry the same unresolved Sonnet 5 migration gap (max_tokens too low, thinking not explicitly disabled).",
      nextDecision: "Whether to prioritize finishing the real scoring/Comparison Engine pipeline now (the actual computational core) versus further front-end polish, given that live-audience-chosen comparisons (e.g. an EDC pitch scenario) require the real engine to work for an arbitrary, unrehearsed pair – not a scripted one."
    }
  },
  {
    id: "precisionsteps", name: "PrecisionSteps Tutorials", entity: "grht",
    category: "Q-Brand Platform", buildStatus: "Live, Rebrand Complete",
    opportunity: "strong",
    competitors: "Khan Academy, Duolingo-style adaptive platforms (different pedagogy)",
    lastUpdated: "Aug 2026",
    summary: "Programmed learning platform using Skinner methodology, trilingual EN/FR/ES. Full rebrand from Level 33 complete, domain cutover to precisionstepstutorials.com done with Cloudflare Email Routing.",
    body: {
      market: "Adaptive education is a crowded category, but almost all competitors optimize for engagement and gamification rather than mastery through structured, sequenced reinforcement. A genuinely Skinnerian programmed-learning product is a narrower, more defensible niche – it appeals to parents and institutions who distrust gamified learning as a proxy for real mastery.",
      differentiation: "Trilingual delivery from day one and a formal test-results generation feature (Feature 7 on the roadmap) position this toward classroom adoption, not just consumer self-study – that's a different, less saturated sales motion than most ed-tech competitors pursue. Marked as a platform anchor: a planned document-upload feature would let any uploaded material be converted directly into a Skinner-style course, extending the product from consumer tutoring into employee and institutional training – a materially different, higher-value use case on the same engine.",
      blockers: "The model migration to claude-sonnet-5 is complete, which removes one technical risk. The open gap is go-to-market – there's no confirmed institutional pilot or classroom partner yet, and Feature 7 (formal test-results generation) is roadmap-only, not built. The document-upload-to-training-course feature is also not yet built – it's the feature the anchor case above rests on.",
      nextDecision: "Whether to pursue an institutional pilot now, or wait until the formal test-results feature and the document-upload training capability are both built to make the classroom/employee-training pitch credible."
    }
  },
  {
    id: "quvivepersonalclarity", name: "QuVive Personal Clarity", entity: "grht",
    category: "Q-Brand Platform", buildStatus: "Live, Domain Cutover Complete, Security Fix Pending",
    opportunity: "strong",
    competitors: "General self-help / coaching apps (BetterHelp-adjacent, journaling apps); differentiated by an AI-instrument-per-life-domain structure rather than a single generalized chat coach",
    lastUpdated: "Aug 2026",
    summary: "Three live AI-guided instruments – Parenting, Personal Support, and Relationships – rebranded from the legacy L3V3L Human Mastery Service to QuVive Personal Clarity, now served from quvive.com.",
    body: {
      market: "Personal-guidance/self-help tools are a crowded consumer category, but most are single generalized chatbots. QuVive's per-domain instrument structure (a dedicated build for Parenting, one for Relationships, one for Personal Support) allows each to be tuned and prompted specifically for its domain rather than spreading one generic assistant thin.",
      differentiation: "Uses its own distinct visual/typography system (carried from level33tutorials.com's colour scheme, deliberately separate from the dark-gold Business Mastermind system) so the brand reads as its own product line, not a reskinned business tool. All AI calls route through Supabase Edge Functions rather than Netlify functions, avoiding Netlify's ~20-22 second hard timeout that would otherwise 504 on longer Claude responses.",
      blockers: "quvive.com domain cutover is complete and DNS-verified. The old level33humanmastery.com domain still needs its confirmed-but-not-yet-executed 301 redirect. Rebrand status now confirmed directly (not just from a prior session's own claims): index.html and all three instrument pages (Parenting, Personal Support, Relationships) are correctly rebranded live – QuVive titles, zero 'Human Mastery' references, zero Share Tech Mono, Personal Clarity naming throughout. Small residual catch: each of the three instrument pages still carries two leftover code comments naming 'L3V3L'/'HMBDL Decision 13' – not user-facing, but a minor gap against that session's own claim of having stripped every reference 'in any form.' MISMATCH still open: instruments.html itself was never part of that rebrand session's scope and remains fully L3V3L-branded live – title, 9 'L3V3L' references, 4 'Human Mastery' references, all 10 Share Tech Mono instances intact. Only 3 of a planned 15 instruments are built (Parenting, Personal Support, Relationships – 'Row I: Personal Foundations'); rows II+ don't exist yet. More seriously: an open security exposure carried over from the Platform Sitrep – the Netlify project quvive.com now shares still has live, directly-callable leftover endpoints from an abandoned, unrelated product, one of which holds a service-role key with full write access to PrecisionSteps' real production database. Jamie has confirmed this is not urgent pre-promotion, but it is an explicit blocker before this service is shown to any partner, prospect, or the public.",
      nextDecision: "Rebrand and push instruments.html to match the other four files, and optionally clean the two leftover HMBDL/L3V3L code comments in the instrument pages for full consistency.",
    }
  },
  {
    id: "corporateprediction", name: "QuVivant Corporate Prediction", entity: "grht",
    category: "Q-Brand Platform", buildStatus: "First Prediction Complete, Write-Integrity Fixed, Server-Side Migration Not Started",
    opportunity: "strong",
    competitors: "No direct competitor offering a sealed, executive-adjustable causal prediction with a scored confidence framework – closest analogues are consultancy-delivered forecasts and generic LLM chat forecasting, neither auditable nor reproducible",
    lastUpdated: "Aug 2026",
    summary: "A causal prediction engine – an executive describes a business question in eight seed inputs and receives an adaptive questionnaire, a weighted indicator universe the executive can adjust, upstream and downstream causal chain excavation, and a cryptographically sealed verdict scored across six confidence dimensions.",
    body: {
      market: "Corporate Prediction targets the gap between a consultant's slide deck and a model's shrug: any decision expensive enough to justify a forecast, where the caller will eventually be asked to justify the call. The July 25 first complete run (CFP-2026-GGO-0003, PSS composite 79) proved the full four-call chain – questionnaire, indicator universe, Dynamic Indicator Discovery, and the prediction engine itself – can produce a coherent, board-usable verdict end to end.",
      differentiation: "Six frameworks work together rather than one model call: Signal Taxonomy and PSS shape the intake and indicator universe, PRGF governs how a weight change moves the score without ever moving it silently, and Causal Node Architecture excavates upstream (BTCE) and downstream (DCC) causal chains. Every run seals into a Configuration Fingerprint, so a six-months-later 'how was this called' question is answered from a document rather than a memory – and the executive sets indicator weights themselves, nothing is a locked black box.",
      blockers: "The most serious defect found, D32 – a silent Supabase write failure that discarded six indicator columns on every write, including the sealed July 25 success – was found and fixed 2026-07-27. The CP Migration Sequence's Phase 0 (evidence and the Completeness Contract, CP-CC v1.0) is the only phase executed; Phases 1 to 4 – debounced persistence and resume, the atomic seal RPC that closes the CFP serial double-burn, a working History rework, and moving all four Claude calls fully server-side – remain unbuilt. Live testing through August closed a long tail of presentation and auth defects (Title Case sweep, PSS radar geometry fix, password-free magic-link sign-in) but surfaced two fresh gaps on 2026-08-17: no branded confirmation arrives on signup – Supabase's stock, entirely unbranded 'Confirm signup' template fires instead – and the Magic Link template's own wording hasn't been checked. D4 (old domain redirect) and D8 (DCC document treatment) remain open non-blocking decisions, and sixteen schema columns (Class F) are defined but written by no code path, awaiting a decision to populate them at seal or drop them.",
      nextDecision: "Whether to prioritize CP-MS Phase 2 – the atomic seal RPC that structurally closes the D32 defect class and the serial double-burn – over finishing the two branding gaps (D61/D62) that a live pitch demo would hit first."
    }
  },
  {
    id: "quvivantbusinessclarity", name: "QuVivant Business Clarity", entity: "grht",
    category: "Q-Brand Platform", buildStatus: "Live, Three Of Twelve Instruments Built",
    opportunity: "strong",
    competitors: "General AI business-advisory chatbots and framework-specific consultants (strategy shops, marketing agencies, negotiation coaches); differentiated by purpose-built per-domain machines with adaptive two-layer intake, each grounded in a named canonical framework and citing sources by name rather than reading as one generalized business chatbot",
    lastUpdated: "Aug 2026",
    summary: "A suite of twelve purpose-built analytical instruments – three live (Strategy, Marketing, Negotiation), nine roadmapped – each running a two-layer adaptive intake and grounded in named canonical frameworks and cited sources, positioned as the platform's 'Tactics Charter' answer to 'what should I do about it, right now.'",
    body: {
      market: "QuVivant Business Clarity occupies the tactical layer of the platform's stated Forecasting/Tactics split – Corporate Prediction answers what will happen, Business Clarity answers what to do about it, and the two are designed to interlock rather than compete. Strategy, Marketing, and Negotiation are live and revenue-generating (self-serve subscription at $59/month or above, per CP-BDL D7's own pricing anchor); four free sessions across the live instruments let a prospect try before subscribing.",
      differentiation: "Each machine runs the same two-layer intake – a fixed seed layer plus a second layer generated fresh from those answers, so no two users of the same machine see the same questionnaire – but is grounded in its own named framework: Strategy's four-phase leverage/option/sequencing method (the deepest intake in the suite, seven seeds plus sixteen follow-ups), Marketing's 7 P's audit, and Negotiation's 14-author, 119-entry RTTR citation library (Voss, Camp, Fisher/Ury/Patton, Sun Tzu, Machiavelli and others), with every substantive recommendation citing its source inline.",
      blockers: "Two live-architecture questions surfaced reading the actual files rather than the BDL's own description of them, unverified against what's actually deployed: QBC-BDL Decisions 1.3/1.5 document the API proxy layer as per-machine Supabase Edge Functions ('strategy', 'marketing', 'negotiate'), but the uploaded negotiate.js is written as a Netlify Function (netlify/functions/negotiate.js, exports.handler, process.env.ANTHROPIC_API_KEY) – not yet resolved whether this is a stale local copy or the actual live path. Separately, Strategy's accent color is logged CONFIRMED at #2E6AAF (deep slate blue, QBC-BDL 2.2), but L3V3L_Strategy_Machine_v5.html itself renders entirely in the shared gold system with no blue anywhere in the file; Marketing's accent remains genuinely PENDING per the BDL, consistent with what its own file shows. Both uploaded index files still carry a leftover 'L3V3L · Business Mastermind Suite · Level 33' line in the footer despite the rest of each file reading QuVivant Business Clarity throughout, and index.html's machine links point to a default Netlify subdomain rather than a custom domain. Nine of twelve instruments (Optimization, Acceleration, Market Gaps, Extrapolation, Competition, Shifts + Trends, Game Theory, Scenario Planning, Crisis Navigation) are designed and roadmapped, not built.",
      nextDecision: "Whether to verify the Edge-Function-vs-Netlify-Function question directly against what's actually deployed before treating either QBC-BDL Decision 1.3 or negotiate.js as the accurate live picture, given the same class of documentation-versus-reality gap has cost real time elsewhere on the platform (QuVive's instruments.html, Corporate Prediction's D49/D50)."
    }
  },
  {
    id: "forevercomplete", name: "Forever Complete", entity: "grhns",
    category: "Nutrient Superfoods", buildStatus: "MVP Concept",
    opportunity: "early",
    competitors: "Ready America, Augason Farms, Wise Company",
    lastUpdated: "Mar 2026",
    summary: "A long shelf-life, freeze-dried nutrition product line, tiered to map against the Prepper Hierarchy Book's six severity levels.",
    body: {
      market: "Disaster preparedness is real but fragmented and heavily skewed toward rural, individualist, physical-survival framing. The food-product category specifically is crowded at the product level, with entrenched players already serving the space.",
      differentiation: "Forever Complete's tiering is designed to map directly against the Prepper Hierarchy Book's six-level framework, giving it a natural upsell ladder tied to a reader's self-identified risk tier – a hook most freeze-dried competitors don't have.",
      blockers: "Still concept-stage – no MVP has been built and no supplier relationship for the freeze-dried product has been confirmed. The open question is whether the product is manufactured in-house, white-labeled, or dropped in favor of the book alone.",
      nextDecision: "Whether to commit to a supplier relationship now, or hold the product decision until the Prepper Hierarchy Book itself gains traction."
    }
  },
  {
    id: "prepperbook", name: "Prepper Hierarchy Book", entity: "grhp",
    category: "Publishing", buildStatus: "Book Outline Drafted",
    opportunity: "early",
    competitors: "No direct competitor on the hierarchy-book framing",
    lastUpdated: "Mar 2026",
    summary: "A book organized around a six-level hierarchy of apocalyptic severity, from a 72-hour grid-down event to permanent wilderness survival, to be published under Grand River Hills Publishing.",
    body: {
      market: "Disaster preparedness content is fragmented and heavily skewed toward rural, individualist, physical-survival framing. Genuine gaps exist in urban preparedness, psychological resilience, community coordination, and specialized-demographic angles – real room for a differentiated framing.",
      differentiation: "The hierarchy structure is the real asset. It lets a reader self-identify their risk tier instead of being lumped in with bunker-builders, and it's inherently shareable as a quiz or content hook independent of any product tied to it.",
      blockers: "Still concept-stage – the book exists as a structural outline rather than drafted chapters. Publishing under Grand River Hills Publishing is confirmed direction, but the DBA registration itself is not yet complete.",
      nextDecision: "Whether to begin drafting chapters now, or wait until the Grand River Hills Publishing DBA registration is finalized."
    }
  },
  {
    id: "praeyingzone", name: "The Præying Zone", entity: "grhp",
    category: "Præying Zone Series", buildStatus: "Manuscript Drafted",
    opportunity: "idea",
    competitors: "Found-footage horror franchises (Paranormal Activity, The Vigil); no direct competitor combining exorcism, serial-murder investigation, and Vatican covert-ops framing",
    lastUpdated: "Aug 2026",
    summary: "A horror/sci-fi screenplay told through recovered found-footage — a man carrying a bound demon, a parallel serial-murder investigation, and a covert Church operation converge around the hunt for other imprisoned fallen entities.",
    body: {
      market: "Found-footage horror remains a durable, low-budget-friendly subgenre with a proven audience. Layering in a mythological/Enochian framework and a covert-operative Church thread gives it a broader hook than a straightforward haunting film, closer to the ongoing-universe potential of a franchise starter.",
      differentiation: "The multi-thread structure (forest murders, exorcism ritual, undercover Church operatives, found-footage editor frame) resolves into a single reveal by the end, and the closing beat sets up a sequel hook – a list of further locations to pursue – rather than a closed story.",
      blockers: "This is manuscript-stage only – no production attachment, no coverage/notes pass complete, and no determination yet on whether this is pursued as a spec screenplay, a novelization, or both.",
      nextDecision: "Whether to pursue script coverage / industry feedback first, or develop a prose adaptation in parallel under the Publishing division."
    }
  },
  {
    id: "coolhot", name: "CoolHot Apparel", entity: "grhcy",
    category: "Cybernetics", buildStatus: "Business Case + Investor Pitch Complete",
    opportunity: "early",
    competitors: "Ice vests, passive cooling towels (indirect); no direct active-cooling wearable at this price point",
    lastUpdated: "Feb 2026",
    summary: "Wearable active-cooling garment for construction, industrial, and athletic use – belt-mounted thermoelectric unit distributing refrigerated air through tubing integrated into a safety vest.",
    body: {
      market: "The $38B workwear industry has a real heat-stress problem and no active-cooling solution at consumer price points – existing options are passive (ice vests, cooling towels) and short-lived. The revised design using standard 5–15mm tubing removed the main manufacturing barrier that made the original micro-tube concept impractical.",
      differentiation: "Active refrigerated-air delivery versus passive evaporative or ice-based cooling is a real technical differentiator, and the modular battery / cooling-core / mesh architecture keeps the unit serviceable rather than disposable.",
      blockers: "The completed business case template returned a 'Needs More Research' recommendation – user-adoption uncertainty and hot-side heat dissipation remain unresolved engineering questions. The $800K seed / 1,250% five-year ROI pitch exists, but no prototype has been physically built or tested.",
      nextDecision: "Whether to commission a working prototype before approaching investors, since the pitch currently rests on projections rather than a demonstrated unit."
    }
  },
  {
    id: "mttl", name: "MTTL – Memory & Dream Reconstruction", entity: "grht",
    category: "New Venture", buildStatus: "Protocol Designed, No Build Started",
    opportunity: "idea",
    competitors: "No direct competitor identified – adjacent to AI image/video generation tools, not memory-specific services",
    lastUpdated: "Mar 2026",
    summary: "A service that reconstructs waking memories and dreams into corrected, high-fidelity visual and video renderings using a structured intake protocol (Memory Trace Transcription Language) and a human-in-the-loop Midjourney / Runway ML pipeline.",
    body: {
      market: "Two distinct markets sit inside one infrastructure. Memory reconstruction carries genuine emotional urgency – recovering a lost face, a demolished home, a person who's gone – which drives willingness to pay. Dream reconstruction is a real but secondary market, valuable mainly to therapeutic, creative, and self-inquiry practitioners rather than the general public.",
      differentiation: "The Confidence Gradient concept – treating uncertainty in a memory or dream as legitimate data rather than an error to correct away – is a genuinely novel framing for this category. The MTTL protocol and intake language constitute real prior art if formalized and dated.",
      blockers: "No build has started. The technical execution gap is real – Jamie has confirmed he can operate Midjourney and Runway ML directly, closing the 'hands on the tools' problem, but the Memory Intake Protocol itself hasn't been tested against a real memory yet. The last session paused deliberately, pending a clearer-headed review rather than a fatigued decision.",
      nextDecision: "Whether to run the first live intake test on an actual memory, which was the immediate next step before the session was paused for rest."
    }
  },
  {
    id: "pdo", name: "Progressive Dimensional Optimization", entity: "grht",
    category: "Proprietary Framework", buildStatus: "Core Method Validated; Interface PDO Extension Proven on One UMARS Test Case",
    opportunity: "developing",
    competitors: "Not yet assessed – no comparison research done, though this class of meta-analytical dimensionality framework has no obvious direct commercial rival on record",
    lastUpdated: "Aug 2026",
    summary: "A framework for identifying the Minimum Viable Dimensionality (MVD) of any domain – given a domain, determine MVD and MNOT (max number of titles), generate progressive title sets one dimension at a time, and select the optimal set, which has consistently converged at seven dimensions (the Seven-Dimensional Law). Extended in one session into an 11-dimension 'Interface PDO' enabling LLMs to reason spatially about physical mechanisms – validated on a live UMARS force-transmission test case.",
    body: {
      market: "PDO is a general-purpose analytical method rather than a market-facing product – it's used internally to derive frameworks for other initiatives (run so far on domains including AI/Robotics data capture) rather than sold on its own. Its most developed application, the Interface PDO / LAMRFS system, targets a real capability gap: LLMs don't natively reason about spatial-mechanical systems, and the Invention Machine / UMARS robotics work needs that capability.",
      differentiation: "The core method – progressive title-set generation converging on a Minimum Viable Dimensionality – is a reusable meta-tool applicable to any domain, not a one-off analysis. Its Interface PDO extension (11 dimensions: Boundary Conditions, Permeability Protocol, Encoding Mechanism, Signal Fidelity, State Representation, Phenomenological Presence, Threshold Dynamics, Causal Membrane, Ontological Translation, Liminal Governance, Reflexive Awareness) pairs with a companion reasoning toolkit – LAMRFS (11 mathematical-workaround strategies: Relational Logic, Symbolic Translation, Analogical Reasoning, Constraint Logic, Proportional Reasoning, Topological Reasoning, Order-of-Magnitude Estimation, Causal Chain Analysis, Dimensional Analysis, Threshold Interface, Verification Protocol) – that lets an LLM reason about mechanism design (degrees of freedom, force transmission, constraint logic) without true simulation, by declaring what's high-confidence (topology, sequencing) versus low-confidence (exact numerical output) rather than fabricating false precision.",
      blockers: "Proof-of-concept only – validated on a single live test case (a UMARS multi-module force-transmission problem) in one session, not yet run repeatedly or applied to a real UMARS build decision. That session's own retrograde audit found 3 of the 11 LAMRFS reasoning strategies under-deployed (Proportional Reasoning, Order-of-Magnitude Estimation, and especially Dimensional Analysis, flagged as the highest-value gap) – a follow-up traversal deliberately exercising those three was proposed but it's not clear from this record whether it happened.",
      nextDecision: "Whether to run the next Interface PDO traversal (deliberately exercising the under-deployed quantitative-bracketing trio) on another UMARS challenge, or treat PDO/LAMRFS as validated enough to start applying it to other domains beyond spatial-mechanical reasoning."
    }
  },
  {
    id: "personalknowledgesystems", name: "Gateway to Personal Knowledge Systems", entity: "grhp",
    category: "Gateway Series", buildStatus: "Editing Complete, Cover Done, Front Matter and Wraparound Cover Still Needed",
    opportunity: "developing",
    competitors: "Not yet assessed",
    lastUpdated: "Aug 2026",
    summary: "The most advanced entry in the Gateway Series – James Eastwinn's line of accessible non-fiction primers – covering personal knowledge systems. Editing and cover art are complete; front-of-book pages and the wraparound cover remain before it's ready for KDP submission.",
    body: {
      market: "Not yet assessed – no comparison or positioning research has been logged for this title.",
      differentiation: "Not yet assessed beyond its place in the Gateway Series' accessible-primer format.",
      blockers: "Front-of-book pages (title page, copyright page, and the rest of the front matter) and the wraparound print cover still need to be built before KDP submission. No other blockers logged.",
      nextDecision: "Whether to build the remaining front-of-book pages and wraparound cover now, to get the most finished Gateway Series title onto KDP first, ahead of the other two entries."
    }
  },
  {
    id: "delegationengines", name: "Delegation Engines", entity: "grhp",
    category: "Gateway Series", buildStatus: "Five Journalist-Style Stories Drafted",
    opportunity: "early",
    competitors: "Not yet assessed",
    lastUpdated: "Aug 2026",
    summary: "A Gateway Series title built around sourced, journalist-style stories – five drafted so far. Earlier-stage than Personal Knowledge Systems; full manuscript scope and remaining story count not yet logged.",
    body: {
      market: "Not yet assessed.",
      differentiation: "The journalist-style, sourced-story format is the notable structural choice logged so far; how it differentiates from other Gateway Series titles hasn't been detailed yet.",
      blockers: "Only five stories are confirmed drafted; total planned scope, editing status, and cover status are not yet logged.",
      nextDecision: "What background material to supply to establish full manuscript scope and current status beyond the five drafted stories."
    }
  },
  {
    id: "claimsontomorrow", name: "Claims on Tomorrow", entity: "grhp",
    category: "Gateway Series", buildStatus: "Manuscript Complete – 50 of 50 Spreads",
    opportunity: "developing",
    competitors: "Not yet assessed",
    lastUpdated: "Aug 2026",
    summary: "A Gateway Series manuscript on financial instruments, reaching full completion at 50 of 50 spreads. Editing, cover, and KDP-submission status not yet logged.",
    body: {
      market: "Not yet assessed.",
      differentiation: "Not yet assessed.",
      blockers: "The manuscript itself is complete, but editing pass, cover art, and front-of-book status haven't been logged – how far along it is beyond the spread count isn't yet known.",
      nextDecision: "What background material to supply to establish editing, cover, and KDP-readiness status now that the manuscript itself is complete."
    }
  },
  {
    id: "flai", name: "FLAI – Fingerprint Lineage AI System", entity: "grhcy",
    category: "Cybernetics", buildStatus: "Concept Documented, No Build Started",
    opportunity: "idea",
    competitors: "Not yet assessed",
    lastUpdated: "Aug 2026",
    summary: "A fingerprint lineage assessment system – one of the platform's documented invention concepts with patent potential, categorized under Cybernetics per its command-and-control, intelligence, and sensor profile.",
    body: {
      market: "Not yet assessed.",
      differentiation: "Not yet assessed.",
      blockers: "Concept-stage only – no specification, prototype, or build has started.",
      nextDecision: "What background material to supply to establish market, differentiation, and a real build status."
    }
  },
  {
    id: "minidrones", name: "Mini to Micro Drones", entity: "grhcy",
    category: "Cybernetics", buildStatus: "Interest Declared, No Concept Work Started",
    opportunity: "idea",
    competitors: "Not yet assessed",
    lastUpdated: "Aug 2026",
    summary: "A newly declared interest in building mini to micro drones. No concept document, prototype, or spec exists yet beyond the stated interest.",
    body: {
      market: "Not yet assessed.",
      differentiation: "Not yet assessed.",
      blockers: "Nothing built yet – this is a stated interest only, with no concept document, prototype, or spec to draw from.",
      nextDecision: "What direction to take first – a specific use case (agricultural, inspection, hobbyist, or another angle) would materially change everything else about this row."
    }
  },
  {
    id: "groopsbuying", name: "Groops Buying", entity: "grht",
    category: "New Venture", buildStatus: "Concept Only, No Build Started",
    opportunity: "idea",
    competitors: "Not yet assessed – group buying has established players (Groupon-style platforms), but no comparison research is logged yet",
    lastUpdated: "Aug 2026",
    summary: "A group buying platform, working name GroopsBuying (name itself provisional). Recalled and added to the dashboard this session – no build, spec, or market research logged yet.",
    body: {
      market: "Not yet assessed.",
      differentiation: "Not yet assessed.",
      blockers: "Concept-stage only, and the name itself is marked provisional. No spec or build work exists yet.",
      nextDecision: "Confirm entity (defaulted to GRHT as a SaaS/platform play – flag if this should sit under GRHI or elsewhere instead), and what background material to supply to develop the row further."
    }
  }
];
