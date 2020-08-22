const express = require('express');
const { Users, UsersPokemon, Pokemon } = require('../../database-mysql/models');

const router = new express.Router();

router.post('/sign-in/:user', (req, res) => {
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
      });
    }).catch((err) => {
      console.error('User was not saved to the database', err);
    });
});

module.exports.userRouter = router;
