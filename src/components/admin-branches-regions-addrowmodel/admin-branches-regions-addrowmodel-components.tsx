import styled from "styled-components";

const BranchesInnerBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 8px;
  > div {
    width: calc(100% / 2 - 16px);
    /* margin: 0 8px; */
  }
  &.zip-codes-container {
    > div {
      width: 100% !important;
    }
  }
`;
export default BranchesInnerBody;
