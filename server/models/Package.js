import mongoose from 'mongoose';
const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    homeImage: { type: String, required: true },
    modelLink: { type: String, required: true },
    cost: { type: Number, required: true },
    // planImage : {type : String , required : true},

    // isApproved : {type : Boolean , required : true , default : false}
})

const packageModel = mongoose.model("packages", packageSchema);

export default packageModel
