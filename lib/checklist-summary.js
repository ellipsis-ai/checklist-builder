/*
@exportId KAz0uU2WS-K2pJAsOR7fJA
*/
module.exports = (function() {
return ellipsis => {

  return summary;

  function summary() {
    const questionsAndAnswers = {};
    ellipsis.args.forEach(ea => {
      questionsAndAnswers[ea.input.question] = ea.value;
    });
    return summaryFor(ellipsis.meta.skill.name, questionsAndAnswers);
  }

  function summaryFor(checklistName, questionsAndAnswers) {
    return `
  **${checklistName}** has been completed by ${ellipsis.event.user.formattedLink}:
  ${summaryPartsFor(questionsAndAnswers)}
  `;
  }

  function summaryPartsFor(questionsAndAnswers) {
    return Object.keys(questionsAndAnswers).map(question => {
      return summaryPartFor(question, questionsAndAnswers[question]);
    }).join("\n");
  }

  function summaryPartFor(question, answer) {
    return `${checkFor(answer)}   ${question}`;
  }

  function checkFor(bool) {
    return bool? ":white_check_mark:" : ":x:";
  }

};
})()
     