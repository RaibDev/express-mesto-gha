const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');

const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {

});

app.use(bodyParser.json());

app.use(router);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Attention! App listening ${PORT} PORT`);
});
