const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const articleController = require('../controllers/articleController');

router.post('/', authJwt.verifyToken, articleController.createArticle);
router.get('/', articleController.getAllArticles)
router.get('/:slug', articleController.getArticle)
router.delete('/:slug',authJwt.verifyToken, articleController.deleteArticle);

module.exports = router