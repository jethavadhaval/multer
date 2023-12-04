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

// console.log("typeof document: ", typeof document);
// if (typeof document !== "undefined") {
//   let input = document.getElementById("next");
//   console.log("input: ", input);
//   let element = document.querySelector(".class-name");

//   // Manipulating the DOM here
// }

app.use("/", userRouter);
