const { selectCommentsForArticle, addComment } = require("../models/comments");
const { selectArticleById } = require("../models/articles");

exports.getCommentsForArticle = (req, res, next) => {
  const id = req.params.article_id;
  selectCommentsForArticle(id)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const id = req.params.article_id;
  const comment = req.body[0];
  addComment(comment, id)
    .then((comment) => {
      console.log(comment);
      res.status(201).send(comment[0]);
    })
    .catch((err) => {
      next(err)
    });
};
