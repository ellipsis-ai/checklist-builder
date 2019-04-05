function(skillId, ellipsis) {
  const fetch = require('node-fetch');

const targetSkillId = 'RfOFZWi0QAOQtgBHTbJS2g';
const url = `${ellipsis.apiBaseUrl}/api/v1/skill_editing_context/${ellipsis.token}?skillId=${skillId}`;

fetch(url)
  .then(res => res.json())
  .then(json => {
    const skillData = json.skill;
    ellipsis.success(skillData.actionInputs.map(ea => {
      return ea.question;
    }
  ));
});
}
