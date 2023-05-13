const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
// const { createUserValidation, loginValidation } = require('../utils/constants');
const { login, createUser } = require('../controllers/users');

const regex = /^(ftp|http|https):\/\/[^ "]+$/;

// router.post('/signup', celebrate(createUserValidation), createUser);
// router.post('/signin', celebrate(loginValidation), login);
router.post('/signup', celebrate({
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Введён некорректный email адрес',
      'string.empty': 'Поле email не должно быть пустым',
      'any.required': 'Поле email не должно быть пустым',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Пароль должен содержать не менее 8 символов',
      'string.empty': 'Поле пароля не должно быть пустым',
      'any.required': 'Поле пароля не должно быть пустым',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.email': 'Введён некорректный email адрес',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Пароль должен содержать не менее 8 символов',
    }),
    avatar: Joi.string().pattern(regex).message('Ссылка на аватар введёна некорректно'),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object({
    email: Joi.string().required().email().messages({
      'string.email': 'Введён некорректный email адрес',
      'string.empty': 'Поле email не должно быть пустым',
    }),
    password: Joi.string().required().min(8).messages({
      'string.min': 'Пароль должен содержать не менее 8 символов',
      'string.empty': 'Поле пароля не должно быть пустым',
      'any.required': 'Поле пароля не должно быть пустым',
    }),
  }),
}), login);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

module.exports = router;
