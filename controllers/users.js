const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      const message = Object.values(err.errors).map((error) => error.name).join('; ');
      if (err.name === 'NotFound') {
        res.status(404).send({ message });
        return;
      }

      if (err.name === 'ValidationError') {
        res.status(400).send({ message });
      } else {
        res.status(500).send({ message });
      }
    });
};

const getUser = (req, res) => {
  // const { userId } = req.params;
  // const user = users.find((user) => user._id === Number(userId)); // ????????????
  // if (user) {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
  // } else {
  // res.send.status(404).send({ message: 'Пользователь с таким Id не найден' });
  // }
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
        res.status(500).send({ message: `Произошла ошибка ${err}` });
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
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.name).join('; ');
        res.status(400).send({ message });
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}` });
      }
    });
};

const updateAvatar = (req, res) => {
  const { link } = req.body;
  User.findByIdAndUpdate(
    req.params._id,
    { link },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
