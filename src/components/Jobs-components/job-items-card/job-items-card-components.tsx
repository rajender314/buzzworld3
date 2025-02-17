import {
  basicColor,
  hoverColor,
  lightColor,
  TextGrayColor,
  TextGrayDark,
} from '@app/core/styles/colors';
import styled from 'styled-components';

export const JobItemCardsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .cards-btns-group {
    display: flex;
    gap: 8px;
    .repair-browse-btn {
      padding: 4px 12px;
      border: 2px solid;
      background: none;
      color: #234fa0;
      border-radius: 3px;
    }
    .repair-browse-btn:hover {
      background: #e3f2fd !important;
    }
    button {
      span {
        color: #134c85 !important;
      }
    }
    .upload-container {
      height: unset !important;
      border: unset !important;
      min-height: unset !important;
    }
  }
  h4 {
    font-family: Inter;
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 0px;
    text-align: left;
    color: #2e374a;
    margin: 0;
  }
`;
export const JobItemCardBody = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 1.5;
  overflow-x: auto;
  width: 100%;
  &.documents-body {
    max-height: 200px;
  }
`;
export const NoJobItemFound = styled.div`
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

export const JobItemsRowRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
  color: #6d7992;
  width: fit-content;
  &.header {
    background-color: #f9fbff;
    font-weight: 800;
  }
  &.data {
    cursor: pointer;
    color: #2e374a;
  }
  &:hover {
    background-color: #f9fbff;
  }
  &.pd-left-zero {
    padding: 8px 0px;
    cursor: pointer;
    color: #2e374a;
    width: 100%;
  }
  &.item-selection-grid {
    padding: 0 16px;
  }
`;
export const JobNewPartItemsField = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
  color: #6d7992;
  width: fit-content;
  &.pd-left-zero {
    padding: 8px 0px;
    cursor: pointer;
    color: #2e374a;
    width: 100%;
  }
`;

export const JobItemsColumn = styled.div`
  min-width: 200px;
  font-size: 14px;
  font-weight: 400;
  color: #2e374a;
  box-sizing: border-box;
  position: relative;
  text-align: left;
  &.header-label {
    font-weight: 800;
    color: #6d7992;
  }
  &.checkbox {
    min-width: 38px;
    svg {
      cursor: pointer;
      pointer-events: unset;
    }
  }
  &.item-quantity {
    text-align: right;
  }
  .repair-item-checkbox {
    cursor: pointer;
  }
  .part-number {
    font-weight: 700;
    text-transform: uppercase;
    text-align: left;
  }
  &.part-description,
  .part-description {
    text-align: left;
    max-width: 200px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
  }
  &.priority-col {
    text-transform: capitalize;
  }
  &.action-label {
    display: flex;
    align-items: center;
    gap: 12px;
    & > div {
      margin: unset;
    }
  }
  &.add-new-item-description {
    display: flex;
    gap: 20px;
  }
  & > div {
    position: relative;
    padding-bottom: 16px;
    margin-top: 16px;
    & > span {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
`;
export const JobItemImgDiv = styled.div`
  height: 30px;
  width: 30px;
  border: 3px solid var(--themeBlue1000);
  border-radius: 6px;
  align-items: center;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  margin: 0 8px;
  &:hover {
    background: #e3f2fd;
  }
`;

export const RepairItemsListDiv = styled.div`
  min-height: 200px;
  max-height: 300px;
  &.activity-log {
    overflow: auto;
  }
`;
export const RepairItemStatus = styled.div`
  span {
    span {
      padding: 2px 6px 2px 6px !important;
      border-radius: 4px !important;
    }
    .css-3wrbaf {
      background: #ccede5 !important;
      border-radius: 4px !important;
    }
  }
`;
export const ActionLabel = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #1976d2;
  text-decoration-line: underline;
  width: 100px;
`;
export const JobItemCardWrapper = styled.div`
  width: 100%;
  border: 2px solid var(--greyCardBorder);
  border-radius: 8px;
  overflow: auto;
  max-height: 500px;
`;

export const JobItemCard = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: ${TextGrayColor};
  font-weight: 500;
  line-height: 1.65;
  transition: all 0.3s ease;
  &:not(:last-child) {
    border-bottom: 2px solid var(--greyCardBorder);
  }
  & > div {
    display: flex;
    gap: 16px;
    .d-flex {
      display: flex;
    }
    .flexed {
      //   flex: 1;
    }
    & .align-right {
      text-align: right;
    }
    & > div {
      width: 20%;
    }
    .w-75px {
      width: 75px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .align-center {
      align-items: center;
    }
    .justify-end {
      justify-content: flex-end;
    }
    .g-8 {
      gap: 8px;
    }
    .with-border-bottom {
      padding-bottom: 12px;
      border-bottom: 1px dashed ${basicColor};
      width: 489px;
    }
    .line-clamp {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      &.three-lines {
        -webkit-line-clamp: 3;
      }
    }
  }
  .fs-16 {
    font-size: 16px;
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
    width: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    background-color: ${hoverColor};
    .action-item.show-details {
      display: flex;
    }
  }
`;

export const RepairImg = styled.img`
  height: 65px;
  width: 65px;
  background-color: ${basicColor};
  border: none !important;
  border-radius: 4px;
`;

export const JobItemCardTopDetails = styled.div``;

export const JobItemCardBottomDetails = styled.div``;

export const JobItemActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  .action-item {
    width: 32px;
    height: 32px;
    background-color: ${lightColor};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.show-details {
      display: none;
    }
    button {
      background-color: unset !important;
      border: unset !important;
    }
  }
`;
