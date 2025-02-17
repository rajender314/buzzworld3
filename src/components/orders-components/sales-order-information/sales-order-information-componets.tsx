import styled from 'styled-components';
import {
  basicColor,
  hoverColor,
  TextGrayColor,
  TextGrayDark,
} from '@app/core/styles/colors';

export const RteBox = styled.div`
  margin-top: 4px;
`;
export const SalesOrderInfoDatePicker = styled.div`
  width: calc(100% - 0px);
  margin-bottom: 16px;
`;
export const SalesOrderField = styled.div`
  /*width: 100%;*/
  height: 104px;
  display: flex;
  width: calc(50% - 4px);
  /* padding: 20px 0px; */
  padding: 16px 0px;
  &.hide-form-field {
    display: none;
  }
  .label-text {
    padding: 0px !important;
  }
  .dt-pkr-bg-unset > div {
    margin-top: 4px;
  }
  p {
    /* text-transform: capitalize; */
    padding: 0px !important;
  }
  &.repiar-infosection-items {
    width: calc(33% - 16px);
    gap: 10px;
    /*> div {
      max-width: unset;
      width: unset;
    } */
  }
  &.calc-width-25 {
    width: calc(25% - 16px);
    gap: 10px;
    /*> div {
      max-width: unset;
      width: unset;
    } */
  }

  > img.edit-icon {
    padding-bottom: 20px;
    cursor: pointer;
    display: none;
  }
  > img.edit-icon-shipdate {
    margin-bottom: 188px;
    padding-bottom: 20px;
    cursor: pointer;
    display: none;
  }
  &:hover {
    > img.edit-icon-shipdate {
      padding-bottom: 20px;
      cursor: pointer;
      display: block;
      width: 15px;
    }
  }
  &:hover {
    > img.edit-icon {
      padding-bottom: 20px;
      cursor: pointer;
      display: block;
      width: 15px;
    }
  }
  .select-width {
    width: 251px;
  }
  &.email .pi-label p {
    text-transform: lowercase !important;
  }
`;
export const Error = styled.div`
  color: red;
  margin-bottom: 5px;
`;

export const StockLineInfoDatePicker = styled.div`
  width: calc(100% - 16px);
`;
export const StockLineItemShipDate = styled.div`
  display: flex;
  align-items: center;

  /* justify-content: end; */
  gap: 8px;
  span {
    display: flex;
    gap: 16px;
  }
  h4 {
    span {
      .img-edit-icon {
        cursor: pointer;
        margin-left: 10px;
        width: 15px;
        height: 15px;
        display: none;
      }
    }
  }
  h4:hover {
    span {
      img {
        cursor: pointer;
        display: inline-flex;
        width: 15px;
      }
    }
  }
`;
export const LineShipDateDate = styled.span`
  color: #2e374a;
  font-weight: 600;
`;
export const ImgContainer = styled.div`
  width: 75px !important;
  height: 75px;
  background: antiquewhite;
  border-radius: 8px;
  margin: 18px 0 0;
`;
export const SalesOrderItemCard = styled.div`
  /* padding: 24px; */
  padding: 16px 0px;
  display: flex;
  flex-direction: column;
  /* gap: 8px; */
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
      flex: 1;
    }
    & .align-right {
      text-align: right;
    }
    & > div {
      width: 20%;
    }
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
      border-bottom: 1px dashed ${basicColor};
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
  .items-ellipse {
    width: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ware-house {
    width: 60px;
    white-space: nowrap;
    text-overflow: ellipsis;
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
  .width-20 {
    width: 20%;
  }
  .width-23 {
    width: 23%;
  }

  .item-value-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const SalesOrderInfoItemCardWrapper = styled.div`
  width: 100%;
  /* border: 2px solid var(--greyCardBorder); */
  border-radius: 8px;
  overflow: auto;
  max-height: 500px;
  padding-right: 10px;
  /* box-shadow: inset 2px 2px 10px rgb(0 0 0 / 10%); */
  margin-left: -6px;
  padding-top: 16px;
`;
export const SalesOrderInfoTitleContainer = styled.div`
  /* border-bottom: 1px dashed #e3eaf6; */
`;
export const SalesInfoItemCard = styled.div`
  /*box-shadow: 1px 1px 10px rgb(0 0 0 / 6%);*/
  /* padding: 16px; */
  border: 1px dashed #e3eaf6;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 6px;
  font-size: 14px;
  color: ${TextGrayColor};
  font-weight: 500;
  line-height: 1.65;
  transition: all 0.3s ease;
  margin: 4px 4px 16px 4px;
  & > div {
    .d-flex {
      display: flex;
    }

    .container {
      display: flex;
      justify-content: space-between;
    }
    & .align-right {
      text-align: right;
    }

    &.width-23 {
      width: 23%;
    }
    h4 {
      margin: 0;
    }
    .ship_container {
      display: flex;
      gap: 8px;
      align-items: center;
      .quote-date-label {
        margin-top: 4px;
      }
      > div {
        width: 132px;
      }
    }
    .w-75px {
      width: 75px;
    }
    .align-center {
      align-items: center;
    }

    .g-8 {
      gap: 8px;
    }
    .with-border-bottom {
      display: flex;
      justify-content: space-between;
      padding-bottom: 16px;
    }
    .line-clamp {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      &.three-lines {
        -webkit-line-clamp: 3;
        color: #1976d2;
      }
      &.two-lines {
        -webkit-line-clamp: 2;
      }
    }
  }
  .fs-16 {
    font-size: 16px;
  }
  .fs-10 {
    font-size: 16px;
    font-weight: bold;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ware-house {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  /* &:hover {
    background-color: ${hoverColor};
  } */

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

  .item-value-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const SalesOrderItemValue = styled.div`
  color: #2e374a;
  /* text-align: right; */
  /* padding-right: 20px; */
  font-size: 16px;
  font-weight: 700;
  &.line-ship-date-value {
    /* color: #af1515 !important; */
    color: #1976d2 !important;
  }
`;
export const SalesOrderItemLabel = styled.div`
  display: flex;
  /* width: 33%; */
  width: calc(33% - 16px);
  flex-direction: column;
  /* align-items: center; */
  /* margin-bottom: 24px; */
  height: 70px;
  gap: 8px;
  font-size: 16px;
  font-weight: 400;
  .css-hkzqy0-singleValue {
    font-weight: 400;
  }
  .pi-select-wrapper {
    padding-top: 0px;
  }
  &.w-15 {
    width: calc(16% - 8px);
  }
  &.w-24 {
    width: calc(24% - 8px);
  }

  .select-label .field-label-div label {
    color: #4e586d;
  }
  > p {
    /* font-size: 16px; */
    /* font-weight: 400;*/
    color: #4e586d;

    > img.edit-icon,
    .isHidden {
      /* width: 12px;
      height: 12px; */
      /* display: flex; */
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s ease;
    }
    &:hover {
      img.edit-icon {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  &.line-ship-date {
    margin: 0;
    > span {
      /* color: #00a67e; */
      color: #6d7992;
    }
    p {
      > img.edit-icon,
      .isHidden {
        /* width: 12px;
        height: 12px;
        display: flex; */
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.5s ease;
      }
      &:hover {
        img.edit-icon {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
`;

export const JobWarnItemContainer = styled.div`
  min-height: 10px;
  overflow-y: auto;
  width: 100%;
  max-height: 100px;
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
