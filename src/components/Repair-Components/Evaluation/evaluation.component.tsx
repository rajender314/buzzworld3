import styled from 'styled-components';

export const RepairStatusRadio = styled.div`
  margin-bottom: 24px;
  .repair-Status-label {
    font-family: Inter;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: #6d7992;
  }

  .container {
    display: flex;
    padding-top: 8px;
    gap: 16px;
    .radio {
      /* margin: 0.5rem; */
      input[type="radio"] {
        position: absolute;
        opacity: 0;
        + .radio-label {
          &:before {
            content: "";
            background: transparent;
            border-radius: 100%;
            border: 1px solid #8e99b2;
            display: inline-block;
            width: 15px;
            height: 15px;
            position: relative;
            top: 2px;
            margin-right: 1em;
            vertical-align: top;
            cursor: pointer;
            text-align: center;
            //transition: all 250ms ease;
          }
        }
        &:checked {
          + .radio-label {
            &:before {
              background-color: var(--themeBlue900);
              box-shadow: inset 0 0 0 3px #fff;
              border-color: var(--themeBlue900);
            }
          }
        }
        &:focus {
          + .radio-label {
            &:before {
              outline: none;
              border-color: var(--themeBlue900);
            }
          }
        }
        &:disabled {
          + .radio-label {
            &:before {
              box-shadow: inset 0 0 0 4px #fff;
              border-color: #8e99b2;
              background: transparent;
            }
          }
        }
        + .radio-label {
          &:empty {
            &:before {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
`;

export const RadioLabel = styled.label`
  cursor: pointer;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #4e586d;
`;
export const EvaluationSummary = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .pi-select-wrapper {
    .select-label {
      padding-bottom: 4px;
    }
  }
`;
