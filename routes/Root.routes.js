const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/auth.middlewares')

router.get('/', (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/admin');
    } else {
        return res.render('index')
    }
});

router.get('/admin', isAdmin, (req, res, next) => {
    return res.render('index-admin')
});

module.exports = router;