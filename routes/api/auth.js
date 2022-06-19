const express = require('express');
const logger = require('../../config/logger');
const { userObjectValidation } = require('../../helpers/validation');
const User = require('../../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }).exec();

  if (user) {
    return res.status(409).send('User with this Email already exists');
  }

  const { error } = userObjectValidation(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  user = await User.create({ email, password });

  req.session.email = email;

  return res.redirect('/dashboard');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();
  if (!user) return res.status(403).send('Unkown User or Password!');

  const validate = await user.isValidPassword(password);
  if (!validate) return res.status(403).send('Wrong Credentials!');

  req.session.email = email;

  return res.redirect('/dashboard');
});

router.delete('/delete', async(req,res) => {
  User.findOneAndRemove({email});
  req.consolelog("Deleted");
  return res.redirect('/')
});

module.exports = router;
