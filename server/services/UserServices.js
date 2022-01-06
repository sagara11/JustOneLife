const User = require("../models/users");

const addNewUser = async (publicAddress) => {
  const user = await findUser(publicAddress);

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

const findUser = async (publicAddress) => {
  const user = await User.findOne({publicAddress: publicAddress});
  return user ? user : null;
};
module.exports = {
  addNewUser,
  findUser
};
