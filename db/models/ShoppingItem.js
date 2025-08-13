import mongoose from "mongoose";

// mongoose.set("strictQuery", true);

const { Schema } = mongoose;

const shoppingItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: String,
    quantity: String,
    category: String,
    comment: String,
    purchased: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ShoppingItem =
  mongoose.models.ShoppingItem ||
  mongoose.model("ShoppingItem", shoppingItemSchema);

export default ShoppingItem;
