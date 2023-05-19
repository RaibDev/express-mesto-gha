const router = require('express').Router();
const { celebrate } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../middlewares/validation');

const NotFound = require('../utils/errors/not-found-error');

router.post('/signup', celebrate(createUserValidation), createUser);
router.post('/signin', celebrate(loginValidation), login);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use((req, res, next) => { // Выводим ошибку при запросе несуществующего роутера
  next(new NotFound('Запрошен неверный роут'));
});

module.exports = router;
