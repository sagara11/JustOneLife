const userRouter = require("./users");
const authenticationRouter = require("./authentication");
const {jwtCheck} = require("../middleware/auth");

function route(app) {
  app.use("/users", jwtCheck, userRouter);
  app.use("/auth", authenticationRouter);
}

module.exports = route;
