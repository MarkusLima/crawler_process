const express = require('express');
const ScrapedDataController = require('../Controllers/ScrapedDataController');
const ScrapedDataRequest = require('../Request/ScrapedDataRequest');
const { authMiddleware } = require('../Middleware/Auth');

module.exports = (app, router) => {

    const group = express.Router();

    router.use('/scraped-data', group);

    group.get('/list', authMiddleware, ScrapedDataRequest.list, ScrapedDataController.list);

};
