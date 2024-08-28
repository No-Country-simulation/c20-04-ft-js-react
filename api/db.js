import mongoose from "mongoose";
export const conecDB = async() => {
    try {
        console.log("as")
        await mongoose.connect("mongodb+srv://sebas950825:iPtfxuuph3pEhP8j@cluster0.agqik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("conect dbs")
    } catch (error) {
        console.log(error)
    }
}