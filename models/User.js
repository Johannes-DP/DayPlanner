const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    min: 8
    }
});

module.exports = mongoose.model('User', userSchema);