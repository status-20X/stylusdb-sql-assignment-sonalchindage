// src/index.js

// const parseQuery = require("./queryParser");
// const readCSV = require("./csvReader");

// async function executeSELECTQuery(query) {
//   const { fields, table } = parseQuery(query);
//   const data = await readCSV(`${table}.csv`);

//   // Filter the fields based on the query
//   return data.map((row) => {
//     const filteredRow = {};
//     fields.forEach((field) => {
//       filteredRow[field] = row[field];
//     });
//     return filteredRow;
//   });
// }

// module.exports = executeSELECTQuery;

// src/index.js

const parseQuery = require("./queryParser");
const readCSV = require("./csvReader");

async function executeSELECTQuery(query) {
  const { fields, table, whereClauses } = parseQuery(query);
  const data = await readCSV(`${table}.csv`);

  // Apply WHERE clause filtering
  const filteredData =
    whereClauses.length > 0
      ? data.filter((row) =>
          whereClauses.every((clause) => {
            // You can expand this to handle different operators
            return row[clause.field] === clause.value;
          })
        )
      : data;

  // Select the specified fields
  return filteredData.map((row) => {
    const selectedRow = {};
    fields.forEach((field) => {
      selectedRow[field] = row[field];
    });
    return selectedRow;
  });
}

module.exports = executeSELECTQuery;
