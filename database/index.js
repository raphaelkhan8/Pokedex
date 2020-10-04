const Sequelize = require("sequelize");

const { DATABASE_URL } = process.env;

const dialectOptions = {
    ssl: {
        require: true,
        rejectUnauthorized: false,
    },
};

const sequelize = new Sequelize(DATABASE_URL, { dialectOptions });

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports.sequelize = sequelize;
