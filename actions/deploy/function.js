function(skillId, ellipsis) {
  const skills = require('skills')(ellipsis);

skills.deploySkill(skillId).then(json => {
  ellipsis.success("OK, deployed.", {
    next: {
      actionName: 'displayActions', 
      args: [
        {
          name: 'skillId',
          value: skillId
        }
      ]
    }
  });
})
}
