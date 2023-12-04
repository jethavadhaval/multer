import express from "express";
import http from "http";
import path from "path";

import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const port = 6549;

app.use(express.json());

server.listen(port, () => {
  console.log(`database is running on http://localhost:${port}/`);
  dbConnection();
});

app.get("/msg", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("user is online", socket.id);
  socket.on("disconnect", () => {
    console.log("user is offline");
  });
});

// app.use("/", userRouter);
