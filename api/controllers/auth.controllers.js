import User from "../models/user.models.js"
import crip from "bcryptjs";
import { createAccess } from "../libs/jwt.js";

export const register = async (req, res) => {
    const { email, password, username, age } = req.body
    const exitUser = await User.findOne({ "email": email })
    if (exitUser) {
        return res.status(409).json({ message: "email register" })
    }
    try {
        const hash = await crip.hash(password, 10)
        const newuser = new User({
            email,
            password: hash,
            username,
            age,
            role: "user"
        })
        console.log(newuser);

        const rUser = await newuser.save();
        const token = await createAccess({ id: rUser.id })
        res.cookie("token", token)
        res.json({
            id: rUser.id,
            username: rUser.username,
            role: rUser.role,
            email: rUser.email,
            age :rUser.age
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

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