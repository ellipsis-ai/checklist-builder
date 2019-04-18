function(name, firstQuestion, ellipsis) {
  const skills = require('skills')(ellipsis);
const savedChecklists = require('savedChecklists')(ellipsis);

skills.createNewChecklist(name, firstQuestion).then(json => {
  savedChecklists.saveChecklistFor(json.id).then(res => {
    const editUrl = `${ellipsis.apiBaseUrl}/edit_skill/${json.id}`;
    const trigger = json.behaviorVersions[0].triggers[0].text;
    ellipsis.success(`OK, I created ${name}`, {
      next: { 
        actionName: 'view', 
        args: [
          {
            name: 'checklist',
            value: json.id
          }
        ]
      }
    });
  });
})
}
