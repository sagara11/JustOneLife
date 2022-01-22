const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const User = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 25,
    },
    email: {
      type: String,
      unique: true,
      match:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    phone: {
      type: String,
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    nonce: {
      type: Number,
      default: () => Math.floor(Math.random() * 1000000),
    },
    publicAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    refreshToken: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

User.statics.findByAddress = async function (publicAddress) {
  const user = await this.findOne({publicAddress: publicAddress}).exec();
  return user;
};

module.exports = mongoose.model("User", User);
