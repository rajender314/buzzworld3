import styled from 'styled-components';

export const QuotePopupHeaderContainer = styled.div`
  img {
    width: 32px;
    height: 32px;
    /*border-radius: 50%;*/
  }
  .Timer {
    width: 28px;
    height: 28px;
  }
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    margin: 0 12px;
  }
  .filter-img {
    width: 20px;
    height: 20px;
    border-radius: unset;
  }
  .cmr-notes-img {
    width: 40px;
    height: 40px;
  }
`;

export const Width100 = styled.div`
  width: 100%;
  &.d-flex-row-gap {
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    .tabsd {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
`;
export const Width50 = styled.div`
  width: 50%;
  &.d-flex-row-gap {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
  &.pb-10px {
    padding-bottom: 10px;
  }
  .multi-select.react-select__indicators {
    align-items: center !important;
  }
`;
