function(skillId, ellipsis) {
  const skills = require('skills')(ellipsis);

skills.isDeployed(skillId).then( isDeployed => {
  let choices = [
    { 
      actionName: 'runChecklist', 
      label: 'Run the checklist', 
      allowMultipleSelections: true,
      allowOthers: true,
      skillId: skillId
    },
    { 
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
    },
    {
      actionName: 'updateQuestionsFromSheet',
      label: 'Update questions in a Sheet',
      args: [
        { name: 'skillId', value: skillId }
      ],
      allowMultipleSelections: true,
      allowOthers: true
    }
  ];
  if (false && !isDeployed) { // disabled for now
    choices = choices.concat([{
      actionName: 'deploy',
      args: [{ name: 'skillId', value: skillId }],
      label: 'Deploy',
      allowMultipleSelections: false,
      allowOthers: true
    }]);
  }
  ellipsis.success("", {
    choices: choices
  });
});
}
