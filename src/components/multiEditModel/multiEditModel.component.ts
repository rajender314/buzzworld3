import styled from "styled-components";

export const TableListContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const SpinnerDiv = styled.div`
  padding: 17px;
  display: flex;
  justify-content: center;
  min-height: 200px;
  align-items: center;
`;
export const MultiplierInputFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 24px -8px 0px;
  row-gap: 8px;
  .height {
    height: 36px !important;
  }

  & > div {
    width: calc(100% / 2 - 16px);
    margin: 0px 8px 0;
  }
`;
export const FilterFormFields = styled.div`
  width: 100%;
  padding: 16px 0px;

  div {
    // color: #6D7992;
  }
  .Feilds {
    /* margin: 24px 0; */
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .TwoInput {
    display: flex;
    gap: 16px;
    margin-bottom: 8px;
    // color: #6D7992;
  }
  label {
    display: flex;
    margin: 0% !important;
  }
  .TwoInput .css-5a7vsu-container {
    margin-top: 4px;
    position: relative;
    .css-4mp3pp-menu {
      position: absolute;
      top: 100%;
    }
  }
  .TwoInput .css-1bx7l6n-control {
    min-height: 36px !important;
    height: 36px;
  }
  .InputFields {
    margin: 48px 0px 8px;
  }
  h4 {
    color: #2e374a;
    font-size: 18px;
  }
  input {
    // color: #6D7992;
  }
  textarea {
    // color: #6D7992;
  }
  .Discount-dropdown div label {
    margin-bottom: 10px;
    color: #6d7992;
  }
  .css-11v79b0-control:hover {
    border: 2px solid #002885 !important;
  }
  .css-11v79b0-control {
    border: 2px solid #002885 !important;
  }
  .address-heading {
    font-family: var(--themeFont);
    font-style: normal;
    color: #2e374a;
    font-weight: 600;
    font-size: 20px;
    padding-left: 8px;
    line-height: 20px;
  }
  // .css-1bx7l6n-control{
  //     border: 2px solid #002885!important;
  //    }
  &.min-height {
    min-height: 500px;
  }
`;
