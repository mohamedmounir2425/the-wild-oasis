import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const AppStyle = styled.div`
  padding: 1rem;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AppStyle>
        <Row type="vartical">
          <Row>
            <Heading as="h1">The Wild Oasis</Heading>
            <div className="">
              <Heading as="h2">Check in and out</Heading>
              <Button onClick={() => alert("Check in")}>Check in</Button>
              <Button
                size="small"
                variation="secondary"
                onClick={() => alert("Check out")}
              >
                Check out
              </Button>
            </div>
          </Row>
          <Row type="vartical">
            <Heading as="h3">Forms</Heading>
            <form>
              <Input type="Number" placeholder="Enter Number" />
              <Input type="Number" placeholder="Enter Number" />
            </form>
          </Row>
        </Row>
      </AppStyle>
    </>
  );
}

export default App;
