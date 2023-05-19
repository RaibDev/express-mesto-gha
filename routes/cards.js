const { celebrate } = require('celebrate');
const cardRouter = require('express').Router();

const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
} = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);

cardRouter.post('/', celebrate(createCardValidation), createCard);
cardRouter.delete('/:cardId', celebrate(deleteCardValidation), deleteCard);
cardRouter.put('/:cardId/likes', celebrate(likeCardValidation), likeCard);
cardRouter.delete('/:cardId/likes', celebrate(likeCardValidation), dislikeCard);

module.exports = cardRouter;
