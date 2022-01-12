const User = require("../models/users");

const addNewUser = async (publicAddress) => {
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
};

module.exports = {
  addNewUser,
};
