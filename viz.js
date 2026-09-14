/* ══════════════════════════════════════════════════════════════
   Visualisation tab — hand-built SVG, no chart library.

   Colour rules (dataviz method):
   · Status (red / amber / green) means a DOH band and nothing else.
     It never carries identity, and every status mark is also labelled
     in text — the trio cannot clear the CVD gate on hue alone, so the
     label is the mitigation, plus a table view on every chart.
   · Categorical slots 1 and 2 (blue / orange) carry identity only —
     projection vs MTD, FG vs In Transit. Validated both modes.
   · One filter row scopes every chart. One axis per chart, never two.
   ══════════════════════════════════════════════════════════════ */

const VIZ_W = 880;
let VT = [];                                   // tooltip payloads for this render

const tipId   = p => (VT.push(p), VT.length - 1);
const svgEsc  = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const clip    = (s, n) => { s = String(s ?? ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; };
const bandCls = d => d == null ? "f-track" : d <= state.thRed ? "f-red" : d <= state.thAmber ? "f-amber" : "f-green";
const bandName= d => d == null ? "no demand" : d <= state.thRed ? "Critical" : d <= state.thAmber ? "Watch" : "Healthy";

/* bar with the data-end rounded and the baseline end square */
function barH(x, y, w, h, r = 4){
  w = Math.max(w, 0);
  if (w <= r) return `M${x},${y}h${w}v${h}h${-w}z`;
  return `M${x},${y}h${w - r}a${r},${r} 0 0 1 ${r},${r}v${h - 2*r}a${r},${r} 0 0 1 ${-r},${r}h${-(w - r)}z`;
}
function barV(x, y, w, h, r = 4){
  h = Math.max(h, 0);
  if (h <= r) return `M${x},${y + h}h${w}v${-h}h${-w}z`;
  return `M${x},${y + h}v${-(h - r)}a${r},${r} 0 0 1 ${r},${-r}h${w - 2*r}a${r},${r} 0 0 1 ${r},${r}v${h - r}z`;
}
const svg = (w, h, inner) => `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMinYMin meet" role="img" style="max-width:${w}px">${inner}</svg>`;
const empty = msg => `<p class="vizempty">${svgEsc(msg)}</p>`;

/* nice round tick step for an axis */
function ticks(max, count = 4){
  if (!(max > 0)) return [0];
  const raw = max / count, mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) || 10 * mag;
  const out = [];
  for (let v = 0; v <= max + step * 0.001; v += step) out.push(v);
  return out;
}

/* ── the slice every chart reads ─────────────────────────────── */
function vizSlice(){
  const r = state.result;
  const whs = state.vizWh === "ALL" ? r.warehouses : r.warehouses.filter(w => w.cfa === state.vizWh);
  const skus = [];
  whs.forEach(w => w.skuRows.forEach(s => skus.push({...s, cfa: w.cfa})));
  return {whs, skus, multi: whs.length > 1};
}

/* ══════════ tiles ══════════ */
function vizTiles(sl){
  const crit  = sl.skus.filter(s => s.doh != null && s.doh <= state.thRed);
  const worst = sl.whs.reduce((a, w) => a == null || (w.doh ?? 1e9) < (a.doh ?? 1e9) ? w : a, null);
  const dead  = sl.skus.filter(s => s.finalDRR > 0 && s.sel <= 0);
  const risk  = crit.reduce((a, s) => a + s.sel, 0);
  const tile = (cls, h, val, unit, meta) => `<div class="kpi ${cls}">
      <h3>${h}</h3><div class="val">${val}${unit ? `<span style="font-size:15px;font-weight:600;color:var(--ink-2)"> ${unit}</span>` : ""}</div>
      <div class="meta">${meta}</div></div>`;

  $("#vizTiles").innerHTML =
    tile(crit.length ? "red" : "green", "Critical SKU lines", fmt0(crit.length), `of ${fmt0(sl.skus.filter(s => s.doh != null).length)}`,
         `<span>at or below <b>${state.thRed}</b> days of cover</span>`) +
    tile(bandOf(worst?.doh), "Weakest warehouse", worst ? fmt(worst.doh, 1) : "—", "days",
         `<span><b>${svgEsc(worst?.cfa ?? "—")}</b></span><span>${bandName(worst?.doh)}</span>`) +
    tile(risk ? "amber" : "green", "Stock behind critical lines", fmt0(risk), "kg",
         `<span>held by SKUs under the red threshold</span>`) +
    tile(dead.length ? "red" : "green", "Selling with no stock", fmt0(dead.length), "SKUs",
         `<span>demand on the books, ${BASIS_LABEL[state.vizBasis].toLowerCase()} at zero</span>`);
}

