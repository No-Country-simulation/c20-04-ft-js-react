import Post from "../models/post.models.js"
import User from "../models/user.models.js"
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../config.js';
// cloudinary
import { uploadPostImage } from '../cloudinary.js'

export const createPost = async (req, res) => {
    try {
        const { token } = req.cookies
        const userid = jwt.verify(token, TOKEN_KEY);
        const aut = User.findById( userid.payload.id)
        if(!aut){
            res.status(500).json({ message: 'not authenticated', error });
        }
        const { url_img, ...restOfBody } = req.body;
        const postc = new Post({
            ...restOfBody,
            id_user: userid.payload.id
        })
        if (url_img) {
            const uploadImage = await uploadPostImage(url_img, userid.payload.id)
            postc.url_img = uploadImage
        }
        const awpostS = await postc.save()
        res.status(200).json(awpostS)
    } catch (error) {
        res.status(500).json({ message: 'Error crear post', error });
    }
};
export const upDatePost = async (req, res) => {
    try {
        const { idpost,url_img, ...restOfBody } = req.body;
        const { token } = req.cookies
        const userid = jwt.verify(token, TOKEN_KEY);
        const postfind = Post.findById(idpost)
        if (!postfind.id_user == userid.payload.id) {
            res.status(500).json({ message: 'not authenticated', error });
        }
        const uppost = {
            ...restOfBody
        };
        if(url_img) {
            const uploadImage = await uploadPostImage(url_img, userid.payload.id)
            uppost.url_img = uploadImage
        }
        const postp = await Post.findByIdAndUpdate(idpost, uppost, { new: true })
        res.status(200).json(postp)
    } catch (error) {
        res.status(500).json({ message: 'Error update post', error });
    }
};
