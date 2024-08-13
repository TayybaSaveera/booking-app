const express = require("express");
const router = express.Router();
const { Register, Login, profile } = require("../controller/AuthController");
router.post("/register", Register);
router.post("/Login", Login);
router.get("/profile", profile);
module.exports = router;
