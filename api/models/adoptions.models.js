import mongoose from "mongoose";

const adopSchema = new mongoose.Schema({
    tags: {
        tag: {
            type: String
        }
    },
    id_user: {
        type: String
    },
    title: {
        type: String
    },
    body: {
        text: {
            type: String
        },
        img: {
            type: String
        },
        vd: {
            type: String
        },
        description: {
            type: String
        }
    },
    status: {
        type: String
    },
    created_at: {
        type: String
    },
    report: {
        type: Boolean
    },
    stadePet: {
        type: String
    },
    follow: {
        text: {
            type: String
        },
        ing: {
            type: String
        }
    }
},
    { timestamps: true }
)
export default mongoose.model("Adop", adopSchema)