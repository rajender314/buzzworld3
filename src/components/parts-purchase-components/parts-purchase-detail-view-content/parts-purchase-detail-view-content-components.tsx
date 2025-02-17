import styled from 'styled-components';

export const PartsPurchaseField = styled.div`
  width: 49.5%;
  display: flex;

  &.align-center {
    align-items: center;
  }
  label {
    display: flex;
  }
  .pt {
    padding-top: 4px !important;
  }

  p {
    text-transform: unset;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &.repiar-infosection-items {
    width: calc(33% - 16px);
    gap: 20px;

    > div {
      padding: 0 !important;
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
      padding: 0 !important;
    }
  }
  &.calc-width-33 {
    width: calc(33% - 16px);
    gap: 10px;

    height: 70px;
    & > div {
      padding: 0 !important;
    }
    .field-label-div label {
      padding-left: 0px !important;
      font-weight: 400 !important;
      line-height: 20px !important;
      margin-bottom: 6px !important;
      color: #4e586d;
    }
  }

  &.repiar-infosection-item {
    width: calc(23% - 16px);
    gap: 10px;
  }
  &.calc-width-25 {
    width: calc(25% - 16px);
    gap: 10px;
    padding: 20px 0;
    & > div {
      padding: 0 !important;
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
    padding-top: 1px;

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
  .description {
    padding-left: 0px !important;
    font-weight: 600 !important;
    color: #2e374a !important;
  }
`;

export const FieldDetails = styled.div`
  &.field-details {
    flex: 1;
  }
`;
export const ItemNotesTextArea = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;
export const RequestorInfoSection = styled.div`
  min-height: 186px;
  /* border: 1px solid #e3eaf6; */
  background: #fff;
  padding: 24px;

  border-radius: 16px;
  .rep-label-typo {
    display: flex;
    gap: 10px;
    h4,
    h6 {
      margin: 0;
      font-family: Inter;
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      letter-spacing: 0px;
      text-align: left;
      color: #2e374a;
    }
    h4 {
      font-size: 22px;
    }
  }
  hr {
    border-top: 1px solid #e3eaf6;
    margin: 0;
  }
  .field-details {
    display: flex;
    flex-wrap: wrap;
    row-gap: 16px;
    column-gap: 20px;
    .pi-label,
    .pi-address {
      .label-text {
        font-weight: 700;
        font-size: 14px;
        font-family: Inter;
        color: #4e586d;
      }
      .description {
        font-weight: normal;
        font-family: Inter;
        padding-left: 6px;
      }
    }
    .pi-address {
      padding-top: 18px;
    }
  }
  .justify-space-bwn {
    justify-content: space-between;
  }
  &.user-profile-card {
    margin-top: 10px;
    border-radius: 4px;
  }
  .option-items {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 8px;
    padding-top: 10px;
  }
  .quote-option-del-icon {
    height: 32px;
    width: 32px;
    border: 2px solid #6d7992;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }
`;
export const UrgencyField = styled.div`
  width: 23%;
  margin: 20px 0 0;
`;
export const DocumentsContainer = styled.div`
  min-height: 186px;
  border: 1px solid #e3eaf6;
  background: #fff;
  padding: 16px;
  margin: 20px 0;

  &#repair-info-id {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  &#repair-docs {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .rep-label-typo {
    display: flex;
    gap: 10px;
    h4,
    h6 {
      margin: 0;
      font-family: Inter;
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      letter-spacing: 0px;
      text-align: left;
      color: #2e374a;
    }
    h4 {
      font-size: 18px;
    }
  }
  hr {
    border-top: 1px solid #e3eaf6;
    margin: 0;
  }
  .field-details {
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 20px;
    .pi-label,
    .pi-address {
      .label-text {
        font-weight: 700;
        font-size: 14px;
        font-family: Inter;
        color: #4e586d;
      }
      .description {
        font-weight: normal;
        font-family: Inter;
        padding-left: 6px;
      }
    }
    .pi-address {
      padding-top: 18px;
    }
  }
  .justify-space-bwn {
    justify-content: space-between;
  }
  &.user-profile-card {
    margin-top: 10px;
    border-radius: 4px;
  }
  .option-items {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 8px;
    padding-top: 10px;
  }
  .quote-option-del-icon {
    height: 32px;
    width: 32px;
    border: 2px solid #6d7992;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }
`;

