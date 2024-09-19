import { Router } from "express";
import { register, login, loguot, profile, refreshAccessToken} from "../controllers/auth.controllers.js";
import { getUserByUsername, prifileUpDate,followCntrol } from "../controllers/user.controllers.js";
import { createPost, upDatePost , likePost} from "../controllers/post.controllers.js"
import { validToken } from "../middlewares/validete.token.js";
import { uploadMiddleware, handleImageUpload } from "../middlewares/uploadMiddleware.js";
import { createPet, upDatePets } from "../controllers/pets.controllers.js";
import { createCmt,upDateComment } from "../controllers/cmt.controlllers.js";
const rou= Router()
rou.post("/register", register);
rou.post("/login", login);
rou.post("/refreshToken", refreshAccessToken);
rou.post("/loguot", loguot);
rou.get("/profile", validToken, profile)
rou.put('/users/:username', getUserByUsername)

rou.get('/users/:username', getUserByUsername)
rou.put("/profileUpDate", validToken, uploadMiddleware, handleImageUpload, prifileUpDate)
rou.post("/follow", validToken, followCntrol)

rou.post("/createPost", validToken, uploadMiddleware, handleImageUpload,createPost)
rou.put("/upDatePost", validToken, uploadMiddleware, handleImageUpload, upDatePost)
rou.post("/likePost", validToken, likePost)
rou.post("/likePost", validToken, likePost)

rou.post("/createPets", validToken, uploadMiddleware, handleImageUpload,createPet)
rou.put("/upDatePets", validToken, uploadMiddleware, handleImageUpload,upDatePets)


rou.post("/createCmt", createCmt)
rou.put("/upDateComment", upDateComment)
export default rou