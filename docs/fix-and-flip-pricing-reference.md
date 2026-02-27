# Fix & Flip Loan Programs — Pricing Reference

> **Internal Reference Document — Requity Group**
> Last Updated: February 2026
> Status: Active

This document serves as a human-readable reference for pricing inputs across the Fix & Flip Premier Program and Balance Sheet Program.

> **Pricing is now managed via Google Sheets.** The master pricing data lives in a Google Sheet ("Pricing Matrix" tab) and syncs to `data/pricing-config.json` every 24 hours via Make.com. See `docs/google-sheets-sync-setup.md` for setup instructions. The app reads from the JSON config — no code changes needed to update rates.

---

## Table of Contents

1. [Program Overview](#program-overview)
2. [Premier Program — Detailed Pricing](#premier-program--detailed-pricing)
3. [Balance Sheet Program — Detailed Pricing](#balance-sheet-program--detailed-pricing)
4. [Side-by-Side Comparison](#side-by-side-comparison)
5. [Borrower Qualification Matrix](#borrower-qualification-matrix)
6. [Loan Calculation Logic](#loan-calculation-logic)
7. [Pricing Examples](#pricing-examples)
8. [Fee Schedule & Additional Costs](#fee-schedule--additional-costs)
9. [Program Routing Logic](#program-routing-logic)
10. [Change Log](#change-log)

---

## Program Overview

Requity Group offers two Fix & Flip loan programs designed to serve different borrower profiles. Programs are evaluated in priority order — borrowers are placed in the **best program they qualify for** automatically.

| Program | Target Borrower | Key Differentiator |
|---------|----------------|-------------------|
| **Premier Program** | Experienced, US-based investors | Lowest rate, highest leverage |
| **Balance Sheet Program** | New investors, foreign nationals, lower credit | Accessible to all borrower types |

---

## Premier Program — Detailed Pricing

### Rate & Fee Structure

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Interest Rate** | 9.0% | Fixed rate |
| **Rate Type** | Fixed | Does not adjust during loan term |
| **Origination Points** | 2.0% | Typical; charged on loan amount at closing |
| **Points Classification** | Typical | — |

### Leverage Limits

| Metric | Maximum | Notes |
|--------|---------|-------|
| **Max LTV** (Loan-to-Value) | 70.0% | Hard Cap — based on ARV |
| **Max LTC** (Loan-to-Cost) | 90.0% | Hard Cap — based on purchase price + rehab |
| **Max LTP** (Loan-to-Purchase) | 90.0% | Based on purchase price only |

### Term Structure

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Maximum Term** | 12 months | — |
| **Extensions** | Available | Terms and fees TBD per deal |
| **Payment Structure** | Interest-only | Monthly interest payments |

### Borrower Requirements

| Requirement | Minimum | Notes |
|-------------|---------|-------|
| **Credit Score** | 650 | FICO |
| **Deals in Last 24 Months** | 3 | Completed fix & flip deals |
| **Citizenship / Residency** | US Resident | US Citizens and Permanent Residents (Green Card) |

### Program Highlights

- Lowest rate available
- Up to 90% of total cost (purchase + rehab)
- Up to 70% of ARV

---

## Balance Sheet Program — Detailed Pricing

### Rate & Fee Structure

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Interest Rate** | 12.0% | Fixed rate |
| **Rate Type** | Fixed | Does not adjust during loan term |
| **Origination Points** | 3.0% | Minimum; may be higher based on deal specifics |
| **Points Classification** | Minimum | Floor — can increase based on risk factors |

### Leverage Limits

| Metric | Maximum | Notes |
|--------|---------|-------|
| **Max LTV** (Loan-to-Value) | 65.0% | Before adjustments — may be lower based on risk |
| **Max LTC** (Loan-to-Cost) | 85.0% | Before adjustments — may be lower based on risk |
| **Max LTP** (Loan-to-Purchase) | 85.0% | Based on purchase price only |

### Term Structure

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Maximum Term** | 12 months | — |
| **Extensions** | Available | Terms and fees TBD per deal |
| **Payment Structure** | Interest-only | Monthly interest payments |

### Borrower Requirements

| Requirement | Minimum | Notes |
|-------------|---------|-------|
| **Credit Score** | None (0) | No minimum credit score required |
| **Deals in Last 24 Months** | None (0) | First-time investors welcome |
| **Citizenship / Residency** | Any | Foreign nationals accepted |

### Program Highlights

- No credit score minimum
- New investors welcome
- Foreign nationals OK

---

## Side-by-Side Comparison

| Parameter | Premier Program | Balance Sheet Program |
|-----------|:--------------:|:--------------------:|
| **Interest Rate** | 9.0% Fixed | 12.0% Fixed |
| **Origination Points** | 2.0% (Typical) | 3.0% (Minimum) |
| **Max LTV** | 70% (Hard Cap) | 65% (Before adjustments) |
| **Max LTC** | 90% (Hard Cap) | 85% (Before adjustments) |
| **Max LTP** | 90% | 85% |
| **Max Term** | 12 months | 12 months |
| **Extensions** | Available | Available |
| **Min Credit Score** | 650 | None |
| **Min Deals (24 mo)** | 3 | None |
| **Citizenship** | US Resident | Any |

### Key Differences Summary

- **Rate spread**: 300 bps (3.0%) between Premier and Balance Sheet
- **Origination spread**: 100 bps (1.0%) minimum difference
- **LTV difference**: 5% more leverage on Premier
- **LTC difference**: 5% more leverage on Premier
- **LTP difference**: 5% more leverage on Premier
- **Balance Sheet points are a floor** — may increase; Premier points are typical/standard

---

## Borrower Qualification Matrix

Borrowers are automatically qualified based on three criteria evaluated together. All three must be met to qualify for Premier:

| Criteria | Premier Qualifies | Balance Sheet Qualifies |
|----------|:-:|:-:|
| Credit Score >= 650 | Required | Not required |
| 3+ deals in last 24 months | Required | Not required |
| US Citizen or Green Card | Required | Not required |

### Credit Score Ranges (Input Options)

- 760 or higher
- 720–759
- 680–719
- 650–679
- 620–649
- Below 620
- Not sure

### Deal Experience (Input Options)

- 0 — First deal
- 1–2 deals
- 3–5 deals
- 6–10 deals
- 10+ deals

### Citizenship Status (Input Options)

- US Citizen
- Permanent Resident (Green Card)
- Foreign National
- Other / Not Sure

### Qualification Flow

```
Borrower submits application
    │
    ├─ Credit Score >= 650?
    │   ├─ YES → Deals >= 3 in 24 months?
    │   │          ├─ YES → US Citizen or Green Card?
    │   │          │          ├─ YES → ✅ PREMIER PROGRAM
    │   │          │          └─ NO  → ⬇ BALANCE SHEET
    │   │          └─ NO  → ⬇ BALANCE SHEET
    │   └─ NO  → ⬇ BALANCE SHEET
    │
    └─ BALANCE SHEET (fallback — always qualifies)
```

---

## Loan Calculation Logic

### Maximum Loan Amount

The maximum loan is determined by the **most restrictive** of three calculations:

```
Max by LTV  =  ARV × (Max LTV / 100)
Max by LTC  =  (Purchase Price + Rehab Budget) × (Max LTC / 100)
Max by LTP  =  Purchase Price × (Max LTP / 100)

Maximum Loan  =  MIN(Max by LTV, Max by LTC, Max by LTP)
```

If the borrower requests a specific loan amount, the estimated loan is capped at the maximum:

```
Estimated Loan  =  MIN(Requested Amount, Maximum Loan)
```

### Fee Calculations

```
Calculated Fee    =  Estimated Loan × (Origination Points / 100)
Origination Fee   =  MAX(Calculated Fee, Min Origination Fee)
Monthly Interest  =  (Estimated Loan × (Interest Rate / 100)) / 12
Exit Fee          =  Estimated Loan × (Exit Points / 100)
```

If the min origination fee floor kicks in, the app displays a note like "($4,000 minimum)" next to the points display.

### Estimated Closing Costs (Term Sheet Only)

The emailed term sheet includes an "Estimated Closing Costs" breakdown:

| Line Item | Source |
|-----------|--------|
| Origination Fee | MAX(loan × points%, min_origination_fee) |
| Exit Fee | loan_amount × exit_points% ($0 for 12-month terms) |
| Legal & Documentation | `legalDocFee` from config |
| BPO / Appraisal | `bpoAppraisalCost` from config (label from `bpoAppraisalNote`) |
| **Estimated Total** | Sum of above |

A disclaimer follows: "Costs are estimates and subject to change. Final amounts confirmed at closing."

### Term & Exit Points

| Term | Exit Points | Applies To |
|------|-------------|-----------|
| 12 months | 0 | All loan types |
| 18 months | 1 | Commercial only (CRE Bridge, RV Park, Multifamily) |
| 24 months | 2 | Commercial only (CRE Bridge, RV Park, Multifamily) |

- **Residential types** (Fix & Flip, DSCR Rental, Manufactured Housing, New Construction): Always 12 months, no term selector shown.
- **Commercial types** (CRE Bridge, RV Park, Multifamily): Term selector with 12/18/24 month options. Each term is a separate row in the pricing config with its own rates.

### ARV Label

For Fix & Flip programs, the ARV field is labeled: **"After Repair Value (ARV)"**

---

## Pricing Examples

### Example 1: Experienced Investor — Qualifies for Premier

**Borrower Profile:**
- Credit Score: 720
- Deals in 24 months: 5
- Citizenship: US Citizen

**Deal Details:**
- Purchase Price: $200,000
- Rehab Budget: $50,000
- After Repair Value (ARV): $325,000
- Total Cost: $250,000

**Premier Program Calculation:**

| Constraint | Formula | Result |
|-----------|---------|--------|
| Max by LTV | $325,000 × 70% | $227,500 |
| Max by LTC | $250,000 × 90% | $225,000 |
| Max by LTP | $200,000 × 90% | $180,000 |
| **Maximum Loan** | MIN(227,500 / 225,000 / 180,000) | **$180,000** |

| Fee | Formula | Amount |
|-----|---------|--------|
| Origination Fee | MAX($180,000 × 2.0%, $4,000) = MAX($3,600, $4,000) | **$4,000** (floor) |
| Monthly Interest | ($180,000 × 9.0%) / 12 | **$1,350/mo** |

---

### Example 2: New Investor — Balance Sheet

**Borrower Profile:**
- Credit Score: 580
- Deals in 24 months: 0
- Citizenship: Foreign National

**Deal Details:**
- Purchase Price: $150,000
- Rehab Budget: $30,000
- After Repair Value (ARV): $250,000
- Total Cost: $180,000

**Balance Sheet Program Calculation:**

| Constraint | Formula | Result |
|-----------|---------|--------|
| Max by LTV | $250,000 × 65% | $162,500 |
| Max by LTC | $180,000 × 85% | $153,000 |
| Max by LTP | $150,000 × 85% | $127,500 |
| **Maximum Loan** | MIN(162,500 / 153,000 / 127,500) | **$127,500** |

| Fee | Formula | Amount |
|-----|---------|--------|
| Origination Fee | MAX($127,500 × 3.0%, $4,000) = MAX($3,825, $4,000) | **$4,000** (floor) |
| Monthly Interest | ($127,500 × 12.0%) / 12 | **$1,275/mo** |

---

### Example 3: Qualified But Capped by LTV

**Borrower Profile:**
- Credit Score: 700
- Deals in 24 months: 4
- Citizenship: Permanent Resident

**Deal Details:**
- Purchase Price: $300,000
- Rehab Budget: $100,000
- After Repair Value (ARV): $450,000
- Total Cost: $400,000
- Requested Loan: $350,000

**Premier Program Calculation:**

| Constraint | Formula | Result |
|-----------|---------|--------|
| Max by LTV | $450,000 × 70% | $315,000 |
| Max by LTC | $400,000 × 90% | $360,000 |
| Max by LTP | $300,000 × 90% | $270,000 |
| **Maximum Loan** | MIN(315,000 / 360,000 / 270,000) | **$270,000** |

Requested $350,000 > Max $270,000 → **Capped at $270,000**

| Fee | Formula | Amount |
|-----|---------|--------|
| Origination Fee | MAX($270,000 × 2.0%, $4,000) = MAX($5,400, $4,000) | **$5,400** |
| Monthly Interest | ($270,000 × 9.0%) / 12 | **$2,025/mo** |

---

## Fee Schedule & Additional Costs

> **Note:** Update this section as fee structures are formalized. Items below are placeholders for fees that may apply beyond the base pricing above.

| Fee Type | Premier | Balance Sheet | Notes |
|----------|---------|---------------|-------|
| Origination Points | 2.0% | 3.0% (min) | Charged at closing on loan amount |
| Min Origination Fee | $4,000 | $4,000 | Floor — borrower pays the higher of % calc or floor |
| Exit Points | 0% (12mo) | 0% (12mo) | Commercial: 1% at 18mo, 2% at 24mo |
| Legal & Documentation | $1,250 | $1,250 | Borrower-paid at closing |
| BPO / Appraisal | $350 | $350 | Desktop BPO |
| Extension Fee | TBD | TBD | Per extension, if applicable |
| Draw / Inspection Fee | TBD | TBD | Per rehab draw, if applicable |
| Wire / Funding Fee | TBD | TBD | If applicable |
| Late Payment Fee | TBD | TBD | As outlined in loan docs |

---

## Program Routing Logic

Programs are evaluated **in order** within each loan type. The first program the borrower qualifies for is selected. If no program matches, the system falls back to the last (least restrictive) program.

### Current Priority Order (Fix & Flip)

1. **Premier Program** — checked first (best terms, strictest requirements)
2. **Balance Sheet Program** — fallback (accessible terms, no minimums)

### Adding New Programs

To add a new program tier (e.g., a mid-tier "Standard" program), insert it between Premier and Balance Sheet in the `LOAN_PROGRAMS` array in `app/apply/page.js`. The qualification engine will evaluate it in order.

```
Premier → [New Tier] → Balance Sheet
```

### Codebase Reference

All pricing parameters are now managed externally:
- **Source of Truth:** Google Sheet ("Pricing Matrix" tab)
- **Sync Config:** `data/pricing-config.json` (auto-synced via Make.com every 24h)
- **Sync Docs:** `docs/google-sheets-sync-setup.md`
- **Sync Endpoint:** `app/api/sync-pricing/route.js` (Make.com webhook)
- **Sync Script:** `scripts/sync-pricing.js` (manual CLI sync)
- **Qualification Logic:** `qualifyForProgram()` in `app/apply/page.js`
- **Calculation Logic:** `calculateTerms()` in `app/apply/page.js`
- **Term Sheet Generation:** `app/api/loan-request/route.js` → `buildCustomerTermSheet()`

---

## Change Log

| Date | Change | Updated By |
|------|--------|------------|
| Feb 2026 | Initial reference document created | — |
| Feb 2026 | Migrated pricing to Google Sheets sync (data/pricing-config.json) | — |
| Feb 2026 | Added min origination fee, loan term selector, exit points, closing costs to term sheet | — |

---

*This document is for internal reference. All pricing is subject to underwriting review and final approval. Term sheets provided to borrowers are estimates and may be adjusted based on due diligence findings.*
