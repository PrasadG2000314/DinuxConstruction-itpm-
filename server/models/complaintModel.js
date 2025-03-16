import mongoose from "mongoose";
const { Schema } = mongoose;

const complaintSchema = new Schema({
    name:{
     type: String,
     required: true
    },
    email:{
     type: String,
     required: true
    },
    phone:{
     type: Number,
     required: true
    },
    type:{
     type: String,
     required: true 
    },
    subject:{
     type: String,
     required: true
    },
    complaint:{
     type: String,
     required: true
    },
});

const Complaint = mongoose.model('Complaint' , complaintSchema);

export default Complaint;