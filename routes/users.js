const express = require('express');
const { getUsers, getUser, createUser } = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUser);

userRouter.post('/users', createUser);

module.exports = userRouter;
