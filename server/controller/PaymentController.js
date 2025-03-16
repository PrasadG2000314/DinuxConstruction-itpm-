import logger from '../utils/logger.js'
import Bank from '../models/Bank.js';
import CompanyTransaction from '../models/CompanyTransaction.js';
import CustomerPayment from '../models/CustomerPayment.js';

const PaymentController = {

    getAllBanks: async (req, res) => {
        try {
            const banks = await Bank.find();
            logger.info("Succesfully got all Bank Details");
            res.status(200).json(banks);
        } catch (error) {
            logger.error("Error getting Bank Details");
            res.status(400).json({ message: error.message });
        }
    },

    getBank: async (req, res) => {
        try {
            const bank = await Bank.findOne({ _id: req.params.id });
            if (!bank) {
                logger.error("Bank not found");
                return res.status(404).json({ message: 'Bank not found' });
            }
            res.status(200).json(bank);
        } catch (error) {
            logger.error("Error getting Bank");
            res.status(400).json({ message: error.message });
        }
    },

    makeCompanyPayment: async (req, res) => {
        try {

            const {
                paymentType,
                payTo,
                payFrom,
                regarding,
                amount,
                description,
                bank,
                branch,
                accountNo
            } = req.body;

            const compbank = await Bank.findOne({ bankName: payFrom });
            if (!compbank) {
                logger.error("Bank not found");
                return res.status(404).json({ message: 'Bank not found' });
            }

            let compTransaction;
            if (paymentType == "Utility") {
                compTransaction = new CompanyTransaction({
                    paymentType,
                    payTo,
                    payFrom: compbank._id,
                    regarding,
                    amount,
                    description,
                });
            } else if (paymentType == "Biller") {
                compTransaction = new CompanyTransaction({
                    paymentType,
                    payTo,
                    payFrom: compbank._id,
                    regarding,
                    amount,
                    description,
                });
            } else if (paymentType == "Other") {
                compTransaction = new CompanyTransaction({
                    paymentType,
                    payTo,
                    payFrom: compbank._id,
                    regarding,
                    amount,
                    description,
                    bank,
                    branch,
                    accountNo,
                });
            } else {
                logger.error("Company Payment failed");
                res.status(400).json({ message: "Invalid Payment Type" });
            }

            await compTransaction.save();
            logger.info("Company Payment successful");
            res.status(200).json(compTransaction);

        } catch (error) {
            logger.error("Company Payment failed");
            res.status(400).json({ message: error.message });
        }
    },

    getCompanyPayments: async (req, res) => {
        try {
            let compTransaction;
            if (!req.params.type || req.params.type == "all") {
                compTransaction = await CompanyTransaction.find();
            } else {
                compTransaction = await CompanyTransaction.find({ paymentType: req.params.type });
            }
            logger.info("Succesfullt Got all company Payments");
            res.status(200).json(compTransaction);
        } catch (error) {
            logger.error("Error getting Payments by Type");
            res.status(400).json({ message: error.message });
        }
    },

    makeCustomerInstallment: async (req, res) => {
        try {

            const {
                customerId,
                siteId,
                month,
                amount,
                description,
            } = req.body;

            const customerPayment = new CustomerPayment({
                customerId,
                siteId,
                month,
                amount,
                description,
            });

            await customerPayment.save();
            logger.info("Customer Payment successful");
            res.status(200).json(customerPayment);

        } catch (error) {
            logger.error("Customer Payment failed");
            res.status(400).json({ message: error.message });
        }
    },

    getAllPaymentsByMonth: async (req, res) => {
        try {

            const [year, month] = req.params.month.split('-');
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);

            const compTransaction = await CompanyTransaction.find({ date: { $gte: startDate, $lte: endDate } });
            const custTransaction = await CustomerPayment.find({ date: { $gte: startDate, $lte: endDate } });

            const transactions = {
                compTransaction: compTransaction,
                custTransaction: custTransaction
            };

            logger.info("Succesfully Got all transactions By Month");
            res.status(200).json(transactions);
        } catch (error) {
            logger.error("Error getting Payments by Month");
            res.status(400).json({ message: error.message });
        }
    },

}

export default PaymentController;