import mongoose from "mongoose";

const adopSchema = new mongoose.Schema({
    tags: {
        type: Array,
        default: []
    },
    id_user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: ""
    },
    url_img: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    },
    report: {
        type: Number,
        default: 0
    },
    stadePet: {
        type: Boolean,
        required: true
    },

},
    { timestamps: true }
)
export default mongoose.model("Adop", adopSchema)