/* ══════════ 1 · critical SKUs ══════════ */
/* HTML rows rather than SVG: a long list keeps real type at any card width. */
function chartCritical(sl){
  const rows = sl.skus.filter(s => s.doh != null && s.doh <= state.thRed).sort((a, b) => a.doh - b.doh);
  $("#criticalNote").textContent = rows.length
    ? `${rows.length} SKU line(s) at or below ${state.thRed} days, worst first. Bars run 0 to ${state.thRed} days.`
    : `No SKU is at or below ${state.thRed} days of cover on this slice.`;
  if (!rows.length) return {html: empty("Nothing critical here."), rows};

  const html = `<div class="barlist${sl.multi ? " has-wh" : ""}">` + rows.map(s => {
    const pct = state.thRed > 0 ? Math.max((s.doh / state.thRed) * 100, 1.2) : 1.2;
    const t = tipId({title: `${s.code} — ${s.name}`, rows: [
      ["Warehouse", s.cfa], ["DOH", fmt(s.doh, 1) + " days"], ["Band", bandName(s.doh)],
      [BASIS_LABEL[state.vizBasis], fmt(s.sel) + " kg"], ["Final DRR", fmt(s.finalDRR) + " kg/day"], ["Driven by", s.drrSrc]
    ]});
    return `<div class="barrow" data-t="${t}" tabindex="0">
      <span class="b-code">${svgEsc(s.code)}</span>
      ${sl.multi ? `<span class="b-wh">${svgEsc(s.cfa)}</span>` : ""}
      <span class="b-track"><i class="b-fill red" style="width:${pct.toFixed(2)}%"></i></span>
      <span class="b-val">${fmt(s.doh, 1)}</span>
      <span class="b-note">${fmt0(s.sel)} kg · ${fmt(s.finalDRR, 0)} kg/day</span>
    </div>`;
  }).join("") + "</div>";
  return {html, rows};
}

/* ══════════ 2 · bullet — cover against thresholds ══════════ */
function chartBullet(sl){
  const W = 520, rowH = 46, h = sl.whs.length * rowH + 26;
  const labW = 104, x0 = labW + 8, trackW = W - x0 - 54;
  const max = Math.max(state.thAmber * 2, ...sl.whs.map(w => w.doh ?? 0)) || 1;
  const sx = v => x0 + Math.min(v / max, 1) * trackW;
  let g = "";
  for (const [i, w] of sl.whs.entries()){
    const y = i * rowH + 8;
    const t = tipId({title: w.cfa, rows: [
      ["DOH", w.doh == null ? "—" : fmt(w.doh, 1) + " days"], ["Band", bandName(w.doh)],
      [BASIS_LABEL[state.vizBasis], fmt(w.sel) + " kg"], ["Final DRR", fmt(w.finalDRR) + " kg/day"], ["Driven by", w.drrSrc]
    ]});
    g += `<text class="catlabel strong" x="0" y="${y + 21}">${svgEsc(w.cfa)}</text>`
      +  `<rect class="band-red" x="${x0}" y="${y + 8}" width="${sx(state.thRed) - x0}" height="22" rx="3"/>`
      +  `<rect class="band-amber" x="${sx(state.thRed) + 2}" y="${y + 8}" width="${sx(state.thAmber) - sx(state.thRed) - 2}" height="22" rx="3"/>`
      +  `<rect class="band-green" x="${sx(state.thAmber) + 2}" y="${y + 8}" width="${x0 + trackW - sx(state.thAmber) - 2}" height="22" rx="3"/>`
      +  `<path class="${bandCls(w.doh)}" d="${barH(x0, y + 14, Math.max(sx(w.doh ?? 0) - x0, 3), 10, 4)}"/>`
      +  `<text class="marklabel" x="${x0 + trackW + 8}" y="${y + 23}">${w.doh == null ? "—" : fmt(w.doh, 1)}</text>`
      +  `<rect class="hit" x="0" y="${y}" width="${W}" height="${rowH}" data-t="${t}" tabindex="0"/>`;
  }
  const axis = [0, state.thRed, state.thAmber, max].map(v =>
    `<text class="axistext" x="${sx(v)}" y="${h - 4}" text-anchor="middle">${fmt(v, 0)}</text>`).join("");
  return {svg: svg(W, h, g + axis + `<text class="axistext" x="${x0 + trackW + 8}" y="${h - 4}">days</text>`)};
}

