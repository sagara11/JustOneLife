const express = require('express');
const route = express.Router();

const usersController = require('../app/controllers/UserController');

route.get('/', usersController.index);

module.exports = route;
