import dbConnect from "@/db/connect";
import ShoppingItem from "@/db/models/ShoppingItems";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const items = await ShoppingItem.find();
      response.status(200).json(items);
    } catch (error) {
      response.status(500).json({ message: "An Error occured", error });
    }
    return;
  }
  response.status(405).json({ message: "Method not allowed" });
}
