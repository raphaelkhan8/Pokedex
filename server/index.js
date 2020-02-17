const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Users, Pokemon, UsersPokemon } = require('../database-mysql');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../react-client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route for when sign-up button is clicked
// POST request that sends username to database to be stored in users table
app.post('/sign-in/:user', (req, res) => {
  const { user } = req.params;
  Users.findOrCreate({
    where: { username: user },
    defaults: { username: user },
  })
    .then((foundUser) => {
      UsersPokemon.findAll({
        where: {
          userId: foundUser[0].id,
        },
        include: [Pokemon],
      }).then((pokemons) => {
        res.status(201);
        res.send(pokemons);
      })
        .catch((err) => {
          res.status(500).send({
            error: err.message,
          });
        });
    }).catch((err) => {
      console.error('User was not saved to the database', err);
    });
});

// route for when search button is clicked
// GET request gets the input pokemon's info from pokeapi
app.get('/search', (req, res) => {
  const { name } = req.query;
  axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    // response is an object which a data property that is an object with all the data we want
    // need to get back following properties: name, base_experience, sprites and description
    .then((response) => {
      axios.get(`${response.data.species.url}`)
        .then((descriptions) => {
          /* descriptionsArr is an array with objects each containing the pokemon's description
          // but in a ton of languages so need to filter by language and then en(for English)
          const descriptionsArr = descriptions.data.flavor_text_entries;
          const englishDescription = [];
          for (let i = 0; i < descriptionsArr.length; i += 1) {
            for (const key in descriptionsArr[i]) {
              if (key === 'language') {
                if (descriptionsArr[i].language.name === 'en') {
                  englishDescription.push(descriptionsArr[i].flavor_text);
                }
              }
            }
          }
          const pokeData = {};
          pokeData.name = response.data.name;
          pokeData.powerLevel = response.data.base_experience;
          pokeData.imageUrl = response.data.sprites.front_default;
          [pokeData.description] = englishDescription;
          res.send(pokeData);
        });
    })
    .catch((err) => {
      console.error('Error when getting data from api. See line 73 server/index.js', err);
    });
});


// route for when ADD POKEMON button is clicked
// POST request that adds the searched Pokemon to the associated user's collection
app.post('/pokemvp/:users', (req, res) => {
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
    // grab user's id, add it and pokeId to the UsersPokemon table
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
            })
              .catch((err) => {
                res.status(500).send({
                  error: err.message,
                });
              });
          });
      });
  }).catch((err) => {
    console.error(err);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
