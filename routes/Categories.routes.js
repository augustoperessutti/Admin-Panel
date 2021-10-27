const express = require('express');
const controller = require('../controllers/categories.controller');
const { isAdmin } = require('../middlewares/auth.middlewares');

const router = express.Router();

router.get('/', controller.categoriesGet);

router.post('/create', isAdmin, controller.categoriesCreate);

router.put('/edit/:id', isAdmin, controller.editPut);
router.get('/edit/:id', isAdmin, controller.editGet);

router.delete('/delete/:id', isAdmin, controller.categoriesDelete);
router.delete('/delete/:cid/:pid', isAdmin, controller.productDelete);

router.get('/json', controller.categoriesGetJson);
router.get('/json/:id', controller.categoriesByIdJson);

router.get('/:id', isAdmin, controller.categoriesByIdGet);

module.exports = router;