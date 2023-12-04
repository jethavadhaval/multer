import express from "express";
import User from "../model/user";
const userRouter = express.Router();

userRouter.get("/page2", async (req, res) => {
  const page = req.query?.page || 1;
  const limit = 10;
  if (page >= 0) {
    const data = await User.find({})
      .select(["name", "_id"])
      .limit(limit)
      .skip(limit * page)
      .sort({ id: 1 });
    res.send(data);
  }
});

// let nextPage = 6;
// let previousPage = 0;
// let num;
// let temp;
let lastId = "";
userRouter.get("/page3", async (req, res) => {
  const page = req.query?.page || 1;
  console.log("page: ", page);
  // num = page;
  // console.log("num: ", num);

  const limit = 11;
  const user = await User.find({}).select("_id").sort({ id: 1 });

  let totalPages = Math.floor((user.length - 1) / (limit - 1));
  console.log("totalPages: ", totalPages);

  if (page > totalPages) {
    console.log("page > totalPages: ", page > totalPages);
    return res.send({ status: 404, message: "page not found" });
  }

  // if (num === page) {
  const data = await User.find({}, { name: 1, id: 1 })
    // .select(["name", "_id"])
    .limit(limit)
    .skip(limit * page)
    .sort({ id: 1 });
  if (data.length > 1 && data.length === limit) data.pop();
  res.send(data);
  // temp = num;
  // console.log("temp: ", temp);
  // }

  // if (num > temp /*it is next*/ || page === 1) {
  /*let data = await User.aggregate([{ $match: { _id: { $gte: lastId } } }])
      .limit(11)
      .sort({ id: 1 });
    lastId = data[data.length - 1]._id;
    if (data.length > 1 && data.length === limit) data.pop();
    res.send(data);
    temp = num;
  }*/

  // if (num < temp /*it is previous*/) {
  /* console.log("true");
    let pre = await User.aggregate([{ $match: { _id: { $lte: lastId } } }])
      .limit(11)
      .sort({ id: -1 });
    lastId = pre[pre.length - 1].id;
    if (pre.length > 1 && pre.length - 1 === limit) pre.pop();
    res.send(pre);
    temp = num;
  }*/
});
// const data = await User.find({ _id: { $gte: `ObjectId${lastId}` } });
// if (num === 1) {
//   // const resData = await User.find({
//   //   id: { $gte: `ObjectId${user[user.length - 1]}` },
//   // });
//   lastId = user[user.length - 1].id;
//   // let index = await User.find({});
//   // let indexOfLast = await index.findIndex((e) => e.id === lastId);
//   user.pop();
//   res.send(user);
//   temp = num;
//   num++;
// } else if (num >= 1) {
// }

// if (nextPage) {
//   const resData = await data(nextPage, 1);
//   res.send(resData);
//   nextPage++;
// }
// if (previousPage) {
//   const resData = await data(previousPage, -1);
//   res.send(resData);
//   previousPage++;
//   nextPage--;
// }

export default userRouter;
