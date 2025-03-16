import mongoose from 'mongoose';
const buyPackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    cost: { type: Number, required: true },
    cusId: { type: String, required: true },
    isApproved : {type : Boolean , required : true , default : false}
})

const cusPackageBuyModel = mongoose.model("cuspackages", buyPackageSchema);

export default cusPackageBuyModel