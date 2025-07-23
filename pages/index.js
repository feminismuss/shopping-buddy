import styled from "styled-components";
import ItemPreview from "@/components/ItemPreview";
import useSWR from "swr";
import { StyledLink } from "@/components/StyledLink";

const ListContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;

export default function HomePage() {
  const { data } = useSWR("/api/shoppingItems", { fallbackData: [] });
  return (
    <>
      <ListContainer>
        {data.map((shoppingItem) => {
          <li key={shoppingItem._id}>
            <ItemPreview
              name={shoppingItem.name}
              amount={shoppingItem.amount}
              category={shoppingItem.category}
            />
          </li>;
        })}
      </ListContainer>
    </>
  );
}
