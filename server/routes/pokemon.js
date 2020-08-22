const express = require('express');
const axios = require('axios');
const { Users, Pokemon, UsersPokemon } = require('../../database-mysql/models');

const router = new express.Router();

// route for when search button is clicked
router.get('/search', (req, res) => {
  const { name } = req.query;
  axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      axios.get(`${response.data.species.url}`)
        .then((descriptions) => {
          const pokeData = {};
          /* englishArr is an array with objects each containing the pokemon's description
            but in a ton of languages so need to filter for English */
          const englishArr = descriptions.data.flavor_text_entries.filter(desc => desc.language.name === 'en');
          const arrLength = englishArr.length;
          const randomIndex = Math.floor(Math.random() * arrLength);
          const englishDescription = englishArr[randomIndex].flavor_text;
          pokeData.name = response.data.name;
          pokeData.powerLevel = response.data.base_experience;
          pokeData.imageUrl = response.data.sprites.front_default;
          pokeData.description = englishDescription;
          res.send(pokeData);
        });
    })
    .catch((err) => {
      console.error('Error when getting data from api.', err);
    });
});


// route for when ADD POKEMON button is clicked
router.post('/pokemvp/:users', (req, res) => {
  const {
    name, powerLevel, description, imageUrl,
  } = req.body;
  const { users } = req.params;
  Pokemon.findOrCreate({
    where: { name },
    defaults:
      {
        name,
        powerLevel,
        description,
        imageUrl,
      },
  }).then(([pokemon]) => {
    Users.findOne({
      where: {
        username: users,
      },
    })
      .then((user) => {
        UsersPokemon.create({ userId: user.id, pokeId: pokemon.id })
          .then(() => {
            UsersPokemon.findAll({
              where: {
                userId: user.id,
              },
              include: [Pokemon],
            }).then((pokemons) => {
              res.status(201);
              res.send(pokemons);
            });
          });
      });
  }).catch((err) => {
    console.error(err);
  });
});

module.exports.pokeRouter = router;
