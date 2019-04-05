/*
@exportId 5bhR5H0eTei-rPIop3NzNw
*/
module.exports = (function() {
const EllipsisApi = require('ellipsis-api');

return ellipsis => {

  const api = new EllipsisApi(ellipsis);
  const skills = require('skills')(ellipsis);

  return {
    getMyChecklists: getMyChecklists,
    saveChecklistFor: saveChecklistFor
  };

  function saveChecklistFor(skillId) {
    const mutation = `
    mutation CreateChecklist($checklist: ChecklistInput!) {
      createChecklist(checklist: $checklist) {
        id
        skillId
        ownerId
      }
    }
    `;

    const vars = {
      checklist: {
        skillId: skillId,
        ownerId: ellipsis.event.user.ellipsisUserId
      }
    };

    return api.storage.query({ query: mutation, variables: vars });
  }

  function getMyChecklists() {
    const query = `
    {
      checklistList(filter: { ownerId: "${ellipsis.event.user.ellipsisUserId}" }) {
        id
        skillId
        ownerId
      }
    }
    `;
    return api.storage.query({
      query: query
    }).then(res => {
      return Promise.all(res.data.checklistList.map(ea => {
        return skills.getNameFor(ea.skillId).then(name => {
          return {
            label: name,
            id: ea.skillId
          };
        }).catch(e => undefined);
      })).then(res => res.filter(ea => ea));
    });
  }
}
})()
     