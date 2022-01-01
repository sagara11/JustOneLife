const userRouter = require('./users');

function route(app) {
  app.use('/users', userRouter);
}

module.exports = route;
