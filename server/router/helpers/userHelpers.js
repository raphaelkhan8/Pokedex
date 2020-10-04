const { Users } = require("../../../database/models");

const saveUser = (user) =>
    Users.findOrCreate({
        where: { username: user },
        defaults: { username: user },
    })
        .then((foundUser) => foundUser)
        .catch((err) => console.error(err));

module.exports.saveUser = saveUser;
