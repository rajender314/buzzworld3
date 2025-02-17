import {
  hoverColor,
  TextGrayColor,
  TextGrayDark,
} from "@app/core/styles/colors";
import styled from "styled-components";

export const SalesOrderInfoDatePickers = styled.div`
  width: 100%;
`;

export const FormContainer = styled.div`
  margin-bottom: 24px;
`;
export const Socontainer = styled.div`
  .side-drawer {
    width: 860px !important;
  }
`;
export const FieldContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
`;
export const StockLineItemCard = styled.div`
  /* padding: 16px; */
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 1px 1px 10px rgb(0 0 0 / 6%);
  margin: 4px 4px 16px -2px;
  border-radius: 6px;
  font-size: 14px;
  color: ${TextGrayColor};
  font-weight: 500;
  line-height: 1.65;
  transition: all 0.3s ease;
  //   &:not(:last-child) {
  //     border-bottom: 2px solid var(--greyCardBorder);
  //   }
  & > div {
    // display: flex;
    // gap: 16px;
    .d-flex {
      display: flex;
    }
    // .flexed {
    //   flex: 1;
    // }
    .container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: flex-start;
      > .on-qty-edit {
        width: 24% !important;
      }
    }
    & .align-right {
      text-align: right;
    }

    &.width-23 {
      width: 23%;
    }
    h4 {
      margin: 0;
    }
    .ship_container {
      display: flex;
      gap: 8px;
      align-items: center;
      .quote-date-label {
        margin-top: 4px;
      }
      > div {
        width: 132px;
      }
    }
    .w-75px {
      width: 75px;
    }
    .align-center {
      align-items: center;
    }

    .g-8 {
      gap: 8px;
    }
    .with-border-bottom {
      display: flex;
      justify-content: space-between;
      padding-bottom: 16px;
    }
    .line-clamp {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      &.three-lines {
        -webkit-line-clamp: 3;
        color: #1976d2;
      }
      &.two-lines {
        -webkit-line-clamp: 2;
      }
    }
  }
  .fs-16 {
    font-size: 16px;
  }
  .fs-10 {
    font-size: 14px;
    font-weight: bold;
  }
  .semiBoldWt {
    font-weight: 600;
  }
  .color-dark {
    color: ${TextGrayDark};
  }
  .m-0 {
    margin: 0;
  }
  .mb-8 {
    margin-bottom: 8px;
  }
  .items-ellipse {
    // width: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ware-house {
    // width: 60px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &:hover {
    /* background-color: ${hoverColor}; */
    /*.action-item.show-details {
      display: flex;
    }*/
  }

  &.total-sum-details {
    padding: 10px 20px;
    > div {
      justify-content: end;
    }
  }
  .width-20 {
    width: 20%;
  }
  .width-23 {
    width: 23%;
  }

  .item-value-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const CardHeader = styled.div`
  display: flex;
  padding: 16px;
  background-color: var(--logHistoryCardBgColor);
  color: #4e586d;
  align-items: center;

  /* justify-content: space-between; */
`;
export const CardBody = styled.div`
  padding: 24px;
  p {
    font-size: 14px;
  }
`;
export const Container = styled.div`
  display: flex;
  gap: 16px;
  .on-qty-edit {
    /* width: 24% !important; */
    padding-top: 2px !important;
  }
  .select-label .field-label-div label {
    font-weight: 400 !important;
    font-size: 14px;
  }
  .pi-select-wrapper {
    padding-top: 2px;
  }

  /* row-gap: 24px; */
  /* justify-content: space-between; */
`;

export const SoErrorMsgs = styled.div`
  color: red;
  font-weight: 500;
  margin-bottom: 16px;
  background: #f2f7ff;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 110px;
`;
export const LineShipeDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 8px;
  width: calc(33% - 16px);
  margin-bottom: 16px;
  font-size: 14px;
  /* color: #6d7992; */
  color: #4e586d;
  font-weight: 400;
  line-height: 1.65;

  > p {
    > img.edit-icon,
    .isHidden {
      /* width: 12px;
      height: 12px; */
      /* display: flex; */
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s ease;
    }
    &:hover {
      img.edit-icon {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  > span {
    /* color: #00a67e; */
    color: #6d7992 !important;
  }
  > h4 {
    > span {
      /* color: #af1515 !important; */
      color: #1976d2 !important;
      font-weight: 700;
      font-size: 14px;
    }
  }
`;
export const CheckboxContainer = styled.div`
  /* height: 32px;
  width: 32px; */
  display: flex;
  align-items: center;
  gap: 8px;

  > div > label > input {
    cursor: pointer;
  }
  &.collect-checkbox {
    position: absolute;
    top: -6px;
    left: 160px;
  }
`;
export const ItemNotesContainer = styled.div`
  > div > div > label {
    font-size: 16px;
  }
`;
export const ProductClassContainer = styled.div`
  width: 30%;
  display: flex;
  /* align-items: center; */
  margin-bottom: 24px;
  > p {
    > img.edit-icon,
    .isHidden {
      /* width: 12px;
      height: 12px;
      display: flex; */
      cursor: pointer;
      margin-left: 4px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s ease;
    }
    &:hover {
      > img.edit-icon {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  .select-label .field-label-div label {
    font-size: 14px;
    font-weight: 400;
    color: #4e586d;
  }
  .select-label .undo-icon,
  .tick-icon {
    cursor: pointer;
    /*box-shadow: 0px 0px 2px rgb(0 0 0 / 12%), 0px 20px 20px rgb(0 0 0 / 8%);*/
    max-height: 24px !important;
    max-width: 24px !important;
  }
  > div {
    padding-top: 2px;
  }
`;
export const ProductClassLabel = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #6d7992;
  line-height: 1.65;
`;
export const ProductClassValue = styled.span`
  color: #2e374a;
  font-size: 16px;
  font-weight: 700 !important;
`;

export const ShippingInstructionsContainer = styled.div`
  width: 100%;
  &.manufacter-select {
    .react-select.__control {
      max-height: 36px !important;
      min-height: 36px !important;
      background-color: var(--ds-background-input, #f7faff);
      border-color: var(--ds-border-input, #d0daec) !important;
    }
    .react-select.__value-container {
      margin-bottom: 4px !important;
    }
  }
  .margin {
    margin: 8px 0px;
    margin-top: 12px;
  }

  .text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .react-select__control {
    margin-top: 8px;
    max-height: fit-content !important;
    height: 36px !important;
    border-radius: 4px;
  }
  position: relative;
`;
