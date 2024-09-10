import User from "../models/user.models.js"
import crip from "bcryptjs";
import { createAccess } from "../libs/jwt.js";
import { calculateAge } from "../utils/age.js";

export const register = async (req, res) => {
    const { email, password, username, birthdate } = req.body;
    
    try {
        const exitUsername = await User.findOne({ username });

        if (exitUsername) {
            return res.status(409).json({
                code: 409,
                data: [],
                status: 'error',
                message: `El username ${username} ya esta en uso`
            });
        }

        const exitUser = await User.findOne({ email });
        
        if (exitUser) {
            return res.status(409).json({ 
                code: 409, 
                data: [], 
                status: 'error', 
                message: "El email ya esta registrado" 
            });
        }



        const hash = await crip.hash(password, 10);
        const newuser = new User({
            email,
            password: hash,
            username,
            birthdate,
            role: "user"
        });

        const rUser = await newuser.save();
        const token = await createAccess({ id: rUser.id });

        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax', 
            maxAge: 24 * 60 * 60 * 1000, 
            path: '/'
        });
        
        return res.status(201).json({
            code: 201,
            data: {
                id: rUser.id,
                username: rUser.username,
                token: token,
                role: rUser.role,
                email: rUser.email,
                birthdate: rUser.birthdate,
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
            return res.status(401).json({ message: "Invalid credentials" })
        };

        const token = await createAccess({ id: exitUser.id })
        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax', 
            maxAge: 24 * 60 * 60 * 1000, 
            path: '/'
        });

        res.json({
            id: exitUser.id,
            username: exitUser.username,
            email: exitUser.email,
            name: exitUser.name,
            profile_photo: exitUser.profile_photo,
            role: exitUser.role
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
        const user = await User.findOne({ refreshToken });

        if (!user) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || user.id !== decoded.id) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }

            const newAccessToken = createAccess({ id: user.id });

            res.cookie("token", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000,
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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