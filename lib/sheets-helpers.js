/*
@exportId ZeWcBGDsTzKy3bh_6KhJCg
*/
module.exports = (function() {
return ellipsis => {

  const client = require('google-client')(ellipsis);
  const {google} = ellipsis.require('googleapis@38.0.0');
  const sheets = google.sheets({
    version: 'v4',
    auth: client
  });

  return {
    getQuestionsIn: getQuestionsIn
  };

  function getQuestionsIn(sheetId) {
    const request = {
      spreadsheetId: sheetId,
      ranges: [],
      includeGridData: false,
      auth: client
    };

    return client.authorize().then(() => {
      const request = {
        spreadsheetId: sheetId,
        ranges: ['Sheet1'],
        auth: client,
      };
      return sheets.spreadsheets.values.batchGet(request).then(res => {
        const rows = res.data.valueRanges[0].values;
        return rows.map(ea => ea[0]);
      });
    });
  }

}
})()
     