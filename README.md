# CFA Warehouse DOH Console

Days-on-hand per CFA warehouse, computed from four uploaded files against two maintained masters.
Implements the `Condition` tab of *Warehouse Wise Stock Qty and Stock Balance -Test*.

**No login. No backend. No data leaves the browser** — the source files are parsed in-page and never uploaded anywhere. The two masters are stored in `localStorage`, and the projection file in IndexedDB.

## Files

| File | Role |
|---|---|
| `index.html` | the app shell — five tabs |
| `styles.css` | design tokens, light + dark |
| `app.js` | parsing, calculation, masters, Excel export |
| `viz.js` | the Visualisation tab — charts drawn by hand, no chart library |
| `sample-data/` | local only, gitignored — the source tabs split into separate workbooks for testing, plus a synthetic sales-invoice file. Not in the repo: it holds real customer and rate data. Recreate it by saving the `In Hand`, `Projection` and `dispatches plus pendencies` tabs as three separate workbooks. |

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

1. **Data** tab → load the four files (click or drag). Headers are validated on load; a file that looks like a different dataset is flagged.
2. **Dashboard** → KPI per CFA, warehouse summary, SKU drilldown, diagnostics.
3. **Visualisation** → every critical SKU, plus six charts of the whole analysis.
4. The **In Transit + FG / FG only / In Transit only** control is multi-select: tick as many as you
   want and the dashboard grows one DOH column per basis, so you can read them side by side. At
   least one must stay ticked. The Visualisation tab has its own single **Chart basis** — a chart
   plots one number per mark, so it picks one.
5. **Export Excel** → a workbook where every derived number is a live formula.

**Sorting.** Every column on the warehouse summary and the SKU drilldown is sortable: click a header
to sort ascending, again for descending, a third time to clear back to the natural order. Blank and
nil cells ("—") always sink to the bottom whichever direction is chosen, so a missing figure never
poses as the smallest number. On the drilldown the sort applies **inside each warehouse block**, so
the grouping is never broken. Sorting is presentation only — no figure is recomputed.

## Calculation (Conditions 4–8)

```
In Transit + FG = Σ Balance Qty  (FG rows + In-Transit rows)
FG              = Σ Balance Qty  (FG rows)
In Transit      = Σ Balance Qty  (In-Transit rows)

Projection DRR  = Σ Total KGs ÷ calendar days in the projection month
Pendency        = Σ Pending Kgs      (pendency file, rows where Pending Kgs > 0)
Dispatched      = Σ Stock Qty In Kg  (sales-invoice file, after the exclusions)
MTD DRR         = (Pendency + Dispatched) ÷ distinct dates in Invoice Date
Final DRR       = MAX(Projection DRR, MTD DRR)
DOH             = selected stock ÷ Final DRR
```

### The four inputs

| Slot | Warehouse column | Measure | Kept between sessions |
|---|---|---|---|
| In Hand | `warehouse` | `Balance Qty`, split FG / In Transit | no |
| Projection | `Wareouse` | `Total KGs` | **yes** |
| Pendencies | `Origin` | `Pending Kgs` | no |
| Dispatches (sales invoice) | `From Warehouse` | `Stock Qty In Kg` | no |

Pendency and Dispatched come from **two different files**, so no kilo is counted twice. `Stock_qty`
in the pendency file is deliberately not read — on every row that still has pending it merely
repeats `Pending Kgs`.

The invoice file drops three kinds of row **before** anything is summed, each counted and listed
under Data diagnostics and on the Exclusions sheet:

- `Invoice Status` = **Return**
- `Customer` containing **"sample order"** (case-insensitive, anywhere in the field)
- `From Warehouse` not mapped to a CFA — an invoice raised from a plant contributes nothing,
  because those goods never passed through a CFA

**No date filter is applied to the invoice file.** Every invoice date counts, whatever month it falls
in, so the Dispatched numerator and the divisor both span the whole `Invoice Date` column. The
*Limit … to the month of the max date* setting governs the **pendency** file only.

Where a warehouse or SKU has no surviving invoice row, Dispatched is **nil** (shown as "—", an
empty cell in the export), not a computed zero.

**The projection stays loaded.** It changes once a month, so it is stored in IndexedDB and restored
on load, with a Clear button beside the slot. Per browser, per machine — there is no backend, so a
colleague opening the link starts with an empty slot.

### The MTD divisor

One rule:

```
MTD divisor = count of distinct dates in the Invoice Date column
```

Counted over the **whole `Invoice Date` column** — before the CFA/SKU filters and before the Return
and sample-order exclusions — so every warehouse divides by the same number. A day nobody invoiced
on never appears in the column, so it never pads the divisor and never flatters the daily rate.

`Sales_Order_Date` no longer feeds the divisor. It keeps its other job: limiting pendency rows to the
month of the latest order, which is a row filter rather than a divisor rule.

It exports as a live Excel formula, `SUMPRODUCT((range<>"")/COUNTIF(range,range&""))` over the
`Invoice Date` column of `Data - Dispatch`, verified against Excel itself. That expression scans the
whole column, so it is evaluated in **one** cell (`Warehouse DOH!I3`) and every per-row divisor
references it. Editing that one cell re-drives the whole workbook.

Either divisor can still be replaced by hand behind **Advanced — replace a divisor by hand** on the
Data tab, collapsed by default. It exists for a divisor the rule does not cover, not for routine use.
An override can never be silently active: the panel opens itself, the card heading carries a *manual
override in force* badge, the note says what the rule would have given, and the label follows the
number into the dashboard, the export and the Logic sheet. **Clear both overrides** puts the divisors
back on their rules.

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
| **Final DRR breakup** | per SKU, both rates on one scale with the winner tagged, over a summary strip showing how the total demand rate splits between the two sources |
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
| Pivots | the same filtered rows grouped nine ways — warehouse, item group, MIS item group, item parent, item type, customer group, customer, shipping state, and warehouse × item group — summing FG, In Transit, IT + FG, Projection Kgs, Pendency, Dispatched and Pend + Disp, with both DRRs, Final DRR and DOH as live formulas on every row |
| Exclusions | unmapped labels with row counts, plus rows-used / rows-dropped per dataset |
| Masters | both masters as exported |
| Data - In Hand / Projection / Dispatch | every input row with the app's include/exclude decision and the reason; these are the only values in the workbook |
| Data - Group Keys | the (pivot, group, item code) triples the SKU-line counts are COUNTIFS'd over |

**Every number on the report sheets is a formula.** The sums are `SUMIFS` over the three Data sheets,
the SKU-line counts are `COUNTIFS` over Data - Group Keys, the rates and DOH are arithmetic on those,
and the divisors are `DAY(EOMONTH(DATE(y,m,1),0))` and `DAY(MAX(Sales_Order_Date))`. The only values
in the workbook are the input rows themselves, so any figure can be traced to the rows behind it by
following the ranges or filtering the Data sheet. Edit a source row and the whole book re-computes.

(A manual divisor override, or divisor rule 2, writes the resolved number instead — a distinct-date
count across earlier months is not expressible as a single cell formula.)

On the Pivots sheet, item group, MIS item group, item parent and item type travel with the item
code, so in-hand stock is attributed to them and they carry a DOH. Customer, customer group and
shipping state belong to an order line rather than to stock, so those sections carry the flow
measures only; shipping state is absent from the projection file as well, so it has no Projection
Kgs. Each section header says which of these applies, and every section reconciles to the same
totals as the warehouse sheet.

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
