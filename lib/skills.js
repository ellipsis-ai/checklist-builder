/*
@exportId vhc4iVAtSqKAWE9sQv1ByA
*/
module.exports = (function() {
const fetch = require('node-fetch');
const util = require('util');
const uuid = require('uuid');
const btoa = require('btoa');

const ID = {
  newRandomUUIDArray: function() {
    const bytes = new Uint8Array(16);
    uuid.v4({}, bytes, 0);
    return bytes;
  },

  toBase64URLEncoded(uint8array) {
    const str = String.fromCharCode.apply(this, uint8array);
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
  },

  next() {
    return ID.toBase64URLEncoded(ID.newRandomUUIDArray());
  }
};

return ellipsis => {
  const baseUrl = `${ellipsis.apiBaseUrl}/api/v1`;
  
  return {
    createNewChecklist: createNewChecklist,
    addQuestion: addQuestion,
    replaceQuestions: replaceQuestions,
    getInputs: getInputs,
    getNameFor: getNameFor,
    isDeployed: isDeployed,
    hasQuestions: hasQuestions,
    deploySkill: deploySkill
  }

  function createNewChecklist(name) {
    return getSkillEditingContext().then(context => {
      const skillData = context.skill;
      skillData.name = name;
      const trigger = `run checklist ${name}`;
      const runChecklistCode = `
      const summary = require('checklist-summary')(ellipsis);
      ellipsis.success(summary());
      `
      skillData.behaviorVersions = [
        newAction('runChecklist', trigger, runChecklistCode, '{successResult}', [])
      ];
      const lib = ellipsis.meta.skill.libraries.find(ea => ea.name === 'checklist-summary');
      skillData.libraryVersions = [
        Object.assign({}, lib, { createdAt: ellipsis.meta.skill.createdAt })
      ];
      return saveSkill(skillData);
    });
  }

  function addQuestion(skillId, question) {
    return getSkillEditingContext(skillId).then(context => {
      const skillData = context.skill;
      const paramName = `question${skillData.actionInputs.length}`;
      const input = newInput(paramName, question, context.builtinParamTypes.find(ea => ea.name === "Yes/No"));
      skillData.actionInputs.push(input);
      skillData.behaviorVersions[0].inputIds.push(input.inputId);
      return saveSkill(skillData);
    });
  }

  function replaceQuestions(skillId, questions) {
    return getSkillEditingContext(skillId).then(context => {
      const skillData = context.skill;
      const inputs = questions.map((ea, i) => {
        const paramName = `question${i}`;
        return newInput(paramName, ea, context.builtinParamTypes.find(ea => ea.name === "Yes/No"));
      });
      skillData.actionInputs = inputs;
      skillData.behaviorVersions[0].inputIds = inputs.map(ea => ea.inputId);
      return saveSkill(skillData);
    });
  }

  function getInputs(skillId) {
    return getSkillEditingContext(skillId).then(context => {
      const skillData = context.skill;
      return skillData.actionInputs;
    });
  }

  function newInput(name, question, paramType) {
    return {
      name: name,
      inputId: ID.next(),
      paramType: paramType,
      question: question,
      isSavedForTeam: false,
      isSavedForUser: false
    };
  }

  function newAction(name, trigger, functionBody, responseTemplate, inputIds) {
    return {
      teamId: ellipsis.team.ellipsisTeamId,
      behaviorId: ID.next(),
      isNew: true,
      name: name,
      functionBody: functionBody,
      responseTemplate: responseTemplate,
      inputIds: inputIds,
      triggers: [
        {
          text: trigger,
          requiresMention: true,
          isRegex: false,
          caseSensitive: false,
          triggerType: 'MessageSent'
        }
      ],
      config: {
        responseTypeId: 'Normal',
        isDataType: false
      }
    }
  }

  function createNewSkill() {
    return fetch(`${baseUrl}/skill_versions/${ellipsis.token}`).then(res => res.json())
  }

  function getNameFor(skillId) {
    return getSkillEditingContext(skillId).then(context => {
      return context.skill.name;
    })
  }

  function getSkillEditingContext(skillId) {
    const qs = skillId ? `?skillId=${skillId}`: '';
    return fetch(`${baseUrl}/skill_editing_context/${ellipsis.token}${qs}`).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Skill not found!");
      }
    });
  }

  function saveSkill(json) {
    return fetch(`${baseUrl}/skill_versions`, {
      method: 'POST',
      body:    JSON.stringify({ dataJson: JSON.stringify(json), token: ellipsis.token }),
      headers: { 'Content-Type': 'application/json' },
    }).
      then(res => res.json()).
      then(json => {
        return deploySkill(json.id).then(() => {
          return json;
        });
      });
  }

  function hasQuestions(skillId) {
    return getSkillEditingContext(skillId).then(context => {
      return context.skill.actionInputs.length > 0;
    });
  }

  function isDeployed(skillId) {
    return getSkillEditingContext(skillId).then(context => {
      return Boolean(context.skill.deployment);
    });
  }

  function deploySkill(skillId) {
    return fetch(`${baseUrl}/skill_version_deployments`, {
      method: 'POST',
      body:    JSON.stringify({ skillId: skillId, token: ellipsis.token }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json());
  }

}
})()
     