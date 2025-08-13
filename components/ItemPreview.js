import Link from "next/link";
import styled from "styled-components";
import { Circle, CheckCircle2 } from "lucide-react";

const PreviewItem = styled.div`
  display: block;
  border: 1px solid ${(props) => (props.$purchased ? "#bbf7d0" : "grey")};
  border-radius: 0.4rem;
  padding: 0.75rem;
  margin-bottom: 0.1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => (props.$purchased ? "#f0fdf4" : "white")};
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
  mutate,
}) {
  const handleTogglePurchased = async (event) => {
    event.preventDefault(); // verhindert Link-Navigation
    try {
      const res = await fetch(`/api/shoppingItems/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to toggle purchased");
      await mutate();
    } catch (error) {
      console.error("Failed to toggle purchased status:", error);
    }
  };

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
        <ToggleButton onClick={handleTogglePurchased}>
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
