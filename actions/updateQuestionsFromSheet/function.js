function(skillId, ellipsis) {
  const skills = require('skills')(ellipsis);
const sheets = require('sheets-helpers')(ellipsis);

sheets.create().then(createResult => {
  const data = createResult.data;
  skills.getInputs(skillId).then(inputs => {
    const permalink = ellipsis.event.message ? ellipsis.event.message.permalink : undefined;
    const heading = 
      permalink ?
        `=HYPERLINK("${permalink}", "Edit the questions below. Once you're done, click here to return to Slack and update your checklist")` :
        `Edit the questions below. Once you're done, return to Slack and update your checklist`;
    sheets.putQuestions(data.spreadsheetId, inputs.map(ea => ea.question), heading).then(updateResult => {
      ellipsis.success(data.spreadsheetUrl, {
        choices: [
          {
            actionName: 'pullQuestionsFromSheet',
            label: 'Update checklist questions',
            allowMultipleSelections: true,
            allowOthers: true,
            args: [
              { name: 'skillId', value: skillId },
              { name: 'sheetId', value: data.spreadsheetId }
            ]
          }
        ]
      });
    });
  });

});
}
