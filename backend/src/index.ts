import express from "express";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

// TODO: Add socket to the server
// TODO: Configure this server for deployment
