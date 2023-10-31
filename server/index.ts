import dotenv from "dotenv";
dotenv.config();
import express from "express";

import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
//middleware
import "./config/database";
import { SocketServer } from "./config/socket";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  })
);
// app.use(morgan("dev"));

const http = createServer(app);
export const io = new Server(http, {
  cors: {
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  },
});
io.on("connection", (socket: Socket) => {
  SocketServer(socket);
});

app.use("/api", routes.authRouter);
app.use("/api", routes.userRouter);
app.use("/api", routes.categoryRouter);
app.use("/api", routes.blogRouter);
app.use("/api", routes.commentRouter);

const PORT = 5000;
http.listen(PORT, () => {
  console.log("connected");
});
