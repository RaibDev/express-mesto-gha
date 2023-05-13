const express = require('express');
const { celebrate } = require('celebrate');

const cardRouter = express.Router();

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

cardRouter.get('/', getCards);

cardRouter.post('/', celebrate(createCardValidation), createCard);

cardRouter.delete('/:cardId', celebrate(deleteCardValidation), deleteCard);

cardRouter.put('/:cardId/likes', celebrate(likeCardValidation), likeCard);

cardRouter.delete('/:cardId/likes', celebrate(likeCardValidation), dislikeCard);

module.exports = cardRouter;
