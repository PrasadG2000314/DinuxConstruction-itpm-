import mongoose from "mongoose";
const { Schema } = mongoose;

const packageAddonSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    duration : {
        type : String,
        required : true
    }

});

export const PackageAddon = mongoose.model("PackageAddon", packageAddonSchema);

export default PackageAddon;