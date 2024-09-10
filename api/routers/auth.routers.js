import { Router } from "express";
import { register, login, loguot, profile, refreshAccessToken} from "../controllers/auth.controllers.js";
import { getUserByUsername, prifileUpDate } from "../controllers/user.controllers.js";
import { createPost, upDatePost } from "../controllers/post.controllers.js"
import { validToken } from "../middlewares/validete.token.js";
import { createPet, upDatePets } from "../controllers/pets.controllers.js";
const rou= Router()
rou.post("/register", register);
rou.post("/login", login);
rou.post("/refreshToken", refreshAccessToken);
rou.post("/loguot", loguot);
rou.get("/profile", validToken, profile)
rou.put('/users/:username', getUserByUsername)

rou.get('/users/:username', getUserByUsername)
rou.put("/profileUpDate", validToken,prifileUpDate)

rou.post("/createPost", validToken,createPost)
rou.put("/upDatePost", validToken, upDatePost)

rou.post("/createPets", validToken,createPet)
rou.put("/upDatePets", validToken, upDatePets)

export default rou