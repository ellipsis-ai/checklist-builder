function(skillId, question, ellipsis) {
  const skills = require('skills')(ellipsis);

skills.addQuestion(skillId, question).then(json => {
  const editUrl = `${ellipsis.apiBaseUrl}/edit_skill/${json.id}`;
  ellipsis.success(editUrl, {
    choices: [
      { 
        actionName: 'addQuestion', 
        label: 'Add another question', 
        args: [
          {
            name: 'skillId',
            value: json.id
          }
        ]
      }
    ]
  });
})
}
