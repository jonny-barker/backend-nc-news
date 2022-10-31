const db = require("../../db/connection");

exports.selectTopics = (topic) => {
  const queryValues = [];
  queryStatement = ``;
  if (topic) {
    queryStatement += `WHERE slug = $1`;
    queryValues.push(topic);
  }
  return db
    .query(
      `
    SELECT * FROM topics
    ${queryStatement}
    `,
      queryValues
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Invalid Topic",
        });
      } else {
        return result.rows;
      }
      
    });
};
