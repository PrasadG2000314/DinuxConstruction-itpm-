import mongoose from 'mongoose';
const { Schema } = mongoose;

const employeeSchema = new mongoose.Schema({

    employeeId: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    nic: {
        type: String,
        required: true
    },

    no: {
        type: String,
        required: true
    },

    street: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    mobileNo: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
