import { useRouter } from "next/router";
import useSWR from "swr";
import { StyledLink } from "@/components/StyledLink";
import ItemDetails from "@/components/ItemDetails";
import { useState } from "react";
import { StyledButton } from "@/components/StyledButton";
import ItemForm from "@/components/ItemForm";

export default function ItemDetailsPage() {
  const [showEditItemForm, setShowEditItemForm] = useState(false);
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const {
    data: item,
    isLoading,
    error,
    mutate,
  } = useSWR(id ? `/api/shoppingItems/${id}` : null);

  async function handleEditItem(data) {
    const response = await fetch(`/api/shoppingItems/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }
    await mutate();
    setShowEditItemForm(false);
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading items</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <>
      <StyledLink href={"/"} $justifySelf="start">
        back
      </StyledLink>
      {showEditItemForm ? (
        <ItemForm
          formName="edit-item"
          defaultData={item}
          onSubmit={handleEditItem}
        />
      ) : (
        <>
          <ItemDetails
            id={item._id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            comment={item.comment}
            imageUrl={item.imageUrl}
          />
          <StyledButton onClick={() => setShowEditItemForm(!showEditItemForm)}>
            edit
          </StyledButton>
        </>
      )}
    </>
  );
}
