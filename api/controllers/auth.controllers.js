import User from "../models/user.models.js"
import crip from "bcryptjs";
import { createAccess } from "../libs/jwt.js";
import { calculateAge } from "../utils/age.js";

export const register = async (req, res) => {
    const { email, password, username, birthdate } = req.body;
    
    try {
        const exitUser = await User.findOne({ email });
        
        if (exitUser) {
            return res.status(409).json({ 
                code: 409, 
                data: [], 
                status: 'error', 
                message: "El email ya esta registrado" 
            });
        }

        const exitUsername = await User.findOne({ username });

        if (exitUsername) {
            return res.status(409).json({
                code: 409,
                data: [],
                status: 'error',
                message: `El username: ${username} ya esta en uso`
            });
        }

        const hash = await crip.hash(password, 10);
        const newuser = new User({
            email,
            password: hash,
            username,
            birthdate,
            age: calculateAge(birthdate),
            role: "user"
        });

        const rUser = await newuser.save();
        const token = await createAccess({ id: rUser.id });

        res.cookie("token", token);
        
        return res.status(201).json({
            code: 201,
            data: {
                id: rUser.id,
                username: rUser.username,
                role: rUser.role,
                email: rUser.email,
                birthdate: rUser.birthdate,
                age: rUser.age
            },
            status: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            code: 500,
            data: [],
            status: 'error',
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body
    const exitUser = await User.findOne({ "email": email })
    if (!exitUser) {
        return res.status(409).json({ message: "email no register" })
    }
    try {
        const compareHash = await crip.compare(password, exitUser.password)
        if (!compareHash) {
            return res.status(400).json({ message: "password error" })
        };
        const token = await createAccess({ id: exitUser.id })
        res.cookie("token", token)
        res.json({
            id: exitUser.id,
            username: exitUser.username,
            email: exitUser.email,
            name: exitUser.name,
            age: exitUser.age,
            profile_photo: exitUser.profile_photo,
            role: exitUser.role
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const loguot = (req, res) => {
    res.cookie("token", "");
    res.sendStatus(200);
 }

export const profile = async(req,res) => {
    const userP = await User.findById(req.user.payload.id)
    //console.log();
    
   if (!userP) return res.status(400).json({message : "user no fond"})
        console.log(userP);
    res.json({ userP })
}