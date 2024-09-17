import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.memoryStorage();
const upload = multer({ storage });
export const uploadMiddleware = upload.single('image');

export const handleImageUpload = async (req, res, next) => {
    if (req.file) {
        const uploadsDir = path.join(__dirname, '../uploads');
        const tempFilePath = path.join(uploadsDir, `${Date.now()}-${req.file.originalname}`);

        if (!fs.existsSync(uploadsDir)) {
            await fs.mkdir(uploadsDir);
        }

        await fs.writeFile(tempFilePath, req.file.buffer);
        req.tempFilePath = tempFilePath; 
    }
    next();
};