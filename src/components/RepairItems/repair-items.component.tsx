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
  /* padding: 10px 0; */
  /* border-bottom: 1px dashed #e3eaf6; */

  .cards-btns-group {
    display: flex;
    gap: 16px;
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
        color: var(--themeBlue900) !important;
      }
    }
    .upload-container {
      height: unset !important;
      border: unset !important;
      min-height: unset !important;
      background: unset;
    }
  }
  h4 {
    font-family: var(--themeFont);
    font-size: 22px;
    font-weight: 600;
    /* line-height: 30px; */
    line-height: 24px;
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
  .option-delete-position {
    position: absolute;
    top: 57px;
    right: 24px;
    z-index: 1;
    border: 2px solid var(--themeBlue900);
  }
`;
export const RepairCardBody = styled.div`
  display: flex;
  flex-direction: column;
  /*align-self: flex-start;*/
  font-size: 16px;
  line-height: 1.5;
  overflow-x: auto;
  height: 100%;
  /*width: 100%;*/
  &.documents-body {
    max-height: 200px;
  }
  &.is-icons {
    pointer-events: none !important;
    cursor: none !important;
  }
  &.is-icons > div > .main > div > .main-container > .overlay,
  &.is-icons > div > .main > div > .main-container > .overlay > a {
    opacity: 0 !important;
    cursor: auto !important;
  }
`;
export const RepairCardBodyPreview = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  /*align-self: flex-start;*/
  font-size: 16px;
  line-height: 1.5;
  overflow-x: auto;
  height: 100%;
  /*width: 100%;*/
  &.documents-body {
    max-height: 200px;
  }
  &.is-icons {
    pointer-events: none !important;
    cursor: none !important;
  }
  &.is-icons > div > .main > div > .main-container > .overlay,
  &.is-icons > div > .main > div > .main-container > .overlay > a {
    opacity: 0 !important;
    cursor: auto !important;
  }
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
  /* color: #DC4B43; */
  color: #6d7992;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  flex-direction: column;
  gap: 16px;
`;

export const RepairItemsRowRow = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 16px;
  padding: 0 16px;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
  color: #6d7992;
  min-width: 100%;
  width: min-content;
  /*width: 100%;*/
  &.header {
    background-color: #f9fbff;
    font-weight: 800;
    display: grid;
    grid-template-columns: 32px 1fr 2fr 1fr 1fr;
  }
  &.repair_header {
    background-color: #f9fbff;
    font-weight: 800;
    display: grid;
    grid-template-columns: 32px 1fr 2fr 1fr 1fr 1fr;
  }
  &.warehouse_header {
    background-color: #f9fbff;
    font-weight: 800;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr;
  }
  &.warehouse {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr;
    height: fit-content;
  }
  &.CheckInSelectedHeader {
    background-color: #f9fbff;
    font-weight: 800;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  }
  &.CheckInSelected {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
    height: fit-content;
  }
  &.grid {
    display: grid;
    grid-template-columns: 32px 1fr 2fr 1fr 1fr;
    height: fit-content;
  }
  &.repair_grid {
    display: grid;
    grid-template-columns: 32px 1fr 2fr 1fr 1fr 1fr;
    height: fit-content;
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
    padding: 14px 4px;
  }
  &.item-preview-grid {
    padding: 10px 4px;
  }
  .flexed {
    flex: 1;
  }
  .min-width {
    min-width: 220px;
  }
  .min-width-180 {
    min-width: 180px;
  }
  &.CheckInSelectedHeader {
    background-color: #f9fbff;
    font-weight: 800;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  }
  &.CheckInSelected {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
    height: fit-content;
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
  min-width: 120px;
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

  &.header-label1 {
    font-weight: 800;
    color: #6d7992;
    min-width: 100px;
  }
  &.right {
    text-align: right !important;
  }
  &.checkbox {
    min-width: 20px;
    max-width: 32px;
    svg {
      cursor: pointer;
      pointer-events: unset;
    }
  }
  &.col-width {
    max-width: 210px !important;
  }
  &.desc-width {
    max-width: 200px !important;
    min-width: 140px !important;
  }

  &.qty-width {
    max-width: 80px;
    min-width: unset;
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
    width: 100%;
    min-width: unset;
    > div:first-child {
      width: 66%;
    }
  }
  & > div {
    /*position: relative;
    padding-bottom: 16px;
    margin-top: 16px;*/
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
  // input {
  //   margin: 0px 0 8px 0 !important;
  // }
  &.custom-part {
    > div {
      margin-top: 4px !important;
    }
  }
  .select-label ~ span {
    position: absolute;
    top: 40px;
  }
  &.custom-part {
    .select-label ~ span {
      position: unset !important;
    }
  }
  &.flexed {
    flex: 1;
  }
  &.min-width-200 {
    min-width: 200px;
    padding-top: 10px;
  }

  &.max-width-140 {
    max-width: 140px;
  }
  .check-in-field {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.calc-width-33 {
    width: calc(33% - 16px);
    gap: 10px;
  }
  .input-field {
    /*height: 74px;*/
    display: flex;
    align-items: flex-start;
  }
  .check-in-field {
    div[data-ds--text-field--container="true"] {
      height: 110px;
    }
    .select-label ~ span {
      top: 74px !important;
      word-break: break-word !important;
      white-space: break-spaces !important;
      line-height: 16px !important;
    }
  }
  &.add-new-item-description {
    .add-new-description {
      & > div {
        & > span {
          position: unset;
        }
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
  margin: 24px 0px;
  padding-right: 8px;
  width: 100%;
  /* border-bottom: 2px solid var(--greyCardBorder); */
  /* border-radius: 8px; */
  overflow: auto;
  max-height: 1130px;
  &.pp-item-cards {
    margin: 0;
  }
`;

export const ItemCard = styled.div`
  /* padding: 24px 0px; */
  /* margin-bottom: 24px; */
  padding-bottom: 24px;

  display: flex;
  /*flex-direction: column;
  gap: 8px;*/
  font-size: 14px;
  color: ${TextGrayColor};
  font-weight: 500;
  line-height: 1.65;
  transition: all 0.3s ease;
  &:not(:last-child) {
    /* border-bottom: 2px solid var(--greyCardBorder); */
    /* border-bottom: 1px solid #d0daec;
     */
    border-bottom: none;
  }
  &:last-child {
    /* border-bottom: 1px solid #d0daec; */
  }
  & > div {
    display: flex;
    gap: 16px;
    flex-direction: column;
    align-items: center;
    .d-flex {
      display: flex;
    }
    .flexed {
      flex: 1;
    }
    & .align-right {
      text-align: right;
    }
    /*& > div {
      width: 20%;
    }*/
    &.width-23 {
      width: 23%;
    }

    .w-75px {
      width: 75px;
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
      border-bottom: 1px solid #e3eaf6;
    }
    .line-clamp {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      &.three-lines {
        -webkit-line-clamp: 3;
      }
      &.two-lines {
        -webkit-line-clamp: 2;
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
  .mb-12 {
    margin-bottom: 12px;
  }
  .items-ellipse {
    width: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /*&:hover {
    background-color: ${hoverColor};
    .action-item.show-details {
      display: flex;
    }
    .select-label,
    label {
      background-color: ${hoverColor};
    }
  }*/

  &.total-sum-details {
    padding: 10px 20px;
    > div {
      justify-content: end;
    }
  }
  .width-20 {
    width: 20%;
  }
  .width-23 {
    width: 23%;
  }
  .width-30 {
    width: 30%;
  }

  .item-value-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 140px;
  }
  .pl-8 {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

export const RepairImg = styled.img`
  height: 65px;
  width: 65px;
  background-color: ${basicColor};
  border: none !important;
  border-radius: 4px;
`;

export const CardTopDetails = styled.div`
  .total-price-ellipsis {
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .flex-ed {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .width {
    width: 40%;
  }
`;

export const CardBottomDetails = styled.div`
  .repair-item-checkbox {
    cursor: pointer;
  }
  .qcicon {
    height: 24px;
    width: 24px;
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
`;

export const ActionsWrapper = styled.div`
  .qc_icon {
    height: 32px;
    width: 32px;
  }
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
  .quote-item-del-icon {
    height: 30px;
    width: 30px;
    border: 2px solid #6d7992;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .icon-bg-hover {
    &:hover {
      background: #e3eaf6;
    }
  }
  span button {
    padding-left: 12px !important;
  }
  span button svg {
    width: 4px !important;
  }
`;
export const ChangeStatusIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
`;
