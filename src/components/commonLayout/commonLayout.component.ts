import styled from 'styled-components';

// position: fixed;
//     right: 100px;
//     top: 85px;
// }

export const TableListContainer = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  overflow: auto;
  .Body-Container::-webkit-scrollbar {
    width: 6px;
    height: 6px !important;
  }

  .Body-Container::-webkit-scrollbar-track {
    border-radius: 6px;
  }

  .Body-Container::-webkit-scrollbar-thumb {
    background: #d0daec;
    border-radius: 6px;
  }
`;

export const SideMenuContainer = styled.div`
  width: 280px;
  background: #f9fbff;
  /* padding: 0px 16px; */

  height: 100%;
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  /*border-right: 1px solid #eaeaea !important;*/

  &.sub-container {
    background: #ecf0f5;
  }
  .menu-option .menu-item-single {
    margin: 0px !important;
    margin-bottom: 4px !important;
    border-radius: 8px;
    background: unset;
  }
  .menu-option .menu-item-single.active {
    border-radius: 8px;
  }

  div p {
    margin: 4px 6px;
  }
  .approval-1 {
    margin-top: 10px;
  }
  .sideList-Search {
    padding: 20px;
    /*padding-bottom: 0;*/
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-bottom: 1px solid #eaeaea;
  }
  .sideList-Search-1 {
    // padding: 20px;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    //gap: 16px;
  }
  .side {
    padding: 20px;
    border-bottom: 1px solid #eaeaea;
  }
  .left-menu {
    /* background: #f9fbff;
    padding: 0px 16px; */
    position: relative;
    /* padding: 16px; */
  }
  /* .left-menu div {
    background: unset !important;
  } */
  &.menu-inside-menu {
    /* background-color: #f8f8f9; */
    background-color: #fff;
    border-right: 1px solid var(--greyCardBorder);
    .menu-option,
    .menu-item-single {
      /* background: #f8f8f9; */
      /* background-color: #fff; */
    }
  }
  .menu-list.pricing {
    /* padding: 16px 16px; */
    padding-top: 16px;

    color: var(--themeBlue800);
    height: 100%;
    .menu-option .menu-item-single {
      /* padding: 8px 0px 8px 24px !important; */
      padding: 8px 0px 8px 8px !important;
    }
    > div > div {
      padding: 16px;
      padding-top: 0px;
    }
  }
`;

export const SideMenuList = styled.div`
  .active_item {
    color: blue;
  }
