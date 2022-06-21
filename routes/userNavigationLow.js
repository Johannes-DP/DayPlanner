const express = require('express');
const path = require('path');

const logger = require('../config/logger');
const { isAuthenticated } = require('../helpers/session');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/low-bandwidth/index.html'));
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/low-bandwidth/dashboard.html'));
});

router.get('/profile', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/low-bandwidth/profile.html'));
});

router.get('/writing', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/low-bandwidth/writing.html'));
});

router.get('/cooking', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/low-bandwidth/cooking.html'));
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
