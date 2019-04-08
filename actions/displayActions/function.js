function(skillId, ellipsis) {
  ellipsis.success("", {
  choices: [
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
  ]
});
}
