const mongoose = require('mongoose');
const dotenv = require('dotenv');

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/candela-db';

const connect = async () => {
    try {
        const db = await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });
        
        const { name, host } = db.connection;
        console.log(`Conección correcta a la base de datos ${name} en ${host}`);
    } catch(error) {
        console.log('Problemas al conectarse a la DB. Error ->', error);
    }
};

module.exports = { connect, DB_URL };