const { selectArticleById, updateArticleById, selectArticles } = require("../models/articles");
const { selectTopics } = require('../models/topics')

exports.getArticleById = (req, res, next) => {
  const id = req.params.article_id;
  selectArticleById(id)
    .then((article) => {
      res.status(200).send({ article });
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
      res.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  const topic = req.query.topic
  const promises = [selectArticles(topic)]
  if (topic) {
    promises.push(selectTopics(topic))
  }
  Promise.all(promises).then((promises) => {
    res.status(200).send( promises[0] )
  })
  .catch(next)
  
};
