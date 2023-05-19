const { celebrate } = require('celebrate');
const userRouter = require('express').Router();

const {
  getUserValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

const {
  getUsers,
  getUser,
  getMyInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getMyInfo);
userRouter.get('/:userId', celebrate(getUserValidation), getUser);
userRouter.patch('/me', celebrate(updateUserValidation), updateUser);
userRouter.patch('/me/avatar', celebrate(updateAvatarValidation), updateAvatar);

module.exports = userRouter;