/* ══════════ 3 · distribution across bands ══════════ */
function distBins(){
  const r = state.thRed, a = state.thAmber;
  return [
    {label: "0",            test: d => d === 0,         cls: "f-red"},
    {label: `0–${r/2}`,     test: d => d > 0 && d <= r/2, cls: "f-red"},
    {label: `${r/2}–${r}`,  test: d => d > r/2 && d <= r, cls: "f-red"},
    {label: `${r}–${a}`,    test: d => d > r && d <= a,   cls: "f-amber"},
    {label: `${a}–${a*2}`,  test: d => d > a && d <= a*2, cls: "f-green"},
    {label: `${a*2}+`,      test: d => d > a*2,           cls: "f-green"}
  ];
}
function chartDist(sl){
  const bins = distBins();
  const vals = sl.skus.filter(s => s.doh != null).map(s => s.doh);
  const counts = bins.map(b => vals.filter(b.test).length);
  if (!vals.length) return {svg: empty("No SKU has demand on this slice."), bins, counts};

  const W = 520, H = 250, padL = 34, padB = 44, padT = 18;
  const max = Math.max(...counts, 1), plotH = H - padB - padT, plotW = W - padL - 10;
  const bw = plotW / bins.length;
  let g = ticks(max).map(v => {
    const y = padT + plotH - (v / max) * plotH;
    return `<line class="gridline" x1="${padL}" y1="${y}" x2="${W - 10}" y2="${y}"/>`
         + `<text class="axistext" x="${padL - 6}" y="${y + 4}" text-anchor="end">${fmt0(v)}</text>`;
  }).join("");
  bins.forEach((b, i) => {
    const c = counts[i], bh = (c / max) * plotH, x = padL + i * bw + 9, w = bw - 18;
    const t = tipId({title: `${b.label} days of cover`, rows: [["SKU lines", fmt0(c)], ["Band", b.cls === "f-red" ? "Critical" : b.cls === "f-amber" ? "Watch" : "Healthy"]]});
    g += `<path class="${b.cls}" d="${barV(x, padT + plotH - bh, w, bh, 4)}"/>`
      +  (c ? `<text class="marklabel" x="${x + w/2}" y="${padT + plotH - bh - 6}" text-anchor="middle">${fmt0(c)}</text>` : "")
      +  `<text class="axistext" x="${x + w/2}" y="${padT + plotH + 16}" text-anchor="middle">${svgEsc(b.label)}</text>`
      +  `<rect class="hit" x="${padL + i*bw}" y="${padT}" width="${bw}" height="${plotH}" data-t="${t}" tabindex="0"/>`;
  });
  g += `<line class="axisline" x1="${padL}" y1="${padT + plotH}" x2="${W - 10}" y2="${padT + plotH}"/>`
    +  `<text class="axistext" x="${padL + plotW/2}" y="${H - 6}" text-anchor="middle">days of cover</text>`;
  return {svg: svg(W, H, g), bins, counts};
}

