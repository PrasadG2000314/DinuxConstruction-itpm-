import logger from '../utils/logger.js';
import Biller from "../models/Biller.js";

const BillerController = {

    createBiller: async (req, res) => {
        try {

            const {
                billerId,
                type,
                name,
                bank,
                branch,
                accountNo,
            } = req.body;

            const biller = new Biller({
                billerId,
                type,
                name,
                bank,
                branch,
                accountNo,
            });

            await biller.save();
            logger.info("Biller create successful");
            res.status(200).json(biller);
        } catch (error) {
            logger.error("Biller create failed");
            logger.error(error);
            res.status(400).json({ message: error.message });
        }
    },

    updateBiller: async (req, res) => {
        try {

            const updatedBiller = await Biller.findOneAndUpdate(
                { billerId: req.body.billerId },
                req.body,
                { new: true }
            );

            if (!updatedBiller) {
                return res.status(404).json({ message: "Biller not found" });
            }

            logger.info("Biller update successful");
            res.status(200).json(updatedBiller);
        } catch (error) {
            logger.error("Biller update failed");
            res.status(400).json({ message: error.message });
        }
    },

    generateBillerId: async (req, res) => {
        try {

            let billerId;
            try {
                const latestDocument = await Biller.findOne().sort({ _id: -1 });
                const lastId = latestDocument.billerId;
                billerId = lastId + 1;
            } catch (error) {
                billerId = 1000;
            }
            res.status(200).json(billerId);

        } catch (error) {
            logger.error("Error Generating Biller Id");
            res.status(400).json({ message: error.message });
        }
    },

    deleteBillerById: async (req, res) => {
        try {
            const biller = await Biller.findOneAndDelete({ billerId: req.params.id });

            if (!biller) {
                logger.error("Biller " + req.params.email + " not found");
                return res.status(404).json({ message: 'Biller not found' });
            }

            logger.info("Biller " + req.params.email + " deleted successfully");
            res.status(200).json({ message: 'Biller deleted' });

        } catch (error) {
            logger.error("Biller " + req.params.email + " delete Failed");
            res.status(400).json({ message: error.message });
        }
    },

    getAllBillers: async (req, res) => {
        try {
            const biller = await Biller.find();
            logger.info("All Biller Fetched");
            res.status(200).json(biller);
        } catch (error) {
            logger.error("Error getting Biller Details");
            res.status(400).json({ message: error.message });
        }
    },

    getBillerByType: async (req, res) => {
        try {
            const biller = await Biller.find({ type: req.params.type });
            logger.info("Billers Fetched by Type");
            res.status(200).json(biller);
        } catch (error) {
            logger.error("Error getting Biller by Type");
            res.status(400).json({ message: error.message });
        }
    },

};

export default BillerController;