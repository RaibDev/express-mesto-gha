const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
} = require('../utils/validation');

const cardRouter = express.Router();

cardRouter.get('/', getCards);

cardRouter.post('/', celebrate(createCardValidation), createCard);

cardRouter.delete('/:cardId', celebrate(deleteCardValidation), deleteCard);

cardRouter.put('/:cardId/likes', celebrate(likeCardValidation), likeCard);

cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter;
