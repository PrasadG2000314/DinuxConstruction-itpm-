import mongoose from "mongoose";
const { Schema } = mongoose;

const authSchema = new Schema({
    id:{
     type: Number,
     required: true
    },
    localauthorityname:{
     type: String,
     required: true
    },
    type:{
     type: String,
     required: true
    },
    city:{
     type: String,
     required: true
    },
    place:{
     type: String,
     required: true
    },
    nooffloors:{
     type: Number,
     required: true
    },
    distancecity:{
        type: Number,
        
    },

});

const Auth = mongoose.model('Auth' , authSchema);

export default Auth;