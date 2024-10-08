import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    category: {
        type: String,
        required:true,
        default:"genral"
    },
    tags: {
        type : Array,
        default:[]
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
        default:true
    },
    likereport: {
        type: Array,
        default: []
    },
    report: {
        type: Number,
        default: 0
    },
},
    { timestamps: true }
)
export default mongoose.model("Post", postSchema)