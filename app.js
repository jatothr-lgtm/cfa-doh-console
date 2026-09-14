/* ══════════════════════════════════════════════════════════════
   CFA Warehouse DOH Console
   Logic source: "Warehouse Wise Stock Qty and Stock Balance -Test"
   tabs Condition / Normalisation / CFA Skus
   ══════════════════════════════════════════════════════════════ */

/* ── seeds ─────────────────────────────────────────────────── */
const SEED_SKUS = [
["Dates_04-30057","Apple Pie Date Bite Farmley Tin Jar 200g"],
["Dates_15-30109","Classic Date Bites Farmley Sachet 20 g - Single Serve"],
["Dates_15-30110","Dark Choco Orange Date Bites Farmley Sachet 20 g - Single Serve"],
["Dates_15-30111","Apple Pie Date Bite Farmley sachet 20 g - Single serve"],
["Dates_4-20183","Assorted Pack Farmley 60g- Dark Choco Orange Date Bite 20g, Coffee Date Bite 20g, Classic Date Bite 20g"],
["Dates_4-20161","Coffee Rush Date Bite Farmley Sachet 20g- Single Serve"],
["Dates_4-20162","Coffee Rush Date Bite Farmley Tin Jar 200g"],
["Dates_4-30101","Dark Choco-Orange Date Bite Farmley Tin Jar 200g"],
["Dates_4-30567","Classic Date Bites Farmley Tin Jar 200 g"],
["Dry Fruit Mix_15-2402","Trail Mix Farmley Standee Pouch 200 g"],
["Dry Fruit Mix_15-2403","Seed Mix Farmley Standee Pouch 200 g"],
["Dry Fruit Mix_15-2404","Berry Mix Farmley Standee Pouch 200 g"],
["Dry Fruit Mix_15-2800","Premium Panchmeva Farmley Jar 425 g- Institutional"],
["Dry Fruit Mix_15-2801","Premium Panchmeva Farmley Jar 405 g"],
["Dry Fruit Mix_15-2858","Mexican Peri Peri Snack Mix Farmley Pillow Pouch 21g (In SRP 8 Pcs Each)"],
["Dry Fruit Mix_15-2880","Premium Panchmeva Farmley Standee Pouch 160g"],
["Dry Fruit Mix_15-2951","Mexican Peri Peri Snack Mix Farmley 21g - Pack of 10 (Ladi)"],
["Dry Fruit Mix_15-30141","Sweet and Salty Mix Farmley Pillow Pouch 23g- Ladi (Pack of 10)"],
["Dry Fruit Mix_15-30155","Premium Panchmeva Farmley Pillow Pouch 30g- single serve"],
["Dry Fruit Mix_15-30158","Mexican Peri-Peri Snack Mix Farmley Pillow Pouch 35 g- Single Serve"],
["Dry Fruit Mix_15-30159","Mexican Peri Peri Snack Mix Farmley Composite Jar 325 g"],
["Makhana_7-2979","Roasted & Flavored Makhana -Cheddar Cheese Farmley Composite Jar 77 g"],
["Makhana_7-2980","Roasted & Flavored Makhana - Mint Farmley Composite Jar 77 g"],
["Makhana_7-2981","Roasted & Flavored Makhana - Black Pepper Farmley Composite jar 77 g"],
["Makhana_7-2982","Roasted & Flavored Makhana - Achaari Farmley Composite Jar 77 g"],
["Makhana_7-2983","Roasted & Flavored Makhana - Peri Peri Farmley Composite Jar 77 g"],
["Makhana_7-2984","Roasted & Salted Makhana Farmley Composite Jar 77 g"],
["Makhana_7-2985","Roasted & Flavored Makhana - Tangy Tomato Farmley Composite Jar 77 g"],
["Makhana_7-2986","Roasted & Flavored Makhana -Cream and Onion Farmley Composite Jar 77 g"],
["Makhana_7-2992","Roasted & Flavoured Peri Peri Makhana Farmley Jar 55 g"],
["Makhana_7-2993","Roasted & Flavoured Minty Pudina Makhana Farmley Jar 55 g"],
["Makhana_7-2994","Roasted & Salted Makhana Farmley Jar 55 g"],
["Makhana_7-2995","Roasted & Flavoured Cream & Onion Makhana Farmley Jar 55 g"],
["Makhana_7-2996","Roasted & Flavoured Tangy Tomato Makhana Farmley Jar 55 g"],
["Makhana_7-2997","Roasted & Flavoured Achaari Makhana Farmley Jar 55 g"],
["Makhana_7-2998","Roasted & Flavoured Cheddar Cheese Makhana Farmley Jar 55 g"],
["Makhana_7-2999","Roasted & Flavoured Salt & Pepper Makhana Farmley Jar 55 g"],
["Makhana_7-30073","Roasted & Flavored Makhana - Peri Peri Farmley Pillow Pouch 14 g-Ladi"],
["Makhana_7-30074","Roasted & Flavoured Makhana - Cream & Onion Farmley Pillow Pouch 14g-Ladi"],
["Makhana_7-30075","Roasted & Flavoured Makhana - Tangy Tomato Farmley Pillow Pouch 14g-Ladi"],
["Makhana_7-30079","Roasted & Flavoured Makhana - Achaari Farmley Pillow Pouch 14g-Ladi"],
["Makhana_7-30096","Prasadam Makhana Center Seal Pouch 100 g- NEW"],
["Makhana_7-30097","Prasadam Makhana Farmley Center Seal Pouch 60g-New"],
["Makhana_7-30098","Prasadam Makhana Center Seal Pouch 200 g- NEW"],
["Makhana_7-30135","Roasted & Flavoured Makhana - Lemon Chilli Farmley Composite Jar 55g"],
["Makhana_7-30136","Roasted & Flavoured Makhana - Lemon Chilli Farmley Composite Jar 77 g"],
["Makhana_7-30140","Prasadam Makhana Farmley Center Seal Pouch 180 g"],
["Makhana_7-30146","Roasted & Flavored Makhana- Cheesy cheddar 20g"],
["Makhana_7-30147","Roasted & Flavored Makhana-Lemon Chilli 20g"],
["Makhana_7-30149","Roasted & Flavored Makhana-Minty Pudina 20g"],
["Makhana_7-30151","Roasted & Flavored Makhana - Tangy Tomato Farmley Pillow Pouch 20 g"],
["Makhana_7-30152","Roasted & Flavored Makhana - Cream & Onion Farmley Pillow Pouch 20 g"],
["Makhana_7-30153","Roasted & Flavored Makhana - Peri Peri Farmley Pillow Pouch 20 g"],
["Makhana_7-30154","Roasted & Flavored Makhana - Achaari Farmley Pillow Pouch 20 g"],
["Makhana_7-30155","Roasted & Salted Makhana Farmley Pillow Pouch 20 g"],
["Dry Fruit Mix_15-30135","Sweet and Salty Mix Farmley Pillow Pouch 23g (In SRP 8 Pcs Each)"],
["Seeds_11-20155","Premium Watermelon Seeds Farmley Standee Pouch 100 gms"],
["Seeds_11-20160","Roasted & Salted Pumpkin seeds Pillow Pouch Farmley 24 g- single serve"],
["Seeds_11-20161","Chia seeds Farmley Standee Pouch 250 g"],
["Seeds_11-20162","Sunflower seeds Farmley Standee Pouch 250 g"],
["Seeds_11-20163","Pumpkin seeds Farmley Standee Pouch 250 g"],
["Seeds_11-2541","Premium Chia Seeds Farmley Standee Pouch 200 g"],
["Seeds_11-2542","Premium Jumbo Pumpkin Seeds Farmley Standee Pouch 200 g"],
["Seeds_11-2549","Premium Sunflower Seeds Farmley Standee Pouch 200 g"],
["Seeds_11-2550","Premium Flax Seeds Farmley Standee Pouch 200 g"],
["Seeds_11-2868","Quinoa seeds Farmley Standee Pouch 500g"],
["Seeds_11-2932","Basil Seeds Farmley Standee pouch 300g"],
["Seeds_11-30135","Salted Pumpkin Seeds Pillow Pouch Farmley 24 g (In SRP 8 Pcs Each)"],
["Seeds_11-30142","Salted Pumpkin Seeds Pillow Pouch Farmley 24g-Ladi"],
["Makhana_7-30190","Roasted & Flavoured Makhana - Black Salt Farmley Composite Jar 55g"],
["Dates_4-2566","Classic Date Bites Farmley Monocarton 240 g - Pack of 12 (20 g Each)"],
["Dates_4-30106","Dark Choco-Orange Date Bites Monocarton 240 g - Pack of 12 (20 g Each)"],
["Dates_04-30567","Apple Pie Date Bites Farmley Monocarton 240 g - Pack of 12 (20 g Each)"],
["Dates_4-20171","Coffee Rush Date Bite Farmley Mono Carton Farmley 240 g - Pack of 12 (20 g Each)"],
["Dry Fruit Mix_15-30179","Premium Panchmeva Farmley Pillow Pouch 20 g - Pack of 10 (Ladi)"],
["Dry Fruit Mix_15-30180","Premium Panchmeva Farmley Pillow Pouch 20g (In SRP 8 Pcs Each)"],
["Dates_4-20192","Assorted Pack Farmley 360g Monocarton- Dark Choco Orange Date Bite 120 g, Classic Date Bite 120g, Apple Pie Date Bite 120g Pack of 18 (20 g)"],
["Seeds_11-20179","Roasted & Salted Pumpkin seeds Pillow Pouch Farmley 35 g"],
["Dry Fruit Mix_15-30193","Premium Panchmeva Farmley (irctc)- 35g"],
["Makhana_7-30191","Roasted & Salted Makhana - 15g"]
].map(([code,name])=>({code,name,active:true}));

const SEED_WH = [
  {ds:"inhand",     raw:"Storage Beyond Sqfeet Bangalore Finished Goods - CBSPL", cfa:"CFA (BLR)", type:"FG",         active:true},
  {ds:"inhand",     raw:"Storage Beyond Sqfeet Bangalore-In Transit - CBSPL",     cfa:"CFA (BLR)", type:"In Transit", active:true},
  {ds:"inhand",     raw:"Storage Beyond Sqfeet Gurgaon Finished Goods - CBSPL",   cfa:"CFA (GGN)", type:"FG",         active:true},
  {ds:"inhand",     raw:"Storage Beyond Sqfeet Gurgaon In Transit - CBSPL",       cfa:"CFA (GGN)", type:"In Transit", active:true},
  {ds:"projection", raw:"Storage Beyond Sqfeet Bangalore Finished Goods - CBSPL", cfa:"CFA (BLR)", type:"n/a",        active:true},
  {ds:"projection", raw:"Storage Beyond Sqfeet Gurgaon Finished Goods - CBSPL",   cfa:"CFA (GGN)", type:"n/a",        active:true},
  {ds:"dispatch",   raw:"CFA (BLR)",                                              cfa:"CFA (BLR)", type:"n/a",        active:true},
  {ds:"dispatch",   raw:"CFA (GGN)",                                              cfa:"CFA (GGN)", type:"n/a",        active:true}
];

