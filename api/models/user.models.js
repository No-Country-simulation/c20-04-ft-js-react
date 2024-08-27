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
    passware: {
        type: String,
        require: true
    },
    biografy: {
        type: Object
    }

},
    { timestamps: true }
)
export default mongoose.model("User", userSchema)