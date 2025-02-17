import styled from 'styled-components';

export const SideDrawerFooter = styled.div`
  background-color: #fff;
  border-top: 1px solid var(--greyCardBorder);
  padding: 12px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  position: relative;
  &.sp-filter-footer-btns {
    border-top: unset;
    justify-content: flex-end;
    gap: 8px;
    button {
      height: 32px !important;
      width: calc(100% - 16px);
      /*padding-top: 2px;*/
      align-items: center;
      border-radius: 6px;
    }
  }
  .Decline {
    cursor: pointer;
    button {
      padding: 9px 26px;
      color: #dc4b43;
      border: 2px solid #dc4b43;
      border-radius: 3px;
      background: white;
      cursor: pointer;
    }
  }
  &.d-none {
    display: none;
  }
  &.padding-x-zero {
    padding-right: 0;
    padding-left: 0;
  }
  .server-msg {
    margin-right: auto;
  }
`;

export const AddPartItemContainer = styled.div`
  h6,
  h4 {
    margin: 14px 1px;
    color: var(--modelTitleColor);
  }
`;

export const FieldsDisplayFlex = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  margin-bottom: 16px;

  .select-label {
    padding-bottom: 0px;
  }
`;
export const AsyncSelectDiv = styled.div`
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
    /* > div {
      border: 0.125rem solid #d0daec;
      border-radius: 4px;
      max-height: 36px !important;
      background-color: #f7faff;
      min-height: 36px !important;
    } */
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
  }
  .select-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div.save-reset-icons {
      display: flex;
      gap: 16px;
    }
    .field-label-div {
      display: flex;
    }
    .tick-icon,
    .undo-icon {
      border-radius: 4px;
      cursor: pointer;
      /*box-shadow: 0px 0px 2px rgb(0 0 0 / 12%), 0px 20px 20px rgb(0 0 0 / 8%);*/
      max-height: 32px;
      max-width: 32px;
      align-items: center;
      display: flex;
      justify-content: center;
      background: #f7faff;
      border: 1px solid transparent;
      padding: 4px;
      &:hover {
        border: 1px solid #d0daec;
      }
    }
    .mandatory-star {
      color: red;
      padding-left: 4px;
    }
  }
  &.quote-add-company {
    .react-select__control {
      height: 36px !important;
      margin-top: 4px;
      .react-select__menu {
        position: relative !important;
      }
    }
  }
`;
export const H4Heading = styled.h4`
  color: var(--modelTitleColor);
  margin: 0px;
  margin-bottom: 8px;
`;
export const ThreeByThreeField = styled.div`
  margin-top: 18px;
`;
export const UploadWrapper = styled.div`
  .upload-container {
    border-radius: 4px;
    border: 2px dashed #bbdefb;
    /*background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='grey' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");*/
  }
`;
export const AddPartEachFieldDiv = styled.div`
  width: calc(33% - 4px) !important;

  .mt {
    margin-top: 8px !important;
  }
`;
export const AsyncOptionBtn = styled.div`
  display: flex;
  justify-content: center;
`;
