const express = require('express');
const { saveUser } = require('../helpers/userHelpers');

const router = new express.Router();

router.post('/sign-in', (req, res) => {
  const { userInput } = req.body;
  saveUser(userInput).then((foundUser) => {
    const { id } = foundUser[0].dataValues;
    res.send({ id });
  })
    .catch(err => console.error(err));
});

module.exports.userRouter = router;
