const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    name: { type: String, required: [true, 'title is required'] },
    image: { type: String, default: "bookimage" },
    about: { type: String, default: "about" },
    istopselling: { type: Boolean,},
    topsellingpriority: { type: Number, default: "0" },
    isdraft: { type: Boolean },
    ispopular: { type: Boolean },
    popularpriority: { type: Number, default: "" },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    // category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    
    
    

    updatedOn: { type: Date },
    createdOn: { type: Date }
});

bookSchema.pre('save', function(next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});

bookSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next) {
    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();

    next();
});

const BookModel = model('Book', bookSchema);

module.exports = BookModel;