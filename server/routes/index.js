const userRouter = require("./users");
const authenticationRouter = require("./authentication");
const authorizationRouter = require("./authorization");
const IPFSRouter = require("./IPFS");
const {jwtCheck} = require("../middleware/auth");

function route(app) {
  app.use("/users", jwtCheck, userRouter);
  app.use("/auth", authenticationRouter);
  app.use("/authorization", authorizationRouter);
  app.use("/IPFS", jwtCheck, IPFSRouter);
}

module.exports = route;
