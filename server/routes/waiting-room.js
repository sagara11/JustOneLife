const express = require("express");
const route = express.Router();

const WaitingRoomController = require("../app/controllers/WaitingRoom");

route.get("/", WaitingRoomController.index);
route.post("/", WaitingRoomController.create);
route.delete("/:id", WaitingRoomController.destroy);

module.exports = route;
