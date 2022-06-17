/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 8,
  },
});

User.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

User.methods.isValidPassword = async function (password) {
  const user = this;
  const isValid = await bcrypt.compare(password, user.password);
  return isValid;
};

module.exports = mongoose.model('User', User);
