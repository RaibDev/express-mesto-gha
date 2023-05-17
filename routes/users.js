const userRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  getUsers,
  getUser,
  getMyInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

// const {
//   getUserValidation,
//   updateUserValidation,
//   updateAvatarValidation,
// } = require('../utils/validation');

const regex = /^(ftp|http|https):\/\/[^ "]+$/;

userRouter.get('/', getUsers);
userRouter.get('/me', getMyInfo);

userRouter.get('/:userId', celebrate({
  params: Joi.object({
    userId: Joi.string().hex().length(24).message('Передан некорректный id пользователя'),
  }),
}), getUser);

// userRouter.post('/', createUser);

userRouter.patch('/me', celebrate({
  body: Joi.object({
    avatar: Joi.string().pattern(regex).message('Ссылка на аватар введёна некорректно'),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "имя" должно содержать более 2х символов',
      'string.max': 'Поле "имя" не должно содержать более 30 знаков',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "сфера занятий" должно содержать более 2х символов',
      'string.max': 'Поле "сфера занятий" не должно содержать более 30 знаков',
    }),
  }),
}), updateAvatar);

module.exports = userRouter;
