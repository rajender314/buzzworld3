import styled from 'styled-components';

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 200px;
  overflow: auto;
  .width-25 {
    width: calc(25% - 16px);
    padding: 10px 0px;
    div[role="radiogroup"] {
      flex-wrap: wrap;
      label {
        span {
          width: 200px;
        }
      }
    }
  }
  .padding {
    padding: 10px 0px;
  }
`;

export const FieldContainer = styled.div`
  padding-top: 10px;
  .react-multi-email {
    margin-top: 6px;
    border: 0.125rem solid #d0daec;
    span[data-placeholder="true"] {
      color: #d0daec !important;
      color: #6d7992 !important;
      font-size: 14px !important;
    }
    input {
      width: 100% !important;
      color: var(--modelTitleColor);
      font-size: 14px;
    }
  }
`;

export const AddNewEmailContainer = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
  .email_text {
    font-family: var(--themeFont);
    color: #1976d2;
  }
`;
