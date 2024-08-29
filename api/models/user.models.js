import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username :{
        type :String,
        required:true,
        trim: true,
        /*unique: true*/
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        trim: true, 
    },
    password: {
        type: String,
        required: true
    },
    biografy: {
        type: Object,
        default : {}
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    collec_amount: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        default: true
    },

},
    { timestamps: true }
)
export default mongoose.model("User", userSchema)