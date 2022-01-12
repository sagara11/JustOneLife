const User = require("../../models/users");

class UsersController {
  async show(req, res, next) {
    try {
      const user = await User.findByAddress(req.params.publicAddress);
      res.status(200).json(user);
      next();
    } catch (err) {
      console.log(err)
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        {id: req.account._id},
        {$set: req.body},
        {new: true}
      );
      res.status(200).json(updatedUser);
      next();
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
}

module.exports = new UsersController();
