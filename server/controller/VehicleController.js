import Vehicle from '../models/Vehicle.js';
import logger from '../utils/logger.js';

const VehicleController = {

    getVehicles: async (req, res) => {
        Vehicle.find()
            .then(response => {
                logger.info("Successfully fetched all Vehicle Details");
                res.status(200).json(response);
            })
            .catch(error => {
                logger.error("Error getting Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    getVehiclesByType: async (req, res) => {
        Vehicle.find({ VehicleType:req.params.type })
            .then(response => {
                logger.info("Successfully fetched Vehicle Details by type");
                res.status(200).json(response);
            })
            .catch(error => {
                logger.error("Error getting Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    addVehicle: async (req, res) => {
        const addVehicle = new Vehicle({
            ChassisNo: req.body.ChassisNo,
            VehicleType: req.body.VehicleType,
            VehicleManufachuredYear: req.body.VehicleManufachuredYear,
            VehicleBrand: req.body.VehicleBrand,
            VehicleNo: req.body.VehicleNo,

        });
        addVehicle.save()
            .then(response => {
                logger.info("Successfully Added Vehicle Detail");
                res.status(200).json(response);
            })
            .catch(error => {
                logger.error("Error Creating Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    updateAddVehicle: async (req, res) => {
        const { ChassisNo, VehicleType, VehicleManufachuredYear, VehicleBrand, VehicleNo } = req.body;
        Vehicle.updateOne(
            { ChassisNo: ChassisNo },
            {
                $set: {
                    VehicleType: VehicleType,
                    VehicleManufachuredYear: VehicleManufachuredYear,
                    VehicleBrand: VehicleBrand,
                    VehicleNo: VehicleNo
                }
            })
            .then(response => {
                logger.info("Successfully Updated Vehicle Detail of Chassis " + req.params.ChassisNo);
                res.status(200).json(response);
            })
            .catch(error => {
                logger.error("Error updating Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    deleteVehicle: async (req, res) => {
        const ChassisNo = req.params.ChassisNo;
        Vehicle.deleteOne({ ChassisNo: ChassisNo })
            .then(response => {
                logger.info("Successfully deleted Vehicle Detail of Chassis " + req.params.ChassisNo);
                res.status(200).json(response);
            })
            .catch(error => {
                logger.error("Error deleting Vehicle Detail");
                res.status(400).json({ message: error.message });
            });

    },
}

export default VehicleController;

