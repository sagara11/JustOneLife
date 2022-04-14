const userRouter = require("./users");
const waitingRoomRouter = require("./waiting-room");
const authenticationRouter = require("./authentication");
const authorizationRouter = require("./authorization");
const medicalTransactionRouter = require("./medical-transaction");
const IPFSRouter = require("./IPFS");
const {jwtCheck} = require("../middleware/auth");

function route(app) {
  app.use("/users", jwtCheck, userRouter);
  app.use("/waiting-room", jwtCheck, waitingRoomRouter);
  app.use("/auth", authenticationRouter);
  app.use("/authorization", authorizationRouter);
  app.use("/medical-transaction", jwtCheck, medicalTransactionRouter);
  app.use("/IPFS", jwtCheck, IPFSRouter);
}

module.exports = route;
