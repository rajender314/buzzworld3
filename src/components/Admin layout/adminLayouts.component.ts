import styled from "styled-components";
import themeFont from "@app/core/styles/fonts";

export const TableListContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  overflow: auto;
`;
export const TenkButton = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
`;
export const SideMenuContainer = styled.div`
  width: 280px;
  background: #f9fbff;
  /* padding: 16px; */
  padding-top: 16px;
  /* margin-top: 20px; */
  font-family: ${themeFont};
  .css-1n0f7c5 .menu-option .menu-item-single {
    background-color: #f9fbff;
  }
  .menu-option .menu-item-single {
    border-radius: 8px;
    margin-bottom: 4px !important;
    padding: 12px 16px;
    padding-right: 0px;
  }
  .css-1n0f7c5 .menu-option .menu-item-single.active {
    background-color: #e3eaf6;
    color: var(--themeBlue800);
  }
  .menu-option .menu-item-single.active {
    border-radius: 8px;
  }
  .menu-option .menu-item-single:hover {
    border-radius: 8px;
  }
  .left-menu {
    padding: 16px;
    padding-top: 0px;
  }
  .menu-list {
    /* padding: 0px 16px; */
    /* padding: 16px; */
    padding-top: 0px;

    color: var(--themeBlue800);
    height: 100%;
    > div > div {
      background: unset !important;
    }
  }
  @media only screen and (max-width: 1366px) {
    width: 280px;
    background: #f9fbff;
    font-family: ${themeFont};
    /* margin-top: 20px; */
    .css-1n0f7c5 .menu-option .menu-item-single {
      background-color: #f9fbff;
    }
    .css-1n0f7c5 .menu-option .menu-item-single.active {
      background-color: #e3eaf6;
      color: var(--themeBlue800);
    }
    .menu-list {
      color: var(--themeBlue800);
      height: 100%;
    }
  }
`;

