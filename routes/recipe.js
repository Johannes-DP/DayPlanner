/* eslint-disable consistent-return */
const express = require('express');
const axios = require('axios');

const logger = require('../config/logger');

const router = express.Router();

const options = {
  method: 'GET',
  url: 'https://recipesapi2.p.rapidapi.com/recipes/',
  params: { maxRecipes: '10' },
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'recipesapi2.p.rapidapi.com',
  },
};

router.post('/getRecipes', async (req, res) => {
  const { dish } = req.body;
  if (!dish) {
    return res.status(422).send('Parameter missing');
  }
  options.url += dish;

  axios.request(options).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    logger.error(error);
  });
  options.url -= dish;
});

module.exports = router;
