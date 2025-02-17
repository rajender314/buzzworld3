import styled from 'styled-components';

export const EditIconPiTab = styled.div`
  position: relative;
  top: 12px;
  right: 34px;
  cursor: pointer;
`;
export const AddUserIconsContainer = styled.div`
  display: flex;
  gap: 8px;
`;
export const AddUserIconImg = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
  &.tooltip-text {
    &::before {
      content: "";
    }
  }
`;
export const Mandatory = styled.div`
  display: flex;
  gap: 10px;

  &.mandatory .label-text-div::after {
    content: "*";
    padding-left: 4px;

    color: red;
  }
  .pi-label {
    padding: 0px !important;
  }
  .label-text-div {
    gap: 0px;
  }
  > img.edit-icon {
    margin-top: 4px;
    width: 14px;
    height: 14px;
    display: flex;
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
`;
export const UserRoleField = styled.div`
  width: 49.5%;
  display: flex;
  .pi-select-wrapper {
    padding-top: 1px;
    label {
      color: #4e586d;
    }
  }

  &.align-center {
    align-items: center;
  }
  .header_font {
    font-weight: 400;
  }
  label {
    display: flex;
  }
  .label-text {
    padding: 0px !important;
  }

  p {
    /*text-transform: capitalize;*/
  }
  .mandatory-star {
    align-self: center;
    /* padding-top: 1px; */
  }
  .description {
    padding: 0px !important;
    overflow: hidden;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    word-break: break-all;
    /* white-space: nowrap; */
  }
  &.repiar-infosection-items {
    width: calc(33% - 16px);
    /* gap: 10px; */
    gap: 20px;

    > div {
      /*max-width: unset;
      width: unset;*/
      /*padding: 0 !important;*/
    }
  }
  img {
    cursor: pointer;
  }
  &.calc-width-25 {
    width: calc(25% - 16px);
    gap: 10px;
    padding: 20px 0;
    & > div {
      /*max-width: unset;
      width: unset;*/
      /*padding: 0 !important;*/
    }
  }
  &.calc-width-33 {
    width: calc(33% - 16px);
    gap: 10px;
    /* padding: 20px 0; */
    padding: 16px 0px;
    height: 104px;
    & > div {
      /*max-width: unset;
      width: unset;*/
      /*padding: 0 !important;*/
    }
    .field-label-div label {
      /* padding-left: 6px !important; */

      line-height: 20px !important;
      margin-bottom: 6px !important;
      font-weight: 400;
    }
    &.padd-zero {
      > div {
        padding: 0 !important;
      }
    }
  }

  &.repiar-infosection-item {
    width: calc(23% - 16px);
    gap: 10px;
    /*> div {
      max-width: unset;
      width: unset;
    } */
  }
  &.calc-width-25 {
    width: calc(25% - 16px);
    gap: 10px;
    padding: 20px 0;
    & > div {
      /*max-width: unset;
      width: unset;*/
      /*padding: 0 !important;*/
    }
  }

  > img.edit-icon {
    width: 16px;
    height: 16px;
    display: flex;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease;
    margin-top: 4px;
  }
  &:hover {
    img.edit-icon {
      opacity: 1;
      visibility: visible;
    }
  }

  .select-label {
    display: flex;
    justify-content: space-between;
    /* padding-top: 4px; */
    label {
      color: #4e586d;
    }

    .react-select__control {
      margin-top: 0px !important;
    }
  }

  &.ellipsis .pi-label .description {
    width: 250px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ellipsis .description {
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pilabel-star {
    /* padding-top: 3px; */
  }
  .pi-select-wrapper .field-label-div .mandatory-star {
    padding-top: 1px;
    align-self: flex-start;
  }
  .appro-comments {
    .pi-label {
      .description {
        white-space: unset !important;
      }
    }
  }
`;
export const NoUserFound = styled.div`
  /* position: relative;
  top: 10%;
  left: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  gap: 16px;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center; */
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  gap: 16px;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #6d7992;
  font-size: 14px;
  font-weight: 500;
  font-family: Inter;
`;
export const PiTabHeaderPanelContainer = styled.div`
  > div[role="tablist"] {
    padding: 0 24px !important;
  }
`;
