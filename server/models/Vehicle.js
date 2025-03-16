import mongoose from 'mongoose';

const vehicleSchema =  new mongoose.Schema({

    VehicleType: {
        type: String,
        required: true,
    },

    VehicleManufachuredYear: {
        type: String,
        required: true,
    },

    VehicleBrand: {
        type: String,
        required: true,
    },

    VehicleNo: {
        type: String,
        required: true,
    },

    ChassisNo: {
        type: Number,
        required: true,
        unique: true
    },

});

const Vehicle = mongoose.model('Vehicle' , vehicleSchema);

export default Vehicle;