import express from 'express';
import UserController from '../controller/UserController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const userRouter = express.Router();

userRouter.post('/login', UserController.loginUser);
userRouter.put('/changepassword', authorizeUser, UserController.changePassword);

export default userRouter;
