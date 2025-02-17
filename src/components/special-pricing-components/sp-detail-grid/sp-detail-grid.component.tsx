import styled from 'styled-components';

export const BlankPageMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
  font-weight: 600;
  color: #6d7992;
`;
export const LogHistoryCard = styled.div`
  width: 100%;
  border-radius: 6px;
  padding: 10px;
  background-color: var(--logHistoryCardBgColor);
  display: flex;
  cursor: pointer;
  border: 1px solid transparent;
  gap: 40px;
  color: var(--modelTitleColor);
  &:hover {
    /* border: 1px solid #b3e4d8; */
    border: 1px solid #e3eaf6;
    background: #fff;
  }
`;
export const CardLeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .card-title {
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    margin: 0 0 4px;
  }
`;

export const DetailsContent = styled.div`
  display: flex;
  gap: 16px;
  & > * {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    overflow: hidden;
    white-space: nowrap;
  }
  font-family: Inter;
  font-size: 14px;
  line-height: 24px;
  .label {
    font-weight: 400;
  }
  .text {
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
  }
  &.flex-wrap {
    & > * {
      white-space: unset;
    }
  }
`;

export const CardRightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .discount-code-section {
    display: flex;
    .discount-name {
      display: flex;
    }
  }
`;
export const VendorCount = styled.div`
  //styleName: Fonts/H7 : 16, Regular;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
`;
export const LabelName = styled.div`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
`;

export const CardContainer = styled.div`
  height: 100%;
  position: relative;
  padding: 24px 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const LogHistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
export const SPEditDel = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  gap: 10px;
  img {
    width: 15px;
    height: 15px;
  }
  .edit-del-divs,
  .spa-delete {
    padding: 0 4px;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    border-radius: 2px;
    justify-content: center;
    transition: all 0.3s ease;
  }
  .edit-del-divs:hover,
  .spa-delete:hover {
    background: #d0daec;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    justify-content: center;
  }
`;

export const SPItemsGridContainer = styled.div`
  height: 100%;
  .ag-theme-alpine {
    .ag-row-bg-color {
      /*&.ag-row-odd {*/
      background: #fff0d7 !important;
      /*}*/
    }
  }
`;
