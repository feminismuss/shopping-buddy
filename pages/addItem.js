import { useRouter } from "next/router";
import ItemForm from "../components/ItemForm";
import { StyledLink } from "@/components/StyledLink";
import useSWR from "swr";
import { useState } from "react";

export default function AddShoppingItem() {
  const router = useRouter();

  const {
    data: categories = [],
    isLoading: loadingCategories,
    error: categoriesError,
  } = useSWR("/api/categories");

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
  function handleCancelClick() {
    router.push("/");
  }
  return (
    <>
      <h1>Add new Item</h1>
      <StyledLink href={"/"} $justifySelf="start">
        back
      </StyledLink>

      {categoriesError && <p>no categories to choose</p>}

      <ItemForm
        onSubmit={handleAddShoppingItem}
        formName="new-item-form"
        categories={categories}
        loadingCategories={loadingCategories}
        onCancel={handleCancelClick}
      />
    </>
  );
}
