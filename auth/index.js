const passport = require('passport');
const User = require('../models/users.model');
const loginStrategy = require('./login.strategy');
const registerStrategy = require('./register.strategy');

passport.serializeUser((user, done) => {
    return done(null, user._id);
  });
  
passport.deserializeUser(async (userId, done) => {
    try {
        const existingUser = await User.findById(userId);

        return done(null, existingUser);
    } catch (error) {
        return done(error, null);
    }
});

const useStrategies = () => {
    passport.use('register', registerStrategy);
    passport.use("login", loginStrategy);
};

module.exports = { useStrategies };
  