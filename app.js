const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('http://localhost:27017/mestodb', {

});

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Attention! App listening ${PORT} PORT`);
});
