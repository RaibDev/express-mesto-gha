// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SECRET_KEY = require('../utils/constants');

const getUsers = (req, res, next) => { // Метод запроса юзеров
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => { // Получение юзера по айди
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
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) { // Проверка наличия полей
    res.status(400).send({ message: 'Не передан пароль или email' });
    return;
  }

  User.findOne({ email }).select('+password') // Ищем пользователя в базе
    .then((user) => {
      if (!user) {
        throw new Error('Неверные логин или пароль');
      }
      return bcrypt.compare(password, user.password) // Сверяем переданный пароль и хеш пароля
        .then((matched) => {
          if (!matched) {
            throw new Error('Неверные логин или пароль');
          }
          const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' }); // Создаем и передаем токен, он действует неделю
          res.send({ token });
        });
    })
    .catch(next);
};

const createUser = (req, res, next) => { // Создание пользователя
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10) // хэшируем пароль, используя "соль" = 10
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash, // Записываем хэш в базу
      })
        .then((newUser) => res.status(201).send({ // Вовзвращаем нового пользователя
          name: newUser.name,
          about: newUser.about,
          avatar: newUser.avatar,
          email: newUser.email,
        }))
        .catch((err) => {
          if (err.code === 11000) { // Проверяем, что пользователя с таким email нет в базе
            res.status(409).send({ message: 'Пользователь с таким email уже существует' });
            return;
          }
          if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((error) => error.name).join('; ');
            res.status(400).send({ message });
          }
          next(err);
        });
    });
};

const updateUser = (req, res, next) => { // Обновление полей пользователя
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
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
      }
      next(err);
    });
};

const updateAvatar = (req, res, next) => { // Обновление аватара пользака
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
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
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  login,
  createUser,
  updateUser,
  updateAvatar,
};
