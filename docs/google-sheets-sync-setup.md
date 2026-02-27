# Pricing Sync — Google Sheets + Make.com Setup

> How to manage all loan pricing from a single Google Sheet and auto-sync to the website every 24 hours via Make.com.

---

## How It Works

```
Google Sheet (Master)          Make.com (every 24h)         GitHub Repo           Website
┌──────────────────┐     ┌───────────────────────┐     ┌──────────────┐     ┌───────────┐
│  Pricing Matrix  │────▶│ 1. Read sheet rows    │────▶│ Commit JSON  │────▶│ Auto-     │
│  (all programs)  │     │ 2. POST to /api/sync  │     │ to data/     │     │ deploy    │
│                  │     │ 3. Get formatted JSON │     │ pricing-     │     │ with new  │
│  Edit rates here │     │ 4. Push to GitHub     │     │ config.json  │     │ rates     │
└──────────────────┘     └───────────────────────┘     └──────────────┘     └───────────┘
```

**You edit the Google Sheet → Make.com syncs it → website updates automatically.**

---

## Step 1: Create the Google Sheet

Create a new Google Sheet with a tab called **"Pricing Matrix"**.

### Column Layout

Set up these exact column headers in Row 1:

| Column | Header | Example | Description |
|--------|--------|---------|-------------|
| A | `loan_type` | Fix & Flip | Must match the loan type name exactly |
| B | `arv_label` | After Repair Value (ARV) | Label shown for the value field |
| C | `program_id` | premier | Unique ID (lowercase, no spaces) |
| D | `program_name` | Premier Program | Display name shown to borrowers |
| E | `interest_rate` | 9.0 | Annual interest rate (%) |
| F | `rate_type` | Fixed | Fixed or Variable |
| G | `origination_points` | 2.0 | Origination fee (%) |
| H | `points_note` | Typical | Typical, Minimum, etc. |
| I | `min_origination_fee` | 4000 | Floor in dollars (0 = no floor) |
| J | `max_ltv` | 70.0 | Max Loan-to-Value (%) |
| K | `ltv_note` | Hard Cap | Hard Cap, Before adjustments, etc. |
| L | `max_ltc` | 90.0 | Max Loan-to-Cost (%) |
| M | `ltc_note` | Hard Cap | Hard Cap, Before adjustments, etc. |
| N | `max_ltp` | 90.0 | Max Loan-to-Purchase (%) |
| O | `max_term` | 12 | Loan term in months |
| P | `term_note` | Extensions available | Additional term info |
| Q | `loan_term_months` | 12 | Actual loan term: 12, 18, or 24 |
| R | `exit_points` | 0 | Points due at payoff: 0, 1, or 2 |
| S | `legal_doc_fee` | 1250 | Legal & doc fee in dollars |
| T | `bpo_appraisal_cost` | 350 | BPO/appraisal cost in dollars |
| U | `bpo_appraisal_note` | Desktop BPO | Label for the appraisal line item |
| V | `min_credit_score` | 650 | Minimum FICO (0 = no minimum) |
| W | `min_deals_24mo` | 3 | Min deals in 24 months (0 = none) |
| X | `citizenship` | us_resident | `us_resident` or `any` |
| Y | `highlight_1` | Lowest rate available | Bullet point 1 (optional) |
| Z | `highlight_2` | Up to 90% of total cost | Bullet point 2 (optional) |
| AA | `highlight_3` | Up to 70% of ARV | Bullet point 3 (optional) |

**New fields explained:**
- `min_origination_fee`: Minimum fee floor. App calculates `MAX(loan × points%, floor)`.
- `loan_term_months`: For commercial types (CRE Bridge, RV Park, Multifamily), create separate rows per term (12, 18, 24). Residential types are always 12.
- `exit_points`: Tied to term length. 12mo → 0, 18mo → 1, 24mo → 2.
- `legal_doc_fee`, `bpo_appraisal_cost`, `bpo_appraisal_note`: Appear on the emailed term sheet only (not on the instant quote page).

### Sample Data (Rows 2+)

Each row is one program. Multiple rows with the same `loan_type` form a program group:

| loan_type | arv_label | program_id | program_name | interest_rate | rate_type | origination_points | points_note | max_ltv | ltv_note | max_ltc | ltc_note | max_ltp | max_term | term_note | min_credit_score | min_deals_24mo | citizenship | highlight_1 | highlight_2 | highlight_3 |
|-----------|-----------|------------|--------------|---------------|-----------|-------------------|-------------|---------|----------|---------|----------|---------|----------|-----------|-----------------|----------------|-------------|-------------|-------------|-------------|
| Fix & Flip | After Repair Value (ARV) | premier | Premier Program | 9.0 | Fixed | 2.0 | Typical | 70.0 | Hard Cap | 90.0 | Hard Cap | 90.0 | 12 | Extensions available | 650 | 3 | us_resident | Lowest rate available | Up to 90% of total cost | Up to 70% of ARV |
| Fix & Flip | After Repair Value (ARV) | balance_sheet | Balance Sheet | 12.0 | Fixed | 3.0 | Minimum | 65.0 | Before adjustments | 85.0 | Before adjustments | 85.0 | 12 | Extensions available | 0 | 0 | any | No credit score minimum | New investors welcome | Foreign nationals OK |
| CRE Bridge | Stabilized Value | | | | | | | | | | | | | | | | | | | |
| Manufactured Housing | Estimated Property Value | | | | | | | | | | | | | | | | | | | |
| RV Park | Estimated Property Value | | | | | | | | | | | | | | | | | | | |
| Multifamily | Estimated Property Value | | | | | | | | | | | | | | | | | | | |
| DSCR Rental | Estimated Property Value | | | | | | | | | | | | | | | | | | | |
| New Construction | Completed Value | | | | | | | | | | | | | | | | | | | |

