import styled from "styled-components";
import useSWR from "swr";
import { StyledLink } from "@/components/StyledLink";

const ListContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;
const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;


export default function HomePage() {
  return (
    <div>
      <h1>Hello from Next.js</h1>
    </div>
  );
}
