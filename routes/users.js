const express = require('express');

const userRouter = express.Router();
const User = require('../models/user');

userRouter.get('/usres', (req, res) => {
  res.send({ data: users });
});

userRouter.get('/users/:userId', (req, res) => {
  const { userId } = req.body;
  const user = users.find((user) => user.id === Number(userId));
  if (user) {
    res.send({ data: user })
  } else {
    res.send.status(404).send({ message: 'Пользователь с таким Id не найден' })
  }
});

userRouter.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});
