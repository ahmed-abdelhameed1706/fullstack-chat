import express from "express";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import path from "path";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server is running on Port ", PORT);
});

// TODO: Configure this server for deployment
