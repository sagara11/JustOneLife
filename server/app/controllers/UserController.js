const User = require("../../models/users");
const userServices = require("../../services/userServices");
class UsersController {
  async show(req, res, next) {
    try {
      const user = await User.findByAddress(req.params.publicAddress);
      res.status(200).json(user);
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const {publicAddress} = req.params;
      const data = req.body;

      const updatedUser = await userServices.updateUser(publicAddress, data);

      res.status(200).json(updatedUser);
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getUserList(req, res, next) {
    try {
      const userAddresses = req.body;
      const userList = await userServices.getList(userAddresses);

      res.status(200).json(userList);
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new UsersController();
