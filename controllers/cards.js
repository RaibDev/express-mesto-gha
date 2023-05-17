const Card = require('../models/card');
// const customErrors = require('../utils/errors/index');
const NotFound = require('../utils/errors/not-found-error');
const BadRequest = require('../utils/errors/bad-request-error');
const Forbidden = require('../utils/errors/forbidden-error');

const getCards = (req, res, next) => { // Получение карточек
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => { // Создаем картчку
  // const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      // const message = Object.values(err.errors).map((error) => error.name).join('; ');
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
        // res.status(400).send({ message });
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => { // Удаляем карточку
  const { cardId } = req.params;
  // const ownerId = req.owner._id;
  const userId = req.user._id;
  Card.findById(cardId)
    .then((cardData) => {
      if (!cardData) {
        next(new NotFound('Карточка с таким id не найдена'));
        // res.status(404).send({ message: 'Id isn`t correct' });
      } else {
        const ownerId = cardData.owner.toString();
        if (userId === ownerId) {
          Card.deleteOne(cardData).then(() => res.status(200).send({ message: 'Карточка удалена' }));
        }
        next(new Forbidden('Удалить карточку может только создавший её пользователь'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы неверные данные'));
        return;
        // res.status(400).send({ message: 'Переданы неверные данные' });
      }
      next(err);
    });
};

const likeCard = (req, res, next) => { // Постановка лайка
  const { cardId } = req.params;
  const { ownerCard } = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: ownerCard } }, // Проверяет наличие id в массиве likes, и добавляет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка с таким id не найдена'));
        // res.status(404).send({ message: 'Id isn`t correct' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      // const message = Object.values(err.errors).map((error) => error.name).join('; ');
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы неверные данные'));
        // res.status(400).send({ message: 'Переданы неверные данные' });
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => { // Удаленеи лайка с карточки
  const { cardId } = req.params;
  const ownerCard = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: ownerCard } }, // Удаляет id из likes
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка с таким id не найдена'));
        // res.status(404).send({ message: 'Id isn`t correct' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы неверные данные'));
        // res.status(400).send({ message: 'Id isn`t correct' });
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
