const userRouter = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const celebrate = require('celebrate');

const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  getUserValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../utils/validation');

userRouter.get('/', getUsers);

userRouter.get('/:userId', celebrate(getUserValidation), getUser);

// userRouter.post('/', createUser);

userRouter.patch('/me', celebrate(updateUserValidation), updateUser);

userRouter.patch('/me/avatar', celebrate(updateAvatarValidation), updateAvatar);

module.exports = userRouter;
