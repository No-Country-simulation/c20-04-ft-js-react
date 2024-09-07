import { Router } from "express";
import { register, login, loguot, profile} from "../controllers/auth.controllers.js";
import { getUserByUsername, prifileUpDate } from "../controllers/user.controllers.js";
import { validToken } from "../middlewares/validete.token.js";
const rou= Router()
rou.post("/register", register);
rou.post("/login",login);
rou.post("/loguot", loguot);
rou.get("/profile",validToken, profile)
rou.put('/users/:username', getUserByUsername)

rou.get('/users/:username', getUserByUsername)
rou.put("/profileUpDate",prifileUpDate)

export default rou