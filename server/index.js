const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const items = require('../database-mysql');
const axios = require('axios');

const app = express();

// UNCOMMENT FOR REACT
app.use(express.static(path.join(__dirname, '../react-client/dist')));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(path.join(__dirname, '../angular-client')));
// app.use(express.static(path.join(__dirname, '../node_modules')));


// route for when sign-up button is clicked
  // POST request that sends username to database to be stored in username field of users table

// route for when search button is clicked
  // GET request gets the input pokemon's info from pokeapi
app.get('/search', (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${input_pokemon(CHANGE_MEEEEEEEE)}`)
  .then()
  .catch()
});

// route for when GET POKEMON button is clicked 
  // GET request that queries the database for associated user's pokemon

// route for when ADD POKEMON button is clicked
  // POST request that adds the searched Pokemon to the associated user's collection

// route for when BATTLE button is clicked
  // GET request that gets the first pokemon in the associated user's collection

// route already built for us 
app.get('/items', (req, res) => {
  items.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
