import styled from 'styled-components';

export const GridDiv = styled.div`
  padding: 10px 0;
  height: 100%;
  h3 {
    margin: 0;
  }

  .ag-theme-alpine {
    > div {
      height: 100% !important;
    }
  }
  .ag-theme-alpine .ag-header-cell {
    width: unset !important;
    padding-left: 20px !important;
  }
  .model-ag-grid .ag-header-icon {
    padding: 28px;
  }
  .ag-cell-label-container {
  }
`;
export const PopupContainer = styled.div`
  .side-drawer {
    width: 90% !important;
  }
`;
export const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;
