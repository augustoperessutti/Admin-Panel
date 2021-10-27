const mongoose = require('mongoose');
const Category = require('../models/categories.model');
const db = require('../config/db.config');

const arrayCategories = [
    {
        name: 'Sudaderas',
    },
    {
        name: 'Tops',
    },
    {
        name: 'Vestidos'
    },
    {
        name: 'Sujetadores'
    },
    {
        name: 'Jersey'
    },
    {
        name: 'Chaquetas'
    },
    {
        name: 'Camisetas'
    },
    {
        name: 'Monos'
    }
]

mongoose
    .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const allCat = await Category.find();

        if(allCat.length != 0) {
            await Category.collection.drop();
            console.log('[Seed] Colección de categorias eliminada.')
        } else {
            console.log('[Seed] No se encontraron categorias.');
        }
    })
    .then(async () => {
        await Category.create(arrayCategories);
        console.log('[Seed] Array de categorias añadido correctamente.');
    })
    .catch(error => console.log('[Seed]: Error añadiendo categorias', error))
    .finally(() => mongoose.disconnect());

