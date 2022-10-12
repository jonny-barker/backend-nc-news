const db = require("../../db/connection");
const format = require("pg-format");
const { checkExists } = require("../../db/seeds/utils");

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

exports.addComment = (comment, id) => {
  queryValues = [comment.body, comment.author, id];
  return db
    .query(
      format(
        `INSERT INTO comments (body, author, article_id )VALUES %L RETURNING *;`,
        [queryValues]
      )
    )
    .then((result) => {
      if (!result.rows[0]) {
        return Promise.reject({
          status: 404,
          msg: "No article found for article_id",
        });
      } else {
        return result.rows[0];
      }
    });
};

exports.removeComment = (id) => {
  return db
    .query(format(`DELETE FROM comments WHERE comment_id = ${id}`))
    .then(() => {
      return;
    });
};
