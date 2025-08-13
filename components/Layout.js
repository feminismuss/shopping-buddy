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

  h2 {
  font-weight: 500;
  font-size: 1.5rem;
  padding: 0.75rem
  }
`;

const Main = styled.main`
  display: grid;
  gap: 0.5 rem;
  margin-top: 5rem;
  padding: 0.5rem;
  position: relative;
  width: 95%;
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
