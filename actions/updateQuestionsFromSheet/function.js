function(checklist, sheetId, ellipsis) {
  const skills = require('skills')(ellipsis);
const client = require('google-client')(ellipsis);
const {google} = ellipsis.require('googleapis@38.0.0');
const sheets = google.sheets({
  version: 'v4',
  auth: client
});
const skillId = checklist.id;

const request = {
  spreadsheetId: sheetId,
  ranges: [],
  includeGridData: false,
  auth: client
};

client.authorize().then(() => {
  const request = {
    spreadsheetId: sheetId,
    ranges: ['Sheet1'],
    auth: client,
  };
  sheets.spreadsheets.values.batchGet(request).then(res => {
    const rows = res.data.valueRanges[0].values;
    const questions = rows.map(ea => ea[0]);

    skills.replaceQuestions(skillId, questions).then(json => {
      ellipsis.success('Done!', {
        next: {
          actionName: 'displayActions',
          args: [
            { name: 'skillId', value: skillId }
          ]
        }
      });
    });
  });
});
}
