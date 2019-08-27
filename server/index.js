const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Users, Pokemon, UsersPokemon } = require('../database-mysql');

const app = express();

// UNCOMMENT FOR REACT
app.use(express.static(path.join(__dirname, '../react-client/dist')));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(path.join(__dirname, '../angular-client')));
// app.use(express.static(path.join(__dirname, '../node_modules')));


// route for when sign-up button is clicked
// POST request that sends username to database to be stored in username field of users table
app.post('/sign-in/:user', (req, res) => {
  const { user } = req.params;
  Users.create({ username: user })
    .then(() => {
      res.status(201);
      res.send(user.username);
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
    // need to get back following properties: name, base_experience, sprites and species.url
    // species.url contains the pokemon's description but in a ton of lanhuages so need to filter
    // out english translated description
    .then((response) => {
      console.log(response.data);
      console.log(response.data.name);
      console.log(response.data.base_experience);
      console.log(response.data.sprites.front_default);
      console.log(response.data.species.url);
      console.log('hiiii');
      const pokeData = {};
      pokeData.name = response.data;
      pokeData.powerLevel = response.data.base_experience;
      pokeData.imageUrl = response.data.sprites.front_default;
      pokeData.description = response.data.species.url;
      res.json(pokeData);
    })
    .catch((err) => {
      console.error('Error when getting data from api. See line 54 server/index.js', err);
    });
});

// route for when GET POKEMON button is clicked
// GET request that queries the database for associated user's pokemon

// route for when ADD POKEMON button is clicked
// POST request that adds the searched Pokemon to the associated user's collection

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

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
