require('dotenv').config();
const cors = require('cors');
const express = require('express');
const initRoutes = require('./Routes');

const { PORT } = process.env;

module.exports = () => {

    const app = express();

    const router = express.Router();

    app.set('port', PORT);

    // Padrão são 1000 parâmetros e 100kb de limite
    app.use(cors());
    app.use(express.json({ limit: '100mb' }));
    app.use(express.urlencoded({ limit: '100mb', extended: true, parameterLimit: 3000 }));

    app.use('/', router);

    // Importa todas as rotas do Express
    initRoutes(app, router);

    return app;

};
