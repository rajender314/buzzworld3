import styled from "styled-components";
import themeFont from "@app/core/styles/fonts";

export const TableListContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  height: 100%;
`;

export const SideMenuContainer = styled.div`
  width: 280px;
`;

export const SideMenuList = styled.div`
  .active_item {
    color: blue;
  }
`;
export const TableContainer = styled.div`
  width: 100%;
`;
export const PageConatiner = styled.div`
  width: 100%;
`;
export const FilterFormFields = styled.div`
  width: 100%;
  height: inherit;
  padding: 16px 0px;

  // align-items: center;
  // text-align: -webkit-center;
  // display: flex;
  &.piselect-form {
    .react-select__menu-list {
      max-height: 150px !important;
    }
  }
`;
export const ButtonsBody = styled.div`
  width: inherit;
  gap: inherit;
  .Secondary {
    line-height: 2rem;
  }
  .Primary {
    margin-left: 10px;
  }
`;

export const InnerBody = styled.div`
  width: 100%;
  /* margin: 24px 0; */
  // display: flex;
  flex-direction: column;
  // height: 250px;
  justify-content: space-between;
  display: flex;
  gap: 8px;
`;

export const InnerBodyQuantity = styled.div`
  width: 100%;
  // display: flex;
  flex-direction: column;
  // height: 250px;
  justify-content: space-between;
  display: flex;
`;

export const HeaderText = styled.div`
  text-align: center;
  div {
    background-color: unset !important;
  }
  // display: none
  .upload-container {
    border: none;
  }
  .upload-container svg {
    display: none;
  }
  /*.css-s32gra {
    background-color: transparent;
    color: #4e586d;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
  }*/
  .icon_container {
    margin: auto;
    cursor: pointer;
  }
  .browse_text {
    margin-bottom: 0;
  }
  .browse_text span {
    color: #1976d2;
    /* text-decoration-color: #1976D2; */
    text-decoration-line: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 6px;
  }
`;

export const CloseButton = styled.div`
  //position: absolute;
  //right: 4%;
  //color: red;
  position: relative;
  left: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  &:hover {
    background: #f2f7ff;
    cursor: pointer;
  }
  &.acknowledge-close {
    &:hover {
      background: unset !important;
      cursor: pointer;
    }
    img:hover {
      background: #f2f7ff;
    }
  }
  &.event {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }
  /*@media only screen and (min-width: 1440px){
    //position: absolute;
    //right: 4%;
    //color: red;
    position: relative;
    left: 6px;
    cursor: pointer;
    .Hover{
        color: red;
        cursor: pointer;
    }
}
@media only screen and (max-width: 1366px){
//    position: absolute;
//right: 4%;
//color: red;
cursor: pointer;
.Hover{
    color: red;
    cursor: pointer;
}
}*/
`;
export const ShowMessage = styled.span`
  font-size: 10px;
  height: 40px;
  right: 100% !important;
  padding: 1%;
  width: fit-content;
  // background-color: white;
  .css-cni8ru-SectionMessage {
    padding: 0px !important;
    position: relative !important;
  }
  @media only screen and (min-width: 1440px) {
    font-size: 10px;
    height: 40px;
    right: 100% !important;
    padding: 1%;
    width: fit-content;
    // background-color: white;
    .css-cni8ru-SectionMessage {
      padding: 0px !important;
      position: relative !important;
      top: 0px;
    }
  }
  @media only screen and (max-width: 1366px) {
    font-size: 10px;
    height: 40px;
    right: 100% !important;
    padding: 1%;
    width: fit-content;
    // background-color: white;
    .css-cni8ru-SectionMessage {
      padding: 0px !important;
      position: relative !important;
      top: 0px;
    }
  }
`;

export const SuccessMessage = styled.span`
  position: absolute;
  z-index: 99;
  font-family: ${themeFont};
  top: 85px;
  right: 15%;
  width: min-content;
  max-width: 250px;
  section {
    padding: 5px !important;
  }
`;

export const ErrorMessage = styled.span`
  position: absolute;
  z-index: 99;
  // top: 140px;
  font-family: ${themeFont};
  left: 24px;
  width: auto;
  max-width: 250px;
  section {
    padding: 0px !important;
  }
  h1 {
    font-size: 14px !important;
    font-family: ${themeFont};
    color: FFF0EF !important;
    font-weight: normal !important;
  }
  @media only screen and (min-width: 1440px) {
    position: absolute;
    z-index: 99;
    // right: 15%;
    width: auto;
    max-width: 250px;
    // top: 140px;
    left: 24px;
    section {
      padding: 0px !important;
    }
  }
  @media only screen and (max-width: 1366px) {
    position: absolute;
    z-index: 99;
    // right: 15%;
    width: auto;
    max-width: 250px;
    // top: 140px;
    left: 24px;
    section {
      padding: 0px !important;
    }
  }
`;
export const Popup = styled.div`
  top: 30%;
  height: 100%;
`;

export const PopupFooter = styled.div`
  display: flex;
`;
export const AdminEditModelContainer = styled.div`
  border: none;
`;
