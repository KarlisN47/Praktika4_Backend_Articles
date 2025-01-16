const Article = require("../models/article");
const User = require("../models/user");
const Comment = require("../models/comment");
const asyncHandler = require('express-async-handler');


exports.createComment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const articleId = req.params.articleId;
  const author = await User.findByPk(userId);
  const article = await Article.findByPk(articleId);
  if(!article) {return res.status(404).send({ message: "Article Not found." })}
  const { body } = req.body;
  
  if (!body) {
    res.status(400).json({message: "Body is required"});
  }

  const comment = await Comment.create({ body });
  comment.setAuthor(author);
  comment.setArticle(article);
  res.status(201).json({ comment });
});