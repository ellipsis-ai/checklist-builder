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
  const drive = google.drive({
    version: 'v3',
    auth: client
  });

  return {
    getQuestionsIn: getQuestionsIn,
    putQuestions: putQuestions,
    create: createSheet
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

  function createSheet() {
    const request = {
      resource: {},
      auth: client
    };

    return client.authorize().then(() => {
      return sheets.spreadsheets.create(request).then(sheetCreateResponse => {
        const body = {
          role: 'writer',
          type: 'anyone'
        };
        const permsRequest = {
          fileId: sheetCreateResponse.data.spreadsheetId,
          resource: body
        };
        return drive.permissions.create(permsRequest).then(res => {
          return sheetCreateResponse;
        });
      });
    });
  }

  function putQuestions(sheetId, questions) {
    return client.authorize().then(() => {
      const values = questions.map(ea => [ea]);
      const request = {
        spreadsheetId: sheetId,
        resource: {
          valueInputOption: 'USER_ENTERED',
          data: [
            {
              range: 'Sheet1',
              values: values
            }
          ]
        },
        auth: client
      };
      return sheets.spreadsheets.values.batchUpdate(request);
    });
  }

}
})()
     