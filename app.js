require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT || 400;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// var nodemailer = require("nodemailer");

mongoose
  .connect(DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DataBase Connected"))
  .catch((err) => {
    console.log(err);
  });
app.get("/", async (req, res) => {
  try {
    res.send("hello world!");
  } catch (err) {
    res.send("Error " + err);
  }
});

const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");
const submissionRouter = require("./routes/submission.router");
const uploadRouter = require("./routes/upload.router");
const blogsRouter = require("./routes/blogs.router")

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/submission", submissionRouter);
app.use("/uploads", uploadRouter);
app.use("/blogs", blogsRouter);

// require("./model/user.model");

// const User = mongoose.model("UserModel");

// app.post("/userData", async (req, res) => {
// 	const { token } = req.body;
// 	try {
// 		const user = jwt.verify(token, JWT_SECRET, (err, res) => {
// 			if (err) {
// 				return "token expired";
// 			}
// 			return res;
// 		});
// 		console.log(user);
// 		if (user == "token expired") {
// 			return res.send({ status: "error", data: "token expired" });
// 		}

// 		const useremail = user.email;
// 		User.findOne({ email: useremail })
// 			.then((data) => {
// 				res.send({ status: "ok", data: data });
// 			})
// 			.catch((error) => {
// 				res.send({ status: "error", data: error });
// 			});
// 	} catch (error) {}
// });

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