/* ══════════ 4 · projection vs MTD DRR ══════════ */
function chartDrr(sl){
  const W = 520, rowH = 74, H = sl.whs.length * rowH + 34;
  const labW = 104, x0 = labW + 8, plotW = W - x0 - 78;
  const max = Math.max(...sl.whs.flatMap(w => [w.projDRR, w.mtdDRR]), 1);
  let g = ticks(max).map(v => {
    const x = x0 + (v / max) * plotW;
    return `<line class="gridline" x1="${x}" y1="6" x2="${x}" y2="${H - 26}"/>`
         + `<text class="axistext" x="${x}" y="${H - 10}" text-anchor="middle">${fmt0(v)}</text>`;
  }).join("");
  sl.whs.forEach((w, i) => {
    const y = i * rowH + 12;
    [["Projection DRR", w.projDRR, "f-s1", 0], ["MTD DRR", w.mtdDRR, "f-s2", 26]].forEach(([name, v, cls, dy]) => {
      const t = tipId({title: `${w.cfa} — ${name}`, rows: [
        ["Rate", fmt(v) + " kg/day"],
        name === "Projection DRR" ? ["Projection Kgs", fmt(w.projKgs)] : ["Pend + Disp", fmt(w.pdSum)],
        ["Divided by", (name === "Projection DRR" ? state.result.projDays : state.result.mtdDays) + " days"],
        ["Final DRR", fmt(w.finalDRR) + " kg/day"], ["Winner", w.drrSrc]
      ]});
      g += `<path class="${cls}" d="${barH(x0, y + dy, Math.max((v / max) * plotW, 3), 20, 4)}"/>`
        +  `<text class="marklabel" x="${x0 + (v / max) * plotW + 8}" y="${y + dy + 14}">${fmt(v, 0)}</text>`
        +  `<rect class="hit" x="${x0}" y="${y + dy - 3}" width="${plotW + 70}" height="26" data-t="${t}" tabindex="0"/>`;
    });
    g += `<text class="catlabel strong" x="0" y="${y + 16}">${svgEsc(w.cfa)}</text>`
      +  `<text class="catlabel" x="0" y="${y + 34}" style="font-size:11px">wins: ${svgEsc(w.drrSrc)}</text>`;
  });
  g += `<line class="axisline" x1="${x0}" y1="${H - 26}" x2="${W - 8}" y2="${H - 26}"/>`;
  return {svg: svg(W, H, g)};
}

/* ══════════ 5 · FG vs In Transit ══════════ */
function chartSplit(sl){
  const W = 520, rowH = 58, H = sl.whs.length * rowH + 30;
  const labW = 104, x0 = labW + 8, plotW = W - x0 - 84;
  const max = Math.max(...sl.whs.map(w => w.both), 1);
  let g = "";
  sl.whs.forEach((w, i) => {
    const y = i * rowH + 12;
    const fgW = (w.fg / max) * plotW, itW = (w.it / max) * plotW;
    const tf = tipId({title: `${w.cfa} — FG`, rows: [["Stock", fmt(w.fg) + " kg"], ["Share of total", fmt(w.both ? w.fg/w.both*100 : 0, 1) + " %"]]});
    const ti = tipId({title: `${w.cfa} — In Transit`, rows: [["Stock", fmt(w.it) + " kg"], ["Share of total", fmt(w.both ? w.it/w.both*100 : 0, 1) + " %"]]});
    g += `<text class="catlabel strong" x="0" y="${y + 20}">${svgEsc(w.cfa)}</text>`
      +  `<path class="f-s1" d="${barH(x0, y + 6, Math.max(fgW, 3), 22, 4)}"/>`
      +  `<path class="f-s2" d="${barH(x0 + fgW + 2, y + 6, Math.max(itW, 3), 22, 4)}"/>`
      +  `<text class="marklabel" x="${x0 + fgW + itW + 12}" y="${y + 22}">${fmt0(w.both)}</text>`
      +  `<rect class="hit" x="${x0}" y="${y}" width="${Math.max(fgW, 3)}" height="34" data-t="${tf}" tabindex="0"/>`
      +  `<rect class="hit" x="${x0 + fgW + 2}" y="${y}" width="${Math.max(itW, 3)}" height="34" data-t="${ti}" tabindex="0"/>`;
  });
  g += `<text class="axistext" x="${x0}" y="${H - 8}">kg — bar length is the warehouse total</text>`;
  return {svg: svg(W, H, g)};
}

