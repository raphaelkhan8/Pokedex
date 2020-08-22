const Sequelize = require('sequelize');

const {
  dbName, dbUser, dbPass, dbHost,
} = process.env;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: 3306,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports.sequelize = sequelize;
