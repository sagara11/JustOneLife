const {isEmpty} = require("lodash");
const User = require("../models/users");
const {sendEmailJob} = require("../queues/email");

const userServices = {
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
};

module.exports = userServices;
