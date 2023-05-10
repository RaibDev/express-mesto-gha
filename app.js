const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');

const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {

});

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);
// app.use((req, res, next) => {
//   req.user = {
// _id: '64442aca4403f3dc9a0265cb', // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });
app.use(auth);
app.use(router);
app.use(errors());
app.use((req, res) => { // Выводим ошибку при запросе несуществующего роутера
  res.status(404).send({ message: 'Запрошен неверный роут' });
});
app.use((err, req, res, next) => { //  Централизованно обрабатываем ошибку
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ошибка сервера' : message,
  });

  next();
});

app.listen(PORT, () => {
  console.log(`Attention! App listening ${PORT} PORT`);
});
