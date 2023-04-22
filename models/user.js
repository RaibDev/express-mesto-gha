const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Пользователь должен иметь Имя'],
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: [true, 'У пользователя должно быть указано хобби'],
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    tupe: String,
    required: [true, 'У пользователя должен быть аватар'],
  },
});
module.exports = mongoose.model('user', userSchema);
