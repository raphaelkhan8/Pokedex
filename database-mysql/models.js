const Sequelize = require('sequelize');
const { sequelize } = require('./index');

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
  type: {
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
