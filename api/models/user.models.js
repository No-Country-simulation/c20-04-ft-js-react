import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username :{
        type :String,
        require:true,
        trim: true,
        /*unique: true*/
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        require: true,
        trim: true, 
    },
    password: {
        type: String,
        require: true
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