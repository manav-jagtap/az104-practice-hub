# Google Sheets Result Tracking Setup

This V10 build collects a student's **Full Name + Email** before practice and sends each submitted mock result to your private Google Sheet.

## 1. Create the Google Sheet
Create a new Google Sheet in your Google Drive and name it `AZ-104 Practice Hub Results`.

In row 1, add these headings (the script can also create them automatically):

`Attempt ID | Date/Time | Name | Email | Exam | Score | Total | Percentage | Correct | Wrong | Unanswered | Time Taken (sec) | Time Taken (min)`

## 2. Add Apps Script
In that Sheet open **Extensions > Apps Script**. Delete the starter code and paste:

```javascript
const SHEET_NAME = 'Results';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) sh = ss.insertSheet(SHEET_NAME);

    if (sh.getLastRow() === 0) {
      sh.appendRow([
        'Attempt ID','Date/Time','Name','Email','Exam','Score','Total',
        'Percentage','Correct','Wrong','Unanswered','Time Taken (sec)','Time Taken (min)'
      ]);
      sh.setFrozenRows(1);
    }

    const d = JSON.parse(e.postData.contents || '{}');
    sh.appendRow([
      d.attemptId || '',
      d.submittedAt ? new Date(d.submittedAt) : new Date(),
      d.name || '',
      d.email || '',
      d.exam || '',
      Number(d.score || 0),
      Number(d.total || 0),
      Number(d.percentage || 0),
      Number(d.correct || 0),
      Number(d.wrong || 0),
      Number(d.unanswered || 0),
      Number(d.timeTakenSeconds || 0),
      Number(d.timeTakenMinutes || 0)
    ]);

    return ContentService.createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Deploy the Apps Script
1. Click **Deploy > New deployment**.
2. Select **Web app**.
3. Execute as: **Me**.
4. Who has access: choose the option that allows your website visitors to invoke the web app (Google may label this **Anyone** depending on account type).
5. Deploy and authorize the script.
6. Copy the generated Web App URL ending in `/exec`.

Keep the Google Sheet itself private. Visitors do **not** need edit access to the Sheet.

## 4. Connect the website
Open `assets/js/app.js` and find:

```javascript
const RESULT_ENDPOINT='';
```

Paste your Apps Script `/exec` URL between the quotes, for example:

```javascript
const RESULT_ENDPOINT='PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
```

Save the file and publish the website to GitHub Pages.

## 5. Test before publishing
Use a test name/email, start a mock, answer at least one question and submit. Confirm a new row appears in the `Results` sheet with the name, email, exam, score, percentage and time taken.

## Privacy / security note
This is appropriate for a public practice/portfolio website, not a high-stakes secure examination system. The Apps Script endpoint is public so a technically knowledgeable person could submit fabricated requests. Keep the Sheet private and do not collect sensitive personal information. Name and email are enough for this use case.
