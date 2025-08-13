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
    color: #77af46ff;
  }
    h1 {
    text-align: center;}
    
`;

const Main = styled.main`
  display: grid;
  gap: 0.5rem;
  margin-top: 5rem;
  padding: 0.5rem;
  position: relative;
  width: 100%;
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
