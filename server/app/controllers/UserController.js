class UsersController {
  index(req, res, next) {
    res.send('User list');
  }
}

module.exports = new UsersController;
