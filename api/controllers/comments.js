const { selectCommentsForArticle } = require('../models/comments');

exports.getCommentsForArticle = (req, res, next) => {
  const id = req.params.article_id
  selectCommentsForArticle(id)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
}