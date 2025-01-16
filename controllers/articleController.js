const Article = require("../models/article");
const User = require("../models/user");
const Comment = require("../models/comment");
const asyncHandler = require('express-async-handler');
const slugify = require("slugify");

exports.createArticle = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const author = await User.findByPk(userId);
  const { title, description, body } = req.body;

  if (!title || !description || !body) {
    res.status(400).json({ message: "All fields are required" });
  }
  const slug = slugify(title, { lower: true });
  const slugInDB = await Article.findOne({ where: { slug: slug } });
  if (slugInDB) res.status(400).json({ message: "Title already exists" });

  const article = await Article.create({ slug, title, description, body });
  article.setAuthor(author);
  res.status(201).json({ article });
});

exports.getAllArticles = asyncHandler(async (req, res) => {
  const viewOptions = {
    attributes: {exclude: ["author_id"] },
    include: [
      { model: User, as: "author", attributes: {exclude: ["email", "password", "role_id"] } },
      {
        model: Comment,
        as: "comment",
        attributes: ["body"],
        include: [
          {
            model: User,
            as: "author",
            attributes: ['id', 'username']
          }
        ],
        order: [["createdAt", "DESC"]]
      }
    ],
    order: [["createdAt", "DESC"]]
  };

  const articles = await Article.findAll(viewOptions);

  res
    .status(200)
    .json({ articles });
});

exports.getArticle = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
   const viewOptions = {
    where: { slug: slug },
    attributes: {exclude: ["author_id"] },
    include: [
      { model: User, as: "author", attributes: {exclude: ["email", "password", "role_id"] }},
      {
        model: Comment,
        as: "comment",
        attributes: ["body"],
        include: [
          {
            model: User,
            as: "author",
            attributes: ['id', 'username']
          }
        ],
        order: [["createdAt", "DESC"]]
      }
    ]
  };

  const article = await Article.findOne(viewOptions);

  if (!article) return next(new ErrorResponse("Article not found", 404));
  res.status(200).json({ article });
});

exports.deleteArticle = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const userId = req.userId;

  const article = await Article.findOne({
    where: { slug: slug }
  });
  if (!article) next(new ErrorResponse("Article not found", 404));

  if (article.authorId !== userId)
    return next(new ErrorResponse("Unauthorized", 401));

  await article.destroy();

  res.status(200).json({ article });
});
