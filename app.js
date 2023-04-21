const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
mongoose.connect('http://localhost:27017/mestodb', {

})

const app = express();

app.listen(PORT, () => {
  console.log(`Attention! App listening ${PORT} PORT`);
});
