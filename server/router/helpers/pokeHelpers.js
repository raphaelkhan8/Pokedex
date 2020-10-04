const axios = require("axios");
const { Users, Pokemon, UsersPokemon } = require("../../../database/models");

const getUserPokemon = (userId) =>
    UsersPokemon.findAll({
        where: {
            userId,
        },
        include: [Pokemon],
    })
        .then((pokemon) => pokemon)
        .catch((err) => console.error(err));

const searchPokemon = (query) =>
    axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`).then((response) =>
        axios
            .get(`${response.data.species.url}`)
            .then((descriptions) => {
                const pokeData = {};
                /* englishArr is an array with objects each containing the pokemon's description
          but in a ton of languages so need to filter for English */
                const englishArr = descriptions.data.flavor_text_entries.filter(
                    (desc) => desc.language.name === "en"
                );
                const arrLength = englishArr.length;
                const randomIndex = Math.floor(Math.random() * arrLength);
                const englishDescription = englishArr[randomIndex].flavor_text;
                pokeData.name = response.data.name;
                pokeData.type = response.data.types[0].type.name;
                pokeData.powerLevel = response.data.base_experience;
                pokeData.imageUrl = response.data.sprites.front_default;
                pokeData.description = englishDescription;
                return pokeData;
            })
            .catch((err) => console.error(err))
    );

const addPokemonToCollection = (userId, pokemon) => {
    const { name, type, powerLevel, description, imageUrl } = pokemon;
    return Pokemon.findOrCreate({
        where: { name },
        defaults: {
            name,
            type,
            powerLevel,
            description,
            imageUrl,
        },
    })
        .then(([pokemon]) =>
            Users.findOne({
                where: {
                    id: userId,
                },
            }).then((userInfo) =>
                UsersPokemon.create({
                    userId: userInfo.id,
                    pokeId: pokemon.id,
                }).then(() => {
                    UsersPokemon.findAll({
                        where: {
                            userId: userInfo.id,
                        },
                        include: [Pokemon],
                    }).then((pokemons) => pokemons);
                })
            )
        )
        .catch((err) => {
            console.error(err);
        });
};

module.exports.getUserPokemon = getUserPokemon;
module.exports.searchPokemon = searchPokemon;
module.exports.addPokemonToCollection = addPokemonToCollection;
