import dbConnect from "@/db/connect";
import ShoppingItem from "@/db/models/ShoppingItems";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const item = await ShoppingItem.findById(id);
      if (!item) {
        return response.status(404).json({ message: "item not found" });
      }
      response.status(200).json(item);
    } catch (error) {
      response.status(500).json({ message: "An Error occured", error });
    }
    return;
  }
  response.status(405).json({ message: "Method not allowed" });
}
