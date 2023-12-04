import express from "express";
import http from "http";
import path from "path";
import { formatMessage } from "./utils/messages";
import { userJoin, getCurrentUser } from "./utils/users";

import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

server.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});

const io = new Server(server);
const bot = "bot";

io.on("connection", (socket) => {
  socket.on("joinRoom", (username, room) => {
    socket.emit("message", formatMessage(bot, "welcome to chatcord"));

    socket.broadcast.emit(formatMessage(bot, "user has join chat"));
  });

  socket.on("chatMsg", (msg) => {
    io.emit("message", formatMessage("user", msg));
  });

  socket.on("disconnect", () => {
    io.emit(formatMessage(bot, "user has left chat"));
  });
});

// app.use("/", userRouter);