const ALIASES = {
  inhand:     {wh:["warehouse","Warehouse","Wareouse"], code:["item_code","Item Code","Item_Code"], name:["item_name","Item Name","Item_Name"], qty:["Balance Qty"]},
  projection: {wh:["Wareouse","warehouse","Warehouse"], code:["Item Code","item_code","Item_Code"], name:["Item Name","item_name","Item_Name"], qty:["Total KGs"], month:["Month"], year:["Year"]},
  dispatch:   {wh:["Origin"], code:["Item_Code","Item Code","item_code"], name:["Item_Name","Item Name","item_name"], pend:["Pending Kgs"], disp:["Stock_qty"], date:["Sales_Order_Date"]}
};
const DS_LABEL = {inhand:"In Hand", projection:"Projection", dispatch:"Dispatches + Pendencies"};
const BASES = ["both", "fg", "it"];
const BASIS_LABEL = {both:"In Transit + FG", fg:"FG only", it:"In Transit only"};
const selOf = (o, b) => b === "both" ? o.both : b === "fg" ? o.fg : o.it;
const dohOf = (o, b) => o.finalDRR > 0 ? selOf(o, b) / o.finalDRR : null;
/* the bases the dashboard is showing, in fixed order — never the click order */
const activeBases = () => BASES.filter(b => state.bases.includes(b));
const primaryBasis = () => activeBases()[0] || "both";

/* Dimensions the Pivots sheet groups by. `sku` means the value travels with the
   item code, so in-hand stock can be attributed to it as well as the flows. */
const PIVOT_DIMS = [
  {key:"itemGroup",  label:"Item group",     sku:true,  proj:["Item Group"],    disp:["Item_Group","Item Group"]},
  {key:"misGroup",   label:"MIS item group", sku:true,  proj:[],                disp:["New MIS ITEM Group"]},
  {key:"itemParent", label:"Item parent",    sku:true,  proj:["Item Parent"],   disp:["item_parent","Item Parent"]},
  {key:"itemType",   label:"Item type",      sku:true,  proj:["Item Type"],     disp:["Item_Type","Item Type"]},
  {key:"custGroup",  label:"Customer group", sku:false, proj:["Customer Group"],disp:["customer_group","Customer Group"]},
  {key:"customer",   label:"Customer",       sku:false, proj:["Customer"],      disp:["Customer"]},
  {key:"state",      label:"Shipping state", sku:false, proj:null,              disp:["Shipping State"]}
];

const PEND_EPS = 1e-6;   // a float artefact must not hide a delivered line
const MONTHS = ["january","february","march","april","may","june","july","august","september","october","november","december"];

/* ── state ─────────────────────────────────────────────────── */
const LS = "cfa_doh_v1";
let state = {
  skus: null, wh: null,
  bases: ["both"], vizBasis: "both", mtdMode: "maxDay", thRed: 15, thAmber: 30,
  files: {inhand:null, projection:null, dispatch:null},
  result: null, skuFilterWh: "ALL", skuQuery: "", vizWh: "ALL"
};

function loadMasters(){
  try{
    const s = JSON.parse(localStorage.getItem(LS) || "{}");
    state.skus = Array.isArray(s.skus) && s.skus.length ? s.skus : structuredClone(SEED_SKUS);
    state.wh   = Array.isArray(s.wh)   && s.wh.length   ? s.wh   : structuredClone(SEED_WH);
    if (s.thRed != null) state.thRed = s.thRed;
    if (s.thAmber != null) state.thAmber = s.thAmber;
    // migrate the old single-basis setting
    if (Array.isArray(s.bases) && s.bases.length) state.bases = s.bases.filter(b => BASES.includes(b));
    else if (s.basis) state.bases = [s.basis];
    if (!state.bases.length) state.bases = ["both"];
    state.vizBasis = BASES.includes(s.vizBasis) ? s.vizBasis : state.bases[0];
    if (s.mtdMode === "plusPrior" || s.mtdMode === "maxDay") state.mtdMode = s.mtdMode;
  }catch(e){
    state.skus = structuredClone(SEED_SKUS);
    state.wh   = structuredClone(SEED_WH);
  }
}
function saveMasters(){
  try{
    localStorage.setItem(LS, JSON.stringify({
      skus:state.skus, wh:state.wh, thRed:state.thRed, thAmber:state.thAmber,
      bases:state.bases, vizBasis:state.vizBasis, mtdMode:state.mtdMode
    }));
  }catch(e){ /* private window — masters stay in memory for this session */ }
}

