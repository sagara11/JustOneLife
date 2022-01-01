const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const User = new Schema({
  name: {
    type: String
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', User);
