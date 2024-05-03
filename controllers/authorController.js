const AuthorModel = require('./../models/author');

const AuthorController = {

    createAuthor: async function(req, res) {
        try {
            const authorData = req.body;
            const newAuthor = new AuthorModel(authorData);
            await newAuthor.save();

            return res.json({ success: true, data: newAuthor, message: "Author created!" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchAllAuthors: async function(req, res) {
        try {
            const authors = await AuthorModel.find();
            return res.json({ success: true, data: authors });
        }

        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchAuthorById: async function(req, res) {
        try {
            const id = req.params.id;
            const foundAuthor = await AuthorModel.findById(id);

            if(!foundAuthor) {
                return res.json({ success: false, message: "Author not found!" });
            }

            return res.json({ success: true, data: foundAuthor });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    }

};

module.exports = AuthorController;