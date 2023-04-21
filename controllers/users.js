const User = require('../models/user');

const getUsers = (req, res) => {
  res.send({ data: users });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  const user = users.find((user) => user.id === Number(userId));
  if (user) {
    res.send({ data: user });
  } else {
    res.send.status(404).send({ message: 'Пользователь с таким Id не найден' });
  }
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
