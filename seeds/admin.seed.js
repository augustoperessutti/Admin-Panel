const mongoose = require('mongoose');
const User = require('../models/users.model');
const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const adminName = process.env.ADMIN;

mongoose
    .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const adminExists = await User.findOne({ adminName });

        if(adminExists != 0) {
            console.log('[Seed] Ya existe un admin.')
            await User.collection.drop()
            console.log('[Seed] Usuario admin eliminado.')
        } else {
            console.log('[Seed] No se encontro ningún admin.')
        }
    })
    .then(async () => {
        const adminPassword = process.env.PASSWORD;
        const rounds = 10;
        const hash = await bcrypt.hash(adminPassword, rounds);

        const newAdmin = new User({
                username: adminName,
                password: hash,
                role: 'admin',
                name: 'Augusto'
        });

        const user = await newAdmin.save();
        user.password = null;

        console.log('[Seed] Nuevo admin creado con éxito.')
    })
    .catch(error => console.log('[Seed]: Error creando el admin', error))
    .finally(() => mongoose.disconnect());