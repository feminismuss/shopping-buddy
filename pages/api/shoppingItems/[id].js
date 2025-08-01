import dbConnect from "@/db/connect";
import ShoppingItem from "@/db/models/ShoppingItem";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

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
    })
if (!updated) return response.status(404).json({ message: "Item not found" });
    return response.status(200).json({ status: "Item updated" });
  }
  response.setHeader("Allow", ["GET", "PUT"])
   return res.status(405).json({ message: `Method ${request.method} Not Allowed` });
}
