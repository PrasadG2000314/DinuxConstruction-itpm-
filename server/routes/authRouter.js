import express from 'express';
import authController from '../controller/AuthController.js';

const authRouter = express.Router();

authRouter.get('/get', authController.getAuth);
authRouter.post('/create', authController.addAuth);
authRouter.put('/update', authController.updateAuth);
authRouter.delete('/delete/:id', authController.deleteAuth);

export default authRouter;