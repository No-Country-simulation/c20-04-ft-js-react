import Comments from "../models/comments.models.js"
import jwt from 'jsonwebtoken';
import User from "../models/user.models.js"
import { TOKEN_KEY } from '../config.js';

export const createCmt = async (req, res) => {
    try {
        const {id_post, text} = req.body
        const { token } = req.cookies

        const userid = jwt.verify(token, TOKEN_KEY);
        const user = await User.findById(userid.payload.id);

        if (!user.id) {
            return res.status(404).json({ message: "User not found" });
        }

        const commentC = new Comments({
            id_post,
            text,
            id_user: user.id
        })
        
        await commentC.save()

        res.status(200).json({ 
            code: 200,
            data: {
                text: commentC.text,
                user: {
                    name: user.name,
                    username: user.username,
                    profile_photo: user.profile_photo
                }
            },
            message: 'Comment successful',
            status: 'success', 
        })
    } catch (error) {
        res.status(500).json({ message: 'Error create comment', error });
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
        const commentp = await Comments.findByIdAndUpdate(idcomment, upcomment, { new: true })
        res.status(200).json(commentp)
    } catch (error) {
        res.status(500).json({ message: 'Error update post', error });
    }
};