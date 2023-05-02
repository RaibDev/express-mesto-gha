const express = require('express');
const mongoose = require('mongoose');
// const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const router = require('./routes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {

});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64442aca4403f3dc9a0265cb', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use(router);
// app.use(errors());
app.use((req, res) => {
  res.status(404).send({ message: 'Запрошен неверный роут' });
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ошибка сервера' : message,
  });

  next();
});

app.listen(PORT, () => {
  console.log(`Attention! App listening ${PORT} PORT`);
});
