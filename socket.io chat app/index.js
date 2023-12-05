import express from "express";
import http from "http";
import path from "path";
import { formatMessage } from "./utils/messages";
import {
  userJoin,
  getCurrentUser,
  userLeaveChat,
  getUsersRoom,
} from "./utils/users";

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
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    socket.emit("message", formatMessage(bot, "welcome to chatcord"));

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(bot, `${user.username} has join the chat`)
      );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getUsersRoom(user.room),
    });
  });

  socket.on("chatMsg", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user = userLeaveChat(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(bot, `${user.username} has left chat`)
      );
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getUsersRoom(user.room),
      });
    }
  });
});