`;
export const TableContainer = styled.div`
  flex: 1;
  position: relative;
  .ag-react-container {
    display: flex;
  }
  .Selector {
    width: 15%;
    position: relative;
    background: #f2f7ff;
    /* display: -webkit-box; */
    /* display: -webkit-flex; */
    display: -ms-flexbox;
    /* display: flex; */
    /* -webkit-box-pack: end; */
    /* -webkit-justify-content: flex-end; */
    -ms-flex-pack: end;
    /* justify-content: right; */
    // bottom: 9%;
    // left: 33%;
    position: absolute;
    right: 100px;
    top: 75px;
    height: 0;
    option {
      min-height: 40px !important;
    }
    .Selector .css-1bx7l6n-control {
      background: #f2f7ff;
    }
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
    display: inline-flex;
    align-items: center;
    position: absolute;
    height: 100%;
    overflow: hidden;
    transition: 0s !important;
    text-align: left !important;
    transition-timing-function: ease !important;
  }
  .ag-customHeader-number .ag-header-cell-label {
    margin-right: 8px;
    justify-content: flex-end !important;
    color: var(--logHistoryCardBgColor);
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
    font-family: Inter;
  }
  .css-1h65th5-ButtonBase {
    width: 100%;
  }
  .css-152ppnk-ButtonBase {
    width: 100%;
  }
  .ag-style {
    // padding: 24px;
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
  @media only screen and (min-width: 1440px) {
    .Selector {
      width: 15%;
      position: relative;
      background: #f2f7ff;
      /* display: -webkit-box; */
      /* display: -webkit-flex; */
      display: -ms-flexbox;
      /* display: flex; */
      /* -webkit-box-pack: end; */
      /* -webkit-justify-content: flex-end; */
      -ms-flex-pack: end;
      /* justify-content: right; */
      // bottom: 9%;
      // left: 33%;
      position: absolute;
      right: 100px;
      top: 75px;
      // height: 0;
      // padding-right: 0.5rem;
    }
    .css-4mp3pp-menu {
      // height: 60px;
    }
    .css-1bx7l6n-control {
      background: #f2f7ff;
    }
    .css-1bx7l6n-control:hover {
      background: #f2f7ff;
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
      font-family: Inter;
      line-height: 2;
      padding: 5px;
      border: 0px;
      // height: 32px;
    }
    .css-1h65th5-ButtonBase {
      width: auto;
      margin: 0%;
    }
    .css-152ppnk-ButtonBase {
      width: auto;
    }
    .ag-style {
      // padding: 24px;
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
  @media only screen and (max-width: 1366px) {
    .Selector {
      width: 15%;
      position: relative;
      background: #f2f7ff;
      /* display: -webkit-box; */
      /* display: -webkit-flex; */
      display: -ms-flexbox;
      /* display: flex; */
      /* -webkit-box-pack: end; */
      /* -webkit-justify-content: flex-end; */
      -ms-flex-pack: end;
      /* justify-content: right; */
      // bottom: 9%;
      // left: 33%;
      // height: 0;
      position: absolute;
      right: 100px;
      top: 75px;
      // padding-right: 0.5rem;
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
      font-family: Inter;
      line-height: 2;
      padding: 5px;
      border: 0px;
      // height: 32px;
    }
    .ag-cell .Icon {
      display: flex;
    }
    .css-1h65th5-ButtonBase {
      width: auto;
      margin: 0%;
    }
    .css-152ppnk-ButtonBase {
      width: auto;
    }
    .ag-style {
      // padding: 24px;
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
    font-family: Inter;
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
      font-family: Inter;
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
      font-family: Inter;
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
  // padding: 8px !important;
  justify-content: space-between;
  align-items: center !important;
  display: flex;
  font-family: Inter;
  padding-right: 1.5%;
  padding-bottom: 8px;
  padding-top: 8px;
  .css-1h65th5-ButtonBase {
    margin-right: 0px !important;
  }
  @media only screen and (min-width: 1440px) {
    text-align: end;
    // padding: 8px !important;
    justify-content: space-between;
    align-items: center !important;
    display: flex;
    font-family: Inter;
    padding-right: 1.5%;
    padding-bottom: 8px;
    padding-top: 8px;
    .css-1h65th5-ButtonBase {
      margin-right: 0px !important;
    }
  }
  @media only screen and (max-width: 1366px) {
    text-align: end;
    // padding: 8px !important;
    justify-content: space-between;
    align-items: center !important;
    display: flex;
    font-family: Inter;
    padding-right: 1.5%;
    padding-bottom: 8px;
    padding-top: 8px;
    .css-1h65th5-ButtonBase {
      margin-right: 0px !important;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  // flex: 1;
  // height: 84px;
  padding-right: 0px !important;
  justify-content: space-between;
  border-bottom: 2px solid #eaeaea !important;
  .Toast-Message {
    position: absolute;
    z-index: 99;
    font-family: Inter;
    right: 15%;
    width: min-content;
    top: 78px;
    max-width: 250px;
  }
  section {
    padding: 5px !important;
  }
  .ag-paging-panel .ag-unselectable {
    position: absolute !important;
  }
  .Selector-Branch {
    align-self: center;
    /* background-color: #124eb0; */
    // position: absolute;
    // width: 10%;
    // left: 45%;
    position: fixed;
    width: 180px;
    left: calc(30% + 280px + 24px + 16px);
    transform: translateX(-50%);
    z-index: 20;
    margin-left: 15px;
  }
  .krFIpQ {
    width: 30%;
  }
  .jBWEl {
    padding-left: 0%;
  }
  .css-1ya7m8d {
    width: 30%;
    // margin-left: 8.7%;
  }
  .css-1h65th5-ButtonBase {
    margin-right: 16px;
  }

  .jsnrJh {
    margin: 0%;
    right: 0%;
  }

  .kvMnmb {
    margin-right: 0px;
    margin-left: 0px;
    left: 0px;
    right: 0px;
  }
  .select-branch-button {
    width: 120px;
    .react-select__placeholder {
      color: #fff !important;
      font-size: 16px !important;
    }
    /* background: #124eb0 !important; */
    > div {
      /* background: #124eb0 !important; */
      border-radius: 6px;
      /*max-height: 40px !important;
      height: 40px !important;*/
      border: none !important;
      margin: 0px;

      padding: 0px 6px;

      > div > div {
        /* color: #fff; */
        background-color: unset !important;
        font-size: 16px;
      }
    }
    .react-select__control {
      background-color: #124eb0 !important;
      min-height: 40px !important;
      max-height: 40px !important;
      .react-select__value-container {
        margin-bottom: 0;
      }
    }
    .react-select__single-value {
      color: #fff;
    }
    .react-select__indicator {
      color: #fff;
    }
  }
  @media only screen and (min-width: 1440px) {
    display: flex;
    // flex: 1;
    // height: 84px;
    padding-right: 0px !important;
    justify-content: space-between;
    border-bottom: 2px solid #eaeaea !important;
    .krFIpQ {
      width: 30%;
    }
    .jBWEl {
      padding-left: 0%;
    }
    .css-1ya7m8d {
      width: 30%;
      // margin-left: 6.5%;
    }
    .css-1h65th5-ButtonBase {
      margin-right: 16px;
    }

    .jsnrJh {
      margin: 0%;
      right: 0%;
    }

    .kvMnmb {
      margin-right: 0px;
      margin-left: 0px;
      left: 0px;
      right: 0px;
    }
  }
  @media only screen and (max-width: 1366px) {
    display: flex;
    // flex: 1;
    // height: 84px;
    padding-right: 0px !important;
    justify-content: space-between;
    border-bottom: 2px solid #eaeaea !important;
  }
`;
export const BranchSelector = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6d7992;
  background: transparent;
  margin-bottom: 0px;
  margin-top: 0px;
  padding: 0.5% 1.5%;
  gap: 0.5rem;
  padding-bottom: 0px;
  padding-right: 0px;
  width: fit-content;
  .css-iuba1a-ButtonBase {
    width: -webkit-fill-available;
  }
  .css-7no60z-ButtonBase {
    font-weight: normal;
  }
  .css-1h65th5-ButtonBase {
    margin-right: 0px !important;
    width: -webkit-fill-available;
  }
  @media only screen and (max-width: 1366px) {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #6d7992;
    margin-bottom: 0px;
    margin-top: 0px;
    padding: 0.5% 1.5%;
    gap: 0.5rem;
    padding-bottom: 0px;
    padding-right: 0px;
    width: fit-content;
    .css-iuba1a-ButtonBase {
      width: -webkit-fill-available;
    }
    .css-7no60z-ButtonBase {
      font-weight: normal;
    }
    .css-1h65th5-ButtonBase {
      margin-right: 0px !important;
      width: -webkit-fill-available;
    }
  }
`;
export const IconClick = styled.span`
  display: flex;
`;

export const NoVendorFound = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6d7992;
  font-family: Inter;
  font-size: 14px;
`;

export const SpinnerDiv = styled.div`
  padding: 17px;
  display: flex;
  justify-content: center;
  min-height: 200px;
  align-items: center;
`;
