import logger from '../utils/logger.js'
import Customer from '../models/Customer.js';
import UserController from './UserController.js';
import { UserType } from '../utils/enums/UserEnums.js';

const CustomerController = {

    createCustomer: async (req, res) => {
        try {
            const {
                firstName,
                lastName,
                dateOfBirth,
                nic,
                no,
                street,
                city,
                companyName,
                businessType,
                email,
                mobileNo,
                password } = req.body;

            const newUser = await UserController.createUser(email, password, UserType.CUSTOMER);


            let cusId;
            try {
                const latestDocument = await Customer.findOne().sort({ _id: -1 });
                const lastId = latestDocument.customerId;
                const numericPart = parseInt(lastId.substring(1));
                const nextNumericPart = numericPart + 1;
                cusId = "C" + nextNumericPart;
            } catch (error) {
                const lastId = 1000;
                cusId = "C" + lastId;
            }

            const customer = new Customer({
                customerId: cusId,
                firstName,
                lastName,
                dateOfBirth,
                nic,
                no,
                street,
                city,
                companyName,
                businessType,
                email,
                mobileNo,
                user: newUser._id
            });

            await customer.save();
            logger.info("Customer create successful");
            res.status(200).json(customer);

        } catch (error) {
            logger.error("Customer create failed");
            res.status(400).json({ message: error.message });
        }
    },

    updateCustomer: async (req, res) => {
        try {

            const updatedCustomer = await Customer.findOneAndUpdate(
                { email: req.body.email },
                req.body,
                { new: true }
            );

            if (!updatedCustomer) {
                return res.status(404).json({ message: "Customer not found" });
            }

            logger.info("Customer update successful");
            res.status(200).json(updatedCustomer);
        } catch (error) {
            logger.error("Customer update failed");
            res.status(400).json({ message: error.message });
        }
    },

    getCustomerByUser: async (req, res) => {
        try {
            const customer = await Customer.findOne({ user: req.params.user });
            if (!customer) {
                logger.error("Customer not found");
                return res.status(404).json({ message: 'Customer not found' });
            }
            res.status(200).json(customer);
        } catch (error) {
            logger.error("Error getting Customer");
            res.status(400).json({ message: error.message });
        }
    },

    deleteCustomerByEmail: async (req, res) => {
        try {

            var userDeleteStatus = UserController.deleteUser(req.params.email);

            if (userDeleteStatus) {
                const customer = await Customer.findOneAndDelete({ email: req.params.email });
                if (!customer) {
                    logger.error("Customer " + req.params.email + " not found");
                    return res.status(404).json({ message: 'Customer not found' });
                }
                logger.info("Customer " + req.params.email + " deleted successfully");
                res.status(200).json({ message: 'Customer deleted' });
            }

        } catch (error) {
            logger.error("Customer " + req.params.email + " delete Failed");
            res.status(400).json({ message: error.message });
        }
    },

}

export default CustomerController;