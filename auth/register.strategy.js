const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users.model');
const { isValidEmail, isValidPassword } = require("./utils");
const bcrypt = require('bcrypt');

const registerStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, pass, done) => {
        try {
            const existingUser = await User.findOne({ email });
            const allUsers = await User.find()

            if (allUsers.length >= 1) {
                const error = new Error('Lo siento, los registros estan cerrados.');
                return done(error)
            };
            if (existingUser) {
                const error = new Error('El usuario ya existe');
                return done(error)
            };
            if (!isValidEmail(email)) {
                const error = new Error('Correo inválido.');
                return done(error)
            };
            if (!isValidPassword(pass)) {
                const error = new Error('Contraseña inválida.');
                return done(error)
            };

            const rounds = 10;
            const hash = await bcrypt.hash(pass, rounds);

            const newUser = new User({
                email,
                password: hash,
                username: req.body.username
            });

            const user = await newUser.save();
            user.password = null;
            return done(null, user)
        } catch (error) {
            return done(error);
        }
    }
);

module.exports = registerStrategy;