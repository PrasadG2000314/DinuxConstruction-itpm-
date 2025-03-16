import mongoose from 'mongoose';

const customerPaymentSchema = new mongoose.Schema({

    customerId: {
        type: String,
        required: true
    },

    siteId: {
        type: String,
        required: true
    },

    month: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },

    description: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now
    },
});

const CustomerPayment = mongoose.model('CustomerPayment', customerPaymentSchema);

export default CustomerPayment;
