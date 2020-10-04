const express = require("express");
const {
    getUserPokemon,
    searchPokemon,
    addPokemonToCollection,
} = require("../helpers/pokeHelpers");
const { battle, gainBattleExperience } = require("../helpers/battleHelpers");

const router = new express.Router();

router.get("/pokemon/:id", (req, res) => {
    const { id } = req.params;
    getUserPokemon(id)
        .then((pokeCollection) => res.send(pokeCollection))
        .catch((err) => console.error(err));
});

router.get("/search", (req, res) => {
    const { name } = req.query;
    searchPokemon(name)
        .then((pokeData) => res.send(pokeData))
        .catch((err) => res.status(404).send(err));
});

router.post("/firstPokemon", (req, res) => {
    const { pokemon, userId } = req.body;
    addPokemonToCollection(userId, pokemon).then(() => {
        getUserPokemon(userId).then((pokeCollection) => {
            pokeCollection.unshift("You caught your first Pokemon!");
            res.send(pokeCollection);
        });
    });
});

router.post("/pokebattle", (req, res) => {
    const { pokemon, leadPokemon, userId } = req.body;
    const victorPokemon = battle(pokemon, leadPokemon);
    if (victorPokemon.name !== pokemon.name) {
        gainBattleExperience(leadPokemon).then((pokeLevelGain) => {
            addPokemonToCollection(userId, pokemon)
                .then(() => {
                    getUserPokemon(userId).then((pokeCollection) => {
                        pokeCollection.unshift({
                            message: "Caught!",
                            experience: pokeLevelGain,
                        });
                        res.send(pokeCollection);
                    });
                })
                .catch((err) => console.error(err));
        });
    } else {
        getUserPokemon(userId)
            .then((pokeCollection) => {
                pokeCollection.unshift("You lost :(");
                res.send(pokeCollection);
            })
            .catch((err) => console.error(err));
    }
});

module.exports.pokeRouter = router;