export const SideMenuList = styled.div`
  .active {
    color: blue;
  }
  font-family: ${themeFont};
`;
export const TableContainer = styled.div`
  flex: 1;
  .ag-react-container {
    display: flex;
  }
  .ag-header-cell-text {
    color: #6d7992;
  }
  .css-p150kv-ButtonBase {
    width: 100%;
  }
  .ag-theme-alpine .ag-header {
    // border: none;
  }
  .ag-root-wrapper-body {
    // border: none;
  }
  .ag-theme-alpine .ag-pinned-left-header {
    // border: none;
  }
  .ag-header-cell {
    padding-right: 4px !important;
  }
  /*.ag-header-cell {
    display: inline-flex;
    align-items: center;
    position: absolute;
    height: 100%;
    overflow: hidden;
    transition: 0s !important;
    text-align: left !important;
    transition-timing-function: ease !important;
    padding: 5px;
  }*/
  .header-align-left {
    .ag-header-cell-label {
      justify-content: end !important;
      color: var(--logHistoryCardBgColor);
    }
  }
  .ag-header-justify-center {
    .ag-header-cell-label {
      justify-content: center !important;
      color: var(--logHistoryCardBgColor);
    }
  }
  .header-justify-start {
    .ag-header-cell-label {
      justify-content: flex-start !important;
      color: var(--logHistoryCardBgColor);
    }
  }
  .ag-theme-alpine .ag-row {
    // border: none;
    // border-bottom-style: solid;
    // border-color:#F2F7FF;
    // height: 49px !important;
  }
  .css-7bttev-ButtonBase {
    width: 100%;
  }
  .ag-cell {
    display: inline-block;
    position: absolute;
    white-space: nowrap;
    // transition: 0.3s !important;
    transition-timing-function: ease !important;
    // text-align: left !important;
    font-family: ${themeFont};
    line-height: 2;
    padding: 5px;
    border: 0px;
    // height: 32px;
  }
  .css-1h65th5-ButtonBase {
    width: 100%;
  }
  .css-152ppnk-ButtonBase {
    width: 100%;
  }
  .ag-style {
    padding: 16px;
  }
  .ag-theme-alpine .ag-paging-panel {
    // border-color: transparent !important;
  }
  // .ag-theme-alpine .ag-root-wrapper .ag-ltr .ag-layout-normal{
  //     border: none !important;
  // }
  // .ag-theme-alpine .ag-root-wrapper{
  //     border: none;
  // }
  .ag-theme-alpine {
    // height: 628px !important;
    // width: 954px !important;
    // border-color: transparent !important;
    // border: none !important;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 100px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(0, 0, 0, 0.4);
    border-radius: 6px;
  }
  @media only screen and (min-width: 1440px) {
    flex: 1;

    .ag-header-cell-text {
      color: #6d7992;
    }
    .css-p150kv-ButtonBase {
      width: 100%;
    }
    .ag-theme-alpine .ag-header-cell {
      padding-left: 18px;
    }
    // .ag-theme-alpine .ag-header{
    //     border: none;
    // }
    // .ag-root-wrapper-body{
    //     border: none;
    // }
    // .ag-theme-alpine .ag-pinned-left-header{
    //     border: none;
    // }
    .ag-header-cell {
      display: inline-flex;
      align-items: center;
      position: absolute;
      height: 100%;
      overflow: hidden;
      transition: 0s !important;
      text-align: left !important;
      transition-timing-function: ease !important;
      padding: 5px;
    }
    /*.ag-header-cell-label {
      justify-content: left !important;
      color: #f7faff;
    }*/
    .ag-theme-alpine .ag-row {
      // border: none;
      // border-bottom-style: solid;
      // border-color:#F2F7FF;
      // height: 49px !important;
    }
    .css-7bttev-ButtonBase {
      width: 100%;
    }
    .ag-cell {
      display: inline-block;
      position: absolute;
      white-space: nowrap;
      // transition: 0.3s !important;
      transition-timing-function: ease !important;
      // text-align: left !important;
      font-family: ${themeFont};
      line-height: 2;
      padding: 5px;
      border: 0px;
      // height: 32px;
    }
    .css-1h65th5-ButtonBase {
      width: 100%;
    }
    .css-152ppnk-ButtonBase {
      width: 100%;
    }
    .ag-style {
      padding: 24px;
    }
    .ag-theme-alpine .ag-paging-panel {
      // border-color: transparent !important;
    }
    .ag-theme-alpine .ag-root-wrapper .ag-ltr .ag-layout-normal {
      // border: none !important;
    }
    .ag-theme-alpine .ag-root-wrapper {
      // border: none;
    }
    .ag-theme-alpine {
      // height: 628px !important;
      // width: 954px !important;
      // border-color: transparent !important;
      // border: none !important;
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 100px;
    }
    ::-webkit-scrollbar-track {
      border-radius: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background: rgb(0, 0, 0, 0.4);
      border-radius: 6px;
    }
  }
`;

