import styled from "styled-components";

const FiltersResetContainer = styled.div`
  &.open {
    &::before {
      content: "";
    }
  }
  cursor: pointer;
  position: relative;
  left: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
export default FiltersResetContainer;
