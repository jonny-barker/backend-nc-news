const db = require("../../db/connection");

exports.selectArticleById = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
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

exports.selectArticles = (topic) => {
  const queryValues = [];
  queryStatement = ``;
  if (topic) { 
    queryStatement += `WHERE topic = $1`;
    queryValues.push(topic);
  }
  return db
    .query(
    `SELECT articles.*, CAST(COUNT (comments.article_id) AS INT) AS comment_count
    FROM articles 
    LEFT JOIN 
    comments
    ON articles.article_id=comments.article_id
    ${queryStatement}
    GROUP BY articles.article_id`
    , queryValues)
    .then((result) => {
      return result.rows;
    });
};
