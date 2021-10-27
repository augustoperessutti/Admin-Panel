const express = require('express');
const controller = require('../controllers/components.controller');

const router = express.Router();
const { isAdmin } = require('../middlewares/auth.middlewares');
const { upload, uploadToCloudinary } = require('../middlewares/file.middlewares');

router.get('/header/json', controller.headerGetJson);
router.get('/header', isAdmin, controller.headerGet);
router.put('/header/:id', isAdmin, controller.headerPut);

router.get('/footer/json', controller.footerGetJson);
router.get('/footer', isAdmin, controller.footerGet);
router.put('/footer', isAdmin, [upload.single('icon'), uploadToCloudinary],controller.footerPut);

router.get('/home/json', controller.homeGetJson);
router.get('/home', isAdmin, controller.homeGet);
router.put('/home', isAdmin, [upload.single('src'), uploadToCloudinary], controller.homePut);

module.exports = router;