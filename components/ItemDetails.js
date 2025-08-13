import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { StyledImage } from "./StyledImage";

export default function ItemDetails({ item }) {
  const { quantity, imageUrl, name, category, comment, id } = item;

  const isValidSrc =
    imageUrl &&
    (imageUrl.startsWith("/") ||
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://"));

  const fallBackSrc = "/shopping-bag.png";
  return (
    <Article>
      <Figure>
        <ImageContainer>
          <StyledImage
            src={isValidSrc ? imageUrl : fallBackSrc}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt=""
          />
        </ImageContainer>
        <figcaption>
          <strong>{name}</strong>
          <p>{quantity}</p>
        </figcaption>
        <p>#{category}</p>
        <p>{comment}</p>
      </Figure>
    </Article>
  );
}
const Article = styled.article`
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 0.5rem;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
  margin-bottom: 20px;
`;

const Figure = styled.figure`
  color: black;
  position: relative;
  margin: 0;
  padding: 0;
  line-height: 0.2rem;
`;
