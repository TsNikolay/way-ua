import express from "express";
import authRouter from "./routes/auth.routes.js";
import routesRouter from "./routes/routes.routes.js";
import plannerRouter from "./routes/planner.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);

app.get("/", (req, res) => {
  res.send("OK");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/routes", routesRouter);
app.use("/api/v1/planner", plannerRouter);

export default app;
