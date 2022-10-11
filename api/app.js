const { getTopics } = require("./controllers/topics");
const { getArticleById, patchArticleById, getArticles } = require("./controllers/articles");
const { getUsers } = require("./controllers/users");
const express = require("express");
const app = express();
app.use(express.json())

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/users", getUsers);
app.patch("/api/articles/:article_id", patchArticleById);
app.get("/api/articles", getArticles);


app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid Input" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
