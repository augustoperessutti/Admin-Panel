const express = require('express');
const controller = require('../controllers/products.controller');
const { isAdmin } = require('../middlewares/auth.middlewares');
const { upload, uploadToCloudinary } = require('../middlewares/file.middlewares');

const router = express.Router();

router.get('/index', controller.productGet); // LISTO

router.post('/create', isAdmin, [upload.single('imageSrc'), uploadToCloudinary], controller.createPost);  // LISTO
router.get('/create', isAdmin, controller.createGet);  // LISTO

router.put('/edit/:id', isAdmin, [upload.single('imageSrc'), uploadToCloudinary], controller.editPut)  // LISTO
router.get('/edit/:id', isAdmin, controller.editGet)  // LISTO

router.delete('/delete/:id', isAdmin, controller.deleteDelete);  // LISTO

router.get('/json', controller.productGetJson);
router.get('/:id/json', controller.idGetJson);

router.get('/:id', controller.idGet);  // LISTO

module.exports = router;