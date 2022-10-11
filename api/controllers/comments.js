const { selectCommentsForArticle, addComment } = require("../models/comments");

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
  const comment = req.body[0]
  console.log(comment);
  addComment(comment)
    .then((comment) => {
      res.status(201).send(comment);
    })
    .catch((err) => {
      next(err);
    });
};
