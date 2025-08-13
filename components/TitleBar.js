import styled from "styled-components";
import { StyledLink } from "@/components/StyledLink";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #9bcdacff; 
  color: black;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 500;
  margin: 0;
`;

export default function TitleBar() {
  return (
    <Header>
      <Title>Shopping Buddy</Title>
      <StyledLink href="/addItem">+ item</StyledLink> 
    </Header>
  );
}
