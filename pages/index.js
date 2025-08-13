import styled from "styled-components";
import ItemPreview from "@/components/ItemPreview";
import useSWR from "swr";
import { StyledLink } from "@/components/StyledLink";

const ListContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export default function HomePage() {
  const { data, error, isLoading, mutate } = useSWR("/api/shoppingItems");

  if (isLoading) return <p>Loading Shoppinglist</p>;
  if (error) return <p>Error while loading: {error.message}</p>;
  if (!data) return null;

  // 🔹 Toggle-Funktion mit optimistic update
  const handleTogglePurchased = async (id) => {
    // Sofort lokal updaten
    mutate(
      (oldData) =>
        oldData.map((item) =>
          item._id === id ? { ...item, purchased: !item.purchased } : item
        ),
      false // false = nicht sofort neu fetchen
    );

    // API call machen
    try {
      const res = await fetch(`/api/shoppingItems/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to toggle purchased");
      mutate(); // nach Erfolg frisch fetchen
    } catch (error) {
      console.error(error);
      mutate(); // bei Fehler Daten zurückholen
    }
  };

  // 🔹 Aufteilen in offene & gekaufte Items
  const unpurchasedItems = data.filter((item) => !item.purchased);
  const purchasedItems = data
    .filter((item) => item.purchased)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <>
      <h2>Shopping List with {unpurchasedItems.length} items</h2>
      {unpurchasedItems.length === 0 ? (
        <p>All done ;) No items on Shopping List. Add new items.</p>
      ) : (
        <ListContainer>
          {unpurchasedItems.map((shoppingItem) => (
            <li key={shoppingItem._id}>
              <ItemPreview
                id={shoppingItem._id}
                name={shoppingItem.name}
                quantity={shoppingItem.quantity}
                category={shoppingItem.category}
                purchased={shoppingItem.purchased}
                onTogglePurchased={() =>
                  handleTogglePurchased(shoppingItem._id)
                }
              />
            </li>
          ))}
        </ListContainer>
      )}
      {purchasedItems.length > 0 && (
        <>
          <h2>Purchased Items with {purchasedItems.length} items</h2>
          <ListContainer>
            {purchasedItems.map((item) => (
              <li key={item._id}>
                <ItemPreview
                  id={item._id}
                  name={item.name}
                  quantity={item.quantity}
                  category={item.category}
                  purchased={item.purchased}
                  onTogglePurchased={() => handleTogglePurchased(item._id)}
                />
              </li>
            ))}
          </ListContainer>
        </>
      )}
    </>
  );
}
