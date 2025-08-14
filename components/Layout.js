import TitleBar from "./TitleBar";
import styled, { createGlobalStyle } from "styled-components";
import Head from "next/head";

const GlobalStyles = createGlobalStyle`
  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;
  }

  a:hover {
    color: #96BF8A;
  } 

  h2 {
  font-weight: 500;
  font-size: 1.5rem;
  padding: 0.75rem
  color:  #00412E;
  margin-left: 10px;
  }
`;

const Main = styled.main`
  display: grid;
  gap: 0.5 rem;
  margin-top: 5rem;
  padding: 0.5rem;
  position: relative;
  width: 100%;
  background-color: #E8EAE5;
`;

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Shopping Buddy</title>
      </Head>
      <GlobalStyles />
      <TitleBar />
      <Main>{children}</Main>
    </>
  );
}