/* ══════════ 6 · risk map ══════════ */
function chartScatter(sl){
  const pts = sl.skus.filter(s => s.finalDRR > 0);
  if (!pts.length) return {svg: empty("No SKU has demand on this slice."), pts};
  const W = VIZ_W, H = 400, padL = 62, padR = 16, padT = 14, padB = 44;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const xMax = Math.max(...pts.map(p => p.finalDRR)) * 1.06;
  const yMax = Math.max(...pts.map(p => p.sel), 1) * 1.06;
  const sx = v => padL + (v / xMax) * plotW, sy = v => padT + plotH - (v / yMax) * plotH;

  let g = ticks(yMax).map(v => `<line class="gridline" x1="${padL}" y1="${sy(v)}" x2="${W - padR}" y2="${sy(v)}"/>`
        + `<text class="axistext" x="${padL - 8}" y="${sy(v) + 4}" text-anchor="end">${fmt0(v)}</text>`).join("")
    + ticks(xMax).map(v => `<text class="axistext" x="${sx(v)}" y="${H - padB + 18}" text-anchor="middle">${fmt0(v)}</text>`).join("");

  for (const days of [state.thRed, state.thAmber]){
    const xEnd = Math.min(xMax, yMax / days), yEnd = xEnd * days;
    const lx = sx(xEnd), near = lx > W - padR - 46;   // keep the label off the right edge
    g += `<line class="guideline" x1="${sx(0)}" y1="${sy(0)}" x2="${lx}" y2="${sy(yEnd)}"/>`
      +  `<text class="guidetext" x="${near ? lx - 4 : lx + 4}" ${near ? 'text-anchor="end"' : ""} y="${sy(yEnd) + (days === state.thRed ? 12 : -4)}">${days} days</text>`;
  }
  for (const p of pts){
    const t = tipId({title: `${p.code} — ${p.name}`, rows: [
      ["Warehouse", p.cfa], ["DOH", fmt(p.doh, 1) + " days"], ["Band", bandName(p.doh)],
      [BASIS_LABEL[state.vizBasis], fmt(p.sel) + " kg"], ["Final DRR", fmt(p.finalDRR) + " kg/day"]
    ]});
    g += `<circle class="dot ${bandCls(p.doh)}" cx="${sx(p.finalDRR).toFixed(1)}" cy="${sy(p.sel).toFixed(1)}" r="4.5"/>`
      +  `<circle class="hit" cx="${sx(p.finalDRR).toFixed(1)}" cy="${sy(p.sel).toFixed(1)}" r="12" data-t="${t}" tabindex="0"/>`;
  }
  g += `<line class="axisline" x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}"/>`
    +  `<line class="axisline" x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}"/>`
    +  `<text class="axistext" x="${padL + plotW/2}" y="${H - 6}" text-anchor="middle">Final DRR — kg/day</text>`
    +  `<text class="axistext" x="${-(padT + plotH/2)}" y="14" text-anchor="middle" transform="rotate(-90)">${svgEsc(BASIS_LABEL[state.vizBasis])} — kg</text>`;
  return {svg: svg(W, H, g), pts};
}

/* ══════════ 7 · top SKUs by demand ══════════ */
function chartDemand(sl){
  const rows = sl.skus.filter(s => s.finalDRR > 0).sort((a, b) => b.finalDRR - a.finalDRR).slice(0, 15);
  if (!rows.length) return {html: empty("No SKU has demand on this slice."), rows};
  const max = rows[0].finalDRR;
  const html = `<div class="barlist${sl.multi ? " has-wh" : ""}">` + rows.map(s => {
    const pct = Math.max((s.finalDRR / max) * 100, 1.2);
    const t = tipId({title: `${s.code} — ${s.name}`, rows: [
      ["Warehouse", s.cfa], ["Final DRR", fmt(s.finalDRR) + " kg/day"], ["Driven by", s.drrSrc],
      [BASIS_LABEL[state.vizBasis], fmt(s.sel) + " kg"], ["DOH", fmt(s.doh, 1) + " days"], ["Band", bandName(s.doh)]
    ]});
    const band = bandOf(s.doh);
    return `<div class="barrow" data-t="${t}" tabindex="0">
      <span class="b-code">${svgEsc(s.code)}</span>
      ${sl.multi ? `<span class="b-wh">${svgEsc(s.cfa)}</span>` : ""}
      <span class="b-track"><i class="b-fill ${band}" style="width:${pct.toFixed(2)}%"></i></span>
      <span class="b-val">${fmt(s.finalDRR, 0)}</span>
      <span class="b-note">${fmt(s.doh, 1)} d · ${svgEsc(bandName(s.doh))}</span>
    </div>`;
  }).join("") + "</div>";
  return {html, rows};
}

