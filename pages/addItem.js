import { useRouter } from "next/router";
import ItemForm from "../components/ItemForm";

export default function AddShoppingItem() {
  const router = useRouter();

  async function handleAddShoppingItem(data) {
    const response = await fetch("/api/shoppingItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      router.push("/");
    } else {
      console.error("Saving failed");
    }
  }
  return (
    <>
      <h1>Add new Item</h1>
      <ItemForm onSubmit={handleAddShoppingItem} formName="new-item-form" />
    </>
  );
}
