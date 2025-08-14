import styled from "styled-components";
import ItemPreview from "@/components/ItemPreview";
import useSWR from "swr";
import { StyledLink } from "@/components/StyledLink";
import { useState } from "react";

const ListContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;
const FilterBar = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;
const CategoryLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.9rem;
  cursor: pointer;
`;

export default function HomePage() {
  const { data, error, isLoading, mutate } = useSWR("/api/shoppingItems");
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: loadingCategories,
  } = useSWR("/api/categories");

  const [selectedCategories, setSlectedCategories] = useState([]);

  if (isLoading || loadingCategories) return <p>Loading Shoppinglist</p>;
  if (error || categoriesError)
    return <p>Error while loading: {error.message}</p>;
  if (!data || !categoriesData) return null;

  const categories = categoriesData.map((cat) => cat.name);

  const handleCategoryChange = (category) => {
    setSlectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filterlogik für mehrere Kategorien
  const filteredData =
    selectedCategories.length === 0
      ? data
      : data.filter((item) => selectedCategories.includes(item.category));

  // Toggle-Funktion mit optimistic update
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

  // Aufteilen in offene & gekaufte Items
  const unpurchasedItems = filteredData.filter((item) => !item.purchased);
  const purchasedItems = filteredData
    .filter((item) => item.purchased)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <>
      <FilterBar>
        {categories.map((cat) => (
          <CategoryLabel key={cat}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
            />
            #{cat}
          </CategoryLabel>
        ))}
      </FilterBar>
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
