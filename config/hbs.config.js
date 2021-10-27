const hbs = require('hbs');

const createHelpers = () => {
    try {
        hbs.registerHelper('capitalize', (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1)
        });
    } catch (error) {
        console.log('Error creando los helpers', error);
    }
}

module.exports = { createHelpers };
