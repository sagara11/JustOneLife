const User = require("../../models/users");
const medicalTransaction = require("../../models/medical_transaction");

class MedicalTransactionsController {
  async create(req, res, next) {
    try {
      const user = await User.findOne(
        {publicAddress: req.body.publicAddress}
      );
      if (user) {
        const newTransaction = await medicalTransaction.create({
          transactionHash: req.body.transactionHash,
          IpfsHash: req.body.IpfsHash,
          user: user._id
        });

        const userUpdated = await User.findOneAndUpdate(
          {_id: newTransaction.user},
          {$push: {medicalTransactions: newTransaction._id}},
          {new: true}
        )
        return res.status(201).json(newTransaction);
      }

      res.status(304).send("User not found or transaction hash not correct");
    } catch (err) {
      console.log("error", err);
    }

    next();
  }
}

module.exports = new MedicalTransactionsController();
