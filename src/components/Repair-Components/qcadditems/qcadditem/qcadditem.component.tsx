import styled from 'styled-components';

export const PartItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #2e374a;
  .radios {
    > div {
      display: flex;
      justify-content: flex-start;
    }
  }
  .part-parent {
    padding: 18px 0;
  }
  .qc_quetions {
    padding: 0 8px;
  }
  .repair-description {
    //styleName: Fonts/Regular Paragraph : 14;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: #2e374a;
  }
  .label {
    font-family: Inter;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    color: #6d7992;
  }
  .sc-jowtIB bqKGHZ qcControl {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .quantity-parent {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    .pi-label {
      padding: 3px;
      width: 33%;
      max-width: calc(33% - 12px);
      /* padding: 20px 0; */
      .label-text {
        font-weight: 700;
        font-size: 14px;
        font-family: Inter;
        color: #4e586d;
      }
      .description {
        font-weight: normal;
        font-family: Inter;
        padding-left: 6px;
      }
    }
  }
`;
export const RepairDetailsContain = styled.div`
  .qcdata {
    display: flex;
    gap: 8px;
    flex-direction: column;
  }
`;
export const RmaFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 16px;

  .width-50 {
    width: calc(50% - 16px);
    margin: 0 8px;
  }
  .width-100 {
    width: calc(100% - 16px);
    margin: 0 8px;
    display: flex;
    flex-direction: column;
    .multi-select.react-select__value-container {
      height: 60px;
    }
  }
  row-gap: 8px;
`;
export const FormBodyOverFlow = styled.div`
  .hi {
    padding: 16px 0px 13px 2px;
  }

  .qcControl {
    display: flex;
    gap: 8px;
    flex-direction: column;
  }
  padding: 16px;
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
`;
export const JobPopupHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin: 0 12px;
  }
`;
export const SideDrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  // gap: 11.6px;
  padding: 12px 25px;
  border-bottom: 1px solid #e3eaf6;
  h3 {
    margin: 0;
    color: #2e374a;
  }
  .HeaderFilter {
    display: flex;
    gap: 11.6px;
  }
`;
export const SideDrawerContainer = styled.div`
  // .hi {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   gap: 10px;
  // }
  height: 100%;
  display: flex;
  flex-direction: column;
  form {
    height: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .qcicon {
    height: 24px;
    width: 24px;
  }
`;
export const DetailViewStatusDropdowns = styled.div`
  /* padding-left: 6px; */
  button {
    padding: 0px !important;
    line-height: unset;
    height: unset;
  }
  &.Dropdown {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
