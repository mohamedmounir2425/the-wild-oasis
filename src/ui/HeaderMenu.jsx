import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun, HiOutlineUser } from "react-icons/hi2";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
const StyledHeaderMenue = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
function HeaderMenu() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <StyledHeaderMenue>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={toggleDarkMode}>
          {!isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenue>
  );
}

export default HeaderMenu;
