import mongoose from "mongoose";

const donaShema = new mongoose.Schema({
    id_user_in: {
        type: String
    },
    contribution: {
        type: Number
    },
    status: {
        type: String
    },
    id_user_out: {
        type: String
    }
},
    { timestamps: true }
)
export default mongoose.model("dona", donaShema)