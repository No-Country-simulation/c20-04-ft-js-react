import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authrouter from "./routers/auth.routers.js";
import cors from 'cors'


const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
}))
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api",authrouter);
export default app;