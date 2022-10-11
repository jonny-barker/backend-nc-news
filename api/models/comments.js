const db = require("../../db/connection");

exports.selectCommentsForArticle = (id) => {
  return db
    .query(
      `SELECT *
    FROM comments
    WHERE article_id=$1
    ORDER BY created_at DESC
    `,
      [id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No article found for article_id",
        });
      } else {
        return result.rows;
      }
    });
};
