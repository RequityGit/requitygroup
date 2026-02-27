#!/usr/bin/env node

/**
 * Sync Pricing from Google Sheets → data/pricing-config.json
 *
 * Reads the "Pricing Matrix" tab from a Google Sheet and transforms it
 * into the pricing config JSON used by the application.
 *
 * Usage:
 *   PRICING_SHEET_ID=<sheet-id> GOOGLE_SHEETS_API_KEY=<key> node scripts/sync-pricing.js
 *
 * Environment variables:
 *   GOOGLE_SHEETS_API_KEY  - Google API key with Sheets API enabled
 *   PRICING_SHEET_ID       - Google Sheet ID (from the sheet URL)
 *   PRICING_SHEET_TAB      - Tab/sheet name (default: "Pricing Matrix")
 */

const fs = require('fs');
const path = require('path');

const SHEET_ID = process.env.PRICING_SHEET_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const TAB_NAME = process.env.PRICING_SHEET_TAB || 'Pricing Matrix';
const OUTPUT_PATH = path.resolve(__dirname, '..', 'data', 'pricing-config.json');

async function fetchSheet() {
  const range = encodeURIComponent(TAB_NAME);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google Sheets API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.values || [];
}

/**
 * Transform flat sheet rows into the nested loanPrograms structure.
 *
 * Expected columns (header row):
 *   loan_type, arv_label, program_id, program_name, interest_rate,
 *   rate_type, origination_points, points_note, max_ltv, ltv_note,
 *   max_ltc, ltc_note, max_ltp, max_term, term_note, min_credit_score,
 *   min_deals_24mo, citizenship, highlight_1, highlight_2, highlight_3
 */
function parseRows(rows) {
  if (rows.length < 2) {
    throw new Error('Sheet must have a header row and at least one data row');
  }

  const headers = rows[0].map((h) =>
    String(h).trim().toLowerCase().replace(/\s+/g, '_')
  );
  const dataRows = rows.slice(1);
  const loanPrograms = {};

  for (const row of dataRows) {
    // Build a record from the row
    const r = {};
    headers.forEach((header, i) => {
      r[header] = row[i] !== undefined ? String(row[i]).trim() : '';
    });

    const loanType = r.loan_type;
    if (!loanType) continue;

    // Create the loan type entry if it doesn't exist
    if (!loanPrograms[loanType]) {
      loanPrograms[loanType] = {
        arvLabel: r.arv_label || 'Estimated Property Value',
        programs: [],
      };
    }

    // Only add as a program if it has the required pricing fields
    if (r.program_id && r.interest_rate) {
      const highlights = [r.highlight_1, r.highlight_2, r.highlight_3].filter(Boolean);

      loanPrograms[loanType].programs.push({
        id: r.program_id,
        name: r.program_name || r.program_id,
        interestRate: parseFloat(r.interest_rate) || 0,
        rateType: r.rate_type || 'Fixed',
        originationPoints: parseFloat(r.origination_points) || 0,
        pointsNote: r.points_note || '',
        maxLTV: parseFloat(r.max_ltv) || 0,
        ltvNote: r.ltv_note || '',
        maxLTC: parseFloat(r.max_ltc) || 0,
        ltcNote: r.ltc_note || '',
        maxLTP: parseFloat(r.max_ltp) || 0,
        maxTerm: parseInt(r.max_term) || 12,
        termNote: r.term_note || '',
        requirements: {
          minCreditScore: parseInt(r.min_credit_score) || 0,
          minDeals24Months: parseInt(r.min_deals_24mo) || 0,
          citizenship: r.citizenship || 'any',
        },
        highlights,
      });
    }
  }

  return loanPrograms;
}

async function main() {
  if (!SHEET_ID || !API_KEY) {
    console.error('Missing required environment variables:');
    if (!SHEET_ID) console.error('  - PRICING_SHEET_ID');
    if (!API_KEY) console.error('  - GOOGLE_SHEETS_API_KEY');
    console.error('\nUsage:');
    console.error(
      '  PRICING_SHEET_ID=<id> GOOGLE_SHEETS_API_KEY=<key> node scripts/sync-pricing.js'
    );
    process.exit(1);
  }

  console.log(`Fetching pricing from Google Sheet: ${SHEET_ID}`);
  console.log(`Tab: ${TAB_NAME}\n`);

  const rows = await fetchSheet();
  console.log(`Found ${rows.length - 1} data row(s)\n`);

  const loanPrograms = parseRows(rows);

  const config = {
    lastSyncedAt: new Date().toISOString(),
    source: 'google_sheets',
    sheetId: SHEET_ID,
    tabName: TAB_NAME,
    loanPrograms,
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(config, null, 2) + '\n');

  console.log(`Pricing config written to: ${OUTPUT_PATH}`);
  console.log(`Loan types synced:`);
  for (const [type, data] of Object.entries(loanPrograms)) {
    console.log(`  ${type}: ${data.programs.length} program(s)`);
  }
  console.log('\nDone.');
}

main().catch((err) => {
  console.error('Sync failed:', err.message);
  process.exit(1);
});
