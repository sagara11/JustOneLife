const jwt = require("jsonwebtoken");
const {isEmpty} = require("lodash");
const User = require("../models/users");

exports.jwtCheck = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).send({error: "Not authorized to access this route"});
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send({error: "No user found with this id"});
    }

    req.account = user;
    next();
  } catch (err) {
    // handle if jwt expired
    console.log(err);
    next(err);
  }
};

exports.secondStepCheck = async (req, res, next) => {
  try {
    const user = req.account;

    // isEmpty can check if string is undefined or ""
    if (isEmpty(user.email) || isEmpty(user.name)) {
      return res
        .status(500)
        .send({error: "Go to second step of login process", isAlreadyRegister: false});
    }
    next();
  } catch (err) {
    // handle if jwt expired
    console.log(err);
    next(err);
  }
};
