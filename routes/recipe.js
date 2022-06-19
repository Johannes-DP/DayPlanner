const express = require('express');
const axios = require("axios");

const logger = require('../config/logger');

const router = express.Router();

const encodedParams = new URLSearchParams();
const options = {
  method: 'GET',
  url: 'https://recipesapi2.p.rapidapi.com/recipes/Lasagne',
  params: {maxRecipes: '2'},
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'recipesapi2.p.rapidapi.com'
  }
};

router.get('/getRecipes', async (req, res) => {
    /*const dish = req.body;
    if (!dish){
        return res.status(422).send("Parameter missing");
    }

    encodedParams.append(dish);
    */
    axios.request(options).then((response) => {
        res.json(response.data);
    }).catch((error)  => {
        logger.error(error);
    });

})

module.exports = router;