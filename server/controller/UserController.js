import User from '../models/User.js'
import logger from '../utils/logger.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongooseError } from 'mongoose';

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )
}

const UserController = {

    createUser: async (email, password, userType) => {
        try {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                email,
                password: hashedPassword,
                userType
            });

            return user.save();
        } catch (error) {
            if (error instanceof MongooseError && error.code === 11000) {
                logger.error(`Error creating user: Email '${email}' already exists`);
                throw new Error('Email already exists');
            } else {
                logger.error({ message: error.message });
                throw error;
            }
        }
    },

    loginUser: async (req, res) => {

        const { email, password } = req.body

        const user = await User.findOne({ email: email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const userLogin = {
                user,
                token: generateToken(user._id)
            }
            logger.info("User Login Succcess")
            res.status(200).json(userLogin)
        } else {
            logger.error("User Login Failed")
            res.status(400).json("Invalid Credentials");
        }
    },

    changePassword: async (req, res) => {

        const { email, currentPassword, newPassword } = req.body;

        const user = await User.findOne({ email: email });
        if (user) {
            if (await bcrypt.compare(currentPassword, user.password)) {

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                const updatedUser = await User.findOneAndUpdate(
                    { email: email },
                    { $set: { password: hashedPassword } },
                    { new: true }
                );

                logger.info("Changed password succesfully")
                res.status(200).json('Changed password succesfully');

            } else {
                logger.error("Incorrect Password")
                res.status(400).json({ message: "Incorrect Password" });
            }
        } else {
            logger.error("User not Found")
            res.status(400).json({ message: "Incorrect Password" });
        }
    },

    deleteUser: async (email) => {
        try {

            const user = await User.findOneAndDelete({ email: email });
            if (!user) {
                logger.error("User " + email + " not found");
                return res.status(404).json({ message: 'User not found' });
            }
            logger.info("User " + email + " deleted successfully");
            return true;
        } catch (error) {
            logger.error('Error Deleting user:');
            return false;
        }
    }
}

export default UserController;