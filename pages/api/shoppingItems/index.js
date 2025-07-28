import dbConnect from "@/db/connect";
import ShoppingItem from "@/db/models/ShoppingItem";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const items = await ShoppingItem.find();
    response.status(200).json(items);
  }

  if (request.method === "POST") {
    try {
      const newitem = await ShoppingItem.create(request.body);
      response.status(200).json(newItem);
    } catch (error) {
      console.error(error);
      response.status(400).json({ message: "Saving failed" });
    }
  }
  if (request.method !== "GET" && request.method !== "POST") {
    response.status(405).json({ message: "Method not allowed" });
  }
}
