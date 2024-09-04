import mongoose from "mongoose";

const profileShema = new mongoose.Schema({
    tags: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default:""
    },
    address: {
        type: String,
        default:""
    },
    contact: {
        type: String,
        default:""
    },
    id_user: {
        type: String,
        required:true
    }

},
    { timestamps: true }
)
export default mongoose.model("Profile", profileShema)