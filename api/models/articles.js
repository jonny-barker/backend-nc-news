const db = require("../../db/connection");

exports.selectArticleById = (id) => {
  return db.query("SELECT * FROM articles WHERE article_id = $1", [id]).then((result) => {
    if (!result.rows[0]) {
      return Promise.reject({ status: 404, msg: 'No article found for article_id'})
    } else {
      return result.rows[0];
    }
  });
};
