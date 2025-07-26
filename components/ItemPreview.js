import Link from "next/link";
import styled from "styled-components";

const PreviewItem = styled.div`
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const LinkWrapper = styled.a`
  text-decoration: none;
  color: inherit;
`;

export default function ItemPreview({ name, quantity, category, id }) {
  return (
    <Link href={`shoppingitems/${id}`} passHref>
      <LinkWrapper>
        <PreviewItem>
          <HeaderRow>
            <h3>{name}</h3>
            <p>{quantity}</p>
          </HeaderRow>
          <p>#{category}</p>
        </PreviewItem>
      </LinkWrapper>
    </Link>
  );
}
