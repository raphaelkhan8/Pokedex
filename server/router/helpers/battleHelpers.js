const { TYPE_CHART, TYPE_ORDER } = require('./pokeTypeChart');
const { Pokemon } = require('../../../database-mysql/models');

const getTypeMultiplier = (type1, type2) => {
  const type1Index = TYPE_ORDER[type1];
  const type2index = TYPE_ORDER[type2];
  const type1multiplierArr = TYPE_CHART[type1];
  const type2multiplierArr = TYPE_CHART[type2];
  const type1multiplier = type1multiplierArr[type2index];
  const type2Multiplier = type2multiplierArr[type1Index];
  return { type1multiplier, type2Multiplier };
};

const battle = (enemyPokemon, leadPokemon) => {
  const enemyType = enemyPokemon.type;
  const leadType = leadPokemon.pokemon.type;
  const typeMultiplier = getTypeMultiplier(enemyType, leadType);
  const { type1multiplier, type2Multiplier } = typeMultiplier;
  return ((enemyPokemon.powerLevel * type1multiplier) > (leadPokemon.pokemon.powerLevel * type2Multiplier))
    ? enemyPokemon : leadPokemon.pokemon;
};

const gainBattleExperience = (leadPokemon) => {
  const { pokeId } = leadPokemon;
  return Pokemon.findOne({
    where: {
      id: pokeId,
    },
  }).then((pokeMon) => {
    const { powerLevel } = pokeMon;
    const powerLevelIncrement = Math.ceil(powerLevel * 0.05);
    pokeMon.increment('powerLevel', { by: powerLevelIncrement });
    return powerLevelIncrement;
  });
};

module.exports.battle = battle;
module.exports.gainBattleExperience = gainBattleExperience;
