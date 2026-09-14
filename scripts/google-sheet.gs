// Bind this script to the RSVP spreadsheet (Extensions → Apps Script).
// Deploy → New deployment → Web app
//   Execute as: Me
//   Who has access: Anyone
//     (must be "Anyone", not "Only myself" and not "Anyone with a Google account")
// Paste the /exec URL into .env.local as GOOGLE_SCRIPT_URL, then restart npm run dev.

function doPost(e) {
  const p = (e && e.parameter) || {};
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['When', 'Name', 'Role', 'Answer', 'Email', 'Phone', 'Note']);
  }
  sheet.appendRow([
    new Date(),
    p.name || '',
    p.role || '',
    p.answer || '',
    p.email || p.contact || '',
    p.phone || '',
    p.note || '',
  ]);
  return ContentService.createTextOutput('ok');
}
