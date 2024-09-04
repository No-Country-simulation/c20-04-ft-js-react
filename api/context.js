import { verTo } from "./libs/jwt.js";
export const context = async ({ req, res }) => {
    const token = req.cookies['token'];  // Aquí es donde se usa req.cookies
    let user = null;

    if (token) {
        try {
            u = verTo(token);  // Verifica el token usando la función personalizada
        } catch (err) {
            console.log('Token verification failed:', err);
        }
    }
    return { u, res };
    }