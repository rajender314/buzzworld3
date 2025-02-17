import styled from 'styled-components';
import GreenTick from '@app/assets/images/green-tick-icon.svg';
import GreyTick from '@app/assets/images/grey-tick-icon.svg';

export const QuoteInfoDatePicker = styled.div`
  /* width: calc(100% - 16px); */
  width: 100%;

  .now-btn {
    height: 36px !important;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;

    /* border-left: none !important; */
    border-left: 1px solid;

    min-width: auto !important;
    align-self: flex-end;
    margin-bottom: 8px;
    position: absolute;
    right: 0;
    background-color: var(--logHistoryCardBgColor) !important;
    span {
      color: #1976d2 !important;
    }
  }
  .pi-date-time-picker label {
    color: #4e586d;
  }

  .pi-date-time-picker > div > div:nth-child(3) {
    position: relative;
    right: 12%;
  }
  .pi-date-time-picker > div > div:nth-child(4) {
    position: relative;
    right: 20%;
  }
  .pi-date-time-picker {
    input[spellcheck="false"] {
      max-width: 100px !important;
    }
  }
  .mandatory-star {
    align-self: flex-start;
    padding-top: 1px;
  }
`;

export const TabsListBeforeIcon = styled.div`
  &.open {
    display: flex;
    gap: 10px;
    align-items: center;
    &::after {
      content: "";
      height: 8px;
      width: 8px;
      background-color: #1bb01bf7;
      border-radius: 50%;
    }
  }
`;
export const ApprovedHeaderLabels = styled.div`
  &.enable {
    display: flex;
    /*gap: 6px;*/
    align-items: center;
    &::before {
      content: "";
      background-image: url(${GreenTick});
      height: 20px;
      width: 20px;
      background-repeat: no-repeat;
    }
  }
  &.disable {
    display: flex;
    /*gap: 6px;*/
    align-items: center;
    &::before {
      content: "";
      background-image: url(${GreyTick});
      height: 20px;
      width: 20px;
      background-repeat: no-repeat;
    }
  }
  label {
    font-size: 12px !important;
  }
  /*label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100px;
  }*/
`;
export const AvatorDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img.edit-icon {
    width: 12px;
    height: 12px;
    display: flex;
    cursor: pointer;
    opacity: 1;
    // visibility: hidden;
    transition: all 0.5s ease;
  }
  &:hover {
    img.edit-icon {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const SidePopupWidth60 = styled.div`
  .side-drawer {
    width: 60% !important;
  }
`;

export const AddNewItemDescription = styled.div`
  display: flex;
  gap: 10px;
  > div {
    padding: 0 8px;
    width: 66%;
    padding-right: 0px;
  }
`;

export const InlineModelContainer = styled.div`
  .tooltip ~ div {
    inset: 0px 90% auto auto !important;
    width: 600px !important;
    min-height: 300px;
  }
`;
