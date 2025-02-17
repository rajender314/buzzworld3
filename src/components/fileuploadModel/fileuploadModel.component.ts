import styled from "styled-components";
import themeFont from "@app/core/styles/fonts";
import WarningIcon from "@app/assets/images/warning_icon.svg";

export const UploadModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    cursor: pointer;
  }
`;

export const ButtonDivTag = styled.div`
  display: flex;
  .Export-link {
    margin-left: 20px;
  }
`;
export const TextEle = styled.div`
  font-family: ${themeFont};
`;

export const ImgTag = styled.img`
  display: flex;
  cursor: pointer;
  text-decoration: none;

  // width: 36px;
  // height: 36px;
  // background: transparent;
  // border: 2px solid #11508e;
  // box-sizing: border-box;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // border-radius: 4px;
  // margin-right: 4%;
`;

export const UploadImgDiv = styled.img`
  cursor: pointer;
  // float: right;
  // position: relative;
  // bottom: 32px;
  // cursor: pointer;
`;

export const UploadNote = styled.small`
  // font-family: ${themeFont};
  font-style: normal;
  font-weight: normal;
  line-height: 20px;

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  margin: 0 0 8px;
  /* margin-top: 0; */
  color: #8e99b2;
  &.for-add-repair {
    justify-content: flex-start;
  }
  &.for-file-error-msg {
    color: red;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 4px 4px;
  }
  &.for-item-range-notes {
    justify-content: flex-start;
  }
`;

export const DragSection = styled.div`
  font-family: ${themeFont};
  padding: 29px;
  color: #4e586d;

  /* border: 1px solid #6d7992; */
  margin-top: 11px;
  .file-type-label {
    font-family: ${themeFont}, sans-serif;
    font-style: normal;
    color: #4e586d;
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
    margin: 0;
    text-align: center;
  }
  .branch-valid-msg {
    color: red;
    font-family: ${themeFont};
  }
  label {
    font-family: ${themeFont};
  }
`;

export const UploadIcon = styled.img`
  /* position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%); */
  /* display: flex;
  justify-content: center; */
  cursor: pointer;
`;
export const UploadIconNext = styled.img`
  position: absolute;
  top: 62px;
  left: 50%;
  transform: translateX(-50%);
`;

export const UploadDiv = styled.div`
  font-family: ${themeFont};
  position: relative;
  margin-top: 12px;
  .invalid-file-error {
    text-align: center;
    color: #af1515;
  }
  .valid-file {
    text-align: center;
    color: #068f06;
    margin: 2px 0;
  }
  .uploaded-file-name {
    text-align: center;
    margin: 8px 0px;
    color: #2e374a;
    font-size: 14px;
  }
`;

export const ImportPopupContainer = styled.div`
  font-family: "${themeFont}";
  /*padding: 0px 24px;*/
  .branch {
    margin-top: 8px;
    margin-right: 16px;
    //padding: 0px 10px;
    /* margin-left: 15px; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 16px;
    gap: 6px;
  }
  .select-container {
    width: 220px;
    .pi-select-wrapper {
      .react-select__control {
        margin: unset !important;
      }
    }
    /* padding: 11px 0px 11px 0px; */
    /* border: 1px solid #6d7992; */
    /*display: flex;
    .select-width {
      width: 100%;
      .react-select__control {
            max-width: 224px;
      }
    }*/
  }
  .branch-label-container {
    display: flex;
    justify-content: flex-start;
    width: 100px;
    align-items: center;
  }
  .branch-label-container .label-text {
    font-size: 14px;
    font-weight: 700;
  }
  .selectParentDiv {
    display: flex;
    gap: 8px;
    align-items: center;
    .checkbox-field {
      width: auto;
      margin-top: 18px;
      margin-right: 10px;
    }
  }
`;

export const RowContainer = styled.div`
  width: 100%;
  display: flex;
  /* padding: 32px; */
  padding: 32px 0px;
  /* margin: 0 -16px; */
  & > div.file-import-box {
    width: calc(100% / 2 - 24px);
    margin: 0 16px;
    background-color: #f2f7ff;
    border: 2px dashed;
    border-color: #bbdefb;
    border-radius: 8px;
  }
`;

export const BrowseBtn = styled.label`
  .browse-text {
    font-family: ${themeFont};
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    margin: 0;
  }
  width: 100%;
  text-align: center;
  border-radius: 6px;
  border: 1px solid #ccc;
  display: inline-block;
  padding: 8px;
  background: var(--themeBlue900);
  color: #fff;
  cursor: pointer;
  box-sizing: border-box;
`;

export const InputEle = styled.input`
  display: none;
`;
export const ProgressPercent = styled.p`
  // font-family: ${themeFont};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  color: #19836a;
