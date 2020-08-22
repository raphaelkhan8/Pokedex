require('dotenv').config();

const express = require('express');
const path = require('path');
const { userRouter } = require('./routes/users');
const { pokeRouter } = require('./routes/pokemon');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../react-client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRouter);
app.use(pokeRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
