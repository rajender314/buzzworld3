import styled from "styled-components";
import themeFont from "@app/core/styles/fonts";

export const RmaFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding-top: 16px;

  .width-50 {
    width: calc(50% - 8px);
    /* margin: 0 8px; */
  }
  .width-100 {
    /* width: calc(100% - 8px); */
    width: 100%;
    /* margin: 0 8px; */
    display: flex;
    flex-direction: column;
    .multi-select.react-select__value-container {
      height: 60px;
    }
  }
  .checkbox-form-field {
    margin-bottom: 8px;
  }
  .calc-width-33 {
    width: calc(33% - 16px);
    margin: 0 8px;
  }
  row-gap: 8px;
  .radios {
    > div {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    }

    div[role="radiogroup"] {
      justify-content: flex-start;
    }
  }
  .assign-tech {
    .pi-select-wrapper .select-label {
      padding-bottom: unset !important;
    }
  }
  .pd-0 {
    input {
      padding-left: 6px !important;
    }
  }
  .pd-3 {
    .select-label {
      padding-top: 3px !important;
    }
  }
  .m-0 {
    .react-select__control {
      margin: 0 !important;
    }
  }
`;

export const TextAreaField = styled.div`
  width: calc(100% - 16px);
  margin: 8px 8px;
`;

export const AsyncLabel = styled.label`
  font-family: ${themeFont}, sans-serif;
  font-style: normal;
  color: #6d7992;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  /* margin-bottom: 4px; */
  &.quote-date-label {
    color: #4e586d;
    margin-bottom: unset;
  }

  &.mandatory::after {
    content: "*";
    padding-left: 4px;

    color: red;
  }
  &.collet-check-box {
    margin: 0 -8px;
  }
`;
export const CmpanyOptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  .cmpny_name {
    font-size: 14px;
    font-weight: 800 !important;
  }
  .account_no {
    /*font-weight: 600 !important;*/
    font-size: 12px;
  }
  .cmpny_address {
    font-size: 12px;
  }
`;

export const SideDrawerW40 = styled.div`
  /*width: 40% !important;*/
  .side-drawer {
    width: 40% !important;
  }
`;
