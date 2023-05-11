const Card = require('../models/card');

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
      const message = Object.values(err.errors).map((error) => error.name).join('; ');
      if (err.name === 'ValidationError') {
        res.status(400).send({ message });
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => { // Удаляем карточку
  const { cardId } = req.params;
  const ownerId = req.owner._id;
  const userId = req.user._id;
  Card.findByIdAndRemove(cardId)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Id isn`t correct' });
      } else if (ownerId !== userId) {
        throw new Error('Удалить карточку может только создавший её пользователь');
      } else {
        res.send({ message: 'Карточка удалена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы неверные данные' });
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
        res.status(404).send({ message: 'Id isn`t correct' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      // const message = Object.values(err.errors).map((error) => error.name).join('; ');
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы неверные данные' });
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
        res.status(404).send({ message: 'Id isn`t correct' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Id isn`t correct' });
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