/* ══════════ table twins ══════════ */
function tbl(cols, rows){
  return `<table class="grid compact"><thead><tr>${cols.map((c, i) =>
    `<th${i === 0 ? ' style="text-align:left"' : ""}>${svgEsc(c)}</th>`).join("")}</tr></thead><tbody>${
    rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' style="text-align:left"' : ""}>${c}</td>`).join("")}</tr>`).join("")
  }</tbody></table>`;
}

/* ══════════ orchestration ══════════ */
function renderViz(){
  const r = state.result;
  $("#vizEmpty").hidden = !!r;
  $("#vizBody").hidden = !r;
  if (!r) return;

  // keep the warehouse filter in step with the computed warehouses
  const sel = $("#vizWh"), cur = state.vizWh;
  sel.innerHTML = `<option value="ALL">All warehouses</option>` +
    r.warehouses.map(w => `<option value="${svgEsc(w.cfa)}">${svgEsc(w.cfa)}</option>`).join("");
  sel.value = [...sel.options].some(o => o.value === cur) ? cur : "ALL";
  state.vizWh = sel.value;
  $$("#vizBasis .seg-btn").forEach(b => b.classList.toggle("is-on", b.dataset.basis === state.vizBasis));

  VT = [];
  const sl = vizSlice();
  $("#vizScope").textContent =
    `${sl.whs.length} warehouse(s) · ${sl.skus.length} SKU lines · red ≤ ${state.thRed} d, amber ≤ ${state.thAmber} d`;

  vizTiles(sl);

  const crit = chartCritical(sl);
  $("#chart-critical").innerHTML = crit.html;
  $("#table-critical").innerHTML = crit.rows.length
    ? tbl(["Item Code","Item Name","Warehouse","Stock (kg)","Final DRR","DOH","Band"],
        crit.rows.map(s => [svgEsc(s.code), `<span class="name">${svgEsc(s.name)}</span>`, svgEsc(s.cfa),
          fmt(s.sel), fmt(s.finalDRR), fmt(s.doh,1), bandName(s.doh)]))
    : `<p class="vizempty">Nothing critical on this slice.</p>`;

  const bul = chartBullet(sl);
  $("#chart-bullet").innerHTML = bul.svg + `<div class="vizlegend">
      <span><i class="lr"></i>Critical ≤ ${state.thRed} d</span>
      <span><i class="la"></i>Watch ≤ ${state.thAmber} d</span>
      <span><i class="lg"></i>Healthy above</span></div>`;
  $("#table-bullet").innerHTML = tbl(["Warehouse","Stock (kg)","Final DRR","DOH","Band"],
    sl.whs.map(w => [svgEsc(w.cfa), fmt(w.sel), fmt(w.finalDRR), w.doh == null ? "—" : fmt(w.doh,1), bandName(w.doh)]));

  const dist = chartDist(sl);
  $("#chart-dist").innerHTML = dist.svg;
  $("#table-dist").innerHTML = tbl(["Days of cover","SKU lines","Band"],
    (dist.bins || []).map((b, i) => [svgEsc(b.label), fmt0(dist.counts[i]),
      b.cls === "f-red" ? "Critical" : b.cls === "f-amber" ? "Watch" : "Healthy"]));

  const drr = chartDrr(sl);
  $("#chart-drr").innerHTML = drr.svg + `<div class="vizlegend">
      <span><i class="l1"></i>Projection DRR</span><span><i class="l2"></i>Pendency + dispatch MTD DRR</span></div>`;
  $("#table-drr").innerHTML = tbl(["Warehouse","Projection DRR","MTD DRR","Final DRR","Source"],
    sl.whs.map(w => [svgEsc(w.cfa), fmt(w.projDRR), fmt(w.mtdDRR), fmt(w.finalDRR), svgEsc(w.drrSrc)]));

  const spl = chartSplit(sl);
  $("#chart-split").innerHTML = spl.svg + `<div class="vizlegend">
      <span><i class="l1"></i>Finished goods</span><span><i class="l2"></i>In transit</span></div>`;
  $("#table-split").innerHTML = tbl(["Warehouse","FG (kg)","In Transit (kg)","Total (kg)","FG share"],
    sl.whs.map(w => [svgEsc(w.cfa), fmt(w.fg), fmt(w.it), fmt(w.both), fmt(w.both ? w.fg/w.both*100 : 0,1) + " %"]));

  const sc = chartScatter(sl);
  $("#chart-scatter").innerHTML = sc.svg + `<div class="vizlegend">
      <span><i class="lr"></i>Critical</span><span><i class="la"></i>Watch</span><span><i class="lg"></i>Healthy</span>
      <span style="color:var(--ink-3)">diagonals = constant days of cover</span></div>`;
  $("#table-scatter").innerHTML = tbl(["Item Code","Warehouse","Final DRR","Stock (kg)","DOH","Band"],
    (sc.pts || []).slice().sort((a,b) => a.doh - b.doh).map(p =>
      [svgEsc(p.code), svgEsc(p.cfa), fmt(p.finalDRR), fmt(p.sel), fmt(p.doh,1), bandName(p.doh)]));

  const dem = chartDemand(sl);
  $("#chart-demand").innerHTML = dem.html + `<div class="vizlegend">
      <span><i class="lr"></i>Critical</span><span><i class="la"></i>Watch</span><span><i class="lg"></i>Healthy</span></div>`;
  $("#table-demand").innerHTML = tbl(["Item Code","Item Name","Warehouse","Final DRR","Stock (kg)","DOH","Band"],
    (dem.rows || []).map(s => [svgEsc(s.code), `<span class="name">${svgEsc(s.name)}</span>`, svgEsc(s.cfa),
      fmt(s.finalDRR), fmt(s.sel), fmt(s.doh,1), bandName(s.doh)]));
}

