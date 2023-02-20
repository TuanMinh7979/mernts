import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes";

//middleware

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", routes.authRouter);
app.use("/api", routes.userRouter);
app.use('/api', routes.categoryRouter);
app.use('/api', routes.blogRouter);
app.use('/api', routes.commentRouter);
import "./config/database";
const PORT = 5001;
app.listen(PORT, () => {
  console.log("connected.....");
});
