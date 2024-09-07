import { Router } from "express";
import { register, login, loguot, profile} from "../controllers/auth.controllers.js";
import { getUserByUsername, prifileUpDate } from "../controllers/user.controllers.js";
import { createPost, upDatePost } from "../controllers/post.controllers.js"
import { validToken } from "../middlewares/validete.token.js";
const rou= Router()
rou.post("/register", register);
rou.post("/login",login);
rou.post("/loguot", loguot);
rou.get("/profile",validToken, profile)
rou.put('/users/:username', getUserByUsername)

rou.get('/users/:username', getUserByUsername)
rou.put("/profileUpDate", validToken,prifileUpDate)

rou.post("/createPost",validToken,createPost)
rou.put("/upDatePost", validToken, upDatePost)

export default rou