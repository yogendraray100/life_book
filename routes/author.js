const AuthorRoutes = require('express').Router();
const AuthorController = require('./../controllers/authorController');

AuthorRoutes.get("/", AuthorController.fetchAllAuthors);
AuthorRoutes.get("/:id", AuthorController.fetchAuthorById);

AuthorRoutes.post("/", AuthorController.createAuthor);

module.exports = AuthorRoutes;