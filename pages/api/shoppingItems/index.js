import dbConnect from "@/db/connect";
import ShoppingItem from "@/db/models/ShoppingItem";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const items = await ShoppingItem.find();
      return response.status(200).json(items);
    } catch (error) {
      return response.status(500).json({ message: "Server error", error });
    }
  }
  response.status(405).json({ message: "Method not allowed" });
}
