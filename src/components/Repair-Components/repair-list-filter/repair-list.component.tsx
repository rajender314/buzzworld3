import styled from "styled-components";

const FilterFieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 16px;
  &:not(:first-child) {
    padding-top: 24px;
  }
  &.width {
    width: 100%;
  }
  &.full-width {
    width: 50% !important;
  }
  .qc-form-container {
    gap: 24px;
  }

  > div {
    width: 100%;
    margin: 0 4px;
  }
  row-gap: 16px;
  .current {
    display: flex;
    /*gap: 10pc;*/
    justify-content: space-between;
  }
  .pricings {
    display: flex;
    /*gap: 10pc;*/
    justify-content: space-between;
  }
  .gap-10 {
    gap: 10px;
  }
  .select-label {
    /* margin-bottom: 4px; */
  }
  svg {
    display: block !important;
  }
`;

export default FilterFieldsContainer;
