import { Router } from "express";
import { register, login, loguot, profile} from "../controllers/auth.controllers.js";
import { validToken } from "../middlewares/validete.token.js";
const rou= Router()
rou.post("/register", register);
rou.post("/login",login);
rou.post("/loguot", loguot);
rou.get("/profile",validToken, profile)

export default rou