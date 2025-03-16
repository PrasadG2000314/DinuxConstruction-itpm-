import express from 'express';
import VehicleController from '../controller/VehicleController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const vehicleRouter = express.Router();

vehicleRouter.get('/searchall', authorizeUser, VehicleController.getVehicles);
vehicleRouter.get('/search/:type', authorizeUser, VehicleController.getVehiclesByType);
vehicleRouter.post('/create', authorizeUser, VehicleController.addVehicle);
vehicleRouter.put('/update', authorizeUser, VehicleController.updateAddVehicle);
vehicleRouter.delete('/delete/:ChassisNo', authorizeUser, VehicleController.deleteVehicle);

export default vehicleRouter;
