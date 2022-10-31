const { selectArticleById, updateArticleById, selectArticles } = require("../models/articles-m");
const { selectTopics } = require('../models/topics-m')

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
  const sort_by = req.query.sort_by
  const order = req.query.order
  const topic = req.query.topic
  const promises = [selectArticles(topic, sort_by, order)];
  if (topic) {
    promises.push(selectTopics(topic))
  }
  
  Promise.all(promises).then((promises) => {
    res.status(200).send( promises[0] )
  })
    .catch((err) => {
    next(err)
  })
  
};
