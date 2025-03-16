import Stock from "../models/Stock.js";
import StockPurchase from "../models/StockPurchase.js";
import logger from '../utils/logger.js'

const StockController = {

    generateStockId: async (req, res) => {
        try {
            const latestDocument = await Stock.findOne().sort({ _id: -1 });
            const lastId = latestDocument ? latestDocument.equipmentId : 1000;
            const stockId = lastId + 1;
            res.status(200).json(stockId);

        } catch (error) {
            logger.error("Error getting StockId");
            res.status(400).json({ message: error.message });
        }
    },

    createStock: async (req, res) => {

        const { equipmentId, equipmentName, price, unit, description, qty, minimumQty } = req.body;
        const stock = new Stock({
            equipmentId: equipmentId,
            name: equipmentName,
            price: price,
            unit: unit,
            description: description,
            qty: qty,
            minimumQty: minimumQty,
        });
        stock
            .save()
            .then((result) => {
                logger.info("Stock create successful");
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Stock create failed");
                res.status(400).json({ message: error.message });
            });
    },

    updateStock: async (req, res) => {

        const { equipmentId, equipmentName, price, unit, description, qty, minimumQty } = req.body;

        Stock
            .updateOne(
                { equipmentId: equipmentId },
                {
                    $set: {
                        name: equipmentName,
                        price: price,
                        unit: unit,
                        description: description,
                        qty: qty,
                        minimumQty: minimumQty,
                    },
                }
            )
            .then((result) => {
                logger.info("Stock update successful");
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Stock update failed");
                res.status(400).json({ message: error.message });
            });
    },

    updateQty: async (equipmentId, qty) => {
        try {
            const result = await Stock.updateOne(
                { equipmentId: equipmentId },
                { $set: { qty: qty } }
            );
            if (result.nModified === 0) {
                logger.info("QTY not updated")
                return false;
            }
            return true;
        } catch (error) {

            return false;
        }
    },


    deleteStock: async (req, res) => {

        Stock
            .findOneAndDelete(
                { equipmentId: req.params.equipmentId }
            )
            .then((result) => {
                logger.info("Stock " + req.params.equipmentId + " deleted successfully");
                res.status(200).json({ message: 'Stock deleted' });
            })
            .catch((error) => {
                logger.error("Stock " + req.params.equipmentId + " delete Failed");
                res.status(400).json({ message: error.message });
            });
    },

    getAllStock: async (req, res) => {

        Stock
            .find()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Error getting Stock");
                res.status(400).json({ message: error.message });
            });
    },

    getStockById: async (req, res) => {

        Stock
            .find({ equipmentId: req.body.equipmentId })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Error getting Stock");
                res.status(400).json({ message: error.message });
            });
    },

    buyStock: async (req, res) => {

        const { equipmentId, price, qty, qtyBought } = req.body;

        const totalPrice = price * qtyBought;
        const newqty = parseInt(qty) + parseInt(qtyBought);

        const stockPurchase = new StockPurchase({
            equipmentId: equipmentId,
            totalPrice: totalPrice,
            qty: qtyBought,
        });
        stockPurchase
            .save()
            .then(async (result) => {
                await StockController.updateQty(equipmentId, newqty);
                logger.info("Stock Buying successful");
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Stock Buying failed");
                res.status(400).json({ message: error.message });
            });
    },


    getBoughtStockDetailsByMonth: async (req, res) => {

        const [year, month] = req.params.month.split('-');

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        StockPurchase
            .find({ date: { $gte: startDate, $lte: endDate } })
            .then((result) => {
                logger.info("Stock Report generating for " + req.params.month);
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Error getting Stock");
                res.status(400).json({ message: error.message });
            });
    },

}

export default StockController;