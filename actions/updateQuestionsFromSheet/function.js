function(skillId, ellipsis) {
  const skills = require('skills')(ellipsis);
const sheets = require('sheets-helpers')(ellipsis);

sheets.create().then(createResult => {
  const data = createResult.data;
  skills.getInputs(skillId).then(inputs => {
    sheets.putQuestions(data.spreadsheetId, inputs.map(ea => ea.question)).then(updateResult => {
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
