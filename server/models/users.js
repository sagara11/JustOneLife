const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const User = new Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    nonce: {type: Number, default: () => Math.floor(Math.random() * 1000000)},
    publicAddress: {
      required: true,
      unique: true,
      type: String,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
