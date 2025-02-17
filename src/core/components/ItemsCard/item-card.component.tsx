import {
  basicColor,
  hoverColor,
  lightColor,
  TextGrayColor,
  TextGrayDark,
} from '@app/core/styles/colors';
import ArrowUp from '@app/assets/images/arrow_up.svg';
import ArrowDown from '@app/assets/images/arrow_down.svg';

import styled from 'styled-components';

export const RepairCardsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  .cards-btns-group {
    display: flex;
    gap: 8px;
    align-items: center;
    .repair-browse-btn {
      padding: 4px 12px;
      border: 2px solid;
      background: none;
      color: #234fa0;
      border-radius: 3px;
    }
    .grid {
      height: 400px;
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
    font-family: var(--themeFont);
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 0px;
    text-align: left;
    color: #2e374a;
    margin: 0;
  }
  .quote-select-item-btn {
    position: relative;
    top: 60px;
    left: 90px;
    z-index: 1;
  }
`;
export const RepairCardBody = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 1.5;
  overflow-x: auto;
  width: 100%;
  &.documents-body {
    max-height: 200px;
  }
  // .header-label {
  //   min-width: 139px;
  // }
`;
export const NoRepairFound = styled.div`
  .server-msg {
    margin-top: 24%;
  }
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  /*color: #dc4b43;*/
  color: #6d7992;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const RepairItemsRowRow = styled.div`
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
export const AddNewPartFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NewPartItemsField = styled.div`
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

export const RepairItemsColumn = styled.div`
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
    /* min-width: 150px !important; */
  }
  &.col-width {
    min-width: 120px !important;
  }
  &.header-label1 {
    font-weight: 800;
    color: #6d7992;
    min-width: 100px;
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
  &.line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    &.three-lines {
      -webkit-line-clamp: 2;
    }
  }
  input {
    margin: 0px 0 8px 0 !important;
  }
  &.custom-part {
    > div {
      margin-top: 19px !important;
    }
  }
`;
export const ImgDiv = styled.div`
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
export const RepairItemCardWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  /* border: 1px solid var(--greyCardBorder); */
  /* border-radius: 8px; */
  overflow: auto;
  max-height: 1060px;
`;
export const CardView = styled.div`
  /* width: 7%; */
  .check_box {
    width: 40px;

    padding: 8px;
    padding-bottom: 8px;
    background: #f2f7ff;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .quote_check_box {
  }
  .add-highlight {
    /* background: #ffc25f; */
    background: #fff0d7;
  }
  .remove-highlight {
    background: #f2f7ff;
  }
