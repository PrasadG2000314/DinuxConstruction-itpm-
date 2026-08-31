import User from '../models/User.js';
import Employee from '../models/Employee.js';
import Customer from '../models/Customer.js';
import bcrypt from 'bcryptjs';
import logger from './logger.js';

const seedUsers = async () => {
    try {
        const count = await User.countDocuments();
        if (count === 0) {
            logger.info("No users found in database. Seeding default users and profiles...");
            
            // Clean up Employee and Customer collections to ensure clean data
            await Employee.deleteMany({});
            await Customer.deleteMany({});

            const defaultUsers = [
                { email: "smithgregor13@gmail.com", password: "1235678", userType: "admin", firstName: "Smith", lastName: "Gregor", gender: "Male" },
                { email: "hiran@gmail.com", password: "1235678", userType: "site manager", firstName: "Hiran", lastName: "Manager", gender: "Male" },
                { email: "janith@gmail.com", password: "1235678", userType: "fleet manager", firstName: "Janith", lastName: "Manager", gender: "Male" },
                { email: "tharindu@gmail.com", password: "1235678", userType: "stock manager", firstName: "Tharindu", lastName: "Manager", gender: "Male" },
                { email: "nirmani@gmail.com", password: "1235678", userType: "finance manager", firstName: "Nirmani", lastName: "Manager", gender: "Female" },
                { email: "anjana@gmail.com", password: "1235678", userType: "customer relationship manager", firstName: "Anjana", lastName: "Manager", gender: "Male" },
                { email: "ishan@gmail.com", password: "1235678", userType: "hr manager", firstName: "Ishan", lastName: "Manager", gender: "Male" },
                { email: "ishan2@gmail.com", password: "1235678", userType: "customer", firstName: "Ishan2", lastName: "Customer" }
            ];

            let empCounter = 1000;
            let cusCounter = 1000;

            for (const u of defaultUsers) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(u.password, salt);
                
                // 1. Create User
                const user = new User({
                    email: u.email,
                    password: hashedPassword,
                    userType: u.userType
                });
                const savedUser = await user.save();
                logger.info(`Seeded User: ${u.email} (${u.userType})`);

                // 2. Create Profile
                if (u.userType === "customer") {
                    cusCounter++;
                    const customer = new Customer({
                        customerId: "C" + cusCounter,
                        firstName: u.firstName,
                        lastName: u.lastName,
                        dateOfBirth: new Date("1990-01-01"),
                        nic: "199012345678",
                        no: "123",
                        street: "Main Street",
                        city: "Colombo",
                        companyName: "Apex Construction",
                        businessType: "Construction",
                        email: u.email,
                        mobileNo: "0771234567",
                        user: savedUser._id
                    });
                    await customer.save();
                    logger.info(`Seeded Customer Profile for ${u.email}`);
                } else {
                    empCounter++;
                    const employee = new Employee({
                        employeeId: "E" + empCounter,
                        firstName: u.firstName,
                        lastName: u.lastName,
                        dateOfBirth: new Date("1990-01-01"),
                        gender: u.gender,
                        nic: "199012345678",
                        no: "123",
                        street: "Main Street",
                        city: "Colombo",
                        email: u.email,
                        mobileNo: "0771234567",
                        role: u.userType,
                        user: savedUser._id
                    });
                    await employee.save();
                    logger.info(`Seeded Employee Profile for ${u.email}`);
                }
            }
            logger.info("Default users and profiles seeded successfully!");
        } else {
            logger.info("Database already contains users. Skipping seeding.");
        }
    } catch (err) {
        logger.error("Error seeding database: " + err.message);
    }
};

export default seedUsers;
