function(skillId, sheetId, ellipsis) {
  const sheets = require('sheets-helpers')(ellipsis);
const skills = require('skills')(ellipsis);

sheets.getQuestionsIn(sheetId).then(questions => {
  skills.replaceQuestions(skillId, questions).then(json => {
    ellipsis.success('', {
      next: {
        actionName: 'view',
        args: [
          { name: 'checklist', value: skillId }
        ]
      }
    })
  });
});
}
