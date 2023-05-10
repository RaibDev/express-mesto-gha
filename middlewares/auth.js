// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../utils/constants');

module.exports = (req, res, next) => {
  const { autorization } = req.headers;

  if (!autorization || autorization.startsWith('Bearer')) {
    res.status(401).send({ message: 'Вы не авторизовались' });
    return;
  }
  const token = autorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (e) {
    res.status(401).send({ message: 'Вы не авторизовались' });
  }
  req.user = payload;
  next();
};
