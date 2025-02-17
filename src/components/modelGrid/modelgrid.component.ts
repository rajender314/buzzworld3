import styled from 'styled-components';

export const LabelNamesDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 1px solid #e3eaf6;
  background: #f9fbff;
  padding: 20px;
  margin-bottom: 24px;
  .div {
    display: flex;
    .pi-label {
      width: calc(25% - 8px);
    }
  }
  .label-text {
    font-weight: normal;
    font-size: 14px;
    font-family: Inter;
    color: #4e586d;
  }
  .description {
    font-weight: 700;
    font-family: Inter;
    padding-left: 6px;
  }
`;
export const ModelGridDiv = styled.div`
  /* padding-bottom: 24px; */
  /* margin: 0px 8px; */
  .ag-theme-alpine {
    // height: 27vh !important;
  }
  .ag-cell {
    display: inline-block;
    position: absolute;
    white-space: nowrap;
    // transition: 0.3s !important;
    transition-timing-function: ease !important;
    text-align: right !important;
    font-family: Inter;
    line-height: 20px;
    padding: 5px;
    border: 0px;
    height: 32px;
  }
  .ag-header-cell-label {
    color: #6d7992;
  }
  &.past-repair-invoice-grid .header-align-left .ag-header-cell-label {
    color: #6d7992;
    justify-content: end !important;
    .ag-theme-alpine .ag-header-cell {
      padding-right: unset !important;
    }
  }
  .ag-theme-alpine .ag-row:hover {
    background-color: unset !important;
  }
  &.past-repair-invoice-grid {
    .ag-theme-alpine .ag-header-cell {
      padding-right: unset !important;
    }
    // .aggrid-pixel-spinner {
    //   top: 26%;
    // }
  }

  .model-ag-grid
    .ag-cell.ag-cell-not-inline-editing.ag-cell-normal-height.ag-cell-value {
    justify-content: center !important;
  }
`;
