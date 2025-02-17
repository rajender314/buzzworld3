import themeFont from "@app/core/styles/fonts";
import styled from "styled-components";

export const FormBodyOverFlows = styled.div`
  .css-64pf72-Field {
    margin-top: 0px !important;
  }
  .hi {
    padding: 16px 0px 13px 2px;
  }
  padding: 0px 24px;
  flex: 1;
  overflow: auto;
  padding-top: 0;
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
  .multi-select.react-select__control {
    height: 36px !important;
    overflow: unset !important;
    margin-top: 7px;
    border: 0.125rem solid #d0daec !important;
    background-color: #ffffff !important;
  }
`;
export const JobFields = styled.div`
  .css-64pf72-Field {
    margin-top: 0px !important;
  }
  display: flex;
  flex-wrap: wrap;
  padding-top: 24px;
  .width-50 {
    width: calc(50% - 16px);
    margin: 0 8px;
  }
  .stock {
    display: none;
  }

  row-gap: 12px;
  .css-wjj10o-control {
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    /* background-color: #ffffff; */
    /* border-color: var(--ds-border-input, #f4f5f7); */
    border-color: none;
    border-radius: 3px;
    border-style: solid;
    border-width: 2px;
    box-shadow: none;
    cursor: default;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    min-height: 36px;
    outline: 0 !important;
    position: relative;
    -webkit-transition:
      background-color 200ms ease-in-out,
      border-color 200ms ease-in-out;
    transition:
      background-color 200ms ease-in-out,
      border-color 200ms ease-in-out;
    box-sizing: border-box;
    padding: 0;
  }
`;
export const DateRangePickerDivs = styled.div`
  display: flex;
  flex-direction: column;
  .date-range-input {
    height: 36px;
    width: 100%;
    border: 2px solid #d0daec;
    border-radius: 6px;
    /*background-color: #f7faff;*/
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: var(--modelTitleColor);
    padding-left: 7px;
    &:focus {
      border: 1px solid red;
    }

    &::placeholder {
      color: var(--ds-text-subtlest, #5e6c84);
      padding-left: 4px;
      font-family: Inter;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0px;
      text-align: left;
    }
    &.multi-select {
      height: 36px;
    }
  }
`;
export const AsyncLabels = styled.label`
  font-family: ${themeFont}, sans-serif;
  font-style: normal;
  color: #6d7992;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 2px;
  &.quote-date-label {
    color: #4e586d;
    margin-bottom: unset;
  }
`;
export const CreateJobValidationMsg = styled.div`
  color: #f70505;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  width: 90%;
  padding: 0 24px;
`;
export const CreateJobSideDrawerFooter = styled.div`
  background-color: #fff;
  border-top: 1px solid var(--greyCardBorder);
  padding: 12px 24px;
  padding-left: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  &.is-serverMsg {
    justify-content: flex-end;
  }
`;
export const CreateJobButtonContainer = styled.div`
  &.flex-1 {
    flex: 1;
  }
`;
