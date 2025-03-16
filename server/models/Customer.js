import mongoose from 'mongoose';
const { Schema } = mongoose;

const customerSchema = new mongoose.Schema({

    customerId: {
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

    companyName: {
        type: String,
        required: true
    },

    businessType: {
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

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
