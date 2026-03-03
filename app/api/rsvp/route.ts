import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { guestName, status, message } = body;

  try {
    // Authenticate with Google Service Account
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Create Google Sheets API client
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Append RSVP data to spreadsheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          guestName, 
          status === 'yes' ? 'Attending' : 'Not Attending', 
          message || '', 
          new Date().toLocaleString('vi-VN')
        ]],
      },
    });

    return NextResponse.json({ success: true, message: 'RSVP recorded successfully' });
  } catch (error) {
    console.error('Google Sheets API Error:', error);
    return NextResponse.json(
      { error: 'Failed to sync with Sheets', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
