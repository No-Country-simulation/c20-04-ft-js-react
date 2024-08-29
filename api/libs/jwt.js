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