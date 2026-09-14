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
| `sample-data/` | local only, gitignored — the three source tabs split into separate workbooks for testing. Not in the repo: it holds real customer and rate data. Recreate it by saving the `In Hand`, `Projection` and `dispatches plus pendencies` tabs as three separate workbooks. |

## Running it

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8777 --directory cfa-doh-app
```

To deploy: it is three static files — drop the folder on Vercel as a static project, no build step.

## How to use

1. **Data** tab → load the three files (click or drag). Headers are validated on load; a file that looks like a different dataset is flagged.
2. **Dashboard** → KPI per CFA, warehouse summary, SKU drilldown, diagnostics.
3. The **In Transit + FG / FG only / In Transit only** toggle re-computes DOH instantly.
4. **Export Excel** → a workbook where every derived number is a live formula.

## Calculation (Conditions 4–8)

```
In Transit + FG = Σ Balance Qty  (FG rows + In-Transit rows)
FG              = Σ Balance Qty  (FG rows)
In Transit      = Σ Balance Qty  (In-Transit rows)

Projection DRR  = Σ Total KGs ÷ calendar days in the projection month
MTD DRR         = (Σ Pending Kgs + Σ Stock_qty) ÷ day-of-month of MAX(Sales_Order_Date)
Final DRR       = MAX(Projection DRR, MTD DRR)
DOH             = selected stock ÷ Final DRR
```

The MTD divisor is taken from the **whole dispatch column** before the CFA/SKU filters, so every
warehouse divides by the same day — matching the worked example in the Condition tab
(`2026-09-14` → 14).

Both divisors can be overridden on the Data tab; an override is carried into the export and the
Logic sheet.

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
| Warehouse DOH | one row per CFA; columns G, J, L, M, N, P, Q are live formulas over the raw sums; conditional formatting on DOH; totals row |
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
| MTD DRR (÷14) | 2,731.90 | 3,484.87 |
| DOH — IT+FG | 22.86 | 22.10 |
| DOH — FG | 15.23 | 13.82 |
| DOH — In Transit | 7.63 | 8.28 |

Cross-checked against an independent Python computation over the same workbook.

## Assumptions

- All quantity columns are kilograms; no conversion factor applied.
- Projection `Origin` is the producing plant and is ignored — the CFA there is `Wareouse`.
- No dispatch-status filter: `Stock_qty` is the dispatched quantity as Condition 6 specifies.
- Dispatch rows outside the max date's month are excluded (toggleable on the Data tab).
