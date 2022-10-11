const db = require("../../db/connection");
const format = require("pg-format");

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

exports.addComment = (comment) => {
  queryValues = [
    comment.body,
    comment.author,
    comment.article_id,
    comment.votes,
    comment.created_at,
  ];
  return db
    .query(
      format(
        `INSERT INTO comments (body, author, article_id, votes, created_at)VALUES %L RETURNING *;`,
        [queryValues]
      )
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No article found for article_id",
        });
      } else {
        return result.rows[0];
      }
    });
};
