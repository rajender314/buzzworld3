import themeFont from "@app/core/styles/fonts";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  display: -webkit-box;
  justify-content: space-between;
  padding: 8px 24px;
  border-bottom: 1px solid #e3eaf6;
`;
export const RepairIdsDiv = styled.div`
  display: flex;

  gap: 16px;
  justify-content: center;
  align-items: center;
  .repair-view-left-image {
    height: 32px;
    width: 32px;
  }
  .repair-name {
    width: 234px;
  }

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
  /* @media screen and (max-width: 1280px) {
    gap: 8px;
    .repair-name {
      width: 216px;
    }
  } */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    gap: 8px;
    .repair-name {
      width: 216px;
    }
  }
`;
export const BackSection = styled.div`
  display: flex;
  align-items: center;
  &.sp-preview-header {
    width: 100%;
    justify-content: space-between;
    /* padding-right: 16px; */
  }
`;

export const DetailViewStatusDropdown = styled.div`
  /* margin: 0 0 4px; */
  font-family: var(--themeFont);
  font-size: 14px;
  button {
    height: 20px;
    padding: 0px 10px !important;
    line-height: unset;
    height: unset;
    display: flex;
    align-items: center;
    svg {
      color: #fff !important;
    }
    span {
      color: #fff !important;
    }
  }
  button[aria-expanded="true"] {
    padding: 0px 10px !important;
    line-height: unset;
    height: unset;
    display: flex;
    align-items: center;
    background-color: var(--themeBlue900);
    svg {
      color: var(--themeBlue900);
    }
  }
  button[aria-expanded="false"] {
    padding: 0px 10px !important;
    line-height: unset;
    height: unset;
    display: flex;
    align-items: center;
    background-color: var(--themeBlue900);
    svg {
      color: var(--themeBlue900);
    }
  }
  &.admin-user-type {
    button {
      background-color: unset !important;
      padding: 0 !important;
    }
    svg {
      color: #6d7992 !important;
    }
  }
`;
export const RepairIds = styled.div`
  .id-num {
    font-family: Inter;
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0px;
    text-align: left;
  }
  .repair-name {
    /* width: 250px; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: #4e586d;
  }
  .quote-num-and-status {
    display: flex;
    gap: 8px;
    align-items: center;
    label {
      margin-bottom: 0px !important;
    }
  }
  /* @media screen and (max-width: 1280px) {
    .id-num {
      font-size: 22px;
    }
  } */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    .id-num {
      font-size: 22px;
    }
  }
`;
export const RightSideContent = styled.div`
  display: flex;
  align-items: center;
  /*margin-right: 12px;*/
  gap: 16px;
  @media screen and (max-width: 1280px) {
    gap: 8px;
    .approve_button {
      button {
        min-width: 88px;
      }
    }
  }
`;
export const AnchorTag = styled.a`
  text-decoration: none;
  display: flex;
`;

export const SaveApproveQuestionTabs = styled.div`
  height: 100%;
  .pitabs-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    overflow: auto;
  }
  div[role="tablist"] {
    padding: 0 30px;
  }
`;
