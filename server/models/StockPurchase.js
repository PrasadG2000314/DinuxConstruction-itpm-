import mongoose from "mongoose";

const stockPurchaseSchema = new mongoose.Schema({
    equipmentId: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
    
});

const StockPurchase = mongoose.model('StockPurchase', stockPurchaseSchema);

export default StockPurchase;