const { pokeRouter } = require('./routes/pokemon');
const { userRouter } = require('./routes/users');

const routers = {
  pokeRouter,
  userRouter,
};

module.exports = routers;
