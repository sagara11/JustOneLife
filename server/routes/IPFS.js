const express = require("express");
const route = express.Router();

const IPFSController = require("../app/controllers/IPFSController");

route.post("/check", IPFSController.checkIPFS);

module.exports = route;
