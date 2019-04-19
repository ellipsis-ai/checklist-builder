function(checklist, ellipsis) {
  const skills = require('skills')(ellipsis);

skills.getInputs(checklist.id).then(inputs => {
  const questions = inputs.map(ea => {
    return ea.question;
  });
  const heading = questions.length === 0 ? '' : 'The current questions:\n';
  ellipsis.success({
    heading: heading,
    questions: questions
  }, {
    next: {
      actionName: 'displayActions',
      args: [{ name: 'skillId', value: checklist.id }]
    }
  });
});
}
