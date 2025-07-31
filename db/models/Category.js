import mongoose from "mongoose";

// mongoose.set("strictQuery", true);

const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
