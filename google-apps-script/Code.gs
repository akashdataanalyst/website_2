/**
 * Grid Cell Solutions — Contact Form Backend
 * -------------------------------------------------
 * This script receives POSTed form data from the website
 * and appends it as a new row in a Google Sheet.
 *
 * SETUP STEPS (see README.md for the full walkthrough):
 * 1. Create a new Google Sheet. Rename the first tab to "Leads".
 *    In row 1, add these headers exactly:
 *    Timestamp | Name | Phone | Email | Service | Message
 * 2. In that Sheet, go to Extensions > Apps Script.
 * 3. Delete any starter code and paste this whole file in.
 * 4. Click Deploy > New deployment > select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy, authorize the permissions when asked.
 * 6. Copy the Web App URL it gives you.
 * 7. Paste that URL into GOOGLE_SCRIPT_URL inside script.js
 *    on the website.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.service || '',
      data.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: lets you open the deployed URL in a browser to confirm it's live.
function doGet() {
  return ContentService.createTextOutput('Grid Cell Solutions form endpoint is live.');
}
