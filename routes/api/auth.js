const express = require('express');
const { userObjectValidation } = require('../../helpers/validation');
const { dataConverter } = require('../../helpers/content-negotiator');

const User = require('../../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }).exec();

  if (user) {
    return res.status(409).send(dataConverter(req, { message: 'User with this Email already exists' }));
  }

  const { error } = userObjectValidation(req.body);

  if (error) {
    return res.status(400).send(dataConverter(req, error.details[0]));
  }

  user = await User.create({ email, password });

  req.session.email = email;

  return res.redirect('/dashboard');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();
  if (!user) return res.status(403).send(dataConverter(req, { message: 'Unkown User or Password!' }));

  const validate = await user.isValidPassword(password);
  if (!validate) return res.status(403).send(dataConverter(req, { message: 'Wrong Credentials!' }));

  req.session.email = email;

  return res.redirect('/dashboard');
});

module.exports = router;
