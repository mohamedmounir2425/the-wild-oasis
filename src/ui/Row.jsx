import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  /* horizontal */
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  /* vartical */
  ${(props) =>
    props.type === "vartical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;
Row.defaultProps = {
  type: "horizontal",
};
export default Row;
