const express = require('express');
const path = require('path');

const logger = require('../config/logger');
const { isAuthenticated } = require('../helpers/session');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return logger.error(err);
    }
    return res.redirect('/');
  });
});

module.exports = router;
