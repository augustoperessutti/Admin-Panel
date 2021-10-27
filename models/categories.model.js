const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        name: { type: String, required: true },
        products: [ { type: mongoose.Types.ObjectId , ref: 'Products' } ]
    },
    { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;