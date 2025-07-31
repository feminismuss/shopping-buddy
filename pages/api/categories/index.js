import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const categories = await Category.find({}, { name: 1 }).sort({ name: 1 });
      return response.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ message: "Fetching categories failed" });
    }
  }
  return response.status(405).json({ message: "Method not allowed" });
}
