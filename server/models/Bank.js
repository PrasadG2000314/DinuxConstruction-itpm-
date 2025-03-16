import mongoose from 'mongoose';

const bankSchema = new mongoose.Schema({

    bankName: {
        type: String,
        required: true,
    },

    branch: {
        type: String,
        required: true
    },

    accountNo: {
        type: Number,
        required: true
    },

});

const Bank = mongoose.model('Bank', bankSchema);

export default Bank;
