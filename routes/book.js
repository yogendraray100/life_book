const BookController = require('../controllers/bookController');
const BookRoutes = require('express').Router();


BookRoutes.get("/",BookController.fetchAllBooks)
BookRoutes.get("/:id", BookController.fetchBookById);
BookRoutes.get("/author/:id", BookController.fetchBooksByAuthorId);
BookRoutes.get("/category/:id", BookController.fetchBookByCategory);
BookRoutes.get("/search/:name", BookController.searchBooks);
BookRoutes.post("/", BookController.createBook);

module.exports = BookRoutes;