export const RequestorInformationField = styled.div`
  width: 49.5%;
  display: flex;
  &.align-center {
    align-items: center;
  }
  label {
    display: flex;
  }
  p {
    text-transform: capitalize;
    min-width: 200px;
  }
  &.repiar-infosection-items {
    width: 223px;
    > div {
      padding: 0 !important;
    }
  }
  &.calc-width-25 {
    width: calc(25% - 16px);
    gap: 10px;
    padding: 20px 0;
    & > div {
      padding: 0 !important;
    }
  }
  &.calc-width-33 {
    width: calc(33% - 16px);
    gap: 10px;
    padding: 16px 0px;
    & > div {
      padding: 0 !important;
    }
  }

  &.repiar-infosection-item {
    width: calc(23% - 16px);
    gap: 10px;
  }
  &.calc-width-25 {
    width: calc(25% - 16px);
    gap: 10px;
    padding: 20px 0;
    & > div {
      padding: 0 !important;
    }
  }
  &.calc-width-33 {
    width: calc(33% - 16px);
    gap: 10px;
    padding: 16px 0px;
    & > div {
      padding: 0 !important;
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
    margin-left: -128px;
  }
  &:hover {
    img.edit-icon {
      opacity: 1;
      visibility: visible;
    }
  }
  .pi-label {
    justify-content: center;
    .description {
      display: flex;
    }
  }
`;
export const UserRoleDropdown = styled.div`
  width: 50%;
  .pi-select-wrapper {
  }
`;
export const DateSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  > div {
    pointer-events: none;
  }
  .user-name {
    font-weight: 700;
  }
  .css-c1ar99 {
    flex: 1;
  }
  img {
  }
`;
export const PurchaseOrderInfoSection = styled.div`
  min-height: 160px;
  border: 1px solid #e3eaf6;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  margin-top: 24px;
`;
export const PurchaseOrderInfoContentContainer = styled.div`
  h4 {
    font-family: var(--themeFont);
    font-size: 22px;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 0px;
    text-align: left;
    color: #2e374a;
    margin: 0;
  }
`;
export const PoContent = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 20px 0 0;

  .po_div {
    width: 22px;

    img {
      width: 100%;
    }
  }
  .po_date {
    img {
      width: 100%;
    }
  }
`;
export const PoId = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #2e374a;
`;
export const PoDate = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;

  color: #2e374a;
  span {
    margin-left: 14px;
  }
`;
export const PoContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  flex-wrap: wrap;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 2px solid #e3eaf6;
  }
`;
export const PoWrapper = styled.div`
  margin: 16px 0px;
  padding-right: 8px;
  width: 100%;
  overflow: auto;
  max-height: 320px;
`;
export const PurchaseItemEditContainer = styled.div`
  width: 32px;
  height: 32px;
  background-color: #f2f7ff;

  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #e3eaf6;
  }
  &.open {
    &::before {
      content: "";
    }
  }
`;
export const ItemsIconHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right:-14px > img {
    cursor: pointer;
  }
  &.no-items-found-container {
    flex-direction: column;
    height: 120px;
  }
`;
export const VendorEmail = styled.div`
  > label {
    margin: 4px 0px;
    font-weight: 400;
    font-size: 14px;
    font-family: Inter;
    color: #4e586d;

    padding-left: 6px;
  }
`;
export const VendorEmailContainer = styled.div`
  > p {
    margin: 4px 3px;
    font-weight: 600;
    font-size: 14px;
    font-family: Inter;
    color: #2e374a;
    padding-left: 6px;
  }
`;
export const POInfoTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const AddNewPOIconContainer = styled.div`
  /* margin: 0px 8px; */
  width: 32px;
  height: 32px;
  cursor: pointer;
  &.open {
    &::before {
      content: "";
    }
  }
`;
export const ItemInfoTitleContainer = styled.div`
  align-items: center;
  justify-content: space-between;

  > h4 {
    margin-bottom: -16px;
  }
`;
export const EditDelIconContainer = styled.div``;

export const PPItemCardTopDetails = styled.div`
  background: rgb(242, 247, 255);
  padding: 8px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  border-radius: 6px;
  flex-wrap: wrap;
`;
export const PPItemCardMainDetails = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &.section-divider {
    padding-bottom: 12px;
    border-bottom: 1px solid #e3eaf6;
  }
`;
export const PPManufacturerAvatarSection = styled.div`
  display: flex;
  > div {
    pointer-events: none;
  }
  .hide {
    display: none;
  }
  .user-name {
    font-weight: 600;
    color: #2e374a;
    margin: 0 8px;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;
export const PPItemLabel = styled.span`
  font-size: 16px;
`;
export const PPItemValue = styled.span`
  color: #2e374a;
  font-weight: 700;
  font-size: 16px;
  &.clamp {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 140px;
  }
  ::before {
    content: "";
  }
`;
export const PPItemFieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
`;
