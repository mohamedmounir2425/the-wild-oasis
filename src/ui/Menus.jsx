import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenusContext = createContext();
function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({});

  const close = () => setOpenId();
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, setPosition, position }}
    >
      {children}
    </MenusContext.Provider>
  );
}
function useMenus() {
  const context = useContext(MenusContext);
  if (!context) throw new Error("You are outside the context");
  return context;
}

// Menu
function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}
// Toggle
function Toggle({ id }) {
  const { openId, open, close, setPosition } = useMenus();
  const handleClick = (e) => {
    e.stopPropagation();
    openId !== id || openId === "" ? open(id) : close();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
  };
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
// List
function List({ children, id }) {
  const { openId, position, close } = useMenus();
  const ref = useOutsideClick(close, false);
  if (id !== openId) return null;
  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}
// Button
function Button({ children, icon, onClick }) {
  const { close } = useMenus();
  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <StyledButton onClick={handleClick}>
      {icon}
      <span>{children}</span>
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
