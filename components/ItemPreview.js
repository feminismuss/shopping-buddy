import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const previewItem = styled.div`
  background: white;
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 0, 5rem;
`;

export default function ItemPreview({ name, quantity, category }) {
  return (
    <previewItem>
      <h2>{name}</h2>
      <p>{quantity}</p>
      <p>{category}</p>
    </previewItem>
  );
}
