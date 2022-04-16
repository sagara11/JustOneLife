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
    admittedToHospital: {
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

WaitingRoom.statics.findList = async function (query) {
  const waitingList = await this.aggregate([
    {
      $match: {
        $or: [
          {manager: mongoose.Types.ObjectId(query.manager)},
          {receptionist: mongoose.Types.ObjectId(query.receptionist)}
        ]
      }
    },
    {
      $sort: {
        createdAt: -1
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "manager",
        foreignField: "_id",
        as: "manager"
      }
    },
    {
      $project: {
        _id: 1,
        admittedToHospital: {
          $dateToString: { format: "%Y-%m-%d", date: "$admittedToHospital" }
        },
        medicalFalculty: 1,
        receptionist: 1,
        manager: {
          _id: 1,
          email: 1,
          name: 1,
          publicAddress: 1,
          phone: 1
        },
        user: {
          _id: 1,
          email: 1,
          name: 1,
          publicAddress: 1,
          phone: 1
        }
      }
    }
  ])
  console.log("List", waitingList);
  return waitingList;
};

module.exports = mongoose.model("WaitingRoom", WaitingRoom);
