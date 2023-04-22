const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { userRouter, cardRouter } = require('./routes');

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
app.use(userRouter);
app.use(cardRouter);

app.listen(PORT, () => {
  console.log(`Attention! App listening ${PORT} PORT`);
});
