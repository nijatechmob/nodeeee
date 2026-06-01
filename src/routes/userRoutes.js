const express = require("express");

const {
  createuser,
  getusers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createuser);
router.get("/", getusers);

module.exports = router;