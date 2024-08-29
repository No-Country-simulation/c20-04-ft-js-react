import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authrouter from "./routers/auth.routers.js";


const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api",authrouter);
export default app;