`;
// f2f3f4
export const ErrorlogPanel = styled.div`
  background: white;
  border-radius: 8px;
  // padding: 12px;
  // margin-top: 16px;
  &:last-of-type {
    margin-bottom: 16px;
  }
  .error-logs {
    color: red;
    padding: 10px 36px;
  }
  .prod-label {
    font-family: ${themeFont};
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0px;
    color: #6d7992;
    margin: 0;
  }
  .error-list-table {
    display: flex;
    .error-name {
      padding: 10px;
      border: 1px solid;
      height: 34px;
      align-items: center;
      // display: flex;
    }
    .error-mismatch {
      background: #f8dbd9;
      padding: 10px;
      border: 0px;
      height: 34px;
      align-items: center;
      // display: flex;
      color: #dc4b43;
    }
  }
  .format-label {
    margin: 0;
    margin-bottom: 5px;
    color: #6d7992;
    font-weight: 600;
    font-size: 16px;
    font-family: ${themeFont};
  }
  .overflow-table {
    max-width: 100%;
    overflow-y: hidden !important;
    overflow: auto;
    margin-bottom: 16px;
    .error-list-table {
      width: 100%;
      border-collapse: collapse;
      /*height: 40px;*/
      font-family: ${themeFont};
      font-size: 14px;

      .error-name {
        padding: 8px;
        border: 1px solid #eaeaea;
        font-weight: 600;
        align-items: center;
        color: #6d7992;
        height: auto;
      }
      .error-mismatch {
        background: #f8dbd9;
        padding: 10px;
        border: 0px;
        height: 34px;
        align-items: center;
        // display: flex;
        color: #dc4b43;
        height: auto;
      }
    }
    thead {
      background: #f2f3f4;
    }

    tr {
      display: flex;
      /*height: 40px;*/
      background-color: white;
    }
  }
  .grid-div {
    margin: 10px 0;
    .model-ag-grid {
      height: 240px !important;
      span.ag-icon.ag-icon-menu {
        display: none !important;
      }
    }
  }
`;

export const InsideHeaderLabel = styled.div`
  color: violet;
  margin-bottom: 16px;
  .label-text {
    font-weight: 600;
    font-size: 14px;
    font-family: ${themeFont};
  }
  .description {
    font-weight: normal;
    font-size: 14px;
    font-family: ${themeFont};
    padding-left: 6px;
  }
`;

export const InsideHeaderLabelTwo = styled.div`
  .label-text {
    font-weight: 600;
    font-size: 14px;
    font-family: ${themeFont};
  }
  .description {
    font-weight: normal;
    font-size: 14px;
    font-family: ${themeFont};
    padding-left: 6px;
  }
`;

export const ErrorLogDiv = styled.div`
  display: flex;
  &.error-msg {
    color: #dc4b43 !important;
    padding: 13px 5px;
    border: 1px solid #eaeaea;
    background: #f8dbd9 !important;
    border-radius: 3px;
    margin-bottom: 16px;
  }
  margin-top: 8px;
  .log-status-text {
    font-family: ${themeFont};
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: #068f06;
  }
  .viewerror-text {
    color: blue;
    padding: 2px 3px;
    text-decoration: underline;
    cursor: pointer;
    font-family: ${themeFont};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
  }
  .error-log-text {
    color: #dc4b43;
    padding: 2px 12px;
  }
`;
export const FooterBtn = styled.div`
  padding: 10px;
`;
export const ProductsListDiv = styled.div`
  max-height: 200px;
  overflow-y: scroll;
`;
export const SpinnerDiv = styled.div`
  &.div {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
    height: 100%;
    text-align: center;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 102px;
  // min-height: px;
  flex-direction: column;
  height: 100%;
  z-index: 9999;
`;
export const DatePickerDiv = styled.div`
  display: flex;
  margin: 0 -8px;
  gap: 20px;
  & > div {
    width: calc(100% / 2 - 16px);
  }
  .css-1g807k0 {
    margin-left: 4px;
  }
`;
export const ServerValidation = styled.p`
  color: red;
`;

export const DateStyles = styled.div`
  small {
    margin: 8px;
    color: red;
    font-family: ${themeFont};
  }
  label {
    font-weight: 600 !important;
    font-size: 14px !important;
    font-family: ${themeFont};
  }
`;
export const CodeMismatchError = styled.div`
  div {
    display: flex;
  }
`;

export const PiLabelName = styled.div`
  p {
    margin: 0 !important;
  }
`;

export const PopupHeaderContentDiv = styled.div`
  width: 100%;
  text-align: center;
  hr {
    margin: 0 24px;
    border-width: 0;
    height: 1px;
    // background:
  }
  h3 {
    margin: 0;
    color: #2e374a;
  }
  > div {
    padding: 10px !important;
  }
`;

export const PopupHeaderDiv = styled.div`
  display: flex;
  width: 100%;
  /* text-align: center; */
  align-items: center;
  justify-content: space-between;
  .Back-arrow {
    display: flex;
    flex: 0.4;
  }
  hr {
    margin: 0;
  }
  h3 {
    margin: 0;
    font-family: ${themeFont}, sans-serif;
    font-style: normal;
    color: rgb(109, 121, 146);
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &.show > h4 {
    margin: 0;
  }
`;

export const ImportFileFooter = styled.div`
  > div {
    padding: 20px 40px;
  }
  &.footer {
    display: flex;
    justify-content: flex-end;
  }
`;

export const PricingDisclaimer = styled.div`
  .message {
    font-family: ${themeFont}, sans-serif;
    background: #fff0d7;
    padding: 8px;
    border-radius: 4px;
    color: #2e374a;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 4px 15px 0 15px;
    &::before {
      content: "";
      background-image: url(${WarningIcon});
      height: 20px;
      width: 20px;
      background-repeat: no-repeat;
      position: relative;
      top: 2px;
    }
  }
`;
export const DownloadIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  margin: 10px 0;
`;
