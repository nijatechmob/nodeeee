const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  addItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.post("/additem", auth, adminOnly, addItem);
router.get("/getitem", auth, getItems);
router.put("/updateitem", auth, adminOnly, updateItem);
router.delete("/deleteitem", auth, adminOnly, deleteItem);

module.exports = router;