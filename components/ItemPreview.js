import Link from "next/link";
import styled from "styled-components";
import { Circle, CheckCircle2 } from "lucide-react";

const PreviewItem = styled.div`
  display: block;
  border: 1px solid ${(props) => (props.$purchased ? "#96BF8A" : "grey")};
  border-radius: 0.4rem;
  padding: 0.75rem;
  margin-bottom: 0.1rem;
  background-color: ${(props) => (props.$purchased ? "#f0fdf4" : "white")};
  width: 95%;
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
  color: ${(props) => (props.$purchased ? "grey" : "inherit")};
  text-decoration: ${(props) => (props.$purchased ? "line-through" : "none")};
  margin-bottom: 0.2rem;
`;

const ItemCategory = styled.span`
  font-size: 0.875rem;
  color: grey;
`;
const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export default function ItemPreview({
  name,
  quantity,
  category,
  id,
  purchased,
  onTogglePurchased,
}) {
  return (
    <PreviewItem id={id} $purchased={purchased}>
      <ItemContent>
        <Link href={`/shoppingItems/${id}`}>
          <ItemInfo>
            <ItemName $purchased={purchased}>
              {quantity}x {name}
            </ItemName>
            <ItemCategory>#{category}</ItemCategory>
          </ItemInfo>
        </Link>
        <ToggleButton
          onClick={(e) => {
            e.preventDefault();
            onTogglePurchased(id);
          }}
        >
          {purchased ? (
            <CheckCircle2 color="green" size={22} />
          ) : (
            <Circle size={22} />
          )}
        </ToggleButton>
      </ItemContent>
    </PreviewItem>
  );
}
