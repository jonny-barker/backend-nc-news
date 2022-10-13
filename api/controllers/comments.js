const {
  selectCommentsForArticle,
  addComment,
  removeComment,
  checkCommentExists,
} = require("../models/comments");
const { selectArticleById } = require("../models/articles");

exports.getCommentsForArticle = (req, res, next) => {
  const id = req.params.article_id;
  selectCommentsForArticle(id)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const id = req.params.article_id;
  const comment = req.body[0];
  addComment(comment, id)
    .then((comment) => {
      res.status(201).send(comment);
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const id = req.params.comment_id;
  const promises = [removeComment(id), checkCommentExists(id)];
  Promise.all(promises)
    .then(() => {
      res.send(204);
    })
    .catch(next);
};
