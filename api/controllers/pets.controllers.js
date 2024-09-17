import Pets from "../models/pets.models.js"
import User from "../models/user.models.js"
import jwt from 'jsonwebtoken';
import { uploadPetImage } from "../cloudinary.js";

import { TOKEN_KEY } from '../config.js';
export const createPet = async (req, res) => {
    try {
        const { token } = req.cookies
        const userid = jwt.verify(token, TOKEN_KEY);
        const aut = User.findById(userid.payload.id)
        if (!aut) {
            res.status(500).json({ message: 'not authenticated', error });
        }
        const {profile_photo, ...restOfBody } = req.body;
        const petc = new Pets({
            ...restOfBody,
            id_user: userid.payload.id
        })
        if (req.tempFilePath) {
            const uploadImage = await uploadPetImage(req.tempFilePath, req.user._id);
            petc.url_img = uploadImage;
            await fs.remove(req.tempFilePath);
        }
        const petS = await petc.save()
        res.status(200).json(petS);
    } catch (error) {
        res.status(500).json({ message: 'Error crear pet', error });
    }
};
export const upDatePets = async (req, res) => {
    try {
        const { token } = req.cookies
        const userid = jwt.verify(token, TOKEN_KEY);
        const petfind = Pets.findById(idpet)
        if (!petfind.id_user == userid.payload.id) {
            res.status(500).json({ message: 'not authenticated', error });
        }
        const { idpet, profile_photo,...restOfBody } = req.body;
        const uppet = {
            ...restOfBody
        };
        if (req.tempFilePath) {
            const uploadImage = await uploadPetImage(req.tempFilePath, req.user._id);
            petp.url_img = uploadImage;
            await fs.remove(req.tempFilePath);
        }
        const petp = await Pets.findByIdAndUpdate(idpet, uppet, { new: true })
        res.status(200).json(petp)
    } catch (error) {
        res.status(500).json({ message: 'Error update post', error });
    }
};