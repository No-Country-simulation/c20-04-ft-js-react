import mongoose from "mongoose";

const donaShema = new mongoose.Schema({
    id_user_in: {
        type: String,
        required :true
    },
    contribution: {
        type: Number,
        required: true
    },
    status: {
        type: String
    },
    id_user_out: {
        type: String,
        default:"anonimo"
    }
},
    { timestamps: true }
)
export default mongoose.model("dona", donaShema)