const Item = require("../models/Item");

const addItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);

    res.status(201).json({
      success: true,
      message: "Item Added Successfully",
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ itemId: 1 });

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findOneAndUpdate(
      { itemId: itemId },
      req.body,
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item Updated Successfully",
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findOneAndDelete({ itemId });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addItem,
  getItems,
  updateItem,
  deleteItem,
};