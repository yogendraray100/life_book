const BookModel = require('../models/book');


const BookController = {

    createBook: async function(req, res) {
        try {
            const bookData = req.body;
            const newBook = new BookModel(bookData);
            await newBook.save();

            return res.json({ success: true, data: newBook, message: "Book created!" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchAllBooks: async function(req, res) {
        try {
            const books = await BookModel.find();
            return res.json({ success: true, data: books });
        }

        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchBookById: async function(req, res) {
        try {
            const id = req.params.id;
            const foundBook = await BookModel.findById(id);

            if(!foundBook) {
                return res.json({ success: false, message: "Book not found!" });
            }

            return res.json({ success: true, data: foundBook });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchBooksByAuthorId: async function(req, res) {
        try {
            const authorId = req.params.id; 
            const books = await BookModel.find({ author: authorId });
    
            if(books.length === 0) {
                return res.json({ success: false, message: "No books found for this author!" });
            }
    
            return res.json({ success: true, data: books });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },
    searchBooks: async function(req, res){
        // try {
        //    const books = await BookModel.find({
        //     name: { $regex: req.params.name, $options: "i" },
        //    });
        //    return res.json({ success: true, data: books });
           
        // } catch (ex) {
        //     return res.json({ success: false, message: ex });
        // }
        try {
            const { query } = req.query; // Get search query from request
    
            // Perform search query (example with Mongoose)
            const results = await Book.find({ name: { $regex: query, $options: 'i' } });

    res.json(results); 
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    fetchBookByCategory: async function(req, res) {
        try {
            const categoryId = req.params.id;
            const books = await BookModel.find({ category: categoryId });
            return res.json({ success: true, data: books });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    }

};

module.exports = BookController;