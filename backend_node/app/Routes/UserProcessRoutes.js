const express = require('express');
const UserProcessController = require('../Controllers/UserProcessController');
const { authMiddleware } = require('../Middleware/Auth');
const UserProcessRequest = require('../Request/UserProcessRequest');

module.exports = (app, router) => {

    const group = express.Router();

    router.use('/user-process', group);

    group.get('/list', authMiddleware, UserProcessRequest.list, UserProcessController.list);

};
