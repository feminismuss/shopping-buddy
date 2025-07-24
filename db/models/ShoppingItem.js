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
  },
);

const ShoppingItem =
  mongoose.models.ShoppingItem ||
  mongoose.model("ShoppingItem", shoppingItemSchema);

export default ShoppingItem;
