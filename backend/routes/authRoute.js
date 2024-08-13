const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  profile,
  Logout,
} = require("../controller/AuthController");
router.post("/register", Register);
router.post("/Login", Login);
router.get("/profile", profile);
router.post("/Logout", Logout);

module.exports = router;
