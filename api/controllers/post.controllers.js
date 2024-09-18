import fs from 'fs-extra';
import { uploadPostImage } from '../cloudinary.js';
import Post from '../models/post.models.js';
import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../config.js';
// cloudinary


export const createPost = async (req, res) => {
    try {
        const { token } = req.cookies;
        const userid = jwt.verify(token, TOKEN_KEY);
        const aut = await User.findById(userid.payload.id);
        if (!aut) {
            return res.status(500).json({ message: 'not authenticated' });
        }

        const { text, category } = req.body;
        const postc = new Post({
            text,
            category,
            id_user: userid.payload.id
        });

        if (req.tempFilePath) {
            const uploadImage = await uploadPostImage(req.tempFilePath, req.user._id);
            postc.url_img = uploadImage;
            await fs.remove(req.tempFilePath);
        }

        const awpostS = await postc.save();
        res.status(200).json(awpostS);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
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
        if (req.tempFilePath) {
            const uploadImage = await uploadPostImage(req.tempFilePath, req.user._id);
            uppost.url_img = uploadImage;
            await fs.remove(req.tempFilePath);
        }
        const postp = await Post.findByIdAndUpdate(idpost, uppost, { new: true })
        res.status(200).json(postp)
    } catch (error) {
        res.status(500).json({ message: 'Error update post', error });
    }
};
export const likePost = async (req, res) => {
    try {
        const { idpost, url_img, ...restOfBody } = req.body;
        const { token } = req.cookies
        const userid = jwt.verify(token, TOKEN_KEY);
        const postfind = Post.findById(idpost)
        if (!postfind.likereport.includes(userid.payload.id)){
            await Post.updateOne(
                //like
                { _id: idpost },
                { $addToSet: { likereport: id } }
            );
        }else{
            //no like
            await Post.updateOne(
                { _id: idpost },
                { $pull: { likereport: id } }
            );
        }
        res.status(200).json({ message: 'like/unlike successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error update post', error });
    }
};