/* ── tooltip + view toggles ─────────────────────────────────── */
function vizInit(){
  const tipEl = document.createElement("div");
  tipEl.className = "viztip"; tipEl.hidden = true;
  document.body.appendChild(tipEl);

  const show = (el, x, y) => {
    const p = VT[+el.dataset.t]; if (!p) return;
    tipEl.innerHTML = `<b>${svgEsc(p.title)}</b><dl>${p.rows.map(([k, v]) =>
      `<dt>${svgEsc(k)}</dt><dd>${svgEsc(v)}</dd>`).join("")}</dl>`;
    tipEl.hidden = false;
    const r = tipEl.getBoundingClientRect();
    tipEl.style.left = Math.min(Math.max(8, x + 14), innerWidth - r.width - 8) + "px";
    tipEl.style.top  = Math.max(8, y - r.height - 12) + "px";
  };
  const hide = () => { tipEl.hidden = true; };

  const root = $("#view-viz");
  root.addEventListener("mousemove", e => {
    const el = e.target.closest("[data-t]");
    el ? show(el, e.clientX, e.clientY) : hide();
  });
  root.addEventListener("mouseleave", hide);
  root.addEventListener("focusin", e => {
    const el = e.target.closest("[data-t]"); if (!el) return hide();
    const b = el.getBoundingClientRect();
    show(el, b.left + b.width / 2, b.top + b.height);
  });
  root.addEventListener("focusout", hide);
  addEventListener("scroll", hide, true);

  root.addEventListener("click", e => {
    const b = e.target.closest("[data-viztable]"); if (!b) return;
    const key = b.dataset.viztable, t = $("#table-" + key), c = $("#chart-" + key);
    const toTable = t.hidden;
    t.hidden = !toTable; c.hidden = toTable;
    b.textContent = toTable ? "Chart view" : "Table view";
  });

  $("#vizWh").addEventListener("change", e => { state.vizWh = e.target.value; renderViz(); });
  $("#vizBasis").addEventListener("click", e => {
    const b = e.target.closest(".seg-btn"); if (!b) return;
    // the charts plot one basis at a time; the dashboard can show several at once
    state.vizBasis = b.dataset.basis; saveMasters();
    compute();
  });
}
