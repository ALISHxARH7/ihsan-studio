import { NextResponse } from 'next/server';

/**
 * Google Sheets Price List API
 *
 * Expected sheet structure (row 1 = headers):
 * A: Название услуги
 * B: Цена
 * C: Единица (₸/м², ₸/ракурс, etc.)
 * D: Описание
 * E: Фичи (через ";")
 * F: Популярное (да/нет) — optional
 */

export async function GET() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (!sheetId || !apiKey) {
    return NextResponse.json(
      { prices: [], message: 'Google Sheets not configured' },
      { status: 200 }
    );
  }

  try {
    const range = encodeURIComponent('Sheet1!A2:F100');
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`Sheets API error: ${res.status}`);
    }

    const data = await res.json();
    const rows: string[][] = data.values || [];

    const prices = rows
      .filter((row) => row[0])
      .map((row) => ({
        name: row[0] || '',
        price: row[1] || '',
        unit: row[2] || '',
        description: row[3] || '',
        features: (row[4] || '').split(';').map((f: string) => f.trim()).filter(Boolean),
        popular: (row[5] || '').toLowerCase() === 'да',
      }));

    return NextResponse.json({ prices });
  } catch (error) {
    console.error('Google Sheets fetch error:', error);
    return NextResponse.json(
      { prices: [], message: 'Failed to fetch from Google Sheets' },
      { status: 200 }
    );
  }
}
