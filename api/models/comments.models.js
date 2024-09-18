import mongoose from "mongoose";

const commentShema = new mongoose.Schema({
    id_user: {
        type: String,
        required:true
    },
    id_post: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    report: {
        type: Number,
        default:0
    },
    status: {
        type: Boolean,
        default:true
    }
},
    { timestamps: true }
)
export default mongoose.model("Comment", commentShema)