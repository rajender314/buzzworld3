import styled from "styled-components";

export const StorageLocationField = styled.div`
  padding: 18px 0px;
  width: 60%;
`;
export const ProgressBarDiv = styled.div`
  width: 100%;
  position: relative;
  top: 4px;
`;
export const UploadFileName = styled.div`
  color: #2e374a;
  font-size: 12px;
  font-weight: 400;
  text-transform: capitalize;
`;
export const UploadFileSize = styled.div`
  color: #000000b2;
  font-size: 12px;
  font-weight: 400;
`;

export const UploadItemData = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
`;

export const UploadedDataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 1px;
`;
export const FileItemList = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const CloseIconRight = styled.div`
  cursor: pointer;
  img {
    width: 16px;
    height: 16px;
  }
`;
export const PreviewText = styled.div`
  color: #1976d2;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
export const UploadedDefaultImg = styled.img`
  height: 24px;
  width: 18px;
`;
export const ProgressSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const FormBodyOverFlow = styled.div`
  &.pos-grid-container {
    .ag-theme-alpine {
      .ag-paging-panel {
        .ag-paging-page-summary-panel {
          display: none !important;
        }
      }
    }
  }
  &.scrollArea {
    padding: 24px;
  }
  &.responsive {
    @media screen and (min-width: 1544px) {
      width: 80%;
    }
  }
  .hi {
    padding: 16px 0px 13px 2px;
  }
  /* padding: 22px; */
  padding: 0px 24px;

  flex: 1;
  overflow: auto;
  /* padding-top: 22px; */
  &.warehouse-deatil {
    margin-top: 24px;
    padding: 0px !important;
  }
  &.flex-unset {
    flex: unset;
  }
  &.pb-zero {
    padding-bottom: 0;
  }
  &.overflow-unset {
    overflow: unset;
  }
  .client-options-list {
    font-size: 16px;
    color: var(--modelTitleColor);
    font-weight: bold;
    font-family: var(--themeFont);
  }
  .confirm-popup-options-heading {
    color: #4e586d;
    font-weight: 600;
    font-family: var(--themeFont);
    font-size: 15px;
  }
  &.side-bar {
    margin: 16px 0px;
    padding: 0px 25px;
    flex: 1;
    height: unset !important;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  .header-align-left {
    .ag-header-cell-label {
      justify-content: end !important;
    }
  }
  .ag-header-justify-center {
    .ag-header-cell-label {
      justify-content: center !important;
    }
  }
  .header-justify-start {
    .ag-header-cell-label {
      justify-content: flex-start !important;
    }
  }
  .ag-header-cell {
    padding-right: 4px !important;
  }
  .pp-add-fields-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;
