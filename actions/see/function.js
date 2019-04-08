function(checklist, ellipsis) {
  const fetch = require('node-fetch');

const url = `${ellipsis.apiBaseUrl}/api/v1/skill_editing_context/${ellipsis.token}?skillId=${checklist.id}`;

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
