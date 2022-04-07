const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicalTransaction = new Schema(
  {
    transactionHash: {
      type: String,
      required: true,
      unique: true
    },
    IpfsHash: {
      type: String,
      require: true,
      unique: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MedicalTransaction", MedicalTransaction);
