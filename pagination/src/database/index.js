import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/pagination")
    .then(() => {
      console.log("database connection established");
    })
    .catch((err) => {
      console.log("err while connecting: ", err.message);
    });
};
