import styled from "styled-components";

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  background-color: yellow;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  background-color: purple;
  color: white;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  margin: 0.5rem;
`;
const Input = styled.input`
  font-size: 1.5rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid #ddd;
`;
const AppStyle = styled.div`
  padding: 1rem;
  background-color: orangered;
`;

function App() {
  return (
    <AppStyle>
      <H1>Hello Wild Oasis</H1>
      <Button onClick={() => alert("Check in")}>Check in</Button>
      <Button onClick={() => alert("Check out")}>Check out</Button>
      <Input type="Number" placeholder="Enter Number" />
      <Input type="Number" placeholder="Enter Number" />
    </AppStyle>
  );
}

export default App;
