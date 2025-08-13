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
const FixedLink = styled(StyledLink)`
  position: fixed;
  top: 60px;
  right: 50px;
`;

export default function HomePage() {
  const { data, error, isLoading, mutate } = useSWR("/api/shoppingItems");

  if (isLoading) return <p>Loading Shoppinglist</p>;
  if (error) return <p>Error while loading: {error.message}</p>;
  if (!data) return null;

  return (
    <>
      <ListContainer>
        {data.map((shoppingItem) => (
          <li key={shoppingItem._id}>
            <ItemPreview
              id={shoppingItem._id}
              name={shoppingItem.name}
              quantity={shoppingItem.quantity}
              category={shoppingItem.category}
              purchased={shoppingItem.purchased}
              mutate={mutate}
            />
          </li>
        ))}
      </ListContainer>
      <FixedLink href="/addItem">+ item</FixedLink>
    </>
  );
}
