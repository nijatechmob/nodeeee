const mongoose = require("mongoose");
const Counter = require("./Counter");

const itemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    ingredients: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

itemSchema.pre("save", async function () {
  if (!this.isNew) return;

  const counter = await Counter.findOneAndUpdate(
    { _id: "itemId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.itemId = counter.seq.toString();
});

module.exports = mongoose.model("Item", itemSchema);