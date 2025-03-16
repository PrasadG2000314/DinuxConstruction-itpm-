import express from 'express';
import BillerController from '../controller/BillerController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const billerRouter = express.Router();

billerRouter.post('/create', authorizeUser, BillerController.createBiller);
billerRouter.get('/getall', authorizeUser, BillerController.getAllBillers);
billerRouter.get('/getid', authorizeUser, BillerController.generateBillerId);
billerRouter.get('/get/:type', authorizeUser, BillerController.getBillerByType);
billerRouter.put('/update', authorizeUser, BillerController.updateBiller);
billerRouter.delete('/delete/:id', authorizeUser, BillerController.deleteBillerById);

export default billerRouter;
