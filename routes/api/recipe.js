/* eslint-disable consistent-return */
const express = require('express');
const axios = require('axios');
const { dataConverter } = require('../../helpers/content-negotiator');

const logger = require('../../config/logger');

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

const dummyData = {
  data: [
    {
      name: 'Easy Vanilla Cake',
      ingredients: [
        'cooking spray',
        '2 ⅔ cups all-purpose flour, or more as needed',
        '1 cup white sugar',
        '1 tablespoon baking powder',
        '1 tablespoon vanilla extract',
        '2 pinches salt',
        '3 eggs',
        '¾ cup milk',
        '¾ cup vegetable oil',
      ],
      instructions: [
        'Preheat the oven to 350 degrees F (175 degrees C). Grease a 9-inch cake tin with cooking spray and line with parchment paper.',
        'Mix flour, sugar, baking powder, vanilla extract, and salt together in a bowl. Add eggs, milk, and vegetable oil. Mix by hand or use an electric mixer on low speed until smooth. Add more flour if batter is too runny. Pour into the prepared pan.',
        'Bake in the preheated oven until a toothpick inserted into the center of the cake comes out clean, about 1 hour.',
        'Remove from the oven and let cool, 15 to 30 minutes. Transfer to the refrigerator to chill slightly, 15 to 30 minutes more. Slice the cooled cake through the middle to make 2 layers.',
      ],
      nutrients: {
        protein: '5.9g',
        carbohydrates: '47g',
        'dietary fiber': '0.9g',
        sugars: '21.2g',
        fat: '18.6g',
        'saturated fat': '3.3g',
        cholesterol: '57.3mg',
        'vitamin a iu': '107.6IU',
        'niacin equivalents': '3.2mg',
        folate: '69mcg',
        calcium: '115.8mg',
        iron: '2mg',
        magnesium: '11.7mg',
        potassium: '85.8mg',
        sodium: '206.6mg',
        thiamin: '0.3mg',
        'calories from fat': '167',
      },
      tags: [],
      servings: '10',
      image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&poi=face&url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8655549.jpg',
      time: {
        prepration_time: '15 mins ',
        cooking_time: '1 hr ',
        additional_time: '30 mins ',
        total: '1 hr 45 mins ',
      },
    },
    {
      name: 'Coffee Granita',
      ingredients: [
        '3 cups prepared strong black coffee',
        '¾ cup white sugar',
        '2 tablespoons coffee-flavored liqueur (Optional)',
      ],
      instructions: [
        'Combine coffee, sugar, and coffee liqueur in a bowl with a whisk until sugar dissolves.',
        'Pour mixture into an 8x12- or 9x13-inch dish. Freeze, uncovered, until it just starts to get slushy around the outside, about 1 hour and 15 minutes.',
        'Take a fork and break the frozen pieces up, stirring into the liquid. Crush any large pieces with the back of the fork.',
        "Return to the freezer and repeat the process every 30 minutes until you've reached your desired consistency, about 4 to 5 times total.",
        'Serve immediately or return to the freezer and chill for 8 hours, or overnight, before serving for best results.',
      ],
      nutrients: {
        fat: '0g',
        sodium: '2.4mg',
        carbohydrates: '25g',
        protein: '0.1g',
        'niacin equivalents': '0.2mg',
        potassium: '58.6mg',
      },
      tags: [],
      servings: '6',
      image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&poi=face&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F06%2F09%2FCoffee-Granita-2x1-1.jpg',
      time: {
        prepration_time: '5 mins ',
        cooking_time: '',
        additional_time: '',
        total: '11 hrs 20 mins ',
      },
    },
  ],
};
router.post('/getRecipes', async (req, res) => {
  const { dish } = req.body;
  if (!dish) {
    return res.status(422).send(dataConverter(req, { message: 'Parameters missing' }));
  }
  options.url += dish;

  axios.request(options).then((response) => {
    res.send(dataConverter(req, response.data));
  }).catch((error) => {
    logger.error(error);
    res.send(dataConverter(req, dummyData));
  });
  options.url -= dish;
});

module.exports = router;
