const express = require("express");
const route = express.Router();

const medicalTransactionsController = require("../app/controllers/MedicalTransactionController");
const {secondStepCheck} = require("../middleware/auth");

route.post("/", secondStepCheck, medicalTransactionsController.create);

module.exports = route;
