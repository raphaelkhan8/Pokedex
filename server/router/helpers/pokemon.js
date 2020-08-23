const express = require('express');
const {
  getUserPokemon, searchPokemon, battle, addPokemonToCollection,
} = require('../helpers/pokeHelpers');

const router = new express.Router();

router.get('/pokemon/:id', (req, res) => {
  const { id } = req.params;
  getUserPokemon(id).then(pokeCollection => res.send(pokeCollection))
    .catch(err => console.error(err));
});

router.get('/search', (req, res) => {
  const { name } = req.query;
  searchPokemon(name).then(pokeData => res.send(pokeData))
    .catch(err => console.error('Error when getting data from api.', err));
});

// route for when ADD POKEMON button is clicked
router.post('/pokebattle', (req, res) => {
  const { pokemon, leadPokemon, userId } = req.body;
  const victorPokemon = battle(pokemon, leadPokemon);
  if (victorPokemon.name !== pokemon.name) {
    addPokemonToCollection(userId, pokemon).then(() => {
      getUserPokemon(userId).then((pokeCollection) => {
        pokeCollection.unshift('Caught!');
        res.send(pokeCollection);
      })
        .catch(err => console.error(err));
    });
  } else {
    getUserPokemon(userId).then((pokeCollection) => {
      pokeCollection.unshift('You lost :(');
      res.send(pokeCollection);
    })
      .catch(err => console.error(err));
  }
});
//     .catch(err => console.error(err));
//   return Pokemon.findOrCreate({
//     where: { name },
//     defaults:
//       {
//         name,
//         powerLevel,
//         description,
//         imageUrl,
//       },
//   }).then(([pokemon]) => {
//     Users.findOne({
//       where: {
//         username: users,
//       },
//     })
//       .then((user) => {
//         UsersPokemon.create({ userId: user.id, pokeId: pokemon.id })
//           .then(() => {
//             UsersPokemon.findAll({
//               where: {
//                 userId: user.id,
//               },
//               include: [Pokemon],
//             }).then((pokemons) => {
//               res.status(201);
//               res.send(pokemons);
//             });
//           });
//       });
//   }).catch((err) => {
//     console.error(err);
//   });
// }
// });

// addPokemonToCollection(users, pokemon).then((pokeCollection) => {
//     console.log('NEWWWWWW ==========================================', pokeCollection);
//     res.status(201);
//     res.send(pokeCollection);
//   })
//     .catch(err => console.error(err));

module.exports.pokeRouter = router;
