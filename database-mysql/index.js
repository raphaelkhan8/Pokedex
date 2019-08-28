const Sequelize = require('sequelize');

// set up the database connection

const sequelize = new Sequelize('pokemvp', 'root', '', {
  port: process.env.PORT || 3306,
  dialect: 'mysql',
});

// test the db connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// make a Users table
const Users = sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});
Users.sync();

// make a pokemon table
const Pokemon = sequelize.define('pokemon', {
  name: {
    type: Sequelize.STRING,
  },
  powerLevel: {
    type: Sequelize.INTEGER(11),
  },
  description: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: true,
});
Pokemon.sync();

// make a joint users/pokemon table
const UsersPokemon = sequelize.define('users_pokemon', {
  userId: {
    type: Sequelize.INTEGER(11),
  },
  pokeId: {
    type: Sequelize.INTEGER(11),
  },
}, {
  freezeTableName: true,
});
UsersPokemon.sync();

module.exports.Users = Users;
module.exports.Pokemon = Pokemon;
module.exports.UsersPokemon = UsersPokemon;


// mySQL connection without sequlize:
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'FILL_ME_IN',
//   database: 'test',
// });

// const selectAllPokemon = (callback) => {
//   connection.query('SELECT * FROM Pokemon', (err, items) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// module.exports.selectAllPokemon = selectAllPokemon;
