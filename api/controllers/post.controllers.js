import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs-extra';
import path from 'path';
import multer from 'multer';
import { uploadPostImage } from '../cloudinary.js';
import Post from '../models/post.models.js';
import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../config.js';
// cloudinary
// Configura Multer para usar almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const uploadMiddleware = upload.single('image');

// Obtén el directorio del módulo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const createPost = async (req, res) => {
    try {
        const { token } = req.cookies;
        const userid = jwt.verify(token, TOKEN_KEY);
        const aut = await User.findById(userid.payload.id);
        if (!aut) {
            return res.status(500).json({ message: 'not authenticated' });
        }

        const { text, category } = req.body;
        const postc = new Post({
            text,
            category,
            id_user: userid.payload.id
        });

        if (req.file) {
            // Ruta absoluta para guardar el archivo
            const uploadsDir = path.join(__dirname, '../uploads');
            const tempFilePath = path.join(uploadsDir, `${Date.now()}-${req.file.originalname}`);

            // Verifica y crea el directorio si no existe
            if (!fs.existsSync(uploadsDir)) {
                await fs.mkdir(uploadsDir);
            }

            // Guarda el archivo en la ruta temporal
            await fs.writeFile(tempFilePath, req.file.buffer);

            // Subir la imagen a Cloudinary desde la ruta
            const uploadImage = await uploadPostImage(tempFilePath, userid.payload.id);
            postc.url_img = uploadImage;

            // Elimina el archivo temporal después de subirlo
            await fs.remove(tempFilePath);
        }

        const awpostS = await postc.save();
        res.status(200).json(awpostS);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};
export const upDatePost = async (req, res) => {
    try {
        const { idpost,url_img, ...restOfBody } = req.body;
        const { token } = req.cookies
        const userid = jwt.verify(token, TOKEN_KEY);
        const postfind = Post.findById(idpost)
        if (!postfind.id_user == userid.payload.id) {
            res.status(500).json({ message: 'not authenticated', error });
        }
        const uppost = {
            ...restOfBody
        };
        if(url_img) {
            const uploadImage = await uploadPostImage(url_img, userid.payload.id)
            uppost.url_img = uploadImage
        }
        const postp = await Post.findByIdAndUpdate(idpost, uppost, { new: true })
        res.status(200).json(postp)
    } catch (error) {
        res.status(500).json({ message: 'Error update post', error });
    }
};
