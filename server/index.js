const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Users, Pokemon, UsersPokemon } = require('../database-mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// UNCOMMENT FOR REACT
app.use(express.static(path.join(__dirname, '../react-client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// UNCOMMENT FOR ANGULAR
// app.use(express.static(path.join(__dirname, '../angular-client')));
// app.use(express.static(path.join(__dirname, '../node_modules')));


// route for when sign-up button is clicked
// POST request that sends username to database to be stored in username field of users table
app.post('/sign-in/:user', (req, res) => {
  const { user } = req.params;
  Users.findOrCreate({
    where: { username: user },
    defaults: { username: user },
  })
    .then(() => {
      res.status(201);
      res.send(user);
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
    // data.species.url is another page so I need to make another api call for the description >:(
    .then((response) => {
      axios.get(`${response.data.species.url}`)
        .then((descriptions) => {
          // descriptionsArr is an array with a ton of objects each containing the pokemon's description
          // but in a ton of lanhuages so need to filter by language and then en(for English)
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
          // console.log(response.data);
          // console.log(response.data.name);
          // console.log(response.data.base_experience);
          // console.log(response.data.sprites.front_default);
          // console.log(englishDescription);
          // console.log('hiiii');
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
  console.log('=========here');
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

// route for when BATTLE button is clicked
// GET request that gets the first pokemon in the associated user's collection

// route already built for us
// app.get('/items', (req, res) => {
//   items.selectAll((err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
