import mongoose from 'mongoose';

const billerSchema = new mongoose.Schema({

    billerId: {
        type: Number,
        required: true,
    },

    type: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    bank: {
        type: String,
        required: true
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

const Biller = mongoose.model('Biller', billerSchema);

export default Biller;
