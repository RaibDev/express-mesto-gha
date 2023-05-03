// const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      // const message = Object.values(err.errors).map((error) => error.name).join('; ');
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById({ _id: userId })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'This user not found' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Id isn`t correct' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
  // .catch(() => {
  //   res.status(400).send({ message: 'На сервере произошла ошибка' });
  // });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.name).join('; ');
        res.status(400).send({ message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.params._id,
    { name, about },
    {
      new: true, // Возвращаем уже измененный объект
      runValidators: true, // Валидируем поля перед записью в БД
      upsert: true, // Если такого объекта нет - создадим его
    },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'This user not found' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.name).join('; ');
        res.status(400).send({ message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.params._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((newData) => {
      if (!newData) {
        res.status(404).send({ message: 'This user not found' });
      } else {
        res.send({ data: newData });
      }
    })
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
