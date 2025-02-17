import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 14px;
  nav[aria-label="pagination"] {
    > div {
      gap: 6px;
    }
  }
`;
export const TableDataScroll = styled.div`
  min-height: 200px;
  height: 100%;
`;
export const TabParentDiv = styled.div`
  height: 100%;
  > div {
    height: 100%;
  }
`;

export const SelectItemsSpinner = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
