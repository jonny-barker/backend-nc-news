const db = require("../../db/connection");
const { checkExists } = require("../../db/seeds/utils");

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

exports.selectArticles = (topic, sort_by = "created_at", order = "DESC") => {
  const sortWhiteList = [
    "created_at",
    "author",
    "topic",
    "body",
    "votes",
    "article_id",
    "title",
  ];
  const orderWhiteList = ["desc", "asc", "DESC", "ASC"];
  
  if (!sortWhiteList.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by Value" });
  } else if (!orderWhiteList.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order Value" });
  }
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
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order};`,
      queryValues
    )
    .then((result) => {
      return result.rows;
    });
};
