function(checklist, ellipsis) {
  const skills = require('skills')(ellipsis);

skills.getInputs(checklist.id).then(inputs => {
  const successResult = inputs.map(ea => {
    return ea.question;
  });
  ellipsis.success(successResult, {
    next: {
      actionName: 'displayActions',
      args: [{ name: 'skillId', value: checklist.id }]
    }
  });
});
}
