// const readXlsxFile = require('read-excel-file/node');
// const fs = require('fs');

// readXlsxFile("./아동센터_근무자.xlsx").then((rows) => {
//   console.log(rows);
//   let jsonData = [];
//   for (let i = 0; i < rows.length; i++) {
//     if (i !== 0) {
//       const inputData = {
//         number: rows[i][0],
//         name: rows[i][1],
//         team: rows[i][2],
//         phone: rows[i][3],
//       };
//       jsonData.push(inputData);
//     }
//   }
//   const jsonDataToString = JSON.stringify(jsonData);
//   fs.writeFileSync("./dataToJSon.json", jsonDataToString);
// });