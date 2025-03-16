import express from 'express';
import EmployeeController from '../controller/EmployeeController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const employeeRouter = express.Router();

//userRouter.get('/', protect, UserController.getAllUsers);
employeeRouter.post('/create', authorizeUser, EmployeeController.createEmployee);
employeeRouter.get('/search/:value/:searchBy',authorizeUser, EmployeeController.getEmployeeByCriteria);
employeeRouter.get('/getid', authorizeUser, EmployeeController.generateEmployeeId);
employeeRouter.put('/update', authorizeUser, EmployeeController.updateEmployee);
employeeRouter.delete('/delete/:email/:userType', authorizeUser, EmployeeController.deleteEmployeeByEmail);
employeeRouter.get('/getcount', authorizeUser, EmployeeController.getEmployeeCount);
employeeRouter.get('/getlog/:month/:userId', EmployeeController.getLogData);

export default employeeRouter;
