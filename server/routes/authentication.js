const express = require('express');
const route = express.Router();

const authenticationController = require('../app/controllers/AuthenticationController');

route.post('/signup', authenticationController.signup);
route.post('/signin', authenticationController.create);

module.exports = route;
