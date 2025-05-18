const express = require('express');

const ProcessController = require('../Controllers/ProcessController');
const { authMiddleware } = require('../Middleware/Auth');
const ProcessRequest = require('../Request/ProcessRequest');

module.exports = (app, router) => {

    const group = express.Router();

    router.use('/process', group);

    group.get('/list', authMiddleware, ProcessRequest.list, ProcessController.list);
    group.put('/update/:id', authMiddleware, ProcessRequest.update, ProcessController.update);

};
