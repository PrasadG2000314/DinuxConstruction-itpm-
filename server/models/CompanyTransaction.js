import mongoose from 'mongoose';
const { Schema } = mongoose;

const companyTransactionSchema = new mongoose.Schema({

    paymentType: {
        type: String,
        required: true
    },
    
    payFrom: {
        type: Schema.Types.ObjectId,
        ref: 'Bank'
    },

    payTo: {
        type: String,
        required: true
    },

    regarding: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    },

    bank: {
        type: String,
        required: false
    },

    branch: {
        type: String,
        required: false
    },

    accountNo: {
        type: Number,
        required: false
    },

});

const CompanyTransaction = mongoose.model('CompanyTransaction', companyTransactionSchema);

export default CompanyTransaction;
