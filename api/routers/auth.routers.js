import { Router } from "express";
import { resgister,login,loguot, profile} from "../controllers/auth.controllers.js";
import { validToken } from "../middlewares/validete.token.js";
const rou= Router()
rou.post("/resgister", resgister);
rou.post("/login",login);
rou.post("/loguot", loguot);
rou.get("/profile",validToken, profile)

export default rou