const { Joi } = require('celebrate');
const { regexUrl } = require('../utils/constants');

const createUserValidation = {
  body: Joi.object().keys({
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
    avatar: Joi.string().pattern(regexUrl).message('Ссылка на аватар введёна некорректно'),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
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
};

const getUserValidation = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).message('Передан некорректный id пользователя'),
  }),
};

const updateUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "имя" должно содержать более 2х символов',
      'string.max': 'Поле "имя" не должно содержать более 30 знаков',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "сфера занятий" должно содержать более 2х символов',
      'string.max': 'Поле "сфера занятий" не должно содержать более 30 знаков',
    }),
  }),
};

const updateAvatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regexUrl).message('Ссылка на аватар введёна некорректно'),
  }),
};

const createCardValidation = {
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.min': 'Поле "Название места" должно содержать более 2х символов',
        'string.max': 'Поле "Название места" не должно содержать более 30 знаков',
        'any.required': 'Поле "Название места" не должно быть пустым',
      }),
    link: Joi.string().pattern(regexUrl).required().messages({
      'string.dataUri': 'Введена некорректная ссылка на картинку места',
      'any.required': 'Поле ссылки не должно быть пустым',
    }),
  }),
};

const deleteCardValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).message('Передан некорректный id карточки'),
  }),
};

const likeCardValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).message('Передан некорректный id карточки'),
  }),
};

module.exports = {
  createUserValidation,
  loginValidation,
  getUserValidation,
  updateAvatarValidation,
  updateUserValidation,
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
};
