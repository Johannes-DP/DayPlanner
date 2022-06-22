const express = require('express');
const path = require('path');

const logger = require('../config/logger');
const { isAuthenticated } = require('../helpers/session');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/lite', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/lite/index.html'));
});

router.get('/normal', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

router.get('/dashboardlite', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/lite/dashboard.html'));
});

router.get('/profile', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/profile.html'));
});

router.get('/profilelite', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/lite/profile.html'));
});

router.get('/writing', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/writing.html'));
});

router.get('/writinglite', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/lite/writing.html'));
});

router.get('/cooking', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/cooking.html'));
});

router.get('/cookinglite', isAuthenticated, (req, res) => {
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
