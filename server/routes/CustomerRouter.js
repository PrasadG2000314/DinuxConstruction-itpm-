import express from 'express';
import CustomerController from '../controller/CustomerController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const customerRouter = express.Router();

//userRouter.get('/', protect, UserController.getAllUsers);
customerRouter.post('/create', authorizeUser, CustomerController.createCustomer);
customerRouter.get('/search/:user', authorizeUser, CustomerController.getCustomerByUser);
customerRouter.put('/update', authorizeUser, CustomerController.updateCustomer);
customerRouter.delete('/delete/:email', authorizeUser, CustomerController.deleteCustomerByEmail);

export default customerRouter;
