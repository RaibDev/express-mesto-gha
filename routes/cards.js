const express = require('express');
const { Joi, celebrate } = require('celebrate');

const cardRouter = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// const {
//   createCardValidation,
//   deleteCardValidation,
//   likeCardValidation,
// } = require('../utils/validation');

const regex = /^(ftp|http|https):\/\/[^ "]+$/;

cardRouter.get('/', getCards);

cardRouter.post('/', celebrate({
  body: Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.min': 'Поле "Название места" должно содержать более 2х символов',
        'string.max': 'Поле "Название места" не должно содержать более 30 знаков',
        'any.required': 'Поле "Название места" не должно быть пустым',
      }),
    link: Joi.string().pattern(regex).required().messages({
      'string.dataUri': 'Введена некорректная ссылка на картинку места',
      'any.required': 'Поле ссылки не должно быть пустым',
    }),
  }),
}), createCard);

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).message('Передан некорректный id карточки'),
  }),
}), deleteCard);

cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).message('Передан некорректный id карточки'),
  }),
}), likeCard);

cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).message('Передан некорректный id карточки'),
  }),
}), dislikeCard);

module.exports = cardRouter;
