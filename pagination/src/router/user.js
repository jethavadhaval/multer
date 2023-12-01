import express from "express";
import User from "../model/user";
const userRouter = express.Router();

userRouter.get("/page/:id", async (req, res) => {
  const page = req.params.id;
  console.log("page: ", page);
  const limit = 10;
  if (page >= 0) {
    const data = await User.find({})
      .select("name")
      .limit(limit)
      .skip(limit * page)
      .sort({ name: 1 });
    console.log("userRouter.get  data: ", data);
    res.send(data);
  }
});

export default userRouter;
