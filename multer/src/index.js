import express from "express";
import path from "path";
import multer from "multer";

const app = express();
const port = 3000;

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.use(express.urlencoded({ extended: false }));
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

app.get("/", (req, res) => {
  res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(port, () => {
  console.log(`database is running on http://localhost:${port}/`);
});
