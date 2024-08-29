import jwt from "jsonwebtoken"
import { TOKEN_KEY } from "../config.js"
export const validToken = (req , res, next )=> {
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({message: "no token"})
    }
    jwt.verify(token,TOKEN_KEY,(err, vt)=>{
        if(err) return res.status(401).json({message : "token invalid"});
        req.user = vt 
        next();
    })
}