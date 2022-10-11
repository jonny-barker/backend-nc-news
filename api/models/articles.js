const db = require("../../db/connection");

exports.selectArticleById = (id) => {
  return db
    .query(
      `    
    SELECT articles.*, CAST(COUNT (comments.article_id) AS INT) AS comment_count
    FROM articles 
    LEFT JOIN 
    comments
    ON articles.article_id=comments.article_id
    WHERE articles.article_id=$1 
    GROUP BY articles.article_id
    `,
      [id]
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

exports.updateArticleById = (update, id) => {
  return db
    .query(
      `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING * `,
      [update.inc_votes, id]
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
