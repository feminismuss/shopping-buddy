import Link from "next/link";
import styled, { css } from "styled-components";

export const StyledLink = styled(Link)`
  background-color: #00412E;
  padding: 0.8rem 1.5rem;
  border-radius: 0.6rem;
  color: white;
  border: 1px solid green;
  text-decoration: none;
  font-weight: 500;

  ${({ $justifySelf }) =>
    $justifySelf &&
    css`
      justify-self: ${$justifySelf};
    `}

  ${({ $variant }) =>
    $variant === "outlined" &&
    css`
      text-align: center;
      background-color: white;
      border: 1px solid black;
    `}
`;
