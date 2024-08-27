import User from "../models/user.models.js"
import crip from "bcryptjs";
import jwt from "jsonwebtoken";
export const resgister = async (req, res) => {
    const { email, passware, username, role, biografy } = req.body
    try {

        const hash = await crip.hash(passware, 10)
        const newuser = new User({
            email,
            passware: hash,
            username,
            role,
            biografy
        })
        await newuser.save();
        jwt.sign({
            id: newuser.id
        }, "ancara",
            { expiresIn: "1h" },
            (err, token) => {
                if (err) console.log(err);
                res.cookie("token", token);
                res.json({ message: "user r" })
            }
        )
        /* res.json({
          id : newuser.id,
          email: newuser.email,
          role:newuser.role,
          by :newuser.biografy}
      )*/
    } catch (error) {
        console.log(error)
    }

}
export const login = (req, res) => { }
export const update = (req, res) => { }