import multer from "multer";
import express from "express";

const userRouter = express();
// const userRouter = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./src/uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }); // this is the middleware to upload files

userRouter.get("/", (req, res) => {
  res.render("homepage");
});

userRouter.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

export default userRouter;
