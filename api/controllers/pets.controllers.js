import Pets from "../models/pets.models.js"
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../config.js';
export const createPet = async (req, res) => {
    try {
        const { token } = req.cookies
        const userid = jwt.verify(token, TOKEN_KEY);
        const petc = new Pets({
            ...req.body,
            id_user: userid.payload.id
        })
        const petS = await petc.save()
        res.status(200).json(petS);
    } catch (error) {
        res.status(500).json({ message: 'Error crear pet', error });
    }
};
export const upDatePets = async (req, res) => {
    try {
        const { idpet, ...restOfBody } = req.body;
        const { token } = req.cookies
        const userid = jwt.verify(token, TOKEN_KEY);
        const petfind = Pets.findById(idpet)
        if (!petfind.id_user == userid.payload.id) {
            res.status(500).json({ message: 'not authenticated', error });
        }
        const uppet = {
            ...restOfBody
        };
        const petp = await Pets.findByIdAndUpdate(idpet, uppet, { new: true })
        res.status(200).json(petp)
    } catch (error) {
        res.status(500).json({ message: 'Error update post', error });
    }
};