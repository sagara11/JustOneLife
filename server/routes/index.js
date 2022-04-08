const userRouter = require("./users");
const authenticationRouter = require("./authentication");
const authorizationRouter = require("./authorization");
const medicalTransactionRouter = require("./medical-transaction");
const {jwtCheck} = require("../middleware/auth");

function route(app) {
  app.use("/users", jwtCheck, userRouter);
  app.use("/auth", authenticationRouter);
  app.use("/authorization", authorizationRouter);
  app.use("/medical-transaction", jwtCheck, medicalTransactionRouter);
}

module.exports = route;