/* ── helpers ───────────────────────────────────────────────── */
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const norm = v => String(v ?? "").replace(/ /g," ").trim().toLowerCase().replace(/\s+/g," ");
const esc  = v => String(v ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const num  = v => { const n = typeof v === "number" ? v : parseFloat(String(v ?? "").replace(/[,\s]/g,"")); return Number.isFinite(n) ? n : 0; };
const fmt  = (n,d=2) => n == null || !Number.isFinite(n) ? "—" : n.toLocaleString("en-IN",{minimumFractionDigits:d,maximumFractionDigits:d});
const fmt0 = n => fmt(n,0);

function toast(msg, bad){
  const t = $("#toast");
  t.textContent = msg; t.className = "toast" + (bad ? " bad" : ""); t.hidden = false;
  clearTimeout(t._t); t._t = setTimeout(()=> t.hidden = true, 3600);
}
function pick(row, names){ for (const n of names) if (n in row) return row[n]; return undefined; }
function hasCol(headers, names){ return names.some(n => headers.includes(n)); }

function parseDate(v){
  if (v instanceof Date && !isNaN(v)) return v;
  if (typeof v === "number"){ // excel serial
    const d = new Date(Date.UTC(1899,11,30) + v*86400000);
    return isNaN(d) ? null : d;
  }
  const s = String(v ?? "").trim();
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return new Date(+m[1], +m[2]-1, +m[3]);
  m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (m) return new Date(+m[3], +m[2]-1, +m[1]);   // dd/mm/yyyy
  const d = new Date(s);
  return isNaN(d) ? null : d;
}
const daysInMonth = (y,m) => new Date(y, m+1, 0).getDate();
const ymd = d => !d ? "" : `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const ym  = d => ymd(d).slice(0,7);
const bandOf = doh => doh == null ? "" : doh <= state.thRed ? "red" : doh <= state.thAmber ? "amber" : "green";

/* ── file reading ──────────────────────────────────────────── */
function readFile(file){
  return new Promise((res,rej)=>{
    const fr = new FileReader();
    fr.onerror = () => rej(new Error("Could not read the file"));
    fr.onload = e => {
      try{
        const wb = XLSX.read(e.target.result, {type:"array", cellDates:true, dense:false});
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, {defval:null, raw:true});
        const headers = Object.keys(XLSX.utils.sheet_to_json(ws,{header:1,range:0})[0] ? {} : {});
        const hdrRow = (XLSX.utils.sheet_to_json(ws,{header:1,blankrows:false})[0] || []).map(h => String(h ?? "").trim());
        res({rows, headers:hdrRow, name:file.name});
      }catch(err){ rej(err); }
    };
    fr.readAsArrayBuffer(file);
  });
}
function detectDataset(headers){
  if (hasCol(headers, ALIASES.dispatch.pend) && hasCol(headers, ALIASES.dispatch.disp)) return "dispatch";
  if (hasCol(headers, ALIASES.projection.qty)) return "projection";
  if (hasCol(headers, ALIASES.inhand.qty)) return "inhand";
  return null;
}
function requiredCols(ds){
  const a = ALIASES[ds];
  return ds === "dispatch" ? [a.wh,a.code,a.pend,a.disp,a.date] : ds === "projection" ? [a.wh,a.code,a.qty] : [a.wh,a.code,a.qty];
}

async function handleFile(ds, file){
  const drop = $(`.drop[data-ds="${ds}"]`);
  drop.className = "drop";
  drop.querySelector(".status").textContent = "Reading…";
  try{
    const parsed = await readFile(file);
    const missing = requiredCols(ds).filter(names => !hasCol(parsed.headers, names));
    if (missing.length){
      drop.classList.add("err");
      drop.querySelector(".status").textContent = "Missing column(s): " + missing.map(m => m[0]).join(", ");
      return;
    }
    const detected = detectDataset(parsed.headers);
    if (detected && detected !== ds) toast(`Heads up — that file looks like "${DS_LABEL[detected]}", loaded as "${DS_LABEL[ds]}".`, true);
    state.files[ds] = parsed;
    drop.classList.add("ok");
    drop.querySelector(".status").textContent = `${parsed.name} · ${parsed.rows.length.toLocaleString("en-IN")} rows`;
    compute(); renderFileTable();
  }catch(err){
    drop.classList.add("err");
    drop.querySelector(".status").textContent = "Could not parse: " + err.message;
  }
}

/* ── computation (Condition tab rules 2–8) ─────────────────── */
function compute(){
  const {inhand, projection, dispatch} = state.files;
  if (!inhand || !projection || !dispatch){ state.result = null; render(); return; }

  const skuMap = new Map(state.skus.filter(s => s.active).map(s => [norm(s.code), s]));
  const isSku  = c => skuMap.has(norm(c));
  const mapFor = ds => {
    const m = new Map();
    state.wh.filter(w => w.active && w.ds === ds).forEach(w => m.set(norm(w.raw), w));
    return m;
  };
  const mIn = mapFor("inhand"), mPr = mapFor("projection"), mDi = mapFor("dispatch");

  const cfas = [...new Set(state.wh.filter(w => w.active).map(w => w.cfa))].sort();
  const blank = () => ({fg:0, it:0, both:0, projKgs:0, pend:0, disp:0, dispRows:0});
  const W = new Map(cfas.map(c => [c, {cfa:c, ...blank(), skus:new Map()}]));
  const rowFor = (cfa, code, name) => {
    const w = W.get(cfa); if (!w) return null;
    const k = norm(code);
    if (!w.skus.has(k)) w.skus.set(k, {code:String(code).trim(), name:name || skuMap.get(k)?.name || "", ...blank()});
    return w.skus.get(k);
  };

  const diag = {
    unmapped:{inhand:new Map(), projection:new Map(), dispatch:new Map()},
    nonSku:{inhand:0, projection:0, dispatch:0},
    kept:{inhand:0, projection:0, dispatch:0}
  };
  const trackUnmapped = (ds, raw) => {
    const k = String(raw ?? "(blank)").trim() || "(blank)";
    diag.unmapped[ds].set(k, (diag.unmapped[ds].get(k) || 0) + 1);
  };

  /* ── pivot dimensions (additive: nothing below feeds the DOH figures) ──
     SKU-attribute dims travel with the item code, so in-hand stock can be
     attributed to them. Transaction dims belong to an order line, so stock
     cannot — those pivots carry the flow measures only. */
  const skuDim = new Map();                        // normalised code -> {dim: value}
  const noteDim = (code, key, val) => {
    const c = norm(code); if (!c) return;
    const v = String(val ?? "").trim(); if (!v) return;
    if (!skuDim.has(c)) skuDim.set(c, {});
    const e = skuDim.get(c); if (!e[key]) e[key] = v;
  };
  for (const r of projection.rows){
    const code = pick(r, ALIASES.projection.code);
    PIVOT_DIMS.forEach(d => { if (d.sku && d.proj) noteDim(code, d.key, pick(r, d.proj)); });
  }
  for (const r of dispatch.rows){
    const code = pick(r, ALIASES.dispatch.code);
    PIVOT_DIMS.forEach(d => { if (d.sku && d.disp) noteDim(code, d.key, pick(r, d.disp)); });
  }

  const PV = new Map();                            // pivot name -> Map(key -> agg)
  const pvAdd = (pivot, key, field, value, code) => {
    const k = String(key ?? "").trim() || "(blank)";
    if (!PV.has(pivot)) PV.set(pivot, new Map());
    const m = PV.get(pivot);
    if (!m.has(k)) m.set(k, {fg:0, it:0, both:0, projKgs:0, pend:0, disp:0, skus:new Set()});
    const a = m.get(k);
    a[field] += value;
    if (code) a.skus.add(norm(code));
  };
  const dimOf = (code, key) => skuDim.get(norm(code))?.[key] || "(unmapped)";
  // spread one measure across every pivot a row belongs to
  const fanOut = (src, code, cfa, row, field, value) => {
    pvAdd("Warehouse", cfa, field, value, code);
    PIVOT_DIMS.forEach(d => {
      if (d.sku) pvAdd(d.label, dimOf(code, d.key), field, value, code);
      else if (src !== "inhand" && d[src]) pvAdd(d.label, pick(row, d[src]), field, value, code);
    });
    pvAdd("Warehouse x item group", `${cfa} — ${dimOf(code, "itemGroup")}`, field, value, code);
  };

  /* Condition 4 — In Hand, split FG / In Transit */
  const aIn = ALIASES.inhand;
  for (const r of inhand.rows){
    const raw = pick(r, aIn.wh), code = pick(r, aIn.code);
    const w = mIn.get(norm(raw));
    if (!w){ trackUnmapped("inhand", raw); continue; }
    if (!isSku(code)){ diag.nonSku.inhand++; continue; }
    const q = num(pick(r, aIn.qty));
    const bucket = W.get(w.cfa); if (!bucket) continue;
    const sku = rowFor(w.cfa, code, pick(r, aIn.name));
    if (w.type === "FG"){ bucket.fg += q; sku.fg += q; }
    else if (w.type === "In Transit"){ bucket.it += q; sku.it += q; }
    bucket.both += q; sku.both += q;
    fanOut("inhand", code, w.cfa, r, w.type === "FG" ? "fg" : w.type === "In Transit" ? "it" : "both", q);
    if (w.type === "FG" || w.type === "In Transit") fanOut("inhand", code, w.cfa, r, "both", q);
    diag.kept.inhand++;
  }

  /* Condition 5 — Projection DRR */
  const aPr = ALIASES.projection;
  const monthTally = new Map();
  for (const r of projection.rows){
    const y = num(pick(r, aPr.year)), mRaw = pick(r, aPr.month);
    if (!y || mRaw == null) continue;
    const mi = typeof mRaw === "number" ? mRaw - 1 : MONTHS.indexOf(norm(mRaw));
    if (mi < 0 || mi > 11) continue;
    const k = y*100 + mi;
    monthTally.set(k, (monthTally.get(k)||0)+1);
  }
  const projKey = monthTally.size ? Math.max(...monthTally.keys()) : null;
  const projY = projKey ? Math.floor(projKey/100) : null, projM = projKey ? projKey%100 : null;
  const autoProjDays = projKey ? daysInMonth(projY, projM) : null;
  const ovProj = num($("#projDays").value) || null;
  const projDays = ovProj || autoProjDays || 30;

  for (const r of projection.rows){
    const raw = pick(r, aPr.wh), code = pick(r, aPr.code);
    const w = mPr.get(norm(raw));
    if (!w){ trackUnmapped("projection", raw); continue; }
    if (!isSku(code)){ diag.nonSku.projection++; continue; }
    const q = num(pick(r, aPr.qty));
    const bucket = W.get(w.cfa); if (!bucket) continue;
    bucket.projKgs += q;
    rowFor(w.cfa, code, pick(r, aPr.name)).projKgs += q;
    fanOut("proj", code, w.cfa, r, "projKgs", q);
    diag.kept.projection++;
  }

  /* Condition 6 — Pendency + dispatch MTD DRR */
  const aDi = ALIASES.dispatch;
  const limitMonth = $("#limitMonth").checked;
  // Condition 6: the divisor is the max Sales_Order_Date of the COLUMN — i.e. across the
  // whole file, before the CFA / SKU filters — so every warehouse divides by the same day.
  let maxDate = null;
  for (const r of dispatch.rows){
    const d = parseDate(pick(r, aDi.date));
    if (d && (!maxDate || d > maxDate)) maxDate = d;
  }
  const dispRows = [];
  for (const r of dispatch.rows){
    const raw = pick(r, aDi.wh), code = pick(r, aDi.code);
    const w = mDi.get(norm(raw));
    if (!w){ trackUnmapped("dispatch", raw); continue; }
    if (!isSku(code)){ diag.nonSku.dispatch++; continue; }
    dispRows.push({w, code, row:r, name:pick(r, aDi.name), pend:num(pick(r, aDi.pend)), disp:num(pick(r, aDi.disp)), d:parseDate(pick(r, aDi.date))});
  }
  const autoMtdDays = maxDate ? maxDate.getDate() : null;

  // Alternate divisor: the max date's day-of-month PLUS one day for every distinct
  // date in an earlier month — but an earlier date only earns its day when it carries
  // real CFA movement, i.e. at least one row that is CFA-mapped, is an active CFA SKU,
  // and has Pending Kgs OR Stock_qty on it. In other words the date must actually feed
  // the numerator it will divide. A date belonging only to a non-CFA SKU or origin, or
  // carrying nothing in either column, adds nothing.
  // A single-month file therefore adds nothing and lands back on the existing divisor.
  const priorDates = new Set();       // earlier dates with CFA pendency or dispatch — these count
  const priorSkipped = new Set();     // earlier dates seen but carrying neither
  const monthsSeen = new Set();
  if (maxDate){
    for (const r of dispatch.rows){
      const d = parseDate(pick(r, aDi.date));
      if (!d) continue;
      monthsSeen.add(d.getFullYear() * 100 + d.getMonth());
      if (d.getMonth() === maxDate.getMonth() && d.getFullYear() === maxDate.getFullYear()) continue;
      const key = ymd(d);
      const w = mDi.get(norm(pick(r, aDi.wh)));
      const qualifies = !!w && isSku(pick(r, aDi.code)) &&
                        (num(pick(r, aDi.pend)) > PEND_EPS || num(pick(r, aDi.disp)) > PEND_EPS);
      if (qualifies) priorDates.add(key); else priorSkipped.add(key);
    }
    priorSkipped.forEach(k => { if (priorDates.has(k)) priorSkipped.delete(k); });
  }
  const priorDays = priorDates.size;
  const altMtdDays = autoMtdDays == null ? null : autoMtdDays + priorDays;
  const mtdMode = state.mtdMode === "plusPrior" ? "plusPrior" : "maxDay";
  const modeDays = mtdMode === "plusPrior" ? altMtdDays : autoMtdDays;

  const ovMtd = num($("#mtdDays").value) || null;
  const mtdDays = ovMtd || modeDays || 1;
  let outOfMonth = 0;
  for (const x of dispRows){
    if (limitMonth && maxDate && x.d && (x.d.getMonth() !== maxDate.getMonth() || x.d.getFullYear() !== maxDate.getFullYear())){ outOfMonth++; continue; }
    const bucket = W.get(x.w.cfa); if (!bucket) continue;
    const sku = rowFor(x.w.cfa, x.code, x.name);
    // Each row lands in exactly one bucket. A row with pending kilos is Pending;
    // a row with none is fully delivered, so its Stock_qty is the Dispatched figure.
    // Counting both would double-count: in this feed Stock_qty equals Pending Kgs
    // on every row that still has pending.
    if (x.pend > PEND_EPS){
      bucket.pend += x.pend; sku.pend += x.pend;
      fanOut("disp", x.code, x.w.cfa, x.row, "pend", x.pend);
    } else {
      bucket.disp += x.disp; sku.disp += x.disp;
      bucket.dispRows++;     sku.dispRows++;
      fanOut("disp", x.code, x.w.cfa, x.row, "disp", x.disp);
    }
    diag.kept.dispatch++;
  }

  /* Conditions 7 & 8 — final DRR and DOH */
  const finish = o => {
    o.projDRR = o.projKgs / projDays;
    o.dispNil = o.dispRows === 0;   // no zero-pending row here at all — nil, not a zero
    o.pdSum   = o.pend + o.disp;
    o.mtdDRR  = o.pdSum / mtdDays;
    o.finalDRR = Math.max(o.projDRR, o.mtdDRR);
    o.drrSrc  = o.finalDRR === 0 ? "—" : (o.projDRR >= o.mtdDRR ? "Projection" : "MTD");
    o.sel     = selOf(o, state.vizBasis);      // basis used by the charts
    o.doh     = dohOf(o, state.vizBasis);
    return o;
  };
  const warehouses = cfas.map(c => {
    const w = W.get(c);
    w.skuRows = [...w.skus.values()].map(finish).sort((a,b) => (a.doh ?? 1e9) - (b.doh ?? 1e9));
    return finish(w);
  }).filter(w => w.both || w.projKgs || w.pdSum);

  state.result = {
    warehouses, projDays, autoProjDays, ovProj, projMonthLabel: projKey ? `${MONTHS[projM][0].toUpperCase()+MONTHS[projM].slice(1)} ${projY}` : "—",
    mtdDays, autoMtdDays, altMtdDays, priorDays, mtdMode, monthsSpanned: monthsSeen.size,
    priorDatesList: [...priorDates].sort(), priorSkippedCount: priorSkipped.size, pivots: PV,
    ovMtd, maxDate, limitMonth, outOfMonth, diag,
    activeSkus: skuMap.size, generatedAt: new Date()
  };
  render();
}

/* ── rendering ─────────────────────────────────────────────── */

function render(){
  const r = state.result;
  $("#emptyState").hidden = !!r;
  $("#results").hidden = !r;
  $("#btnExport").disabled = !r;
  renderViz();
  if (!r) return;
  renderKpis(r); renderWhTable(r); renderWhFilter(r); renderSkuTable(r); renderDiag(r); renderMtdSetting();
  $("#paramNote").textContent =
    `Basis: ${activeBases().map(b => BASIS_LABEL[b]).join(" · ")} · Projection divisor ${r.projDays} day(s) (${r.projMonthLabel}${r.ovProj?", manual override":""}) · ` +
    `MTD divisor ${r.mtdDays} day(s)${r.maxDate?` (max Sales_Order_Date ${ymd(r.maxDate)}${r.mtdMode === "plusPrior" && r.priorDays ? ` + ${r.priorDays} earlier-month day(s)` : ""})`:""}${r.ovMtd?", manual override":""} · ` +
    `${r.activeSkus} active CFA SKUs.`;
}

function renderKpis(r){
  const bases = activeBases();
  $("#kpis").innerHTML = r.warehouses.map(w => {
    const vals = bases.map(b => ({b, doh: dohOf(w, b), sel: selOf(w, b)}));
    const worst = vals.reduce((a, v) => a == null || (v.doh ?? 1e9) < (a.doh ?? 1e9) ? v : a, null);
    const head = bases.length === 1
      ? `<div class="val">${worst.doh == null ? "—" : fmt(worst.doh, 1)}<span style="font-size:15px;font-weight:600;color:var(--ink-2)"> days</span></div>
         <div class="meta">
           <span>Stock <b>${fmt0(worst.sel)}</b> kg</span>
           <span>DRR <b>${fmt(w.finalDRR)}</b> kg/day</span>
           <span class="tag ${w.drrSrc==='Projection'?'proj':'mtd'}">${esc(w.drrSrc)}</span>
         </div>`
      : `<div class="kpi-rows">${vals.map(v => `<div class="kpi-row">
             <span class="kr-lab">${esc(BASIS_LABEL[v.b])}</span>
             <span class="kr-val ${bandOf(v.doh)}">${v.doh == null ? "—" : fmt(v.doh, 1)}</span>
             <span class="kr-sub">${fmt0(v.sel)} kg</span>
           </div>`).join("")}</div>
         <div class="meta"><span>DRR <b>${fmt(w.finalDRR)}</b> kg/day</span>
           <span class="tag ${w.drrSrc==='Projection'?'proj':'mtd'}">${esc(w.drrSrc)}</span></div>`;
    return `<div class="kpi ${bandOf(worst.doh)}"><h3>${esc(w.cfa)}</h3>${head}</div>`;
  }).join("");
}

const WH_COLS_BASE = [
  ["Warehouse", w => esc(w.cfa), "left"],
  ["In Transit + FG", w => fmt(w.both)],
  ["FG", w => fmt(w.fg)],
  ["In Transit", w => fmt(w.it)],
  ["Projection Kgs", w => fmt(w.projKgs)],
  ["Projection DRR", w => fmt(w.projDRR)],
  ["Pending Kgs", w => fmt(w.pend)],
  ["Dispatched Kgs", w => w.dispNil ? "—" : fmt(w.disp)],
  ["Pend + Disp", w => fmt(w.pdSum)],
  ["MTD DRR", w => fmt(w.mtdDRR)],
  ["Final DRR", w => `<b>${fmt(w.finalDRR)}</b>`],
  ["DRR source", w => `<span class="tag ${w.drrSrc==='Projection'?'proj':'mtd'}">${esc(w.drrSrc)}</span>`]
];
/* one DOH column per selected basis; the single-basis case keeps its stock column */
function whCols(){
  const bases = activeBases(), cols = WH_COLS_BASE.slice();
  if (bases.length === 1){
    const b = bases[0];
    cols.push(["Selected stock", w => fmt(selOf(w, b))]);
    cols.push(["DOH", w => { const d = dohOf(w, b); return `<span class="doh ${bandOf(d)}">${d==null?"—":fmt(d,1)}</span>`; }]);
  } else {
    bases.forEach(b => cols.push([`DOH · ${BASIS_LABEL[b]}`,
      w => { const d = dohOf(w, b); return `<span class="doh ${bandOf(d)}">${d==null?"—":fmt(d,1)}</span>`; }]));
  }
  return cols;
}

function renderWhTable(r){
  const COLS = whCols();
  const head = `<thead><tr>${COLS.map(c => `<th${c[2]?' style="text-align:left"':''}>${c[0]}</th>`).join("")}</tr></thead>`;
  const body = `<tbody>${r.warehouses.map(w =>
    `<tr>${COLS.map(c => `<td${c[2]?' style="text-align:left"':''}>${c[1](w)}</td>`).join("")}</tr>`).join("")}</tbody>`;
  $("#whTable").innerHTML = head + body;
}

function renderWhFilter(r){
  const sel = $("#whFilter");
  const cur = state.skuFilterWh;
  sel.innerHTML = `<option value="ALL">All warehouses</option>` +
    r.warehouses.map(w => `<option value="${esc(w.cfa)}">${esc(w.cfa)}</option>`).join("");
  sel.value = [...sel.options].some(o => o.value === cur) ? cur : "ALL";
  state.skuFilterWh = sel.value;
}

function renderSkuTable(r){
  const q = norm(state.skuQuery);
  const bases = activeBases();
  const cols = ["Item Code","Item Name","IT + FG","FG","In Transit","Proj Kgs","Proj DRR","Pending","Dispatched","Pend + Disp","MTD DRR","Final DRR"]
    .concat(bases.length === 1 ? ["Selected","DOH"] : bases.map(b => `DOH · ${BASIS_LABEL[b]}`));
  let html = `<thead><tr>${cols.map((c,i) => `<th${i<2?' style="text-align:left"':''}>${c}</th>`).join("")}</tr></thead><tbody>`;
  let n = 0;
  for (const w of r.warehouses){
    if (state.skuFilterWh !== "ALL" && w.cfa !== state.skuFilterWh) continue;
    const rows = w.skuRows.filter(s => !q || norm(s.code).includes(q) || norm(s.name).includes(q));
    if (!rows.length) continue;
    html += `<tr><td class="grp" colspan="${cols.length}">${esc(w.cfa)} — ${rows.length} SKU(s)</td></tr>`;
    for (const s of rows){
      n++;
      html += `<tr>
        <td>${esc(s.code)}</td><td class="name">${esc(s.name)}</td>
        <td>${fmt(s.both)}</td><td>${fmt(s.fg)}</td><td>${fmt(s.it)}</td>
        <td>${fmt(s.projKgs)}</td><td>${fmt(s.projDRR)}</td>
        <td>${fmt(s.pend)}</td><td>${s.dispNil ? "—" : fmt(s.disp)}</td><td>${fmt(s.pdSum)}</td><td>${fmt(s.mtdDRR)}</td>
        <td><b>${fmt(s.finalDRR)}</b></td>
        ${bases.length === 1 ? `<td>${fmt(selOf(s, bases[0]))}</td>` : ""}
        ${bases.map(b => { const d = dohOf(s, b);
          return `<td><span class="doh ${bandOf(d)}">${d==null?"—":fmt(d,1)}</span></td>`; }).join("")}</tr>`;
    }
  }
  if (!n) html += `<tr><td colspan="${cols.length}" style="text-align:center;color:var(--ink-3);padding:24px">No matching SKUs</td></tr>`;
  $("#skuTable").innerHTML = html + "</tbody>";
}

function renderDiag(r){
  const d = r.diag;
  const block = (title, ds) => {
    const list = [...d.unmapped[ds].entries()].sort((a,b) => b[1]-a[1]);
    return `<section>
      <h4>${title}</h4>
      <p style="margin:0 0 8px;color:var(--ink-2);font-size:12.5px">
        ${fmt0(d.kept[ds])} rows used · ${fmt0(d.nonSku[ds])} dropped (not a CFA SKU)
        ${ds==="dispatch" && r.outOfMonth ? ` · ${fmt0(r.outOfMonth)} dropped (outside ${ym(r.maxDate)})` : ""}
      </p>
      ${list.length
        ? `<h4 style="margin-top:10px">Unmapped labels</h4><ul>${list.map(([k,v]) => `<li><code>${esc(k)}</code> — ${fmt0(v)} rows</li>`).join("")}</ul>`
        : `<p class="good">All warehouse labels mapped.</p>`}
    </section>`;
  };
  $("#diag").innerHTML = block("In Hand","inhand") + block("Projection","projection") + block("Dispatches + Pendencies","dispatch");
}

function renderMtdSetting(){
  const r = state.result;
  $("#mtdMode").value = state.mtdMode;
  const note = $("#mtdModeNote");
  if (!r || !r.maxDate){ note.textContent = ""; $("#mtdDaysAuto").textContent = "auto"; return; }
  const sum = `${r.autoMtdDays} + ${r.priorDays} = ${r.altMtdDays}`;
  $("#mtdDaysAuto").textContent = `auto: ${r.mtdMode === "plusPrior" ? r.altMtdDays : r.autoMtdDays}`;
  const skipped = r.priorSkippedCount
    ? ` ${r.priorSkippedCount} further earlier date(s) were skipped for carrying no CFA pendency or dispatch.` : "";
  note.innerHTML = r.priorDays
    ? `Max <code>Sales_Order_Date</code> is ${ymd(r.maxDate)} → <b>${r.autoMtdDays}</b>. The file also holds
       <b>${r.priorDays}</b> earlier date(s) that carry CFA pendency or dispatch (${r.priorDatesList.slice(0, 8).join(", ")}${
         r.priorDatesList.length > 8 ? ", …" : ""}), so the second rule gives <b>${sum}</b>.${skipped}
       Currently using <b>${r.mtdDays}</b>${r.ovMtd ? " (manual override)" : ""}.`
      + (r.mtdMode === "plusPrior" && r.limitMonth
        ? `<br><span style="color:var(--red);font-weight:600">Heads up:</span> “Limit dispatch rows to the month of the max date”
           is on, so the kilos above the line come from the latest month only while the divisor counts earlier days too.
           Switch that off to keep numerator and divisor over the same period.`
        : "")
    : `Max <code>Sales_Order_Date</code> is ${ymd(r.maxDate)} → <b>${r.autoMtdDays}</b>. ${
         r.monthsSpanned > 1
           ? `Earlier months are present but no earlier date carries CFA pendency or dispatch${skipped ? ` (${r.priorSkippedCount} skipped)` : ""}, so both rules give the same divisor`
           : "Every row falls in that one month, so both rules give the same divisor"
       }${r.ovMtd ? `; manual override of ${r.ovMtd} is in force` : ""}.`;
}

function renderFileTable(){
  const rows = Object.entries(state.files).map(([ds,f]) => `<tr>
    <td>${DS_LABEL[ds]}</td>
    <td style="text-align:left">${f ? esc(f.name) : "<span style='color:var(--ink-3)'>not loaded</span>"}</td>
    <td>${f ? fmt0(f.rows.length) : "—"}</td>
    <td>${f ? fmt0(f.headers.length) : "—"}</td></tr>`).join("");
  $("#fileTable").innerHTML = `<thead><tr><th style="text-align:left">Dataset</th><th style="text-align:left">File</th><th>Rows</th><th>Columns</th></tr></thead><tbody>${rows}</tbody>`;
}

/* ── masters UI ────────────────────────────────────────────── */
function renderSkuMaster(){
  const q = norm($("#skuMasterSearch").value);
  const rows = state.skus.map((s,i) => ({s,i})).filter(({s}) => !q || norm(s.code).includes(q) || norm(s.name).includes(q));
  $("#skuCount").textContent = `${state.skus.filter(s => s.active).length} active / ${state.skus.length}`;
  $("#skuMaster").innerHTML = `<thead><tr>
      <th style="text-align:left">Item Code</th><th style="text-align:left">Item Name</th><th>Active</th><th></th>
    </tr></thead><tbody>${rows.map(({s,i}) => `<tr>
      <td><input type="text" value="${esc(s.code)}" data-sku="${i}" data-f="code" style="width:210px"></td>
      <td class="name"><input type="text" value="${esc(s.name)}" data-sku="${i}" data-f="name" style="width:100%"></td>
      <td><input type="checkbox" data-sku="${i}" data-f="active" ${s.active?"checked":""}></td>
      <td><button class="btn btn-sm btn-ghost" data-del-sku="${i}">Delete</button></td>
    </tr>`).join("") || `<tr><td colspan="4" style="text-align:center;color:var(--ink-3);padding:20px">No matches</td></tr>`}</tbody>`;
}

function renderWhMaster(){
  $("#whCount").textContent = `${state.wh.filter(w => w.active).length} active / ${state.wh.length}`;
  const dsOpts = Object.entries(DS_LABEL).map(([k,v]) => [k,v]);
  $("#whMaster").innerHTML = `<thead><tr>
      <th style="text-align:left">Dataset</th><th style="text-align:left">Raw label in file</th>
      <th style="text-align:left">CFA (normalised)</th><th style="text-align:left">Stock type</th><th>Active</th><th></th>
    </tr></thead><tbody>${state.wh.map((w,i) => `<tr>
      <td><select data-wh="${i}" data-f="ds">${dsOpts.map(([k,v]) => `<option value="${k}" ${w.ds===k?"selected":""}>${v}</option>`).join("")}</select></td>
      <td class="name"><input type="text" value="${esc(w.raw)}" data-wh="${i}" data-f="raw" style="width:100%;min-width:320px"></td>
      <td><input type="text" value="${esc(w.cfa)}" data-wh="${i}" data-f="cfa" style="width:130px"></td>
      <td><select data-wh="${i}" data-f="type">${["FG","In Transit","n/a"].map(t => `<option ${w.type===t?"selected":""}>${t}</option>`).join("")}</select></td>
      <td><input type="checkbox" data-wh="${i}" data-f="active" ${w.active?"checked":""}></td>
      <td><button class="btn btn-sm btn-ghost" data-del-wh="${i}">Delete</button></td>
    </tr>`).join("")}</tbody>`;
}

/* ── logic tab ─────────────────────────────────────────────── */
function logicHtml(r){
  const pd = r ? r.projDays : "n";
  const md = r ? r.mtdDays : "D";
  return `
  <h3>Scope</h3>
  <p>Every figure is restricted to (a) item codes that are <strong>active in the CFA SKU Master</strong> and (b) warehouse / origin labels mapped to a CFA in the <strong>Warehouse Master</strong>. Matching is trimmed, case-insensitive, non-breaking spaces normalised. Anything unmapped is excluded and reported under Data diagnostics — never silently absorbed.</p>

  <h3>Condition 4 — In-hand stock, three measures</h3>
  <p>From the <em>In Hand</em> file, grouped by normalised CFA, summing <code>Balance Qty</code>:</p>
  <div class="formula">In Transit + FG = Σ Balance Qty where stock type ∈ {FG, In Transit}
FG              = Σ Balance Qty where stock type = FG
In Transit      = Σ Balance Qty where stock type = In Transit</div>
  <p>For CFA (BLR) that is <code>…Bangalore Finished Goods - CBSPL</code> and <code>…Bangalore-In Transit - CBSPL</code>; for CFA (GGN), <code>…Gurgaon Finished Goods - CBSPL</code> and <code>…Gurgaon In Transit - CBSPL</code>.</p>

  <h3>Condition 5 — Projection DRR</h3>
  <p>From the <em>Projection</em> file, grouped by the normalised <code>Wareouse</code> column:</p>
  <div class="formula">Projection DRR = Σ Total KGs ÷ ${pd}</div>
  <p>The divisor is the number of calendar days in the projection month${r ? ` — <strong>${esc(r.projMonthLabel)}</strong>, ${r.autoProjDays} days${r.ovProj ? `, manually overridden to ${r.ovProj}` : ""}` : ""}. Where a file spans several months, the latest month is used.</p>

  <h3>Condition 6 — Pendency + dispatch MTD DRR</h3>
  <p>From the <em>Dispatches plus pendencies</em> file, grouped by normalised <code>Origin</code>:</p>
  <div class="formula">Pendency   = Σ Pending Kgs   over rows where Pending Kgs &gt; 0
Dispatched = Σ Stock_qty    over rows where Pending Kgs = 0
MTD DRR    = (Pendency + Dispatched) ÷ ${md}</div>
  <p>Each row falls into <strong>one</strong> of the two, never both. A row that still has pending kilos counts as pendency; a row with none is fully delivered, so its <code>Stock_qty</code> is what actually went out. Counting both would double-count — in this feed <code>Stock_qty</code> equals <code>Pending Kgs</code> on every row that still has pending. Where a warehouse has no zero-pending row at all, Dispatched is <strong>nil</strong> and shows as “—”, not as a computed zero.</p>
  <p>Two divisor rules are available; the second was added alongside the first and neither changes any other figure:</p>
  <ol>
    <li><strong>Day-of-month of the maximum <code>Sales_Order_Date</code></strong> — the original rule, and the default.</li>
    <li><strong>That same day plus one for every distinct earlier date that carries CFA pendency or dispatch.</strong> Days with no
        orders in the latest month still count, because month-to-date means days elapsed. An earlier date earns its day only when at
        least one row on it is CFA-mapped, is an active CFA SKU, and has <code>Pending Kgs</code> <em>or</em> <code>Stock_qty</code>
        on it — so the date has to actually feed the numerator it will divide. A date belonging only to a non-CFA SKU or origin, or
        carrying nothing in either column, adds nothing. A file confined to one month adds nothing either and lands back on rule 1.</li>
  </ol>
  ${r && r.maxDate ? `<p>On the loaded file the max date is <strong>${ymd(r.maxDate)}</strong> → ${r.autoMtdDays}${
    r.priorDays ? `, and ${r.priorDays} earlier date(s) carry CFA pendency or dispatch, so rule 2 gives ${r.autoMtdDays} + ${r.priorDays} = <strong>${r.altMtdDays}</strong>${r.priorSkippedCount ? ` (${r.priorSkippedCount} earlier date(s) skipped for carrying none)` : ""}`
                : `, and no earlier date carries CFA pendency or dispatch, so both rules give <strong>${r.autoMtdDays}</strong>`
  }. In force: <strong>${r.mtdDays}</strong> day(s) — ${r.ovMtd ? "manual override" : r.mtdMode === "plusPrior" ? "rule 2" : "rule 1"}.</p>` : ""}
  <p> Dates arriving as text and as real dates are both parsed. No dispatch-status filter is applied: <code>Stock_qty</code> is taken as dispatched exactly as the Condition tab specifies.</p>

  <h3>Condition 7 — Final DRR</h3>
  <div class="formula">Final DRR = MAX(Projection DRR, MTD DRR)</div>
  <p>The table shows which of the two won, so an unusually high DOH can be traced back to a thin projection or a quiet month.</p>

  <h3>Condition 8 — DOH</h3>
  <div class="formula">DOH = Selected in-hand stock ÷ Final DRR</div>
  <p>Selected stock follows the toggle: In Transit + FG (default), FG only, or In Transit only. Where Final DRR is zero the DOH is shown as “—” rather than infinity.</p>

  <h3>Colour coding</h3>
  <ul>
    <li><strong>Red</strong> — DOH ≤ ${state.thRed} days (critical)</li>
    <li><strong>Amber</strong> — DOH ≤ ${state.thAmber} days (watch)</li>
    <li><strong>Green</strong> — above that (healthy)</li>
  </ul>

  <h3>Assumptions carried from the PRD</h3>
  <ul>
    <li>All four quantity columns are in <strong>kilograms</strong>; no unit conversion is applied.</li>
    <li>Projection <code>Origin</code> is the producing plant and is ignored; the CFA there is <code>Wareouse</code>.</li>
    <li>Dispatch rows outside the month of the max date are excluded while the “limit to month” setting is on.</li>
    <li>No dispatch-status filter, per Condition 6 as written.</li>
  </ul>`;
}

/* ── Excel export ──────────────────────────────────────────── */
async function exportExcel(){
  const r = state.result; if (!r) return;
  $("#btnExport").disabled = true; $("#btnExport").textContent = "Building…";
  try{
    const wb = new ExcelJS.Workbook();
    wb.creator = "CFA DOH Console";
    wb.created = new Date();

    const BRAND = "FF17603F", HEADFILL = "FFEFF3F0";
    const COL = i => String.fromCharCode(65 + i);   // 0 -> A
    const headerRow = (ws, rowIdx) => {
      const row = ws.getRow(rowIdx);
      row.font = {bold:true, color:{argb:"FFFFFFFF"}, size:10};
      row.fill = {type:"pattern", pattern:"solid", fgColor:{argb:BRAND}};
      row.alignment = {vertical:"middle", horizontal:"center", wrapText:true};
      row.height = 30;
    };
    const N = "#,##0.00";

    /* ── Sheet 1: warehouse summary, live formulas ── */
    const ws = wb.addWorksheet("Warehouse DOH", {views:[{state:"frozen", xSplit:1, ySplit:5}]});
    ws.mergeCells("A1:Q1");
    ws.getCell("A1").value = "CFA Warehouse-wise Days on Hand";
    ws.getCell("A1").font = {bold:true, size:15, color:{argb:BRAND}};
    ws.getCell("A3").value = "Stock basis";           ws.getCell("B3").value = activeBases().map(b => BASIS_LABEL[b]).join(" · ");
    ws.getCell("D3").value = "Projection divisor";    ws.getCell("E3").value = r.projDays;
    ws.getCell("F3").value = `(${r.projMonthLabel}${r.ovProj ? ", manual" : ", calendar days"})`;
    ws.getCell("H3").value = "MTD divisor";           ws.getCell("I3").value = r.mtdDays;
    ws.getCell("J3").value = `(max Sales_Order_Date ${r.maxDate ? ymd(r.maxDate) : "n/a"}${r.ovMtd ? ", manual" : ""})`;
    ws.getCell("L3").value = "Generated";             ws.getCell("M3").value = r.generatedAt.toLocaleString("en-IN");
    ["A3","D3","H3","L3"].forEach(c => ws.getCell(c).font = {bold:true, size:10});
    ["B3","E3","I3","M3"].forEach(c => ws.getCell(c).font = {bold:true, size:10, color:{argb:BRAND}});
    ["F3","J3"].forEach(c => ws.getCell(c).font = {size:9, italic:true, color:{argb:"FF7A857F"}});

    const bases = activeBases();
    const stockCol = {both:"B", fg:"C", it:"D"};
    // O onwards: one DOH column per selected basis. A single basis keeps the
    // Stock Basis / Selected Stock pair it has always had.
    const HEAD = ["Warehouse","In Transit + FG (kg)","FG (kg)","In Transit (kg)","Projection Kgs","Projection Days",
                  "Projection DRR","Pending Kgs","Dispatched Kgs","Pend + Disp","MTD Days","MTD DRR","Final DRR",
                  "DRR Source"].concat(
                  bases.length === 1 ? ["Stock Basis","Selected Stock","DOH (days)"]
                                     : bases.map(b => `DOH (days) — ${BASIS_LABEL[b]}`));
    ws.getRow(5).values = HEAD; headerRow(ws, 5);
    ws.columns = [{width:18},{width:17},{width:13},{width:13},{width:14},{width:13},{width:14},{width:13},{width:15},
                  {width:13},{width:11},{width:12},{width:12},{width:12}].concat(
                  bases.length === 1 ? [{width:16},{width:15},{width:12}] : bases.map(() => ({width:22})));

    const dohCols = bases.length === 1 ? ["Q"] : bases.map((_, i) => COL(14 + i));
    let rr = 6;
    const firstData = rr;
    for (const w of r.warehouses){
      const x = rr;
      ws.getRow(x).values = [w.cfa, w.both, w.fg, w.it, w.projKgs, r.projDays, null, w.pend,
                             w.dispNil ? null : w.disp, null, r.mtdDays, null, null, null];
      ws.getCell(`G${x}`).value = {formula:`IFERROR(E${x}/F${x},0)`};
      ws.getCell(`J${x}`).value = {formula:`H${x}+I${x}`};
      ws.getCell(`L${x}`).value = {formula:`IFERROR(J${x}/K${x},0)`};
      ws.getCell(`M${x}`).value = {formula:`MAX(G${x},L${x})`};
      ws.getCell(`N${x}`).value = {formula:`IF(M${x}=0,"-",IF(G${x}>=L${x},"Projection","MTD"))`};
      if (bases.length === 1){
        ws.getCell(`O${x}`).value = BASIS_LABEL[bases[0]];
        ws.getCell(`P${x}`).value = {formula:`${stockCol[bases[0]]}${x}`};
        ws.getCell(`Q${x}`).value = {formula:`IF($M${x}=0,"-",P${x}/$M${x})`};
        ws.getCell(`P${x}`).numFmt = N;
      } else {
        bases.forEach((b, i) => {
          const c = COL(14 + i);
          ws.getCell(`${c}${x}`).value = {formula:`IF($M${x}=0,"-",${stockCol[b]}${x}/$M${x})`};
        });
      }
      ["B","C","D","E","G","H","I","J","L","M"].concat(dohCols).forEach(c => ws.getCell(`${c}${x}`).numFmt = N);
      ws.getCell(`A${x}`).font = {bold:true};
      dohCols.forEach(c => ws.getCell(`${c}${x}`).font = {bold:true});
      rr++;
    }
    const lastData = rr - 1;
    const tot = rr + 1;
    ws.getCell(`A${tot}`).value = "TOTAL";
    ws.getCell(`A${tot}`).font = {bold:true};
    ["B","C","D","E","H","I","J"].forEach(c => {
      ws.getCell(`${c}${tot}`).value = {formula:`SUM(${c}${firstData}:${c}${lastData})`};
      ws.getCell(`${c}${tot}`).numFmt = N;
      ws.getCell(`${c}${tot}`).font = {bold:true};
    });
    ws.getRow(tot).border = {top:{style:"thin", color:{argb:BRAND}}};

    const bandRules = () => [
      {type:"cellIs", operator:"lessThanOrEqual", formulae:[String(state.thRed)],  priority:1,
       style:{fill:{type:"pattern",pattern:"solid",bgColor:{argb:"FFFDECEA"}}, font:{color:{argb:"FFC0392F"},bold:true}}},
      {type:"cellIs", operator:"lessThanOrEqual", formulae:[String(state.thAmber)], priority:2,
       style:{fill:{type:"pattern",pattern:"solid",bgColor:{argb:"FFFDF3E2"}}, font:{color:{argb:"FFA87F00"},bold:true}}},
      {type:"cellIs", operator:"greaterThan", formulae:[String(state.thAmber)], priority:3,
       style:{fill:{type:"pattern",pattern:"solid",bgColor:{argb:"FFE8F5EE"}}, font:{color:{argb:"FF1F7D53"},bold:true}}}
    ];
    dohCols.forEach(c => ws.addConditionalFormatting({ref:`${c}${firstData}:${c}${lastData}`, rules:bandRules()}));

    /* ── Sheet 2: SKU drilldown, live formulas ── */
    const ds = wb.addWorksheet("SKU Drilldown", {views:[{state:"frozen", ySplit:1}]});
    const dStock = {both:"D", fg:"E", it:"F"};
    const DHEAD = ["Warehouse","Item Code","Item Name","In Transit + FG","FG","In Transit","Projection Kgs","Projection Days",
                   "Projection DRR","Pending Kgs","Dispatched Kgs","Pend + Disp","MTD Days","MTD DRR","Final DRR","DRR Source"].concat(
                   bases.length === 1 ? ["Selected Stock","DOH (days)"]
                                      : bases.map(b => `DOH (days) — ${BASIS_LABEL[b]}`));
    ds.getRow(1).values = DHEAD; headerRow(ds, 1);
    ds.columns = [{width:14},{width:24},{width:52},{width:15},{width:12},{width:12},{width:14},{width:13},{width:14},
                  {width:13},{width:14},{width:13},{width:11},{width:12},{width:12},{width:12}].concat(
                  bases.length === 1 ? [{width:14},{width:12}] : bases.map(() => ({width:22})));
    ds.autoFilter = `A1:${COL(15 + (bases.length === 1 ? 2 : bases.length))}1`;
    const dDohCols = bases.length === 1 ? ["R"] : bases.map((_, i) => COL(16 + i));
    let dr = 2;
    for (const w of r.warehouses) for (const s of w.skuRows){
      const x = dr;
      ds.getRow(x).values = [w.cfa, s.code, s.name, s.both, s.fg, s.it, s.projKgs, r.projDays, null, s.pend,
                             s.dispNil ? null : s.disp, null, r.mtdDays, null, null, null];
      ds.getCell(`I${x}`).value = {formula:`IFERROR(G${x}/H${x},0)`};
      ds.getCell(`L${x}`).value = {formula:`J${x}+K${x}`};
      ds.getCell(`N${x}`).value = {formula:`IFERROR(L${x}/M${x},0)`};
      ds.getCell(`O${x}`).value = {formula:`MAX(I${x},N${x})`};
      ds.getCell(`P${x}`).value = {formula:`IF(O${x}=0,"-",IF(I${x}>=N${x},"Projection","MTD"))`};
      if (bases.length === 1){
        ds.getCell(`Q${x}`).value = {formula:`${dStock[bases[0]]}${x}`};
        ds.getCell(`R${x}`).value = {formula:`IF($O${x}=0,"-",Q${x}/$O${x})`};
        ds.getCell(`Q${x}`).numFmt = N;
      } else {
        bases.forEach((b, i) => ds.getCell(`${COL(16 + i)}${x}`).value =
          {formula:`IF($O${x}=0,"-",${dStock[b]}${x}/$O${x})`});
      }
      ["D","E","F","G","I","J","K","L","N","O"].concat(dDohCols).forEach(c => ds.getCell(`${c}${x}`).numFmt = N);
      dr++;
    }
    if (dr > 2) dDohCols.forEach(c => ds.addConditionalFormatting({ref:`${c}2:${c}${dr-1}`, rules:bandRules()}));

    /* ── Sheet 3: conditions & math ── */
    const lg = wb.addWorksheet("Logic & Conditions");
    lg.columns = [{width:5},{width:34},{width:118}];
    lg.mergeCells("A1:C1");
    lg.getCell("A1").value = "Conditions and the math behind every computed number";
    lg.getCell("A1").font = {bold:true, size:14, color:{argb:BRAND}};
    let lr = 3;
    const sec = t => { lg.getCell(`A${lr}`).value = t; lg.getCell(`A${lr}`).font = {bold:true, size:11, color:{argb:BRAND}}; lg.mergeCells(`A${lr}:C${lr}`); lr += 1; };
    const kv = (k,v,mono) => {
      lg.getCell(`B${lr}`).value = k; lg.getCell(`B${lr}`).font = {bold:true, size:10};
      lg.getCell(`B${lr}`).alignment = {vertical:"top"};
      const c = lg.getCell(`C${lr}`); c.value = v;
      c.alignment = {wrapText:true, vertical:"top"};
      if (mono) c.font = {name:"Consolas", size:10};
      lr += 1;
    };
    const gap = () => { lr += 1; };

    sec("Source of the rules");
    kv("Workbook", "Warehouse Wise Stock Qty and Stock Balance -Test — tabs: Condition, Normalisation, CFA Skus");
    kv("Generated", r.generatedAt.toLocaleString("en-IN"));
    gap();

    sec("Condition 2 & 3 — scope and normalisation");
    kv("SKU filter", `Only item codes active in the CFA SKU Master are counted — ${r.activeSkus} active codes at the time of export. Matching is trimmed and case-insensitive.`);
    kv("Warehouse filter", "Every raw warehouse / origin label is mapped to a normalised CFA in the Warehouse Master. Unmapped labels contribute nothing and are listed on the Exclusions sheet.");
    gap();

    sec("Condition 4 — in-hand stock");
    kv("In Transit + FG", "Σ Balance Qty over In Hand rows whose stock type is FG or In Transit, per CFA", true);
    kv("FG", "Σ Balance Qty where stock type = FG", true);
    kv("In Transit", "Σ Balance Qty where stock type = In Transit", true);
    kv("Excel columns", "Warehouse DOH!B (IT+FG), C (FG), D (In Transit) — summed in this app from the In Hand file");
    gap();

    sec("Condition 5 — projection DRR");
    kv("Formula", "Projection DRR = Σ Total KGs (grouped by normalised Wareouse) ÷ days in projection month", true);
    kv("Excel cell", "Warehouse DOH!G = IFERROR(E/F, 0)  →  Projection Kgs ÷ Projection Days", true);
    kv("Divisor used", `${r.projDays} day(s) — ${r.projMonthLabel}${r.ovProj ? " (manual override; calendar value was " + r.autoProjDays + ")" : " (calendar days of that month)"}`);
    gap();

    sec("Condition 6 — pendency + dispatch MTD DRR");
    kv("Formula", ["Pendency   = Σ Pending Kgs  over rows where Pending Kgs > 0",
                   "Dispatched = Σ Stock_qty   over rows where Pending Kgs = 0",
                   "MTD DRR    = (Pendency + Dispatched) ÷ day-of-month of MAX(Sales_Order_Date)"].join("\n"), true);
    kv("One bucket per row", "A row counts as EITHER pendency OR dispatched, never both. A row with pending kilos left is pendency; a row with none is fully delivered, so its Stock_qty is the dispatched figure. Counting both would double-count — in this feed Stock_qty equals Pending Kgs on every row that still has pending.");
    kv("Nil vs zero", "Where a warehouse (or SKU) has no zero-pending row at all, the Dispatched cell is left EMPTY — nil, not a computed zero. Column J still adds correctly across an empty cell.");
    kv("Excel cells", "Warehouse DOH!J = H+I  (Pend + Disp)\nWarehouse DOH!L = IFERROR(J/K, 0)  (÷ MTD Days)", true);
    kv("Divisor rule", [
      "1. day-of-month of MAX(Sales_Order_Date)                       <- default",
      "2. that day + one per distinct earlier date carrying CFA pendency or dispatch",
      "   (earlier date counts only if some row on it is CFA-mapped, is an active",
      "    CFA SKU, and has Pending Kgs OR Stock_qty — it must feed the numerator)",
      "A single-month file gives the same answer either way."].join(String.fromCharCode(10)), true);
    kv("Divisor used", `${r.mtdDays} day(s)${r.maxDate ? ` — max Sales_Order_Date ${ymd(r.maxDate)} gives ${r.autoMtdDays}` : ""}` +
      (r.priorDays ? `; ${r.priorDays} earlier date(s) carry CFA pendency or dispatch (${r.priorDatesList.join(", ")}) so rule 2 gives ${r.altMtdDays}${r.priorSkippedCount ? `, with ${r.priorSkippedCount} earlier date(s) skipped for carrying none` : ""}`
                   : (r.monthsSpanned > 1 ? "; earlier months are present but none carries CFA pendency, so both rules agree"
                                          : "; the file holds one month only, so both rules agree")) +
      `. In force: ${r.ovMtd ? "manual override" : r.mtdMode === "plusPrior" ? "rule 2" : "rule 1"}.`);
    kv("Row scope", r.limitMonth
      ? `Dispatch rows are limited to the month of the max date; ${fmt0(r.outOfMonth)} row(s) fell outside and were excluded.`
      : "All dispatch rows are included regardless of month.");
    kv("Status filter", "None on Dispatch_Status itself. The zero-pending test is what separates delivered from outstanding, and it does so per row rather than per order.");
    gap();

    sec("Condition 7 — final DRR");
    kv("Formula", "Final DRR = MAX(Projection DRR, MTD DRR)", true);
    kv("Excel cell", "Warehouse DOH!M = MAX(G, L);  source flag N = IF(M=0,\"-\",IF(G>=L,\"Projection\",\"MTD\"))", true);
    gap();

    sec("Condition 8 — DOH");
    kv("Formula", "DOH = selected in-hand stock ÷ Final DRR", true);
    kv("Excel cells", bases.length === 1
      ? `Warehouse DOH!P = ${stockCol[bases[0]]} (the stock column for the chosen basis)\nWarehouse DOH!Q = IF($M=0,"-",P/$M)`
      : bases.map((b, i) => `Warehouse DOH!${COL(14 + i)} = IF($M=0,"-",${stockCol[b]}/$M)   ${BASIS_LABEL[b]}`).join("\n"), true);
    kv("Bases in this export", activeBases().map(b => BASIS_LABEL[b]).join(" · ") +
       (activeBases().length > 1 ? " — one DOH column each, every one a live formula over the same Final DRR" : ""));
    kv("Zero DRR", "Where Final DRR is 0 the DOH prints as \"-\" rather than a division error.");
    gap();

    sec("Colour coding");
    kv("Red", `DOH ≤ ${state.thRed} days — critical`);
    kv("Amber", `DOH ≤ ${state.thAmber} days — watch`);
    kv("Green", `DOH above ${state.thAmber} days — healthy`);
    kv("Applied as", "Conditional formatting on column Q (Warehouse DOH) and column R (SKU Drilldown), so it re-evaluates if you edit the inputs.");
    gap();

    sec("Assumptions");
    kv("Units", "Balance Qty, Total KGs, Pending Kgs and Stock_qty are all treated as kilograms; no conversion factor is applied.");
    kv("Projection Origin", "Ignored — it is the producing plant. The CFA in the projection file is the Wareouse column.");
    kv("Dates", "Sales_Order_Date is parsed from text (YYYY-MM-DD or DD/MM/YYYY), real dates and Excel serials alike.");
    gap();

    sec("Pivots sheet");
    kv("What it is", "The same filtered rows as every other sheet, grouped a different way each time: by CFA warehouse, item group, MIS item group, item parent, item type, customer group, customer, shipping state, and warehouse x item group.");
    kv("Measures", "FG, In Transit, IT + FG, Projection Kgs, Pendency, Dispatched and Pend + Disp are summed; Pend + Disp, both DRRs, Final DRR and DOH are live formulas on every row, using the same divisors as the rest of the workbook.");
    kv("Stock attribution", "Item group, MIS item group, item parent and item type travel with the item code, so in-hand stock is attributed to them. Customer, customer group and shipping state belong to an order line rather than to stock, so those pivots carry the flow measures only and their stock and DOH cells are left empty. Shipping state is absent from the Projection file too, so that pivot has no Projection Kgs and its Final DRR is the MTD rate. Each section header states which of these apply.");
    kv("DOH basis", `Computed on ${BASIS_LABEL[primaryBasis()]} — the first stock basis selected on the dashboard.`);
    gap();

    sec("How to re-check a number by hand");
    kv("Any DOH cell", "Every cell in columns G, J, L, M, N, P and Q is a live formula over the raw sums in B–K. Change a divisor in F or K and the whole row re-computes — nothing on this sheet is a hardcoded result.", true);

    /* ── Sheet 4: pivots ── */
    const pv = wb.addWorksheet("Pivots", {views:[{state:"frozen", ySplit:2}]});
    pv.columns = [{width:42},{width:10},{width:13},{width:13},{width:14},{width:14},{width:13},{width:13},
                  {width:13},{width:9},{width:13},{width:9},{width:12},{width:12},{width:14},{width:12}];
    pv.mergeCells("A1:P1");
    pv.getCell("A1").value = "Pivots — every group-by over the same filtered rows as the rest of the workbook";
    pv.getCell("A1").font = {bold:true, size:14, color:{argb:BRAND}};
    const PHEAD = ["Group","SKU lines","FG (kg)","In Transit (kg)","IT + FG (kg)","Projection Kgs","Pendency Kgs",
                   "Dispatched Kgs","Pend + Disp","Proj Days","Projection DRR","MTD Days","MTD DRR","Final DRR",
                   `Selected Stock (${BASIS_LABEL[primaryBasis()]})`,"DOH (days)"];
    const pStock = {both:"E", fg:"C", it:"D"}[primaryBasis()];

    let pr = 3;
    const pivotOrder = ["Warehouse", ...PIVOT_DIMS.map(d => d.label), "Warehouse x item group"];
    for (const name of pivotOrder){
      const m = r.pivots.get(name);
      if (!m || !m.size) continue;
      const hasStock = [...m.values()].some(a => a.both || a.fg || a.it);
      const hasProj  = [...m.values()].some(a => a.projKgs);
      const caveats = [
        hasStock ? null : "the In Hand file carries no such column, so stock and DOH cannot be attributed",
        hasProj  ? null : "the Projection file carries no such column, so Projection Kgs is nil and Final DRR falls back to MTD"
      ].filter(Boolean);

      pv.mergeCells(`A${pr}:P${pr}`);
      pv.getCell(`A${pr}`).value = `Group by ${name.toLowerCase()}${caveats.length ? "  —  " + caveats.join("; ") : ""}`;
      pv.getCell(`A${pr}`).font = {bold:true, size:11, color:{argb:BRAND}};
      pv.getCell(`A${pr}`).fill = {type:"pattern", pattern:"solid", fgColor:{argb:HEADFILL}};
      pr += 1;

      pv.getRow(pr).values = PHEAD; headerRow(pv, pr);
      pr += 1;

      const rows = [...m.entries()].sort((a, b) =>
        (b[1].pend + b[1].disp + b[1].projKgs) - (a[1].pend + a[1].disp + a[1].projKgs));
      const first = pr;
      for (const [key, a] of rows){
        const x = pr;
        pv.getRow(x).values = [key, a.skus.size,
          hasStock ? a.fg : null, hasStock ? a.it : null, hasStock ? a.both : null,
          hasProj ? a.projKgs : null, a.pend, a.disp, null, hasProj ? r.projDays : null, null, r.mtdDays, null, null, null, null];
        pv.getCell(`I${x}`).value = {formula:`G${x}+H${x}`};
        pv.getCell(`K${x}`).value = {formula:`IFERROR(F${x}/J${x},0)`};
        pv.getCell(`M${x}`).value = {formula:`IFERROR(I${x}/L${x},0)`};
        pv.getCell(`N${x}`).value = {formula:`MAX(K${x},M${x})`};
        if (hasStock){
          pv.getCell(`O${x}`).value = {formula:`${pStock}${x}`};
          pv.getCell(`P${x}`).value = {formula:`IF($N${x}=0,"-",O${x}/$N${x})`};
        }
        ["C","D","E","F","G","H","I","K","M","N","O","P"].forEach(c => pv.getCell(`${c}${x}`).numFmt = N);
        pr += 1;
      }
      const last = pr - 1;
      pv.getCell(`A${pr}`).value = "Total";
      pv.getCell(`A${pr}`).font = {bold:true};
      ["C","D","E","F","G","H","I"].forEach(c => {
        if (!hasStock && "CDE".includes(c)) return;
        if (!hasProj && c === "F") return;
        pv.getCell(`${c}${pr}`).value = {formula:`SUM(${c}${first}:${c}${last})`};
        pv.getCell(`${c}${pr}`).numFmt = N;
        pv.getCell(`${c}${pr}`).font = {bold:true};
      });
      pv.getRow(pr).border = {top:{style:"thin", color:{argb:BRAND}}};
      if (hasStock && last >= first)
        pv.addConditionalFormatting({ref:`P${first}:P${last}`, rules:bandRules()});
      pr += 2;
    }

    /* ── Sheet 4: exclusions ── */
    const ex = wb.addWorksheet("Exclusions");
    ex.columns = [{width:24},{width:60},{width:16},{width:40}];
    ex.getRow(1).values = ["Dataset","Raw label (unmapped)","Rows","Effect"]; headerRow(ex, 1);
    let er = 2;
    for (const dsk of ["inhand","projection","dispatch"]){
      for (const [label,count] of [...r.diag.unmapped[dsk].entries()].sort((a,b) => b[1]-a[1])){
        ex.getRow(er++).values = [DS_LABEL[dsk], label, count, "Not mapped to a CFA — excluded from all figures"];
      }
    }
    er += 1;
    ex.getCell(`A${er}`).value = "Row counts"; ex.getCell(`A${er}`).font = {bold:true, color:{argb:BRAND}};
    er += 1;
    ex.getRow(er++).values = ["Dataset","Rows used","Dropped: not a CFA SKU",""];
    for (const dsk of ["inhand","projection","dispatch"])
      ex.getRow(er++).values = [DS_LABEL[dsk], r.diag.kept[dsk], r.diag.nonSku[dsk], dsk === "dispatch" && r.limitMonth ? `${r.outOfMonth} also dropped as outside the max month` : ""];

    /* ── Sheet 5: masters ── */
    const ms = wb.addWorksheet("Masters");
    ms.columns = [{width:26},{width:58},{width:16},{width:14},{width:10}];
    ms.getRow(1).values = ["CFA SKU MASTER","","","",""];
    ms.getCell("A1").font = {bold:true, size:12, color:{argb:BRAND}};
    ms.getRow(2).values = ["Item Code","Item Name","Active","",""]; headerRow(ms, 2);
    let mr = 3;
    state.skus.forEach(s => ms.getRow(mr++).values = [s.code, s.name, s.active ? "Yes" : "No", "", ""]);
    mr += 1;
    ms.getCell(`A${mr}`).value = "WAREHOUSE MASTER"; ms.getCell(`A${mr}`).font = {bold:true, size:12, color:{argb:BRAND}};
    mr += 1;
    ms.getRow(mr).values = ["Dataset","Raw label in file","CFA (normalised)","Stock type","Active"];
    headerRow(ms, mr); mr += 1;
    state.wh.forEach(w => ms.getRow(mr++).values = [DS_LABEL[w.ds], w.raw, w.cfa, w.type, w.active ? "Yes" : "No"]);

    const buf = await wb.xlsx.writeBuffer();
    const blob = new Blob([buf], {type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CFA_DOH_${ymd(r.generatedAt)}.xlsx`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast("Excel exported with live formulas");
  }catch(err){
    console.error(err);
    toast("Export failed: " + err.message, true);
  }finally{
    $("#btnExport").disabled = false; $("#btnExport").textContent = "Export Excel";
  }
}

