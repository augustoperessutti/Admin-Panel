const express = require('express');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const dotenv = require('dotenv');
dotenv.config();
const db = require('./config/db.config');
db.connect();
const hbs = require('./config/hbs.config');
hbs.createHelpers();
const auth = require('./auth');
auth.useStrategies();

const app = express()

const methodOverride = require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const rootRoutes = require('./routes/Root.routes');
const componentsRoutes = require('./routes/Components.routes');
const productsRoutes = require('./routes/Products.routes');
const categoryRoutes = require('./routes/Categories.routes');
const authRoutes = require('./routes/Auth.routes');

const PORT = process.env.PORT || 4000;
    
app.use(cors());

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({ mongoUrl: db.DB_URL }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', rootRoutes);
app.use('/components', componentsRoutes);
app.use('/products', productsRoutes);
app.use('/category', categoryRoutes);
app.use('/auth', authRoutes);

app.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    return res.status(404).json(error.message);
});

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Error inesperado.');
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando correctamente en http://localhost:${PORT}`);
})