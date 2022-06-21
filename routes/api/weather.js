const express = require('express');
const axios = require('axios');
const { dataConverter } = require('../../helpers/content-negotiator');

const logger = require('../../config/logger');

const router = express.Router();

const options = {
  method: 'GET',
  url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
  params: { lon: '16.363449', lat: '48.210033' },
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
  },
};

router.get('/getWeather', async (req, res) => {
  axios.request(options).then((response) => {
    res.send(dataConverter(req, response.data));
  }).catch((error) => {
    logger.error(error);
  });
});

module.exports = router;
