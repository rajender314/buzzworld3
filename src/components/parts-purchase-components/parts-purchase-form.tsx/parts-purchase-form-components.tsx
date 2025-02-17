import styled from 'styled-components';

export const PurchaseFormSideDrawer = styled.div`
  .side-drawer {
    width: 595px !important;
  }
`;
export const PartsPurchaseFormContainer = styled.div`
  padding: 16px 24px;
  height: 100%;
  overflow: auto;
  .css-18ac7c4 .css-17ad2a4-Tabs .css-chp70c {
    flex-direction: column;
  }

  .padding {
    padding: unset;
  }
  .field-detailse {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
`;
export const FormBodyOverFlow = styled.div`
  padding-top: 24px;
  padding-right: 16px;
  padding-left: 16px;
  flex: 1;
  overflow: auto;
`;
export const RequestorInformationFromContainer = styled.div`
  margin: 16px 0;
  margin-top: 0;
`;
export const FormField = styled.div`
  margin-bottom: 12px;

  .css-1g807k0 > span {
    color: #f60a31;
    font-size: 12px;
    font-weight: unset;
  }
`;
export const ContactFormField = styled.div`
  width: 263px;
  // margin-bottom: 20px;
  &.width-100 {
    width: 100%;
  }
`;
export const VendorContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const PartPurchaseAddAnotherRowBtn = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-bottom: 10px;
  flex: 1;
  &.row-del-img-div {
    justify-content: flex-end;
    cursor: default;
  }
  .row-del-img {
    width: 16px;
    height: 18px;
    cursor: pointer;
  }
  .add-row-div {
    display: flex;
    gap: 6px;
    cursor: pointer;
  }
  .add-row-text {
    font-family: Inter;
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: var(--themeBlue800);
  }
  &.repair-select-add-row {
    justify-content: flex-start;
    cursor: default;
  }
`;
export const ItemInfoContainer = styled.div``;
export const CostField = styled.div``;
export const Errormsg = styled.div`
  color: red;
  margin: 8px 4px 0;
`;
export const DateRangePickerDiv = styled.div`
  display: flex;
  flex-direction: column;
  &.fs-14 {
    font-size: 14px;
  }

  &.dt-pkr-bg-unset span[aria-live="assertive"] ~ div {
    /* border: 0.125rem solid #d0daec !important; */
    border-radius: 4px;

    max-height: 36px !important;
    min-height: 36px !important;
    background-color: var(--ds-background-input, #f7faff);
    border-color: var(--ds-border-input, #d0daec) !important;
  }
  &.dt-pkr-bg-unset span[aria-live="assertive"] ~ div:hover {
    background-color: var(--ds-background-input, #fff);
  }
  &.dt-pkr-bg-unset span[aria-live="assertive"] ~ div:focus-within {
    border-color: var(--ds-border-focused, #4c9aff) !important;
    background-color: var(--ds-background-input, #fff);
  }
  div[role="presentation"] {
    margin-bottom: 6px !important;
  }

  .date-range-input {
    height: 36px;
    width: 100%;
    border: 2px solid var(--greyCardBorder);
    border-radius: 6px;
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
      height: 40px;
    }
  }
  &.so-line-date > div > div > div > label {
    /* color: #00a67e; */
    color: #4e586d;

    font-size: 14px;
    font-weight: bold;
    line-height: 1.65;
  }
  &.so-line-date {
    font-size: 14px;
    font-weight: 400;
    label {
      font-weight: 400 !important;
    }
  }
`;
export const RequestorInformationBottomDrawerFooter = styled.div`
  background-color: #fff;
  padding: 12px 24px;
  padding-left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  width: 100%;
  border-top: 1px solid var(--greyCardBorder);
  &.po-sidebar-footer {
    position: unset !important;
    padding: 12px 24px;
  }
`;
export const PartsPurchaseSideDrawerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const PoPopupHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .po-info-form-img {
    height: 40px;
    width: 40px;
  }
  h3 {
    margin: 0 12px;
  }
`;
export const PartsPurchaseTabs = styled.div`
  flex: 1;
  overflow: hidden;
  .pitabs-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    & > div {
      height: 100%;
    }
  }
  div[role="tablist"] {
    padding: 0 30px;
  }
  div[role="tabpanel"] {
    height: 100% !important;
    flex-direction: column;
    overflow: hidden;
  }
`;
export const ItemInfoAddRowContainer = styled.div`
  display: flex;
  &.isDisable {
    opacity: 0.5;
    pointer-events: none;
  }
`;
