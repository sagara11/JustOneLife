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
      const {userAddresses, perPage, offset} = req.body;
      const usersData = await userServices.getList(
        userAddresses,
        perPage,
        offset
      );
      const totalPage = await userServices.getListCount(userAddresses);

      const userList = {
        data: usersData,
        totalPage: Math.ceil(totalPage / perPage),
        offset: offset,
      };

      res.status(200).json(userList);
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async index(req, res, next) {
    try {
      const userList = await User.find({ email: { $ne: null } });

      res.status(200).json(userList);
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new UsersController();
