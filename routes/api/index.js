const express = require('express');

const router = express.Router();

router.use('/user', require('./auth'));
router.use('/translator', require('./translator'));
router.use('/recipe', require('./recipe'));
router.use('/weather', require('./weather'));

module.exports = router;
