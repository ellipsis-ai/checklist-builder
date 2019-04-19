function(skillId, ellipsis) {
  const skills = require('skills')(ellipsis);

skills.hasQuestions(skillId).then( hasQuestions => {
  const choices = [];
  if (hasQuestions) {
    choices.push({ 
      actionName: 'runChecklist', 
      label: 'Run the checklist', 
      allowMultipleSelections: true,
      allowOthers: true,
      skillId: skillId
    });
  }
  choices.push({ 
    actionName: 'addQuestion', 
    label: 'Add a question in chat', 
    args: [
      {
        name: 'skillId',
        value: skillId
      }
    ],
    allowMultipleSelections: true,
    allowOthers: true
  });
  choices.push({
    actionName: 'updateQuestionsFromSheet',
    label: 'Update questions in a Sheet',
    args: [
      { name: 'skillId', value: skillId }
    ],
    allowMultipleSelections: true,
    allowOthers: true
  });
  ellipsis.success("", {
    choices: choices
  });
});
}
