import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    category: {
        type: String,
        required:true
    },
    tags: {
        tag: {
            type: String,
            default: ""
        }
    },
    id_user: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    body: {
        text: {
            type: String,
            default: ""
        },
        img: {
            type: String,
            default: ""
        },
        vd: {
            type: String,
            default: ""
        }
    },
    status: {
        type: Boolean,
        default:true
    },
    report: {
        type: Number,
        default: 0
    },
},
    { timestamps: true }
)
export default mongoose.model("Post", postSchema)