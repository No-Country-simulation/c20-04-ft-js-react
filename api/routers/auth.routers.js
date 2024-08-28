import { Router } from "express";
import { resgister,login } from "../controllers/auth.controllers.js";

const rou= Router()
rou.post("/resgister", resgister);
rou.post("/login",login);
rou.post("/loguot");

export default rou