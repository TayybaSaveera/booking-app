const User = require("../models/user.js");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const jwtSecret = process.env.secret;

const bcryptSalt = bcrypt.genSaltSync(10);
const Register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign(
          { id: user._id, email: user.email },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(user);
          }
        );
      } else {
        res.status(422).json("pass incorrect");
      }
    } else {
      res.json("not found");
    }
  } catch (error) {}
};

const profile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(user.id);
      res.json(name, email, _id);
    });
  } else {
    res.json(null);
  }
};
const Logout = async (req, res) => {
  res.cookie("token", "").json("true");
};
module.exports = { Register, Login, profile, Logout };
