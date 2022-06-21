/* eslint-disable consistent-return */
const express = require('express');
const axios = require('axios');

const logger = require('../../config/logger');

const router = express.Router();

const encodedParams = new URLSearchParams();
const optionsPost = {
  method: 'POST',
  url: 'https://text-translator2.p.rapidapi.com/translate',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
  },
  data: encodedParams,
};

router.post('/translate', async (req, res) => {
  const { sourceLanguage, targetLanguage, text } = req.body;

  if (!sourceLanguage || !targetLanguage || !text) {
    return res.status(422).send('Parameters missing');
  }

  encodedParams.append('source_language', sourceLanguage);
  encodedParams.append('target_language', targetLanguage);
  encodedParams.append('text', text);

  axios.request(optionsPost).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    logger.error(error);
  });
});

const optionsGet = {
  method: 'GET',
  url: 'https://text-translator2.p.rapidapi.com/getLanguages',
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
  },
};

router.get('/getLanguages', async (req, res) => {
  axios.request(optionsGet).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    logger.error(error);
  });
});

module.exports = router;
