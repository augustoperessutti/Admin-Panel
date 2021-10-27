const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true, min: 0 },
        imageSrc: { type: String, required: false, default: "https://res.cloudinary.com/dbtlofrll/image/upload/v1628328004/default-product_shzjjh.png"},
        imageAlt: { type: String, required: false, default: "Producto" },
        category: { type: mongoose.Types.ObjectId, ref: 'Category', required: false }
    },
    { timestamps: true }
)

const Product = mongoose.model('Products', productSchema);

module.exports = Product;