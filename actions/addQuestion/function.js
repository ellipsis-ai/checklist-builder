function(skillId, question, ellipsis) {
  const skills = require('skills')(ellipsis);

skills.addQuestion(skillId, question).then(json => {
  const editUrl = `${ellipsis.apiBaseUrl}/edit_skill/${json.id}`;
  ellipsis.success("Added.", {
    next: {
      actionName: 'view', 
      args: [
        {
          name: 'checklist',
          value: skillId
        }
      ]
    }
  });
})
}
