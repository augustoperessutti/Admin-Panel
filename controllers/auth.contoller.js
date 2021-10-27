const passport = require('passport');
const User = require('../models/users.model');

const registerPost = (req, res, next) => {
    try {
        const done = (error, user) => {
            if(error) return res.render('error', { error });

            req.login(user, (error) => (error ? next(error) : res.json(user)));
        }

        passport.authenticate('register', done)(req);

    } catch(error){
        next(error);
    }
};

const loginPost = (req, res, next) => {
    try {
        const done = (error, user) => {
            if(error) return res.render('error', { error });

            req.login(user, (error) => (error ? next(error) : res.redirect('/admin')));
        }
        
        passport.authenticate('login', done)(req)

    } catch(error){
        next(error);
    }
};

const logoutPost = (req, res, next) => {
    if(req.user) {
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.redirect('/');
        });
    }
}

module.exports = {
    registerPost,
    loginPost,
    logoutPost,
};