export const PageConatiner = styled.div`
  width: 100%;
`;
export const NoItemContainer = styled.div`
  width: 100%;
  transform: translate(40%, 55%);

  .no-items-found {
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0px;
    text-align: left;
    color: #2e374a;
  }
  .max-size-note {
    font-family: ${themeFont};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: #8e99b2;
  }
  @media only screen and (min-width: 1440px) {
    width: 100%;
    transform: translate(40%, 55%);

    .no-items-found {
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 36px;
      letter-spacing: 0px;
      text-align: left;
      color: #2e374a;
    }
    .max-size-note {
      font-family: ${themeFont};
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0px;
      text-align: left;
      color: #8e99b2;
    }
  }
  @media only screen and (max-width: 1366px) {
    width: 100%;
    transform: translate(40%, 55%);

    .no-items-found {
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 36px;
      letter-spacing: 0px;
      text-align: left;
      color: #2e374a;
    }
    .max-size-note {
      font-family: ${themeFont};
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0px;
      text-align: left;
      color: #8e99b2;
    }
  }
`;
export const ButtonPi = styled.div`
  text-align: end;
  padding: 8px 2% !important;
  justify-content: space-between;
  align-items: center !important;
  display: flex;
  font-family: ${themeFont};
  .css-1h65th5-ButtonBase {
    margin-right: 16px;
  }
  .Disabled {
    background: var(--themeBlue900) !important;
    margin-right: 16px;
    opacity: 0.5;
  }
  @media only screen and (min-width: 1440px) {
    text-align: end;
    padding: 8px 2% !important;
    justify-content: space-between;
    align-items: center !important;
    display: flex;
    font-family: ${themeFont};
    .css-1h65th5-ButtonBase {
      margin-right: 16px;
    }
    .Disabled {
      background: var(--themeBlue900) !important;
      margin-right: 16px;
      opacity: 0.5;
    }
  }
  @media only screen and (max-width: 1366px) {
    text-align: end;
    padding: 8px 2% !important;
    justify-content: space-between;
    align-items: center !important;
    display: flex;
    font-family: ${themeFont};
    .css-1h65th5-ButtonBase {
      margin-right: 16px;
    }
    .Disabled {
      background: var(--themeBlue900) !important;
      margin-right: 16px;
      opacity: 0.5;
    }
  }
`;

export const Header = styled.div`
  .icon {
    display: flex;

    align-items: center;

    justify-content: center;

    flex: 1;
    margin-right: 10%;
  }
  .css-1u8sedw-Icon > svg {
    display: none;
    overflow: hidden;
    pointer-events: none;
    max-width: 100%;
    max-height: 100%;
    color: var(--icon-primary-color);
    fill: var(--icon-secondary-color);
    vertical-align: bottom;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eaeaea !important;

  .add-Icon {
    display: flex;
    position: absolute;
    right: 24px;
    gap: 16px;
  }
  .items-center {
    align-items: center;
  }
  .pi-toggle {
    > div > label {
      margin: 3px 6px;
    }
  }
  .css-7no60z-ButtonBase {
    padding: inherit;
  }
  .css-clvj82 {
    // transition: ease-in;
    height: auto;
    // padding: 5%;
    position: relative;
    width: min-content;
    top: 0px;
    line-height: 20px;
    max-width: 250px;
  }
  @media only screen and (min-width: 1440px) {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #eaeaea !important;
  }
  @media only screen and (max-width: 1366px) {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #eaeaea !important;
  }

  .customer-filter-dropdown {
    align-self: center;
    position: fixed;
    right: 115px;
    float: right;
    z-index: 20;
    .react-select__control {
      height: 50px !important;
      overflow-y: auto;
    }
  }
`;

export const ErrMsg = styled.p`
  color: #af1515;
  padding: 1%;
  font-family: ${themeFont};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  @media only screen and (max-width: 1366px) {
    color: #af1515;
    padding: 1%;
    font-family: ${themeFont};
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
  }
`;
export const FilterIconContainer = styled.div`
  border: 2px solid #e3eaf6;
  padding: 10px 16px;
  border-radius: 6px;
  &:hover {
    background: #e3f2fd !important;
    transition-duration: 0s, 0.15s;
  }
  span {
    background-color: #19836a;
    border-radius: 100px;
    color: #ffffff;
    padding: 0px 6px;

    font-size: 13px;
    line-height: 18px;
  }
  /* &.open {
    &::before {
      content: "";
      height: 8px;
      width: 8px;
      background-color: #1bb01bf7;
      border-radius: 50%;
    }
  } */

  gap: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 8px; */

  cursor: pointer;
  .filter-text {
    font-family: ${themeFont};
    font-size: 14px;
    font-weight: 600;
    color: var(--themeBlue900);
  }
  &.organization-filters {
    margin-left: 16px;
  }
  img.filter-icon {
    width: 14px;
    height: 14px;
  }
`;
