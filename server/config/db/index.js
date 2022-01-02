const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connect successfully!!!');
  } catch (error) {
    console.log('Connect failed!!!');
    console.log(error);
  }
}

module.exports = {connect}
