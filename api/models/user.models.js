import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username :{
        type :String,
        required:true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        default: ""
    },
    birthdate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "shelter", "sponsor"],
        required: true,
        trim: true, 
    },
    password: {
        type: String,
        required: true
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
    profile_photo: {
        type: String,
        default: ""
    },
    tags: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ""
    },
    urls_img: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    contact: {
        type: String,
        default: ""
    },

},
    { timestamps: true }
)
export default mongoose.model("User", userSchema)