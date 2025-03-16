import express from 'express';
import Fleetcontroller from '../controller/FleetController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const FleetRouter = express.Router();

FleetRouter.get('/searchall', authorizeUser, Fleetcontroller.getFleets);
FleetRouter.post('/create', authorizeUser, Fleetcontroller.addFleet);
FleetRouter.put('/update', authorizeUser, Fleetcontroller.updateFleet);
FleetRouter.delete('/delete/:VehicleNo', authorizeUser, Fleetcontroller.deleteFleet);
FleetRouter.get('/search/:driverId', authorizeUser, Fleetcontroller.searchFleetByDriverId);
  
export default FleetRouter;
