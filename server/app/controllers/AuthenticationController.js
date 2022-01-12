const {addNewUser} = require("../../services/UserServices");
const {authenticateUser} = require("../../services/AuthenticationServices");
class AuthenticationController {
  async signup(req, res, next) {
    const {publicAddress} = req.body;
    const user = await addNewUser(publicAddress);
    res.json(user);
    next();
  }

  async signin(req, res, next) {
    const {publicAddress, signature} = req.body;

    if (!signature || !publicAddress)
      return res
        .status(400)
        .send({error: "Request should have signature and publicAddress"});

    const data = await authenticateUser(publicAddress, signature);
    if (data.error)
      return res.status(401).send({
        error: data.error,
      });
    res.json({accessToken: data.accessToken});
    next();
  }
}

module.exports = new AuthenticationController();
