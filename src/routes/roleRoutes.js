const express = require("express");
const { getallrole } = require("../controllers/roleController");

const router = express.Router();

router.get("/getallrole", getallrole);

module.exports = router;