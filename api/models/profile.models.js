import mongoose from "mongoose";

const profileShema = new mongoose.Schema({

    id_user: {
        type: String,
        required:true
    }

},
    { timestamps: true }
)
export default mongoose.model("Profile", profileShema)