import Link from "next/link";
import styled from "styled-components";


const PreviewItem = styled.div`
  display: block;
  border: 1px solid ${(props) => (props.purchased ? "#bbf7d0" : "grey")};
  border-radius: 0.4rem;
  padding: 1rem;
  margin-bottom: 0.1 rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => (props.purchased ? "#f0fdf4" : "white")};
`;
const ItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ItemInfo = styled.div`
  flex: 1;
`;
const ItemName = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${(props) => (props.purchased ? "grey" : "inherit")};
  text-decoration: ${(props) => (props.purchased ? "line-through" : "none")};
`;

const ItemCategory = styled.span`
  font-size: 0.875rem;
  color: grey;
`;


export default function ItemPreview({ name, quantity, category, id }) {
  return (
    <Link href={`/shoppingItems/${id}`}>
      <PreviewItem id={id}>
        <ItemContent>
          <ItemInfo>
            <ItemName>
              {quantity}x {name}
            </ItemName>
            <ItemCategory>#{category}</ItemCategory>
          </ItemInfo>
        </ItemContent>
      </PreviewItem>
    </Link>
  );
}
