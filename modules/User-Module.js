const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   username:{   
        type: String,
        required: true,
        min:4,
        max:25,
            },
    email: {
        type: String,
        require: true,
            },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 16,
    },
});

module.exports = mongoose.model('User',userSchema,'User');