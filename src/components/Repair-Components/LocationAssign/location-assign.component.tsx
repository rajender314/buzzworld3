import styled from 'styled-components';

export const PartNumber = styled.div`
  //styleName: Fonts/H5 : 18, Bold;
  font-family: var(--themeFont);
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  color: #2e374a;
`;

export const RepairDetailsContainer = styled.div``;

export const SerailNoEditField = styled.div`
  width: 33%;
  max-width: calc(33% - 12px);

  .field-label-div > label {
    font-size: 13px;
    font-weight: 400;
    padding-top: 2px;
    color: #4e586d;
  }
  .select-label .save-reset-icons .tick-icon,
  .undo-icon {
    max-width: 24px !important;
    max-height: 24px !important;
  }
`;

export const PartItemDetails = styled.div`
  .part-parent {
    padding: 18px 0;
  }

  .repair-description {
    //styleName: Fonts/Regular Paragraph : 14;
    font-family: var(--themeFont);
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0px;
    text-align: left;
    /* color: #2e374a; */
    color: #4e586d;
    background-color: var(--logHistoryCardBgColor);
    padding: 16px;
  }
  .quantity-parent {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    row-gap: 24px;
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-word;
    .pi-label {
      /* padding: 3px; */
      width: 33%;
      max-width: calc(33% - 12px);
      /* padding: 20px 0; */
      .label-text {
        font-weight: 400;
        font-size: 13px;
        font-family: var(--themeFont);
        color: #4e586d;
        padding-left: 0px !important;
      }
      .description {
        font-weight: 700;
        font-family: var(--themeFont);
        padding-left: 0px !important;
        color: #2e374a;
      }
    }
  }
  .d-flex {
    display: flex;
    gap: 8px;
  }
  .width-50 {
    width: calc(50% - 8px);
  }
  .card {
    border: 1px solid #e3eaf6;
    border-radius: 6px;
  }
`;
export const ManufacterName = styled.div`
  font-family: var(--themeFont);
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0px;
  text-align: left;
  /* color: #8e99b2; */
  color: #6d7992;
`;
export const RepairableRadioContainer = styled.div`
  .label-name {
    font-family: var(--themeFont);
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: #6d7992;
  }
`;
export const StorageField = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
export const FormatOptionLabel = styled.div`
  display: flex;
  gap: 8px;
`;
