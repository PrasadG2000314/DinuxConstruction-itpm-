import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockRequestSchema = new Schema({
    siteId: {
        type: String,
        required: true
    },
    equipments: [{
        equipmentId: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        required: true
    }
});

const StockRequest = mongoose.model('StockRequest', stockRequestSchema);

export default StockRequest;