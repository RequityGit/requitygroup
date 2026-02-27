# CLAUDE.md — Requity Lending

## Project Overview
Requity Lending is a commercial and residential bridge loan platform. This is the borrower-facing website with a loan application form that generates instant quotes and emailed term sheets. Pricing is managed via Google Sheets and synced automatically through Make.com.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Hosting:** Netlify
- **Styling:** Check `package.json` for tailwindcss, styled-components, or CSS modules — use whatever is already installed. Do NOT introduce a new styling system.
- **Data:** Pricing config lives in `data/pricing-config.json` — do not hardcode rates or leverage caps anywhere else.

## Code Style
- Use functional components with hooks. No class components.
- Prefer named exports for components, default exports for pages.
- Keep files under 300 lines. Extract components when a file gets long.
- Use descriptive variable names. No single-letter variables except loop counters.
- All dollar amounts display with commas and 2 decimal places unless whole numbers.
- Percentages display with 1 decimal place (e.g., 70.0%, 9.0%).

## Build & Test Commands
```bash
npm run dev          # Local dev server
npm run build        # Production build (run this before every PR to catch errors)
npm run lint         # Linting
```

## Deploy Workflow
When I say any variation of "ship it", "send PR", "get PR", or "push it up" (case-insensitive — "Ship It", "SHIP IT", "Get pr", etc. all count):
1. `git checkout -b feature/[descriptive-name]`
2. `git add -A`
3. `npm run build` (abort if build fails)
4. `git commit -m "[concise commit message]"`
5. `git push origin HEAD`
6. `gh pr create --fill`
7. **Give me the PR link immediately. Don't explain what you did — just link.**

Netlify auto-deploys from PR merges to main.

## Project Structure (Key Paths)
```
app/                    # Next.js App Router pages
app/apply/              # Loan application form
app/api/sync-pricing/   # Webhook endpoint for Make.com pricing sync
data/pricing-config.json # Source of truth for all pricing (auto-synced from Google Sheets)
components/             # Reusable UI components
public/                 # Static assets
```

## Pricing System
- All loan pricing comes from `data/pricing-config.json` — never hardcode rates.
- Google Sheets is the master → Make.com syncs every 24hrs → writes to pricing-config.json → Netlify rebuilds.
- Each program row has: rates, points, min origination fee ($4k floor), leverage caps (LTV/LTC/LTP), loan terms, exit points, legal/doc fees, BPO/appraisal costs.
- Origination fee formula: `max(loan_amount × points%, min_origination_fee)`
- Exit points: 12mo = 0, 18mo = 1, 24mo = 2 (commercial only).
- Legal/doc fees and BPO/appraisal costs appear ONLY on the emailed term sheet, NOT on the instant quote.

## Loan Form Logic
- **Residential types** (Fix & Flip, DSCR Rental, Manufactured Housing, New Construction): Always 12 months, no term selector, no exit points.
- **Commercial types** (CRE Bridge, RV Park, Multifamily): Show 12/18/24 month term selector with exit points.
- Loan amount slider: defaults to 75% of total cost (purchase + rehab), range 50-90%.
- Live metric pills show LTV, LTC, and Equity Required — color-coded green/gold/red.

## Important Rules
- Never touch files outside the scope of what I ask for.
- Don't add console.logs to production code.
- Don't install new packages without asking me first.
- Don't create README files unless I ask.
- If the build fails, fix it before pushing. Never push broken code.
- Keep responses short. Don't explain what you're about to do — just do it.
- When done, give me the PR link. That's it.

## Brand
- Dark theme: background `#0f1923`, gold accent `#c9a84c`
- Professional, clean, minimal UI. No gradients, no shadows heavier than `shadow-sm`.
- Font: Use whatever is already configured in the project.
