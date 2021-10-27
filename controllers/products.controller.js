const Product = require('../models/products.model');
const Category = require('../models/categories.model');

const productGet = async (req, res, next) => {
    try {
        const allProducts = await Product.find().populate('category');
        if (req.isAuthenticated()) {
            return res.render('prodcts/index', { allProducts });
        } else {
            return res.render('index')
        }

    } catch (error) {
        return next(error);
    }
}

const productGetJson = async (req, res, next) => {
    try {
        const allProducts = await Product.find().populate('category');
        return res.status(200).json(allProducts)

    } catch (error) {
        return next(error);
    }
}

const createPost = async (req, res, next) => {
    try {
        const { name, description, price, stock, imageSrc, imageAlt, category } = req.body;

        const newProduct = new Product ({
            name,
            description,
            price,
            stock,
            imageSrc: req.imageUrl ? req.imageUrl : "https://res.cloudinary.com/dbtlofrll/image/upload/v1628328004/default-product_shzjjh.png",
            imageAlt,
            category
        });

        const createdProduct = await newProduct.save();

        if(category) {
            const findCategory = await Category.findById(newProduct.category).populate('category');
            findCategory.products.push(createdProduct._id) 
            await Category.findByIdAndUpdate(newProduct.category, findCategory, { new: true });
        }

        return res.redirect(`/products/${createdProduct._id}`);
    } catch(error) {
        return next(error);
    }
}

const createGet = async (req, res, next) => {
    try {
        const category = await Category.find();

        return res.render('prodcts/create', { category });
    } catch(error) {
        return next(error);
    }
}

const editGet = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        const category = await Category.find();


        category.forEach((el) => {
            el.isProduct = false;
            if(JSON.stringify(el._id) === JSON.stringify(product.category)) {
                el.isProduct = true;
            }
        })

        return res.render('prodcts/edit', { product, category });
    } catch(error) {
        next(error);
    }
};

const editPut = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, imageAlt, category } = req.body;

        console.log(req.imageUrl)

        const update = {};
        if ( name ) update.name = name;
        if ( description ) update.description = description;
        if ( price ) update.price = price;
        if ( stock ) update.stock = stock;
        if ( req.imageUrl ) update.imageSrc = req.imageUrl;
        if ( imageAlt ) update.imageAlt = imageAlt;
        if ( category ) update.category = category;

        const updateProduct = await Product.findByIdAndUpdate(id, update, { new: true });

        return res.redirect(`/products/${updateProduct._id}`)
    } catch(error) {
        next(error);
    }
};

const deleteDelete = async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if(!deletedProduct) {
            const error = 'Producto no encontrada';
            return res.render('error', error)
        } else {
            return res.redirect('/products/index')
        }
    } catch(error) {
        next(error);
    }
}

const idGet = async (req, res, next) => {
    const { id } = req.params

    try {
        const product = await Product.findById(id).populate('category');
        return res.render('prodcts/product', { product });

    } catch (error){
        next(error);
    }
}

const idGetJson = async (req, res, next) => {
    const { id } = req.params

    try {
        const product = await Product.findById(id).populate('category');
        return res.status(200).json(product);

    } catch (error){
        next(error);
    }
}

module.exports = {
    productGet,
    createPost,
    editPut,
    idGet,
    deleteDelete,
    productGetJson,
    editGet,
    idGetJson,
    createGet
}