import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  background-color: yellow;
`;

const AppStyle = styled.div`
  padding: 1rem;
  background-color: orangered;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AppStyle>
        <H1>Hello Wild Oasis</H1>
        <Button onClick={() => alert("Check in")}>Check in</Button>
        <Button onClick={() => alert("Check out")}>Check out</Button>
        <Input type="Number" placeholder="Enter Number" />
        <Input type="Number" placeholder="Enter Number" />
      </AppStyle>
    </>
  );
}

export default App;
