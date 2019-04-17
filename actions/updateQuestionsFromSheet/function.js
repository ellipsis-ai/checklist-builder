function(checklist, sheetId, ellipsis) {
  const skills = require('skills')(ellipsis);
const sheets = require('sheets-helpers')(ellipsis);
const skillId = checklist.id;

sheets.getQuestionsIn(sheetId).then(questions => {
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
}
