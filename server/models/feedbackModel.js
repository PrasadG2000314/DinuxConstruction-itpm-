import mongoose from "mongoose";
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    feedback:{
        type: String,
        required: true
    },
    
});

const Feedback = mongoose.model('Feedback' , feedbackSchema);

export default Feedback;