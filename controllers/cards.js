const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const createCard = (req, res) => {
  // const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      const message = Object.values(err.errors).map((error) => error.name).join('; ');
      if (err.name === 'ValidationError') {
        res.status(400).send({ message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Id isn`t correct' });
      } else {
        res.send({ message: 'Карточка удалена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы неверные данные' });
      } else {
        res.status(err.statusCode).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
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
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
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
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
