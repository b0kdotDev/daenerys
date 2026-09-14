// 1. Create a Google Sheet. First row: When | Name | Role | Answer | Contact | Note
// 2. Extensions → Apps Script. Paste this file. Save.
// 3. Deploy → New deployment → Web app
//      Execute as: Me
//      Who has access: Anyone
// 4. Copy the Web app URL into .env.local as GOOGLE_SCRIPT_URL

function doPost(e) {
  const p = (e && e.parameter) || {};
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['When', 'Name', 'Role', 'Answer', 'Contact', 'Note']);
  }
  sheet.appendRow([
    new Date(),
    p.name || '',
    p.role || '',
    p.answer || '',
    p.contact || '',
    p.note || '',
  ]);
  return ContentService.createTextOutput('ok');
}
