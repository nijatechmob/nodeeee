const express = require("express");

const {
  createuser,
  loginuser,
  getusers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", createuser);
router.post("/login", loginuser);
router.get("/getalluser", getusers);

module.exports = router;