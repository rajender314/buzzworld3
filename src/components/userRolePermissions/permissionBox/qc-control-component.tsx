import styled from 'styled-components';

export const FormBodyOverFlow = styled.div`
  .hi {
    padding: 16px 0px 13px 0px;
  }
  .addicon {
    display: flex;
    align-items: center;
    padding: 0px 22px;
  }
  .addicons {
    display: flex;
    align-items: center;
    padding: 0px 17px;
    gap: 20px;
    margin-left: 4px;
    /* margin-bottom: 6px !important; */
  }
  .row-del-img {
    cursor: pointer;
    align-items: center;
    display: flex;
    padding: 0px 14px;
  }
  .css-4rxcpg {
    color: #f60a31 !important;
    font-size: 12px !important;
  }
  .radios {
    // display: flex;
    // padding: 26px 0px;
    margin: 24px 0px;
    align-items: flex-end;
    > div {
      margin-bottom: 10px;
    }
  }

  .css-17ad2a4-Tabs {
    box-sizing: border-box;
    appearance: none;
    margin: 0px !important;
    border: none;
    display: flex;
    position: relative;
    flex-direction: column;
  }
  .css-chp70c {
    box-sizing: border-box;
    appearance: none;
    border: none;
    display: flex;
    position: relative;
    padding: 0px !important;
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
export const NoInventoryFound = styled.div`
  .server-msg {
    margin-top: 24%;
    display: flex;
  }
  .msg-server {
    color: #6d7992;
  }
  img {
    width: 300px;
    height: 300px;
  }
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  color: #dc4b43;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;
export const InventoryWarehousedata = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 0px;
  .width-50 {
    width: calc(50% - 16px);
    margin: 0 8px;
  }
  .web {
    width: 528px;
  }

  .lead {
    padding-top: 16px;
  }
  .width-100 {
    width: calc(100% - 16px);
    margin: 0 8px;
    .multi-select.react-select__value-container {
      height: 60px;
    }
  }
  row-gap: 12px;
`;
export const DetailWareHouse = styled.div`
  .field-detail {
    display: flex;

    flex-wrap: wrap;
    row-gap: 10px;

    column-gap: 67px;
  }
  background: #f2f7ff;

  flex: 1;
  overflow: hidden;
  display: flex;
  gap: 24px;
  .grid {
    height: 400px;
  }
`;
export const SpinnerDivs = styled.div`
  padding: 17px;
  display: flex;
  justify-content: center;
  min-height: 200px;
  align-items: center;
  align-items: center;
  left: 58%;
  position: sticky;
`;
