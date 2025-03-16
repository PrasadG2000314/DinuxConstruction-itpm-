import Employee from '../models/Employee.js';
import readLogFile from '../utils/logFileRead.js';
import logger from '../utils/logger.js';
import { sendEmployeeInitialPassword } from '../utils/sendMail.js';
import UserController from './UserController.js';

const EmployeeController = {

    createEmployee: async (req, res) => {
        try {

            const {
                employeeId,
                firstName,
                lastName,
                dateOfBirth,
                gender,
                nic,
                no,
                street,
                city,
                email,
                mobileNo,
                role } = req.body;

            let password = '';
            for (let i = 0; i < 8; i++) {
                password += Math.floor(Math.random() * 10);
            }

            sendEmployeeInitialPassword(firstName, email, password);

            const newUser = await UserController.createUser(email, password, role);

            const employee = new Employee({
                employeeId,
                firstName,
                lastName,
                dateOfBirth,
                gender,
                nic,
                no,
                street,
                city,
                email,
                mobileNo,
                role,
                user: newUser._id
            });

            await employee.save();
            logger.info("Employee create successful");
            res.status(200).json(employee);

        } catch (error) {
            logger.error("Employee create failed");
            res.status(400).json({ message: error.message });
        }
    },

    updateEmployee: async (req, res) => {
        try {

            const updatedEmployee = await Employee.findOneAndUpdate(
                { email: req.body.email },
                req.body,
                { new: true }
            );

            if (!updatedEmployee) {
                return res.status(404).json({ message: "Employee not found" });
            }

            logger.info("Emoployee update successful");
            res.status(200).json(updatedEmployee);
        } catch (error) {
            logger.error("Employee update failed");
            res.status(400).json({ message: error.message });
        }
    },

    getEmployeeByCriteria: async (req, res) => {
        try {

            var employee;
            switch (req.params.searchBy) {
                case "userId":
                    employee = await Employee.findOne({ user: req.params.value });
                    break;
                case "employeeId":
                    employee = await Employee.findOne({ employeeId: req.params.value });
                    break;
                case "email":
                    employee = await Employee.findOne({ email: req.params.value });
                    break;
                default:
                    return res.status(400).json({ message: "Invalid Criteria" });
            }

            if (!employee) {
                logger.error("Employee not found");
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json(employee);
        } catch (error) {
            logger.error("Error getting Employee");
            res.status(400).json({ message: error.message });
        }
    },

    generateEmployeeId: async (req, res) => {
        try {

            let employeeId;
            try {
                const latestDocument = await Employee.findOne().sort({ _id: -1 });
                const lastId = latestDocument.employeeId;
                const numericPart = parseInt(lastId.substring(1));
                const nextNumericPart = numericPart + 1;
                employeeId = "E" + nextNumericPart;
            } catch (error) {
                const lastId = 1000;
                employeeId = "E" + lastId;
            }
            
            res.status(200).json(employeeId);

        } catch (error) {
            logger.error("Error getting EmployeeId");
            res.status(400).json({ message: error.message });
        }
    },

    deleteEmployeeByEmail: async (req, res) => {
        try {

            var userDeleteStatus = UserController.deleteUser(req.params.email);

            if (userDeleteStatus) {
                const employee = await Employee.findOneAndDelete({ email: req.params.email });
                if (!employee) {
                    logger.error("Employee " + req.params.email + " not found");
                    return res.status(404).json({ message: 'Employee not found' });
                }
                logger.info("Employee " + req.params.email + " deleted successfully");
                res.status(200).json({ message: 'Employee deleted' });
            }

        } catch (error) {
            logger.error("Employee " + req.params.email + " delete Failed");
            res.status(400).json({ message: error.message });
        }
    },

    getEmployeeCount: async (req, res) => {
        try {

            const count = await Employee.countDocuments();
            res.status(200).json(count);

        } catch (error) {
            logger.error("Error getting Employee Count");
            res.status(400).json({ message: error.message });
        }
    },

    getLogData: async (req, res) => {
        try {
            res.json(readLogFile(req.params.month, req.params.userId));
        } catch (error) {
            console.error('Error fetching logs:', error);
            res.status(400).json({ message: 'Error fetching logs' });
        }
    }
};

export default EmployeeController;