import Post from "../models/post.models.js"
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../config.js';
export const createPost = async (req, res) => {
    try {
        const { token } = req.cookies
        const userid = jwt.verify(token, TOKEN_KEY);
        const postc = new Post({
            ...req.body,
            id_user: userid.payload.id
        })
        const awpostS = await postc.save()
        res.status(200).json(awpostS)
    } catch (error) {
        res.status(500).json({ message: 'Error crear post', error });
    }
};
export const upDatePost = async (req, res) => {
    try {
        const { idpost, ...restOfBody } = req.body;
        const { token } = req.cookies
        
        
        const userid = jwt.verify(token, TOKEN_KEY);
        const postfind = Post.findById(idpost)
        if (!postfind.id_user == userid.payload.id) {
            res.status(500).json({ message: 'not authenticated', error });
        }
        const uppost = {
            ...restOfBody
        };
        const postp = await Post.findByIdAndUpdate(idpost, uppost, { new: true })
        res.status(200).json(postp)
    } catch (error) {
        res.status(500).json({ message: 'Error update post', error });
    }
};
