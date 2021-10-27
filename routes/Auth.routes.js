const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.contoller');

router.post('/register', controller.registerPost);
router.post('/login', controller.loginPost);
router.post('/logout', controller.logoutPost);

module.exports = router;