# CFA Warehouse DOH Console

Days-on-hand per CFA warehouse, computed from three uploaded files against two maintained masters.
Implements the `Condition` tab of *Warehouse Wise Stock Qty and Stock Balance -Test*.

**No login. No backend. No data leaves the browser** — the three source files are parsed in-page and never uploaded anywhere. Only the two masters are stored, in `localStorage`.

## Files

| File | Role |
|---|---|
| `index.html` | the app shell — five tabs |
| `styles.css` | design tokens, light + dark |
| `app.js` | parsing, calculation, masters, Excel export |
| `viz.js` | the Visualisation tab — charts drawn by hand, no chart library |
| `sample-data/` | local only, gitignored — the three source tabs split into separate workbooks for testing. Not in the repo: it holds real customer and rate data. Recreate it by saving the `In Hand`, `Projection` and `dispatches plus pendencies` tabs as three separate workbooks. |

## Running it

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8777 --directory cfa-doh-app
```

To deploy: it is static files — drop the folder on Vercel as a static project, no build step.

**Commit author matters on Vercel Hobby.** A push-triggered deploy is blocked unless the commit
author is the Vercel account owner (`jatoth.r@farmley.com` / GitHub `jatothr-lgtm`). Committing under
a different identity produces a deployment stuck in `BLOCKED` with no build log. This repo pins the
author locally:

```bash
git config user.email "jatoth.r@farmley.com"
```

## How to use

1. **Data** tab → load the three files (click or drag). Headers are validated on load; a file that looks like a different dataset is flagged.
2. **Dashboard** → KPI per CFA, warehouse summary, SKU drilldown, diagnostics.
3. **Visualisation** → every critical SKU, plus six charts of the whole analysis.
4. The **In Transit + FG / FG only / In Transit only** control is multi-select: tick as many as you
   want and the dashboard grows one DOH column per basis, so you can read them side by side. At
   least one must stay ticked. The Visualisation tab has its own single **Chart basis** — a chart
   plots one number per mark, so it picks one.
5. **Export Excel** → a workbook where every derived number is a live formula.

## Calculation (Conditions 4–8)

```
In Transit + FG = Σ Balance Qty  (FG rows + In-Transit rows)
FG              = Σ Balance Qty  (FG rows)
In Transit      = Σ Balance Qty  (In-Transit rows)

Projection DRR  = Σ Total KGs ÷ calendar days in the projection month
Pendency        = Σ Pending Kgs   over rows where Pending Kgs > 0
Dispatched      = Σ Stock_qty    over rows where Pending Kgs = 0
MTD DRR         = (Pendency + Dispatched) ÷ day-of-month of MAX(Sales_Order_Date)
Final DRR       = MAX(Projection DRR, MTD DRR)
DOH             = selected stock ÷ Final DRR
```

Each dispatch row lands in **one** bucket, never both: a row with pending kilos left is pendency, a
row with none is fully delivered so its `Stock_qty` is what actually went out. Counting both would
double-count — in this feed `Stock_qty` equals `Pending Kgs` on every row that still has pending.
Where a warehouse or SKU has no zero-pending row at all, Dispatched is **nil** (shown as "—", and
left as an empty cell in the export), not a computed zero.

The MTD divisor is taken from the **whole dispatch column** before the CFA/SKU filters, so every
warehouse divides by the same day — matching the worked example in the Condition tab
(`2026-09-14` → 14).

Both divisors can be overridden on the Data tab; an override is carried into the export and the
Logic sheet.

## Visualisation tab

One filter row — warehouse and stock basis — scopes everything below it. The basis toggle is the
same state as the dashboard's, so the two never disagree.

| | |
|---|---|
| Four stat tiles | critical SKU count, weakest warehouse, stock behind critical lines, SKUs selling with no stock |
| **Critical SKUs** | every SKU line at or below the red threshold, worst first, labelled by item name, with stock and DRR per row — the answer to "what is about to run out". The item code stays in the hover tooltip and the table view. |
| Cover against thresholds | a bullet track per warehouse with the red/amber/green bands drawn behind the bar |
| Cover-band distribution | how many SKUs sit in each band |
| Projection vs MTD DRR | which of the two sets the Final DRR, per warehouse |
| FG vs In Transit | what the basis toggle is choosing between |
| Risk map | stock against daily demand, one dot per SKU, with constant-cover diagonals |
| **Red SKUs by daily demand** | the same red population as the critical list, but ranked by Final DRR — which of the shortages carries the most volume, so it gets chased first |

Charts are hand-drawn SVG and HTML — no chart library, nothing fetched at runtime.

**Colour discipline.** Red/amber/green mean a DOH band and never identity; blue/orange carry
identity (projection vs MTD, FG vs In Transit) and never status. The categorical pair was validated
for colour-vision separation in both light and dark mode. A red/amber/green trio cannot clear that
gate on hue alone, so every status mark is also labelled in text, and **every chart has a table
view** beside it. The amber token was re-stepped to `#a87f00` (light) / `#e8b13a` (dark) because the
previous amber sat too close to red for normal vision to separate.

## Colour coding

Red ≤ 15 days · Amber ≤ 30 days · Green above. Both thresholds are editable on the dashboard and
are written into the exported workbook as conditional formatting.

## Masters

- **CFA SKU Master** — 80 codes seeded from the `CFA Skus` tab. Add, edit, deactivate, delete,
  CSV import/export, reset to the workbook list.
- **Warehouse Master** — every raw warehouse/origin label → normalised CFA, plus the FG /
  In-Transit stock type that drives the split. Adding a third CFA here makes it appear on the
  dashboard with no code change.

Anything unmapped is excluded from every figure **and reported** under Data diagnostics and on the
Exclusions sheet of the export — never silently dropped.

## Exported workbook

| Sheet | Contents |
|---|---|
| Warehouse DOH | one row per CFA; every derived column is a live formula over the raw sums; one DOH column per selected basis, each conditionally formatted; totals row |
| SKU Drilldown | the same formulas per SKU, auto-filtered |
| Logic & Conditions | every condition, its formula, the divisors actually used, the assumptions, and which Excel cell implements what |
| Exclusions | unmapped labels with row counts, plus rows-used / rows-dropped per dataset |
| Masters | both masters as exported |

Nothing on the DOH sheets is a hardcoded result — change a divisor in column F or K and the rows
re-compute in Excel.

## Verified against the source workbook

| | CFA (BLR) | CFA (GGN) |
|---|---|---|
| FG | 60,468.32 | 56,842.82 |
| In Transit | 30,282.58 | 34,065.76 |
| IT + FG | 90,750.91 | 90,908.58 |
| Projection DRR | 3,970.16 | 4,112.81 |
| Pendency | 18,544.09 | 24,034.34 |
| Dispatched (zero-pending rows) | 1,158.37 | 719.55 |
| MTD DRR (÷14) | 1,407.32 | 1,768.14 |
| DOH — IT+FG | 22.86 | 22.10 |
| DOH — FG | 15.23 | 13.82 |
| DOH — In Transit | 7.63 | 8.28 |

Cross-checked against an independent Python computation over the same workbook.

## Assumptions

- All quantity columns are kilograms; no conversion factor applied.
- Projection `Origin` is the producing plant and is ignored — the CFA there is `Wareouse`.
- No filter on `Dispatch_Status`; the zero-pending test is what separates delivered from outstanding, per row rather than per order.
- Dispatch rows outside the max date's month are excluded (toggleable on the Data tab).
