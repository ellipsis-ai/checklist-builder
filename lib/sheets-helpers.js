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
    create: createSheet,
    configureSheetForQuestions: configureSheetForQuestions
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
        ranges: ['Sheet1!A2:A1000'],
        auth: client,
      };
      return sheets.spreadsheets.values.batchGet(request).then(res => {
        const rows = res.data.valueRanges[0].values;
        const questions = rows.map(ea => ea[0]);
        return questions.map(ea => (ea || '').trim()).filter(ea => ea.length > 0);
      });
    });
  }

  function createSheet(title) {
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
        const spreadsheetId = sheetCreateResponse.data.spreadsheetId;
        const permsRequest = {
          fileId: spreadsheetId,
          resource: body
        };
        return Promise.all([drive.permissions.create(permsRequest), configureSheetForQuestions(spreadsheetId, title)]).then(res => {
          return sheetCreateResponse;
        });
      });
    });
  }

  function configureSheetForQuestions(sheetId, title) {
    const borderStyle = {
      style: "SOLID_THICK",
      width: 1,
      color: {
        blue: 1.0
      },
    };
    const request = {
      spreadsheetId: sheetId,
      resource: {
        requests: [
          {
            updateSpreadsheetProperties: {
              properties: {
                title,
              },
              fields: 'title',
            },
          },
          {
            updateDimensionProperties: {
              range: {
                sheetId: 0,
                dimension: "COLUMNS",
                startIndex: 0,
                endIndex: 1
              },
              properties: {
                pixelSize: 1000
              },
              fields: "pixelSize"
            }
          },
          {
            updateBorders: {
              range: {
                sheetId: 0,
                startRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 1
              },
              top: borderStyle,
              bottom: borderStyle,
              left: borderStyle,
              right: borderStyle,
            }
          }
        ]
      }
    };
    return sheets.spreadsheets.batchUpdate(request);
  }

  function putQuestions(sheetId, questions, heading) {
    return client.authorize().then(() => {
      const values = [heading].concat(questions).map(ea => [ea]);
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
     