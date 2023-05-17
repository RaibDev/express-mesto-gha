const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/constants');
const customErrors = require('../utils/errors/index');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new customErrors.Unautorized('Вы не авторизовались'));
    // res.status(401).send({ message: 'Вы не авторизовались' });
    // return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
    console.log(payload);
  } catch (e) {
    return next(new customErrors.Unautorized('Вы не авторизовались'));
    // res.status(401).send({ message: 'Вы не авторизовались' });
  }
  req.user = payload;
  return next();
};
