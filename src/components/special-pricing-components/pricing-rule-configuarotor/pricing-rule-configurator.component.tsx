import styled from 'styled-components';

export const PricingRuleField = styled.div`
  /* display: grid;
  grid-template-columns: repeat(4, 1fr); */
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  padding-top: 10px;
  /*border-bottom: 1px solid var(--greyCardBorder);*/
  padding-bottom: 20px;
  column-gap: 10px;
  row-gap: 14px;
  .each-div {
    width: calc(25% - 16px);
    .select-label {
      label {
        margin-bottom: 2px;
      }
    }
    input[name="quote_number"] {
      margin-top: 2px !important;
    }
  }
  .react-select__control {
    border-radius: 4px;
    min-height: 36px !important;
  }
  .reduce-select-dropdown-height {
    .multi-select.react-select__control {
      overflow: auto;
    }
  }
  .w-60-div {
    width: calc(60% - 16px);
    &.fields-inside-60 {
      display: flex;
      gap: 12px;
    }
    &.d-flex {
      display: flex;
      gap: 16px;
    }
  }
  .w-30-div {
    width: calc(30% - 16px);
  }
  .w-80-div {
    width: calc(80% - 16px);
  }
  .w-50-div {
    width: calc(60% - 16px);
    /* width: 50%; */
    &.d-flex {
      display: flex;
      gap: 16px;
    }
    &.label-hidden {
      label {
        visibility: hidden;
      }
    }
  }
  .w-40-div {
    width: calc(40% - 16px);
  }
  .w-100-div {
    width: 100%;
    &.items-dropdown {
      .multi-select {
        margin-top: 3px !important;
      }
    }
  }
  .w-20-div {
    width: 50%;
    /* display: flex; */
    /* margin-top: 24px; */
    /* align-items: flex-end; */
    /* width: calc(20% - 16px); */
    > div {
      display: flex;
      /* flex-direction: column !important; */

      /* flex-direction: unset !important; */
    }
    &.label-hidden {
      label {
        visibility: hidden;
      }
    }
  }
  .w-40-div {
    display: flex;
    flex: 1;
    gap: 10px;
  }
  &.pricing-rules-fields-div {
    //gap: 20px;
  }
  .label-hidden {
    label {
      visibility: hidden;
    }
  }
  .item-range-select {
    .field-label-div label {
      text-overflow: ellipsis;
      white-space: nowrap;
      /* width: 300px; */
      max-width: 300px;
      min-width: 200px;
      overflow: hidden;
    }
    /* width: auto; */
    width: calc(50% - 8px);
    /* width: 50%; */
    /* flex: 1; */
    /* label {
      white-space: nowrap;
      min-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
    } */
  }
  .items-async-field {
    padding-top: 4px;
  }
  .w-25-div {
    width: calc(26% - 16px);
  }
  .w-10-div {
    width: 80%;
  }
  .label {
    font-family: "Inter", sans-serif;
    font-style: normal;
    color: #6d7992;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* width: 300px; */
    max-width: 300px;

    min-width: 200px;
    overflow: hidden;
  }
  .icon_input label {
    text-overflow: ellipsis;
    white-space: nowrap;
    /* width: 300px; */
    max-width: 300px;

    min-width: 200px;
    overflow: hidden;
  }
`;

export const PricingFieldSection = styled.div`
  h4 {
    margin: 8px 0px;
    color: var(--modelTitleColor);
  }
  .w-50 > div {
    width: calc(50% - 8px);
  }
`;
export const AddAnotherRowBtn = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
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
    padding-left: 10px;
  }
  &.position {
    position: relative;
    top: 10px;
  }
`;
export const RowsOverrideContainer = styled.div``;

export const RowsOverrideItems = styled.div`
  height: 100px;
  overflow-y: auto;
  width: 100%;
  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    li {
      width: 150px;
    }
  }
`;
export const RowsOverrideItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  .label {
    width: 100%;
  }
`;
export const OverrideRadioBtns = styled.div`
  margin: 14px 0;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  gap: 10px;
`;
