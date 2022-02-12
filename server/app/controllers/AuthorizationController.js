const userServices = require("../../services/userServices");

class AuthorizationController {
  async updateManager(req, res, next) {
    const { account } = req.body;
    await userServices.updateManagerRole(account);
    res.status(200);
    next();
  }
}

module.exports = new AuthorizationController();
