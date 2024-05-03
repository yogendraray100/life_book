const { Schema, model } = require('mongoose');

const authorSchema = new Schema({
    name: { type: String, required: [true, 'name is required'] },
    description: { type: String, default: "" },
    priority: { type: Number, default: "" },
    image: { type: String, default: "" },
    website: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: Number, default: "" },

    updatedOn: { type: Date },
    createdOn: { type: Date }
});

authorSchema.pre('save', function(next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});

authorSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next) {
    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();

    next();
});

const AuthorModel = model('Author', authorSchema);

module.exports = AuthorModel;