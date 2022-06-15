const express = require('express');
const logger = require('../config/logger');

const User = require('../models/User.js');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.create({ email, password });

    res.json({
        message: 'Signup successful',
        user: user,
    });
});

module.exports = router;