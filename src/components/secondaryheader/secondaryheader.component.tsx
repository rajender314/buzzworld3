import styled from "styled-components";
import themeFont from "@app/core/styles/fonts";

export const SecondaryHeaderContainer = styled.div`
  // .icon {
  //   display: none;
  // }
  .css-15pswuj {
    width: 30%;
    padding: 0px 14px;
    font-family: ${themeFont};
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #2e374a;
  }
  .css-283000 {
    width: 50%;
  }
  .css-152ppnk-ButtonBase {
    margin-right: 16px;
  }
  display: flex;
  // border-bottom: 2px solid #eaeaea;
  padding: 0 24px;
  // padding-right: 1% !important;
  // width: 80%;
  flex: 1;
  // padding-right: inherit;
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    padding: 0px 16px;
    > div .add-Icon {
      right: 16px;
    }
  }
  @media only screen and (max-width: 1366px) {
    /* .css-15pswuj {
      width: 30%;
      padding: 0px 14px;
      font-family: ${themeFont};
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 36px;
      color: #2e374a;
    } */
    .css-283000 {
      width: 50%;
    }
    .css-152ppnk-ButtonBase {
      margin-right: 16px;
    }
    display: flex;
    // border-bottom: 2px solid #eaeaea;
    // padding: 8px 1.5%;
    // padding-right: 1% !important;
    // width: 80%;
    flex: 1;
    // padding-right: inherit;
  }
`;
export const LeftContent = styled.div`
  width: 272px;
  display: flex;
  align-items: center;
  padding-left: 0px;
  img {
    height: 32px;
    width: 32px;
  }
  h1,
  .page-label {
    padding: 0 8px !important;
    font-family: ${themeFont} !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 24px !important;
    line-height: 36px !important;
    color: #2e374a !important;
    width: unset !important;
  }
`;
export const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  gap: 16px;
  .search_container {
    width: 50%;
  }
  .quote-search-width {
    width: 50%;
  }
  .input_search {
    width: unset !important;
  }
  .input {
    width: 100%;
    display: flex;
    border: 0.125rem solid #d0daec;
    min-height: 40px;
    max-height: 40px;
    border-radius: 4px;
    margin: 4px 0px;
    padding-left: 12px;
    align-items: center;
  }
  .input:focus-within {
    border-color: #124eb0;
  }
  .Toast-Message {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
export const SearchDiv = styled.div`
  width: 100%;
  margin-left: 0;
  .css-1ya7m8d {
    width: 40% !important;
    margin-left: 3% !important;
  }
  @media only screen and (min-width: 1440px) {
    width: 100%;
    margin-left: 0;
    .css-1ya7m8d {
      width: 35% !important;
      margin-left: 0% !important;
    }
  }
  @media only screen and (max-width: 1366px) {
    width: 100%;
    margin-left: 0;
  }
`;
export const IconDiv = styled.div`
  .css-8q8sbr {
    margin-right: 24px;
  }
`;
export const SelectDiv = styled.div`
  width: 30%;
`;
export const DropdownDelete = styled.div`
  // .css-8q8sbr {
  //   float: right;
  //   position: relative;
  //   top: 29px;
  // }
`;
export const DropdownDiv = styled.div`
  display: flex;
  button {
    padding: 0 10px;
  }
  .savedViews {
    justify-content: space-between;
    display: flex;
    align-items: center;
    min-width: 125px;
    button {
      min-width: 100px !important;
    }
  }
  .sc-furwcr {
    display: flex;
  }
`;
export const SaveViewDiv = styled.div`
  display: flex;
  .sc-furwcr {
    display: flex;
  }
`;
export const ImgDiv = styled.div`
  // padding: 16px 24px;
  cursor: pointer;
  display: flex;
  img {
    width: 16px;
    height: 16px;
  }
`;

export const ExportAnchor = styled.a`
  text-decoration: none;
  // padding-right: 6px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 2px solid var(--themeBlue800);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 1%;
`;

export const ImgTag = styled.img`
  display: flex;
  cursor: pointer;
  text-decoration: none;
  &.header-create-option-img {
    width: 26px;
    height: 26px;
  }

  &.save-view.Export-Image {
    height: 24px;
    width: 24px;
  }
  &.add-icon {
    width: 20px;
    height: 20px;
  }
  &.save-view.dele-Icon {
    height: 16px;
    width: 16px;
    margin: 0 4px;
  }
`;

export const AnimSyncImgTag = styled.img`
  display: flex;
  cursor: pointer;
  text-decoration: none;
  height: 20px;
  width: 20px;
`;

export const TextTag = styled.span`
  color: var(--themeBlue800);
  padding: 8px;
  width: 45px;
`;

export const AllAlign = styled.div`
  display: flex;
`;

export const ImageIconDiv = styled.div`
  width: 36px;
  height: 36px;
  background: transparent;
  border: 2px solid var(--themeBlue800);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  // margin-right: 4%;
`;
export const ButtonsGroup = styled.div`
  z-index: 1;
  position: relative;
  // right: 3%;
  float: right;
  display: flex;
  margin: 0;
  gap: 26px;
  align-items: center;
  .More-Options {
    display: none;
  }
  .Button-Icon-Display {
    display: flex;
    width: max-content;
    align-items: center;
    gap: 10px;
  }
  .Icon-space {
    margin-right: 16px;
  }
  .css-1h65th5-ButtonBase {
    margin-right: 16px !important;
  }
  /*button {
    margin-right: 16px !important;
    min-width: 125px;
    
  }*/
  button {
    /* margin-right: 16px !important; */
    /* min-width: 125px; */

    height: 40px !important;
    /* padding: 4px 10px !important; */
    padding: 10px 16px !important;
    line-height: unset;
    border-radius: 6px;
    height: unset;
    display: flex;
    align-items: center;
    svg {
      color: #fff !important;
    }
    span {
      color: #fff !important;
      margin: 0px;
    }
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  button[aria-expanded="true"] {
    padding: 10px 16px !important;
    line-height: unset;
    gap: 4px;
    height: unset;
    display: flex;
    align-items: center;
    background-color: var(--themeBlue900);
    svg {
      color: var(--themeBlue900);
    }
  }
  button[aria-expanded="false"] {
    padding: 10px 16px !important;
    gap: 4px;
    line-height: unset;
    height: unset;
    display: flex;
    align-items: center;
    background-color: var(--themeBlue900);
    margin-right: 0px !important;
    svg {
      color: var(--themeBlue900);
    }
    span {
      margin: 0px !important;
    }
  }

  .save-view:hover {
    // border: 2px   solid grey;
  }
  .Import-Icon:hover {
    border: 2px solid grey;
  }
  .Export-Icon:hover {
    border: 2px solid grey;
  }
  .Export-Image {
    // padding-top: 25%;
  }
  .Icons-space {
    margin-right: 16px;
  }
  .hover {
    visibility: hidden;
  }
  .hover:hover {
    visibility: visible;
  }
  .save-view {
    // margin-right: 10px !important;
  }
  // .ImportItems .css-wrk4co-Positioner{

  //     margin-top: 0%;

  // }
  @media only screen and (max-width: 768px) {
    .More-Options {
      display: flex;
    }
    .Button-Icon-Display {
      display: none;
    }
  }
  .add-Icon {
    display: flex;
    gap: 10px;
  }
  .d-flex {
    display: flex;
    gap: 12px;
  }
`;

export const ExportDiv = styled.div`
  width: 150px;
  display: flex;
  .export-text {
    padding-left: 10px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    margin: 5px 0px;
    color: var(--themeBlue900) !important;
    font-family: ${themeFont} !important;
    font-style: normal !important;
    text-decoration: none;
  }
`;

export const LinkWithIcon = styled.div`
  padding: 0;
  display: flex;

  /* display: grid;
  grid-template-columns: auto 1fr; */
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  /* color: #6d7992; */
  text-decoration: none;
  cursor: pointer;
  gap: 4px;
  img {
    gap: 8px;
  }

  /*img {
    margin-right: 8px;
  }*/
  &:hover {
    color: var(--themeBlue800);
  }
  .button-icon-text {
    color: #fff;
  }
  &.primary-button {
    background: #124eb0;
    padding: 10px 16px;
    border-radius: 6px;
    color: #fff;
    &.in-dropdown {
      padding: 2px 16px;
    }
  }
  &.primary-button:hover {
    background: rgb(29, 96, 204);
    transition-duration: 0s, 0.15s;
  }
  &.secondary-button {
    background: #fff;
    padding: 10px 16px;
    border: 2px solid #d0daec;
    border-radius: 6px;
    .button-icon-text {
      color: #124eb0;
    }
    &.secondary-button:hover {
      background: #e3f2fd !important;
      transition-duration: 0s, 0.15s;
    }
  }
`;

export const ExportIconPopup = styled.div`
  min-height: 100px;
  display: flex;
  font-family: ${themeFont};
  align-items: center;
  justify-content: center;
  font-weight: 500;
  text-align: center;
  font-size: 14px;
  line-height: 1.75;
  color: #6d7992;
  padding: 0 40px;
  p {
    margin: 0;
  }
`;

export const ExportIconPopupHeader = styled.div`
  display: flex;
  // height: 50px;
  flex-direction: column;
  .Back-arrow {
    display: flex;
    cursor: pointer;
  }
  hr {
    margin: 0;
    border: 1px solid #e3eaf6;
  }
  h3 {
    margin: 0;
  }
`;
export const SavedViewListContainer = styled.div`
  button {
    /* margin-right: 16px !important; */
    /* min-width: 125px; */

    height: 40px !important;
    /* padding: 4px 10px !important; */
    padding: 10px 16px !important;
    line-height: unset;
    border-radius: 6px;
    height: unset;
    display: flex;
    align-items: center;
    border: 2px solid #e3eaf6;

    svg {
      color: var(--themeBlue900);
    }
    span {
      color: var(--themeBlue900) !important;
      margin: 0px;
    }
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  button:hover {
    background: #e3f2fd !important;
    -webkit-transition-duration: 0s, 0.15s;
    transition-duration: 0s, 0.15s;
  }
  button[aria-expanded="true"] {
    padding: 10px 16px !important;
    line-height: unset;
    gap: 4px;
    height: unset;
    display: flex;
    align-items: center;
    background-color: #fff;
    svg {
      color: var(--themeBlue900);
    }
  }
  button[aria-expanded="false"] {
    padding: 10px 16px !important;
    gap: 4px;
    line-height: unset;
    height: unset;
    display: flex;
    align-items: center;
    background-color: #fff;

    margin-right: 0px !important;
    svg {
      color: var(--themeBlue900);
    }
    span {
      margin: 0px !important;
    }
  }
`;
