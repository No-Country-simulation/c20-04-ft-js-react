import express from "express";
import morgan from "morgan";
import authrouter from "./routers/auth.routers.js";


const app = express();
app.use(morgan("dev"));
app.use(express.json())
app.use("/api",authrouter)
export default app;