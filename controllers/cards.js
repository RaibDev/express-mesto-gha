const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const { card } = cards.find(card._id === cardId);
  if (card) {
    Card.findByIdAndRemove(req.params.cardId)
      .then(() => res.send({ message: 'Карточка удалена' }))
      .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
  } else {
    res.status(500).send({ message: 'Карточка с таким id не найдена' });
  }
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.users._id } }, // Проверяет наличие id в массиве likes, и добавляет
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // Удаляет id из likes
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
