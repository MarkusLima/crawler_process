const express = require('express');
const UserController = require('../Controllers/UserController');
const UserRequest = require('../Request/UserRequest');

module.exports = (app, router) => {

    const group = express.Router();
    router.use('/users', group);

    group.post('/register', UserRequest.register, UserController.register);
    group.post('/login', UserRequest.login, UserController.login);

};