`;
export const CardViews = styled.div`
  width: 100% !important;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  &.border-radius {
    > div {
      /* border-radius: 4px; */
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
  }
`;

export const ItemCard = styled.div`
  /* padding: 0px 24px; */
  padding-right: 8px;
  width: 100%;
  display: flex;
  /* margin-bottom: 24px; */
  padding-bottom: 24px;
  /* flex-direction: column;
  gap: 8px; */
  font-size: 14px;
  color: ${TextGrayColor};
  font-weight: 500;
  line-height: 1.65;
  transition: all 0.3s ease;
  &:not(:last-child) {
    /* border-bottom: 2px solid var(--greyCardBorder); */
  }
  &:last-child {
    /* border-bottom: none !important; */
    border-bottom: 1px solid #e3eaf6;
  }
  & > div {
    display: flex;
    flex-direction: column;
    gap: 16px;

    align-items: center;
    .d-flex {
      display: flex;
    }
    .flex {
      flex: 1;
    }

    & .align-right {
      text-align: right;
    }
    & > div {
      /* width: 20%; */
    }
    &.width-23 {
      width: 20%;
    }

    .w-75px {
      width: 75px;
    }
    .align-center {
      align-items: center;
    }

    .justify-center {
      justify-content: center;
    }
    .pl-8 {
      padding-left: 8px;
      padding-right: 8px;
    }
    .pr-8 {
      padding-right: 8px;
    }
    .justify-end {
      justify-content: flex-end;
    }
    .g-8 {
      gap: 8px;
    }
    .flexed {
      display: flex;
      flex-direction: column;
      gap: 8px;
      height: 100%;
    }
    .flex-end {
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }
    .with-border-bottom {
      padding-bottom: 12px;
      border-bottom: 1px solid #e3eaf6;

      /* border-bottom: 1px dashed ${basicColor}; */
    }
    .line-clamp {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      &.three-lines {
        -webkit-line-clamp: 3;
      }
      &.two-lines {
        /* -webkit-line-clamp: 2; */
        -webkit-line-clamp: 3;
        white-space: break-spaces;
      }
    }
  }
  .fs-16 {
    font-size: 14px;
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
  .bg {
    background: #f2f7ff;
  }
  .mb-16 {
    margin-bottom: 16px;
  }

  /* &:hover {
    background-color: ${hoverColor};
    .action-item.show-details {
      display: flex;
    }
  } */

  &.total-sum-details {
    padding: 10px 20px;
    > div {
      justify-content: end;
    }
  }
  /* .width-20 {
    width: 20%;
  } */
  .width-23 {
    width: 20%;
  }
  .width-30 {
    width: 30%;
  }

  .item-value-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* padding-left: 12px; */
  }
  .eye-icon-span {
    display: flex;
    align-items: center;
    /* justify-content: end; */
  }
  .manufacter {
    width: auto;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const RepairImg = styled.img`
  height: 65px;
  width: 65px;
  background-color: ${basicColor};
  border: none !important;
  border-radius: 4px;
`;

export const CardBottomDetails = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  &.pl-8 {
    padding-left: 54px;
    padding-right: 8px;
  }
  &.pl-20 {
    padding-left: 20px;
    padding-right: 8px;
  }
  .w-25 {
    /*width: 28%;*/
    width: auto;
    min-width: 45%;
    max-width: 50%;
  }
  .w-30 {
    width: 46%;
  }
  .w-32 {
    width: 32%;
  }
  .g-16 {
    gap: 16px;
  }
  .width-20 {
    flex: 1;
  }
  .width-25 {
    width: 25%;
  }
  .mb-16 {
    margin-bottom: 16px;
  }

  span {
    /* width: 42%; */
    text-align: left;
    /* white-space: nowrap; */
  }
  .align-top {
    align-items: flex-start;
  }
  .flex {
    flex: 1;
  }
  .flexed {
    display: -webkit-box;
  }
  .flexeds {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 100%;
  }
  img.edit-icon {
    cursor: pointer;
  }
  .action-item {
    width: 32px;
    height: 32px;
    background-color: ${lightColor};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /*&.show-details {
      display: none;
    }*/
    button {
      background-color: unset !important;
      border: unset !important;
    }
  }
  .pl-18 {
    padding-left: 8px;
  }
`;
export const CardBottomDetail = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row !important;
  .flex-end {
    display: flex;
    justify-content: flex-end;
  }
`;

export const CardTopDetails = styled.div`
  background: #f2f7ff;
  padding: 8px;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 32px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  &.add-highlight {
    /* background: #ffc25f; */
    background: #fff0d7;
  }
  &.remove-highlight {
    background: #f2f7ff;
  }
  .repair-item-checkbox {
    cursor: pointer;
  }

  .up-arrow {
    display: flex;
    align-items: center;
    gap: 6px;
    &::after {
      content: "";
      background-image: url(${ArrowUp});
      height: 20px;
      width: 20px;
      background-repeat: no-repeat;
    }
  }
  .down-arrow {
    display: flex;
    align-items: center;
    gap: 6px;
    &::after {
      content: "";
      background-image: url(${ArrowDown});
      height: 20px;
      width: 20px;
      background-repeat: no-repeat;
    }
  }
  .w-32 {
    width: 32%;
  }
  .width-25 {
    width: 25%;
  }
  .pl-46 {
    padding-left: 30px;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  .action-item {
    width: 32px;
    height: 32px;
    /* background-color: ${lightColor}; */
    background-color: rgb(242, 247, 255);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /*&.show-details {
      display: none;
    }*/
    button {
      background-color: unset !important;
      border: unset !important;
    }
  }
  .edit-item {
    width: 30px;
    height: 30px;
    /* background-color: ${lightColor}; */
    /* background-color: rgb(242, 247, 255); */
    /* border: 2px solid #6d7992; */
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /*&.show-details {
      display: none;
    }*/
    button {
      background-color: unset !important;
      border: unset !important;
    }
  }
  .icon-bg-hover {
    &:hover {
      background: #e3eaf6;
    }
  }

  .quote-item-del-icon {
    height: 30px;
    width: 30px;
    /* border: 2px solid #6d7992; */
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
