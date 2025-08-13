import dbConnect from "@/db/connect";
import ShoppingItem from "@/db/models/ShoppingItem";
import mongoose from "mongoose";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "Invalid ID" });
  }
  try {
    if (request.method === "GET") {
      const item = await ShoppingItem.findById(id);
      if (!item) {
        return response.status(404).json({ message: "Item not found" });
      }
      return response.status(200).json(item);
    }

    if (request.method === "PUT") {
      const data = request.body;
      const updated = await ShoppingItem.findByIdAndUpdate(id, data, {
        new: true,
        runvalidators: true,
      });
      if (!updated)
        return response.status(404).json({ message: "Item not found" });
      return response.status(200).json({ status: "Item updated" });
    }

    if (request.method === "DELETE") {
      const deleted = await ShoppingItem.findByIdAndDelete(id);
      if (!deleted)
        return response.status(404).json({ message: "Item not found" });
      return response.status(200).json({ status: "Item updated" });
    }

    return response
      .status(405)
      .json({ message: `Method ${request.method} Not Allowed` });
  } catch (err) {
    console.error(err);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
