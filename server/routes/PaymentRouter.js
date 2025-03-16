import express from 'express';
import PaymentController from '../controller/PaymentController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const paymentRouter = express.Router();

paymentRouter.post('/companypay', authorizeUser, PaymentController.makeCompanyPayment);
paymentRouter.get('/getcomp/:type', authorizeUser, PaymentController.getCompanyPayments);

paymentRouter.post('/cuspay', authorizeUser, PaymentController.makeCustomerInstallment);
paymentRouter.get('/getall/:month', authorizeUser, PaymentController.getAllPaymentsByMonth);

paymentRouter.get('/getbank/:id', authorizeUser, PaymentController.getBank);
paymentRouter.get('/getbanks', authorizeUser, PaymentController.getAllBanks);

export default paymentRouter;
