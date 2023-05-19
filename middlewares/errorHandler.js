const errorHandler = (err, req, res, next) => { //  Централизованно обрабатываем ошибку
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ошибка сервера' : message,
  });
  next();
};

module.exports = errorHandler;
