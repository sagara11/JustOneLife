const express = require("express");
const route = express.Router();

const WaitingRoomController = require("../app/controllers/WaitingRoom");

route.get("/", WaitingRoomController.index);
route.post("/", WaitingRoomController.create);

module.exports = route;
