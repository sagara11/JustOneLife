const userServices = require("../../services/userServices");

class IPFSController {
  async checkIPFS(req, res, next) {
    try {
      const {hash_2, userAddress} = req.body;
      const result = await userServices.checkHash2(userAddress, hash_2);

      res.status(200).json(result);
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new IPFSController();
