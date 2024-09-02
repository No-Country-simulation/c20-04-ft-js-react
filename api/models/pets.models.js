import mongoose from "mongoose";

const petsShema = new mongoose.Schema({
    name: {
        type: String
    },
    species: {
        type: String
    },
    prefil_photo: {
        type: String
    },
    race: {
        type: String
    },
    tag: {
        type: Array
    },
    _id_user: {
        required: true
    }
},
    { timestamps: true }
)
export default mongoose.model("pets", petsShema)