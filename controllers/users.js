const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET_KEY } = require('../utils/constants');
const customErrors = require('../utils/errors/index');

// const SECRET_KEY = 'Tegucigalpa';

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
        throw new customErrors.NotFound('Пользователь не найден');
        // res.status(404).send({ message: 'This user not found' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new customErrors.BadRequest('Некорректный id пользователя'));
        // res.status(400).send({ message: 'Id isn`t correct' });
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) { // Проверка наличия полей
    throw new customErrors.BadRequest('Не передан пароль или email');
    // res.status(400).send({ message: 'Не передан пароль или email' });
    // return;
  }

  User.findOne({ email }).select('+password') // Ищем пользователя в базе
    .then((user) => {
      if (!user) {
        throw new customErrors.Unautorized('Неверные логин или пароль');
      }
      return bcrypt.compare(password, user.password) // Сверяем переданный пароль и хеш пароля
        .then((matched) => {
          if (!matched) {
            next(new customErrors.Unautorized('Неверные логин или пароль'));
          }
          // console.log(user);
          const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' }); // Создаем и передаем токен, он действует неделю
          console.log(token);
          return res.send({ token });
        });
    })
    .catch(next);
};

const createUser = (req, res, next) => { // Создание пользователя
  bcrypt.hash(req.body.password, 10) // хэшируем пароль, используя "соль" = 10
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash, // Записываем хэш в базу
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
      })
        .then((newUser) => {
          res.status(201).send({ // Вовзвращаем нового пользователя
            name: newUser.name,
            about: newUser.about,
            avatar: newUser.avatar,
            email: newUser.email,
          });
        })
        .catch((err) => {
          if (err.code === 11000) { // Проверяем, что пользователя с таким email нет в базе
            next(new customErrors.Conflict('Пользователь с таким email уже существует'));
            // res.status(409).send({ message: 'Пользователь с таким email уже существует' });
            return;
          }
          // if (err.name === 'ValidationError') {
          //   next(new customErrors.BadRequest(''));
          //   // const message = Object.values(err.errors).map((error) => error.name).join('; ');
          //   // res.status(400).send({ message });
          // }
          console.error(err);
          next(err);
        });
    })
    .catch(next);
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
        throw new customErrors.BadRequest('Пользователь не найден');
        // res.status(404).send({ message: 'This user not found' });
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
  //   (err) => {
  //   if (err.name === 'ValidationError') {
  //     const message = Object.values(err.errors).map((error) => error.name).join('; ');
  //     res.status(400).send({ message });
  //   }
  //   next(err);
  // });
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
        throw new customErrors.BadRequest('Пользователь не найден');
        // res.status(404).send({ message: 'This user not found' });
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
