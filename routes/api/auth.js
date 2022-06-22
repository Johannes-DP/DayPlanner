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

router.delete('/delete/:email', async (req, res) => {
  const { email } = req.params;
  const user = await User.findOneAndDelete({ email });
  req.session.destroy();
  return res.send(dataConverter(req, user));
});

router.put('/change', async (req, res) => {
  const { email, changedEmail } = req.body;
  const user = await User.findOneAndUpdate({ email }, { email: changedEmail }, { new: true });
  req.session.email = changedEmail;

  return res.send(dataConverter(req, user));
});

router.patch('/password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  console.log(email);

  const user = await User.findOne({ email }).exec();
  if (!user) return res.status(403).send(dataConverter(req, { message: 'Unkown User!' }));

  const validate = await user.isValidPassword(oldPassword);
  if (!validate) return res.status(403).send(dataConverter(req, { message: 'Wrong Credentials!' }));

  user.password = newPassword;

  const result = await user.save();
  return res.send(dataConverter(req, result));
});

router.post('/signupLite', async (req, res) => {
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

  return res.redirect('/dashboardlite');
});

router.post('/loginLite', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();
  if (!user) return res.status(403).send(dataConverter(req, { message: 'Unkown User or Password!' }));

  const validate = await user.isValidPassword(password);
  if (!validate) return res.status(403).send(dataConverter(req, { message: 'Wrong Credentials!' }));

  req.session.email = email;

  return res.redirect('/dashboardlite');
});

router.delete('/deleteLite/:email', async (req) => {
  const { email } = req.params;
  await User.findOneAndDelete({ email });
  req.session.destroy();
});

router.put('/changeLite', async (req, res) => {
  const { email, changedEmail } = req.body;
  const user = await User.findOneAndUpdate({ email }, { email: changedEmail }, { new: true });
  req.session.email = changedEmail;

  return res.send(dataConverter(req, user));
});

router.patch('/passwordlite', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const user = await User.findOne({ email }).exec();
  const validate = await user.isValidPassword(oldPassword);
  if (!validate) return res.status(403).send(dataConverter(req, { message: 'Wrong Credentials!' }));

  user.password = newPassword;

  const result = await user.save();
  return res.send(dataConverter(req, result));
});
module.exports = router;
