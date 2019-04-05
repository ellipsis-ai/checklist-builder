function(question1, question2, ellipsis) {
  const fetch = require('node-fetch');
const util = require('util');

const targetSkillId = 'RfOFZWi0QAOQtgBHTbJS2g';
const baseUrl = `${ellipsis.apiBaseUrl}/api/v1/skill_versions`;

fetch(`${baseUrl}/${targetSkillId}/${ellipsis.token}`)
  .then(res => res.json())
  .then(json => {
  const currentInputs = json.actionInputs;
  const input1 = Object.assign({}, currentInputs[0], { question: question1 });
  const input2 = Object.assign({}, currentInputs[0], { question: question2 });
  const updated = Object.assign({}, json, { actionInputs: [input1, input2]});
  return fetch(baseUrl, {
    method: 'POST',
    body:    JSON.stringify({ dataJson: JSON.stringify(updated), token: ellipsis.token }),
    headers: { 'Content-Type': 'application/json' },
  })
}).then(res => {
  ellipsis.success("Updated!");
});
}
