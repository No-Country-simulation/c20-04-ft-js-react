import mongoose from "mongoose";

const profileShema = new mongoose.Schema({
    tags: {
        type: String
    },
    description: {
        type: String
    },
    conttext: {},
    address: {
        type: String
    },
    contact: {
        type: String
    }
},
    { timestamps: true }
)
export default mongoose.model("Profile", profileShema)