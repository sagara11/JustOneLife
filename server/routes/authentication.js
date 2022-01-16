const express = require("express");
const route = express.Router();

const authenticationController = require("../app/controllers/AuthenticationController");
const {jwtCheck} = require("../middleware/auth");

route.post("/signup", authenticationController.signup);
route.post("/signin", authenticationController.signin);
route.get("/getCurrentUser", jwtCheck, authenticationController.getCurrentUser);
route.post("/refreshToken", authenticationController.refreshToken);

module.exports = route;
