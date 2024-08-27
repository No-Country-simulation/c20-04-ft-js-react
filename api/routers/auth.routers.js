import { Router } from "express";
import { resgister,login,update } from "../controllers/auth.controllers.js";

const rou= Router()
rou.post("/resgister", resgister);
rou.post("/login",login);
rou.put("/update",update );

export default rou