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
    title: {
        type: String
    },
    body: {
        text: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        vd: {
            type: String
        },
        description: {
            type: String
        }
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