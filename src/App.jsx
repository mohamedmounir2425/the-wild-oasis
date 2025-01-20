import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const AppStyle = styled.div`
  padding: 1rem;
  background-color: orangered;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AppStyle>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Check in and out</Heading>
        <Button onClick={() => alert("Check in")}>Check in</Button>
        <Button onClick={() => alert("Check out")}>Check out</Button>
        <Heading as="h3">Forms</Heading>
        <Input type="Number" placeholder="Enter Number" />
        <Input type="Number" placeholder="Enter Number" />
      </AppStyle>
    </>
  );
}

export default App;