/* ── CSV helpers ───────────────────────────────────────────── */
function downloadCsv(name, rows){
  const csv = rows.map(r => r.map(c => {
    const s = String(c ?? "");
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
  }).join(",")).join("\r\n");
  const blob = new Blob(["﻿" + csv], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* ── wiring ────────────────────────────────────────────────── */
function syncBasisToggle(){
  $$("#basisToggle .seg-btn").forEach(b => {
    const on = state.bases.includes(b.dataset.basis);
    b.classList.toggle("is-on", on);
    b.setAttribute("aria-pressed", on);
  });
}

function showView(v){
  $$(".tab").forEach(t => t.classList.toggle("is-active", t.dataset.view === v));
  $$(".view").forEach(s => s.classList.toggle("is-active", s.id === "view-" + v));
  if (v === "skus") renderSkuMaster();
  if (v === "wh") renderWhMaster();
  if (v === "logic") $("#logicBody").innerHTML = logicHtml(state.result);
  window.scrollTo({top:0});
}

function init(){
  loadMasters();
  $("#thRed").value = state.thRed; $("#thAmber").value = state.thAmber; $("#mtdMode").value = state.mtdMode;
  syncBasisToggle();
  renderFileTable(); renderSkuMaster(); renderWhMaster(); vizInit(); renderViz();
  $("#logicBody").innerHTML = logicHtml(null);

  $("#tabs").addEventListener("click", e => { const t = e.target.closest(".tab"); if (t) showView(t.dataset.view); });
  document.addEventListener("click", e => { const g = e.target.closest("[data-goto]"); if (g) showView(g.dataset.goto); });

  /* file pickers + drag and drop */
  $$(".drop").forEach(d => {
    const input = d.querySelector("input[type=file]");
    d.querySelector("button").addEventListener("click", () => input.click());
    input.addEventListener("change", () => { if (input.files[0]) handleFile(d.dataset.ds, input.files[0]); input.value = ""; });
    ["dragenter","dragover"].forEach(ev => d.addEventListener(ev, e => { e.preventDefault(); d.classList.add("over"); }));
    ["dragleave","drop"].forEach(ev => d.addEventListener(ev, e => { e.preventDefault(); d.classList.remove("over"); }));
    d.addEventListener("drop", e => { const f = e.dataTransfer.files[0]; if (f) handleFile(d.dataset.ds, f); });
  });

  /* basis + thresholds */
  $("#basisToggle").addEventListener("click", e => {
    const b = e.target.closest(".seg-btn"); if (!b) return;
    const k = b.dataset.basis, on = state.bases.includes(k);
    if (on && state.bases.length === 1){        // never leave the dashboard with no basis
      toast("Keep at least one stock basis selected");
      return;
    }
    state.bases = on ? state.bases.filter(x => x !== k) : [...state.bases, k];
    if (!state.bases.includes(state.vizBasis)) state.vizBasis = primaryBasis();
    saveMasters(); syncBasisToggle(); compute();
  });
  const thChange = () => {
    state.thRed = num($("#thRed").value); state.thAmber = num($("#thAmber").value);
    saveMasters(); if (state.result) render();
    $("#logicBody").innerHTML = logicHtml(state.result);
  };
  $("#thRed").addEventListener("change", thChange);
  $("#thAmber").addEventListener("change", thChange);
  $("#btnExport").addEventListener("click", exportExcel);

  /* settings */
  ["#projDays","#mtdDays"].forEach(s => $(s).addEventListener("change", compute));
  $("#mtdMode").addEventListener("change", e => { state.mtdMode = e.target.value; saveMasters(); compute(); });
  $("#limitMonth").addEventListener("change", compute);

  /* drilldown filters */
  $("#whFilter").addEventListener("change", e => { state.skuFilterWh = e.target.value; renderSkuTable(state.result); });
  $("#skuSearch").addEventListener("input", e => { state.skuQuery = e.target.value; renderSkuTable(state.result); });

  /* SKU master */
  $("#skuMasterSearch").addEventListener("input", renderSkuMaster);
  $("#skuMaster").addEventListener("input", e => {
    const i = e.target.dataset.sku; if (i == null) return;
    const f = e.target.dataset.f;
    state.skus[i][f] = f === "active" ? e.target.checked : e.target.value;
    saveMasters();
    if (f === "active" || f === "code") compute();
    $("#skuCount").textContent = `${state.skus.filter(s => s.active).length} active / ${state.skus.length}`;
  });
  $("#skuMaster").addEventListener("click", e => {
    const i = e.target.dataset.delSku; if (i == null) return;
    state.skus.splice(i,1); saveMasters(); renderSkuMaster(); compute(); toast("SKU removed");
  });
  $("#skuAdd").addEventListener("click", () => {
    state.skus.unshift({code:"", name:"", active:true});
    $("#skuMasterSearch").value = ""; saveMasters(); renderSkuMaster();
    $("#skuMaster").querySelector("input")?.focus();
  });
  $("#skuExport").addEventListener("click", () =>
    downloadCsv("CFA_SKU_Master.csv", [["Item Code","Item Name","Active"], ...state.skus.map(s => [s.code, s.name, s.active ? "Yes" : "No"])]));
  $("#skuReset").addEventListener("click", () => {
    if (!confirm("Replace the SKU master with the 80 SKUs from the source workbook? Your edits will be lost.")) return;
    state.skus = structuredClone(SEED_SKUS); saveMasters(); renderSkuMaster(); compute(); toast("SKU master reset");
  });
  $("#skuImport").addEventListener("click", () => $("#csvPicker").click());
  $("#csvPicker").addEventListener("change", async e => {
    const f = e.target.files[0]; if (!f) return;
    const text = await f.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    const out = [];
    lines.forEach((l,i) => {
      const cells = l.match(/("([^"]|"")*"|[^,]*)(,|$)/g)?.map(c => c.replace(/,$/,"").replace(/^"|"$/g,"").replace(/""/g,'"').trim()) ?? [];
      if (i === 0 && norm(cells[0]).includes("item")) return;
      if (cells[0]) out.push({code:cells[0], name:cells[1] || "", active:!cells[2] || /^(y|yes|true|1)$/i.test(cells[2])});
    });
    if (!out.length){ toast("No rows found in that CSV", true); return; }
    state.skus = out; saveMasters(); renderSkuMaster(); compute();
    toast(`Imported ${out.length} SKUs`);
    e.target.value = "";
  });

  /* Warehouse master */
  $("#whMaster").addEventListener("input", e => {
    const i = e.target.dataset.wh; if (i == null) return;
    const f = e.target.dataset.f;
    state.wh[i][f] = f === "active" ? e.target.checked : e.target.value;
    saveMasters(); compute();
    $("#whCount").textContent = `${state.wh.filter(w => w.active).length} active / ${state.wh.length}`;
  });
  $("#whMaster").addEventListener("change", e => {
    const i = e.target.dataset.wh; if (i == null || e.target.tagName !== "SELECT") return;
    state.wh[i][e.target.dataset.f] = e.target.value; saveMasters(); compute();
  });
  $("#whMaster").addEventListener("click", e => {
    const i = e.target.dataset.delWh; if (i == null) return;
    state.wh.splice(i,1); saveMasters(); renderWhMaster(); compute(); toast("Mapping removed");
  });
  $("#whAdd").addEventListener("click", () => {
    state.wh.push({ds:"inhand", raw:"", cfa:"", type:"FG", active:true});
    saveMasters(); renderWhMaster();
  });
  $("#whExport").addEventListener("click", () =>
    downloadCsv("Warehouse_Master.csv", [["Dataset","Raw label","CFA","Stock type","Active"],
      ...state.wh.map(w => [DS_LABEL[w.ds], w.raw, w.cfa, w.type, w.active ? "Yes" : "No"])]));
  $("#whReset").addEventListener("click", () => {
    if (!confirm("Restore the 8 warehouse mappings from the Normalisation tab? Your edits will be lost.")) return;
    state.wh = structuredClone(SEED_WH); saveMasters(); renderWhMaster(); compute(); toast("Warehouse master reset");
  });
}

init();
