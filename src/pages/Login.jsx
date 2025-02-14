import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as={"h4"}>Login to your account</Heading>
      <LoginForm />
      {/* here i check if the level security work because i change the Row level security to be autheticated users only can fetch apis */}
      {/* <CabinTable /> */}
    </LoginLayout>
  );
}

export default Login;
