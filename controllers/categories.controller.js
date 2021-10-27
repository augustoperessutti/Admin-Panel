const Category = require('../models/categories.model');
const Product = require('../models/products.model');

const categoriesGet = async (req, res, next) => {
    try {
        const allCategories = await Category.find().populate('products');
        if (req.isAuthenticated()) {
            return res.render('categories/index', { allCategories });
        } else {
            return res.render('index')
        }
    } catch (error) {
        return next(error);
    }
};

const categoriesGetJson = async (req, res, next) => {
    try {
        const allCategories = await Category.find().populate('products');
        return res.status(200).json(allCategories);
    } catch (error) {
        next(error);
    }
}

const categoriesCreate = async (req, res, next) => {
    try {
        const { name } = req.body;

        const newCategory = new Category({
            name,
        });

        await newCategory.save();

        return res.redirect('/category');

    } catch (error) {
        return next(error);
    }
}

const editPut = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, products } = req.body;

        const update = {}
        if (name) update.name = name;
        if (products) update.products = products;

        updatedCategory = await Category.findByIdAndUpdate(id, update, { new: true });

        return res.redirect(`/category`);

    } catch (error) {
        return next(error);
    }
}

const editGet = async (req, res, next) => {
    try{
        const { id } = req.params;
        const category = await Category.findById(id);
        return res.render('categories/edits', { category })
    }catch(error) { 
        return next(error);
    }
}

const categoriesDelete = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            const error = 'Categoría no encontrada';
            return res.render('error', error)
        } else {
            return res.redirect('/category')
        }

    } catch (error) {
        return next(error);
    }
}

const categoriesByIdJson = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id).populate('products');
        return res.status(200).json(category);

    } catch (error) {
        return next(error);
    }
}

const categoriesByIdGet = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id).populate('products');
        return res.render('categories/categories', { category });

    } catch (error) {
        return next(error);
    }
}

const productDelete = async (req, res, next) => {
    const { cid, pid } = req.params;
    try {
        const category = await Category.findById(cid).populate('products');

        const newCategory = category;

        newCategory.products.map((e, i) => {
            if(e._id == pid) {
                newCategory.products.splice(i, 1)
            }
        });

        await Category.findByIdAndUpdate(cid, newCategory, { new: true });

        return res.redirect(`/category/${cid}`);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    categoriesGet,
    categoriesCreate,
    editPut,
    editGet,
    categoriesDelete,
    categoriesByIdJson,
    categoriesGetJson,
    categoriesByIdGet,
    productDelete,
}