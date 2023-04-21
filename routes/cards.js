const express = require('express');
const cardRouter = express.Router();
const Card = require('../models/card');

cardRouter.get('/users', (req, res) => {
  res.send({ data: cards });
});

cardRouter.post('/cards', (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});

cardRouter.delete('/cards/:cardId', (req, res) => {
  const { cardId } = req.params;
  const { card } = cards.find(card.id === cardId);
  if (card) {
    Card.findByIdAndRemove(req.params.cardId)
      .then(card => res.send({ message: 'Карточка удалена' }))
      .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
  } else {
    res.status(500).send({ message: 'Карточка с таким id не найдена' });
  }
});