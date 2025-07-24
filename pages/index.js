import styled from "styled-components";
import ItemPreview from "@/components/ItemPreview";
import useSWR from "swr";
import { StyledLink } from "@/components/StyledLink";

const ListContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
`;

export default function HomePage() {
  const { data, error, isLoading } = useSWR("/api/shoppingItems");

  if (isLoading) return <p>Bilder werden aus dem Keller geholt</p>;
  if (error) return <p>Fehler beim Laden: {error.message}</p>;
  if (!data) return null;

  return (
      <ListContainer>
        {data.map((shoppingItem) => (
          <li key={shoppingItem._id}>
            <ItemPreview
              name={shoppingItem.name}
              quantity={shoppingItem.quantity}
              category={shoppingItem.category}
            />
          </li>
        ))}
      </ListContainer>
  );
}
