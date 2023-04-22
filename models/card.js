const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: [true, 'Карточка должна иметь название'],
  },
  link: {
    type: String,
    required: [true, 'Укажите ссылку на картинку'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'card',
    required: [true, 'Карточка должна иметь своего творца'],
  },
  likes: {
    types: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);
