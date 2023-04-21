const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {

});

app.use(express.json());
app.use(userRouter);
app.use(cardRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '.........', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.listen(PORT, () => {
  console.log(`Attention! App listening ${PORT} PORT`);
});
