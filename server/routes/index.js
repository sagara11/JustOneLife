const userRouter = require('./users');
const authenticationRouter = require('./authentication');

function route(app) {
  app.use('/users', userRouter);
  app.use('/auth', authenticationRouter);
}

module.exports = route;
