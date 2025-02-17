import styled from 'styled-components';

export const TableListContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const FilterFormFields = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .form-field-group-header {
    font-size: 16px !important;
    font-weight: 600;
    margin: 0 0 16px;
  }
  .flexed-container {
    flex: 1;
    overflow: auto;
    justify-content: center;
    display: flex;
  }
`;

export const InputFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;

  /*margin: 24px -8px 8px;*/
  .height {
    height: 36px !important;
  }
  //.TwoInput {
  //  width: 100%;
  //  display: flex;
  //  gap: 16px;
  //  // color: #6D7992;
  //}

  //  .css-1g807k0 > .css-gingst {
  //    color: #6D7992 !important;
  //    font-weight: bold !important

  //}

  & > div {
    width: calc(100% / 2 - 16px);
    margin: 0px 8px 0;
    //.css-5a7vsu-container{
    //  z-index: 100;
    //  position: relative;

    //}
  }
  &.inputs {
    display: flex;
    flex-wrap: wrap;
    row-gap: 8px;
    column-gap: 16px;
  }
  &.inputs > div {
    width: calc(100% / 2 - 8px);
    margin: unset;
  }
  &.add-compny-fields > div {
    width: calc(100% / 3 - 16px);
    margin: 0px 8px 0;
    //.css-5a7vsu-container{
    //  z-index: 100;
    //  position: relative;

    //}
  }
`;

export const SpinnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 102px;
  min-height: px;
  flex-direction: column;
`;
