import express from 'express';
import StockController from '../controller/StockController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const stockRouter = express.Router();

stockRouter.get('/getid', authorizeUser, StockController.generateStockId);
stockRouter.post('/create', authorizeUser, StockController.createStock);
stockRouter.get('/get/:equipmentId', authorizeUser, StockController.getStockById);
stockRouter.get('/getall', authorizeUser, StockController.getAllStock);
stockRouter.put('/update', authorizeUser, StockController.updateStock);
stockRouter.delete('/delete/:equipmentId', authorizeUser, StockController.deleteStock);

stockRouter.post('/buy', authorizeUser, StockController.buyStock);
stockRouter.get('/getbought/:month', authorizeUser, StockController.getBoughtStockDetailsByMonth);

export default stockRouter;
