import cusPackageBuyModel from "../models/CusPackageBuy.js";
import Site from "../models/Site.js";
import StockRequest from "../models/StockRequest.js";
import logger from "../utils/logger.js";
import StockController from "./StockController.js";

const SiteController = {

    createSite: async (req, res) => {
        const { siteId, location, start, end, notes, customerId, lastUpdate, completeStatus, packageId } = req.body;
        const newSite = new Site({
            customerId: customerId,
            siteId: siteId,
            location: location,
            start: start,
            end: end,
            notes: notes,
            lastUpdate: lastUpdate,
            completeStatus: completeStatus,
            packageId: packageId,
        });

        const status = await cusPackageBuyModel.findOneAndUpdate(
            { _id: packageId },
            { $set: { isApproved: true } }
        );

        if (!status) {
            res.status(404).json({ message: "Invalid Site id" });
        }


        newSite
            .save()
            .then((result) => {
                logger.info("Site Created Successfully");
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Error Creating Sites");
                res.status(400).json({ message: error.message });
            });
    },

    updateSite: async (req, res) => {
        const { siteId, location, notes, lastUpdate, completeStatus } = req.body;
        Site
            .updateOne(
                { siteId: siteId },
                {
                    $set: {
                        location: location,
                        notes: notes,
                        lastUpdate: lastUpdate,
                        completeStatus: completeStatus,
                    }
                }
            )
            .then((result) => {
                logger.info("Site " + siteId + " Updated Successfully");
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Error Updating Site " + siteId);
                res.status(400).json({ message: error.message });
            });
    },

    deleteSite: async (req, res) => {
        Site
            .deleteOne({ siteId: req.params.id })
            .then((result) => {
                logger.info("Site " + req.params.id + " Deleted Successfully");
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Site " + req.params.id + " Deleted Failed");
                res.status(400).json({ message: error.message });
            });
    },

    getAllSites: async (req, res) => {
        Site
            .find()
            .then((result) => {
                logger.info("Site Details Fetched Successfully");
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Site Fetching Failed");
                res.status(400).json({ message: error.message });
            });
    },

    getAllSitesByCustId: async (req, res) => {
        Site
            .find({ customerId: req.params.id })
            .then((result) => {
                logger.info("Site Details Fetched Successfully by customer id");
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Site Fetching Failed by id " + req.params.id);
                res.status(400).json({ message: error.message });
            });
    },

    generateSiteId: async (req, res) => {
        try {
            let siteId;
            try {
                const latestDocument = await Site.findOne().sort({ _id: -1 });
                const lastId = latestDocument.siteId;
                const numericPart = parseInt(lastId.substring(1));
                const nextNumericPart = numericPart + 1;
                siteId = "S" + nextNumericPart;
            } catch (error) {
                const lastId = 1000;
                siteId = "S" + lastId;
            }

            res.status(200).json(siteId);

        } catch (error) {
            logger.error("Error getting SiteId");
            res.status(400).json({ message: error.message });
        }
    },

    calculateCompleteStatus: async (req, res) => {
        Site
            .findOne({ siteId: req.params.id })
            .then((result) => {
                const completedDays = Math.round(
                    ((new Date() - result.start) / (result.end - result.start)) * 100
                );
                logger.info("Site Details fetched Succesfullt");
                res.status(200).json(completedDays);
            })
            .catch((error) => {
                logger.error("Error Calculating Complete Status");
                res.status(400).json({ message: error.message });
            });
    },

    stockRequest: async (req, res) => {
        try {
            const { siteId, equipments } = req.body;

            equipments.forEach(equipment => {
                StockController.updateQty(equipment.equipmentId, (equipment.existingQty - equipment.qty));
            });

            const stockRequest = new StockRequest({
                siteId: siteId,
                equipments: equipments,
                status: false
            });

            const result = await stockRequest.save();
            logger.info("Stock Requested Successfully");
            res.status(200).json(result);
        } catch (error) {
            logger.error("Error Requesting Stock");
            res.status(400).json({ message: error.message });
        }
    },

    updateStockRequestStatus: async (req, res) => {
        const { id, status } = req.body;
        logger.info(req.body);

        StockRequest
            .updateOne(
                { _id: id },
                {
                    $set: {
                        status: status,
                    }
                }
            )
            .then((result) => {
                logger.info("Stock Request Status Updated Successfully");
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Error Updating Stock Request Status");
                res.status(400).json({ message: error.message });
            });
    },

    getStockRequests: async (req, res) => {
        StockRequest
            .find({ siteId: req.params.id })
            .then((result) => {
                logger.info("Got Stock Requests Successfully");
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Stock Requests Fetching Failed");
                res.status(400).json({ message: error.message });
            });
    },

    getStockRequestsByStatus: async (req, res) => {
        StockRequest
            .find({ status: req.params.status })
            .then((result) => {
                logger.info("Got Stock Requests Successfully");
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Stock Requests Fetching Failed");
                res.status(400).json({ message: error.message });
            });
    },

}

export default SiteController;