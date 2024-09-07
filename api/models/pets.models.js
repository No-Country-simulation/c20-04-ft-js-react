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
    id_user: {
        type : String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
},
    { timestamps: true }
)
export default mongoose.model("pets", petsShema)