import mongoose from "mongoose";

const petsShema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    species: {
        type: String,
        required: true
    },
    profile_photo: {
        type: String
    },
    tag: {
        type: Array,
        default :[]
    },
    _id_user: {
        required: true
    }
},
    { timestamps: true }
)
export default mongoose.model("pets", petsShema)