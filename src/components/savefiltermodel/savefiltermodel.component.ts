import styled from "styled-components";

export const FilterFormFields = styled.div`
  width: 100%;
  padding: 16px 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const SaveFilterFieldContainer = styled.div`
  min-height: 280px;
`;
export const PiModalBodyMainContainer = styled.div`
  > div {
    overflow: unset !important;
  }
`;
export const AssinToContainer = styled.div`
  > div > .pi-select-wrapper > :nth-child(2) > .react-select__control {
    height: unset !important;
    min-height: 36px !important;
    max-height: 250px !important;
    overflow: auto;
  }
`;
