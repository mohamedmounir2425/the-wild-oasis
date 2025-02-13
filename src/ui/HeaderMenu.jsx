import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
const StyledHeaderMenue = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenue>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenue>
  );
}

export default HeaderMenu;
