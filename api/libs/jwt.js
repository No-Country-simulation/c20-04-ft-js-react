import { TOKEN_KEY } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccess(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign({
            payload
        }, TOKEN_KEY,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) reject(err);
                resolve(token)
            }
        )
    })
}

export function verTo(req) {
    const token = req.cookie("token", TOKEN_KEY)

    if (token) {
        let u = null;
        try {
             u = jwt.verify(token, TOKEN_KEY);

        } catch (error) {
            console.log(error);
        }
    }
    return u
}
