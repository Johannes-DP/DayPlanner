const express = require('express');
const axios = require('axios');

const logger = require('../config/logger');

const router = express.Router();

/*const options = {
    method: 'GET',
    url: 'https://text-translator2.p.rapidapi.com/getLanguages',
    headers: {
      'X-RapidAPI-Key':process.env.TRANSLATOR_API_KEY,
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
  };
  
 

router.get('/getLanguages',async(req, res) => {
    axios.request(options).then(function (response) {
        res.json(response.data);
    }).catch(function (error) {
        logger.error(error);
    });

})*/




const encodedParams = new URLSearchParams();
const options = {
    method: 'POST',
    url: 'https://text-translator2.p.rapidapi.com/translate',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.TRANSLATOR_API_KEY,
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    },
    data: encodedParams
};
router.post('/translate', async (req, res) => {

    const {sourceLanguage, targetLanguage, text} = req.body;

    if (!sourceLanguage || !targetLanguage|| !text){
        return res.status(422).send("Parameters missing");
    } 
    
    encodedParams.append("source_language", sourceLanguage);
    encodedParams.append("target_language", targetLanguage);
    encodedParams.append("text", text);

    axios.request(options).then((response) => { 
        res.json(response.data);
    }).catch((error) => {
        logger.error(error);
    });
})


module.exports = router;