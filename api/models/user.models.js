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
    }

},
    { timestamps: true }
)
export default mongoose.model("User", userSchema)