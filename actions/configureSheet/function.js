function(sheetId, ellipsis) {
  const sheets = require('sheets-helpers')(ellipsis);

sheets.configureSheetForQuestions(sheetId).then(ellipsis.success)
}
