import express from "express";
import morgan from "morgan";
import authrouter from "./routers/auth.routers.js";


const app = express();
app.use(morgan("dev"));
app.use("api/auth",authrouter)
export default app;