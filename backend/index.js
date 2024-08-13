const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const authRouter = require("./routes/authRoute.js");

require("dotenv").config();
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(authRouter);
// app.post("/register", (req, res) => {
//   const { name, email, password } = req.body;
//   res.json({ name, email, password });
// });

const port = process.env.PORT;
const URL = process.env.mongodbURL;
mongoose
  .connect(URL)
  .then(() => {
    console.log("mongodb connected!!");
    app.listen(port, () => {
      console.log(`app is listening to ${port}`);
    });
  })
  .catch(() => {
    console.log("mongodb not connected");
  });
// app.listen(port, () => {
//   console.log(`app is listening to ${port}`);
// });
