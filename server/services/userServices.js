const {isEmpty} = require("lodash");
const mongoose = require('mongoose');
const User = require("../models/users");
const {sendEmailJob} = require("../queues/email");
const sha256 = require("js-sha256");
const _ = require("lodash");

const userServices = {
  getList: async (userAddresses, perPage, offset) => {
    const userList = User.find({publicAddress: {$in: userAddresses}})
      .skip(offset)
      .limit(perPage);

    return userList;
  },
  getListCount: async (userAddresses) => {
    const totalAmount = await User.find({
      publicAddress: {$in: userAddresses},
    }).count();

    return totalAmount;
  },
  addNewUser: async (publicAddress) => {
    const user = await User.findByAddress(publicAddress);

    if (!user) {
      let random_number = Math.floor(Math.random() * 100000);
      let newUser = new User({
        publicAddress: publicAddress,
        name: `User-name-${random_number}`,
      });
      await newUser.save();
    }
    return user;
  },
  updateUser: async (publicAddress, data) => {
    const preUpdateUser = await User.findByAddress(publicAddress);

    if (data.receptionist) {
      data.receptionist.addedBy = mongoose.Types.ObjectId(data.receptionist.addedBy);
    }

    const user = await User.findOneAndUpdate(
      {publicAddress: publicAddress},
      {$set: data},
      {new: true}
    );

    if (!isEmpty(user.email) && isEmpty(preUpdateUser.email)) {
      sendEmailJob(
        user.email,
        `New email: ${user.email}`,
        "Your account email has been set. You can receive our notification from now on with this email"
      );
    }
    return user;
  },
  updateManagerRole: async (publicAddress) => {
    const user = await User.findByAddress(publicAddress);
    if (user.email) {
      sendEmailJob(
        user.email,
        "Upgrade to manager role!!",
        "Your account has been upgraded to Manager by system admin."
      );
    } else {
      console.log("This user does not have any related email address!!!");
    }
  },

  checkHash2: async (publicAddress, hash_2) => {
    const user = await User.findByAddress(publicAddress);
    if (_.isEmpty(user.hash_2)) {
      await User.updateOne(
        {publicAddress: publicAddress},
        {
          $set: {hash_2: hash_2},
        }
      );
      return true;
    } else {
      return user.hash_2 === hash_2;
    }
  },
};

module.exports = userServices;
