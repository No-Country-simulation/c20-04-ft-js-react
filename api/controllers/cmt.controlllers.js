import Comment from "../models/comment.models.js"
import jwt from 'jsonwebtoken';
import User from "../models/user.models.js"
import { TOKEN_KEY } from '../config.js';

export const createPet = async (req, res) => {
    try {
        const { token } = req.cookies
        const userid = jwt.verify(token, TOKEN_KEY);
        const aut = User.findById(userid.payload.id)
        if (!aut) {
            res.status(500).json({ message: 'not authenticated', error });
        }
        const commentC = new Comment({
            ...req.body,
            id_user: userid.payload.id
        })
        const commentS = await commentC.save()
        res.status(200).json(commentS);
    } catch (error) {
        res.status(500).json({ message: 'Error crear pet', error });
    }
};
export const upDateComment = async (req, res) => {
    try {
        const { idcomment, url_img, ...restOfBody } = req.body;
        const { token } = req.cookies
        const userid = jwt.verify(token, TOKEN_KEY);
        const commentfind = Comment.findById(idcomment)
        if (!commentfind.id_user == userid.payload.id) {
            res.status(500).json({ message: 'not authenticated', error });
        }
        const upcomment = {
            ...restOfBody
        };
        const commentp = await Comment.findByIdAndUpdate(idcomment, upcomment, { new: true })
        res.status(200).json(commentp)
    } catch (error) {
        res.status(500).json({ message: 'Error update post', error });
    }
};