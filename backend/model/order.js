const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cart: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.Mixed,
    },
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);