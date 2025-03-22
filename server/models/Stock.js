import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    equipmentId: {
        type: Number,
        required: true,
    },
    
    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    qty: {
        type: Number,
        required: true,
    },
    minimumQty: {
        type: Number,
        required: true,
    },
    
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;