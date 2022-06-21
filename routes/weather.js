const express = require('express');
const axios = require("axios");

const logger = require('../config/logger');

const router = express.Router();

const options = {
  method: 'GET',
  url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
  params: {lon: '16.363449', lat: '48.210033'},
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
  }
};

router.get('/getWeather', async (req, res) => {
    
    axios.request(options).then(function (response) {
        res.json(response.data);
    }).catch(function (error) {
        logger.error(error);
    });
})

module.exports = router;
