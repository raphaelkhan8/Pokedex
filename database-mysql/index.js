const Sequelize = require('sequelize');

// set up the database connection
const {
  dbName, dbUser, dbPass, dbHost,
} = process.env;
const sequelize = new Sequelize(dbName || 'pokemvp', dbUser || 'root', dbPass || '', {
  host: dbHost,
  port: 3306,
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
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timeStamps: false,
});

// make a pokemon table
const Pokemon = sequelize.define('pokemon', {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
  },
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
  timeStamps: false,
});

// make a joint users/pokemon table
const UsersPokemon = sequelize.define('users_pokemon', {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    foreignKey: true,
    references: {
      model: Users,
      key: 'id',
    },
  },
  pokeId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    foreignKey: true,
    references: {
      model: Pokemon,
      key: 'id',
    },
  },
}, {
  freezeTableName: true,
  timeStamps: false,
});

UsersPokemon.belongsTo(Users, {
  foreignKey: 'userId',
});

UsersPokemon.belongsTo(Pokemon, {
  foreignKey: 'pokeId',
});

Pokemon.hasMany(UsersPokemon);
Users.hasMany(UsersPokemon);
Users.sync();
Pokemon.sync();
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
