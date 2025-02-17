import styled from 'styled-components';

export const SpFilterPanelDiv = styled.div`
  padding-right: 24px;
  padding-top: 16px;
  > div {
    padding-bottom: 8px;
  }
  .react-select__control {
    border-radius: 6px;
  }
`;

export const DateRangePickerDiv = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: unset;
  }
  div[role="presentation"] {
    margin-top: unset;
  }
  &.each-div {
    /*.react-datepicker-wrapper {
      margin-top: 2px;
    }*/
  }
  .react-datepicker__input-container {
    margin-top: 5px;
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
    background-color: var(--logHistoryCardBgColor) !important;
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
    &:hover {
      background-color: #ffffff !important;
    }
  }
  &.each-div.item-edit {
    /*.react-datepicker-wrapper {
      margin-top: -2px;
    }
    .react-datepicker__input-container {
      margin-top: unset;
    }*/
  }
`;
