const express = require('express');
const path = require('path');

const logger = require('../config/logger');
const { isAuthenticated } = require('../helpers/session');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/lite/index.html'));
});

router.get('/dashboardlite', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboardlite.html'));
});

router.get('/lite/profile', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/lite/profile.html'));
});

router.get('/lite/writing', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/lite/writing.html'));
});

router.get('/lite/cooking', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/lite/cooking.html'));
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
