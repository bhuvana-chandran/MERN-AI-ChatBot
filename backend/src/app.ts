import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
config();

const app = express();

// middleware
app.use(cors({ origin: "https://mern-ai-chatbot-frontend.onrender.com", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// only used in dev
app.use(morgan("dev"));
// initial Route with endpoint
app.use("/api/v1", appRouter);

export default app;
