/**
 * Fetches pricing data from a published Google Sheet.
 *
 * Required env var: GOOGLE_SHEET_URL
 *
 * How to set up:
 * 1. Open your Google Sheet
 * 2. File → Share → Publish to web
 * 3. Select sheet "Дизайн интерьера", format CSV → Publish → copy link
 * 4. Repeat for "Архитектура" sheet
 * 5. Set GOOGLE_SHEET_DESIGN_CSV and GOOGLE_SHEET_ARCH_CSV in Netlify env vars
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Parse CSV text into array of arrays
function parseCSV(text) {
  const lines = text.trim().split('\n');
  return lines.map((line) => {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    values.push(current.trim());
    return values;
  });
}

exports.handler = async (event) => {
  const designUrl = process.env.GOOGLE_SHEET_DESIGN_CSV;
  const archUrl = process.env.GOOGLE_SHEET_ARCH_CSV;

  if (!designUrl && !archUrl) {
    return {
      statusCode: 404,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Google Sheets not configured. Using hardcoded prices.' }),
    };
  }

  const result = {};

  try {
    if (designUrl) {
      const res = await fetch(designUrl);
      const text = await res.text();
      result.designCSV = parseCSV(text);
    }
    if (archUrl) {
      const res = await fetch(archUrl);
      const text = await res.text();
      result.archCSV = parseCSV(text);
    }
  } catch (err) {
    console.error('Failed to fetch sheet:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to fetch prices' }),
    };
  }

  return {
    statusCode: 200,
    headers: { ...CORS_HEADERS, 'Cache-Control': 'public, s-maxage=3600' },
    body: JSON.stringify(result),
  };
};
