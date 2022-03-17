const authenticationServices = require("../../services/AuthenticationServices");
const userServices = require("../../services/userServices");
const User = require("../../models/users");
class AuthenticationController {
  async signup(req, res, next) {
    const {publicAddress} = req.body;
    const user = await userServices.addNewUser(publicAddress);
    res.json(user);
    next();
  }

  async signin(req, res, next) {
    const {publicAddress, signature} = req.body;

    if (!signature || !publicAddress)
      return res
        .status(400)
        .send({error: "Request should have signature and publicAddress"});

    const data = await authenticationServices.authenticateUser(
      publicAddress,
      signature
    );
    if (data.error)
      return res.status(401).send({
        error: data.error,
      });
    const user = await User.findByAddress(publicAddress);
    res.json({accessToken: data.accessToken, refreshToken: user.refreshToken});
    next();
  }

  async getCurrentUser(req, res, next) {
    return res.status(200).json(req.account);
  }

  async refreshToken(req, res, next) {
    const refreshToken = req.body.refreshToken;
    const accessToken = await authenticationServices.refreshTokenHandle(
      refreshToken
    );
    if (accessToken === null) {
      res.json({errors: 403});
      next();
    }

    return res.status(200).json({accessToken: accessToken});
  }

  async signout(req, res, next) {
    const {publicAddress} = req.body;

    if (publicAddress === req.account.publicAddress) {
      const isDestroyed = await authenticationServices.destroyJWT(
        publicAddress
      );

      return res.json(isDestroyed);
    }

    return res.json(false);
  }
}

module.exports = new AuthenticationController();
