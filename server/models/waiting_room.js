const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WaitingRoom = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    receptionist: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    admittedToHopital: {
      type: Date,
      default: Date.now()
    },
    medicalFalculty: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WaitingRoom", WaitingRoom);
