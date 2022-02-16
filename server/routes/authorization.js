const express = require("express");
const route = express.Router();

const authorizationController = require("../app/controllers/AuthorizationController");
const {jwtCheck} = require("../middleware/auth");

route.post("/updateManagerRole", jwtCheck, authorizationController.updateManager);

module.exports = route;
