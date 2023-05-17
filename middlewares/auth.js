const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../utils/constants');
const customErrors = require('../utils/errors/index');

module.exports = (req, res, next) => {
  const { autorization } = req.headers;

  if (!autorization || autorization.startsWith('Bearer')) {
    throw new customErrors.Unautorized('Вы не авторизовались');
    // res.status(401).send({ message: 'Вы не авторизовались' });
    // return;
  }
  const token = autorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (e) {
    next(new customErrors.Unautorized('Вы не авторизовались'));
    // res.status(401).send({ message: 'Вы не авторизовались' });
  }
  req.user = payload;
  next();
};
