import User from "../models/user.models.js"
import crip from "bcryptjs";
import jwt from "jsonwebtoken";

export const resgister = async (req, res) => {
    const { email, password, username, role } = req.body
    const exitUser = await User.findOne({"email":email})
    if (exitUser) { 
        return res.status(409).json({message : "email register"})
    }

    try {

        const hash = await crip.hash(password, 10)
        const newuser = new User({
            email,
            password: hash,
            username,
            role
        })
        console.log(newuser);
        
        await newuser.save();
        jwt.sign({
            id: newuser.id
        }, "ancara",
            { expiresIn: "1h" },
            (err, token) => {
                if (err) console.log(err);
                res.cookie("token", token);
                res.json({ id :newuser.id,
                            username : newuser.username,
                            email : newuser.email,
                            role : newuser.role
                 })
            }
        )
    } catch (error) {
        console.log(error)
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
        if (!compareHash){
            return res.status(400).json({ message: "password error" })
        }

        jwt.sign({
            id: exitUser.id
        }, "ancara",
            { expiresIn: "1h" },
            (err, token) => {
                if (err) console.log(err);
                res.cookie("token", token);
                res.json({
                    id: exitUser.id,
                    username: exitUser.username,
                    email: exitUser.email,
                    role: exitUser.role,
                    biografy : exitUser.biografy
                })
            }
        )
    } catch (error) {
        console.log(error)
    }
 }
/*export const loguot = (req, res) => {
    res.cookie("token", "");
 }*/