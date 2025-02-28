import express from "express";
import authRouter from "./routes/auth.routes.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});

app.use("/auth", authRouter);

export default app;
