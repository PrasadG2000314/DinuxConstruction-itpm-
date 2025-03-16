import Fleet from '../models/Fleet.js';
import logger from '../utils/logger.js';

const Fleetcontroller = {

    getFleets: async (req, res) => {
        Fleet.find()
            .then(response => {
                logger.info("Successfully got Fleet Detail");
                res.status(200).json(response);
            })
            .catch(error => {
                logger.error("Error getting Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    addFleet: async (req, res) => {
        const fleet = new Fleet({
            VehicleType: req.body.VehicleType,
            VehicleNo: req.body.VehicleNo,
            DriverId: req.body.DriverId,
            Purpose: req.body.Purpose,
            DriverMobileNo: req.body.DriverMobileNo,
            TransportLocation: req.body.TransportLocation,
            TransportRoot: req.body.TransportRoot,
            Start: req.body.Start,
            EstimatedEnd: req.body.EstimatedEnd,
        });
        fleet.save()
            .then(response => {
                logger.info("Successfully added Fleet Detail");
                res.status(200).json(response);
            })
            .catch(error => {
                logger.error("Error Creating Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    updateFleet: async (req, res) => {
        const { VehicleType, VehicleNo, DriverId, Purpose, DriverMobileNo, TransportLocation, TransportRoot, Start } = req.body;
        Fleet.updateOne({ VehicleNo: VehicleNo }, { $set: { VehicleType: VehicleType, DriverId: DriverId, Purpose: Purpose, DriverMobileNo: DriverMobileNo, TransportLocation: TransportLocation, TransportRoot: TransportRoot, Start: Start, EstimatedEnd: req.body.EstimatedEnd } })
            .then(response => {
                logger.info("Successfully updated Fleet Detail");
                res.status(200).json(response);
            })
            .catch(error => {
                logger.error("Error updating Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    deleteFleet: async (req, res) => {
        const VehicleNo = req.params.VehicleNo;
        Fleet.deleteOne({ VehicleNo: VehicleNo })
            .then(response => {
                logger.info("Successfully deleted Fleet Detail with VehicleNo " + VehicleNo);
                res.status(200).json(response);
            })
            .catch(error => {
                logger.error("Error deleting Fleet Detail");
                res.status(400).json({ message: error.message });
            });

    },

    searchFleetByDriverId: async (req, res) => {
        try {
            const { driverId } = req.params;
            const fleetDetails = await Fleet.findOne({ DriverId: driverId });
            logger.info("Successfully got Fleet Detail by driver ID " + driverId);
            res.status(200).json(fleetDetails);
        } catch (error) {
            logger.error('Error searching fleet by driver ID: ' + driverId);
            res.status(400).json({ message: error.message });
        }
    },

}

export default Fleetcontroller;

