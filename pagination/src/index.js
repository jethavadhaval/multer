import express from "express";
import userRouter from "./router/user";
import { dbConnection } from "./database";

const app = express();
const port = 1548;

app.use(express.json());

app.listen(port, () => {
  console.log(`database is running on http://localhost:${port}/`);
  dbConnection();
});

app.use("/", userRouter);
