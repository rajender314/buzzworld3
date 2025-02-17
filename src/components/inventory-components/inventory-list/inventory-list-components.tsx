import styled from 'styled-components';

export const StockCodeAddImgContainer = styled.div`
  &.open {
    &::before {
      content: "";
    }
  }
  cursor: pointer;
  margin: 0 8px;
  /* position: relative;
  left: 2px;
  cursor: pointer;
  display: flex;
  align-items: center; */
`;
export const StockCodeErrorContainer = styled.div`
  color: #6d7992;
  font-weight: 500;
  margin-bottom: 16px;
  background: #e3eaf6;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const AsyncSelectDivs = styled.div`
  width: 100%;
  .css-xji0fq-IndicatorsContainer {
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    padding-right: 4px;
    display: none;
  }
  &.multi .react-select__control {
    border: none !important;
    margin: 0px;
    background: transparent !important;
    background-color: none !important;
    max-height: 40px !important;
    min-height: 40px !important;
  }

  &.multi .react-select__control:hover {
    background-color: none !important;
    background: unset !important;
  }
  &.multi .react-select__value-container {
    margin-bottom: 0px;
  }
`;
export const NoWareHouseInfoFound = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0px;
  color: #6d7992;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
