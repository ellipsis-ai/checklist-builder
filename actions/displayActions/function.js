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
      label: 'Add a question', 
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
      actionName: 'listChecklists',
      label: 'List my checklists',
      allowMultipleSelections: true,
      allowOthers: true
    }
  ];
  if (!isDeployed) {
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
