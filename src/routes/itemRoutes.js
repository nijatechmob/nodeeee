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

router.post("/add", auth, adminOnly, addItem);
router.get("/get", auth, getItems);
router.put("/update/:itemId", auth, adminOnly, updateItem);
router.delete("/delete/:itemId", auth, adminOnly, deleteItem);

module.exports = router;