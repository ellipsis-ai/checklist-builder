function(name, firstQuestion, ellipsis) {
  const skills = require('skills')(ellipsis);
const savedChecklists = require('savedChecklists')(ellipsis);

skills.createNewChecklist(name, firstQuestion).then(json => {
  savedChecklists.saveChecklistFor(json.id).then(res => {
    const editUrl = `${ellipsis.apiBaseUrl}/edit_skill/${json.id}`;
    ellipsis.success(editUrl, {
      choices: [
        { 
          actionName: 'addQuestion', 
          label: 'Add a question', 
          args: [
            {
              name: 'skillId',
              value: json.id
            }
          ]
        },
        {
          actionName: 'listChecklists',
          label: 'List my checklists'
        }
      ]
    });
  });
})
}
