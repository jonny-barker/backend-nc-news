const { selectArticleById, updateArticleById } = require('../models/articles');

exports.getArticleById = (req, res, next) => {
  const id = req.params.article_id;
  selectArticleById(id)
    .then((article) => {
      res.status(200).send({article});
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const update = req.body;
  const id = req.params.article_id;
  updateArticleById(update, id)
    .then((article) => {
      res.status(201).send({article})
    })
    .catch((err) => {
      next(err)
    })
}