**Important notes:**
- Rows are evaluated top-to-bottom within each loan type — put the best/strictest program first
- Leave `program_id` and `interest_rate` empty for loan types that don't have auto-quoting yet
- When you're ready to enable auto-quoting for a new asset class, just fill in its pricing columns
- The `loan_type` value must exactly match the names used in the app

### Program Priority (Row Order Matters)

Within each loan type, programs are checked in order from top to bottom. The first program the borrower qualifies for is selected. Put the strictest/best-rate program first:

```
Row 2: Fix & Flip — Premier Program    (checked first, best terms)
Row 3: Fix & Flip — Balance Sheet      (fallback, accessible terms)
```

---

## Step 2: Set Up Make.com Automation

### Create a New Scenario in Make.com

**Module 1: Schedule**
- Trigger: Every 24 hours (or your preferred interval)

**Module 2: Google Sheets — Get Range Values**
- Connection: Connect your Google account
- Spreadsheet: Select your pricing sheet
- Sheet: "Pricing Matrix"
- Range: `A1:AA100` (adjust if you have more rows)
- This returns all rows including the header

**Module 3: HTTP — Make a Request**
- URL: `https://your-domain.com/api/sync-pricing`
- Method: POST
- Headers:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer YOUR_SYNC_PRICING_SECRET`
- Body type: Raw
- Content type: JSON
- Request content:
  ```json
  {
    "rows": {{2.values}}
  }
  ```
  (Map the Google Sheets output `values` array into the `rows` field)

**Module 4: GitHub — Create or Update a File**
- Connection: Connect your GitHub account
- Repository: `your-org/requitygroup`
- Branch: `main`
- File path: `data/pricing-config.json`
- File content: `{{3.data.config}}` (the `config` object from the HTTP response)
  - Use the `toString` function in Make.com to stringify the JSON
- Commit message: `chore: sync pricing from Google Sheets`

That's it. Vercel (or your hosting) will auto-deploy from the new commit.

---

## Step 3: Environment Variables

Add these to your hosting environment:

```
SYNC_PRICING_SECRET=<generate-a-random-secret>
```

For the CLI sync script (optional, for manual runs):

```
GOOGLE_SHEETS_API_KEY=<your-google-api-key>
PRICING_SHEET_ID=<your-sheet-id>
PRICING_SHEET_TAB=Pricing Matrix
```

### How to Find Your Sheet ID

Your Google Sheet URL looks like:
```
https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit
                                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                       This is your PRICING_SHEET_ID
```

---

## Step 4: Manual Sync (Optional)

You can also sync manually using the CLI script:

```bash
PRICING_SHEET_ID=<id> GOOGLE_SHEETS_API_KEY=<key> node scripts/sync-pricing.js
```

This reads the Google Sheet and writes directly to `data/pricing-config.json`. Then commit and push:

```bash
git add data/pricing-config.json
git commit -m "chore: sync pricing from Google Sheets"
git push
```

---

## Adding Auto-Quoting for a New Asset Class

To enable auto-quoting for a new loan type (e.g., DSCR Rental):

1. Open the Google Sheet
2. Find the row for "DSCR Rental"
3. Fill in all pricing columns:
   - `program_id`: `standard` (or whatever you want to call it)
   - `program_name`: `DSCR Standard`
   - `interest_rate`: `7.5`
   - `origination_points`: `1.5`
   - `max_ltv`: `75.0`
   - etc.
4. Add additional programs as new rows if needed (e.g., a "DSCR Premium" tier)
5. Wait for Make.com to sync (or run manually)
6. The website will automatically show auto-quoting for DSCR Rental

No code changes needed.

---

## Troubleshooting

**"Unauthorized" error from /api/sync-pricing**
- Check that your `SYNC_PRICING_SECRET` env var matches the `Authorization: Bearer <secret>` header in Make.com

**Google Sheets API error**
- Ensure the API key has the Google Sheets API enabled
- Make sure the sheet is accessible (shared with the service account or public)

**Pricing not updating on the website**
- Verify the GitHub commit was created (check commit history)
- Check that your hosting auto-deploys from the branch
- Look at `data/pricing-config.json` in the repo to confirm the data is correct

**Programs not showing auto-quoting**
- Ensure `program_id` and `interest_rate` are filled in (both required)
- Check that `loan_type` exactly matches the names in the app (case-sensitive)

---

## File Reference

| File | Purpose |
|------|---------|
| `data/pricing-config.json` | The pricing data file (source of truth for the app) |
| `scripts/sync-pricing.js` | CLI script for manual sync from Google Sheets |
| `app/api/sync-pricing/route.js` | Webhook endpoint for Make.com |
| `app/apply/page.js` | Application form (imports pricing from config) |
| `docs/fix-and-flip-pricing-reference.md` | Human-readable pricing reference |
