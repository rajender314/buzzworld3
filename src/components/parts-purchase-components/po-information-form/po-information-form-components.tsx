import styled from 'styled-components';

export const PoFormContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
export const PoFormContent = styled.div`
  display: flex;
  margin: 9px 0 0;
  cursor: pointer;
  .po-edit-icon {
    width: 16px;
    height: 16px;
    display: flex;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease;
  }
  &:hover {
    .po-edit-icon {
      opacity: 1;
      visibility: visible;
    }
  }
`;
export const Formlabel = styled.div`
  font-family: "Inter", sans-serif;
  font-style: normal;
  color: #6d7992;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
`;
export const PoFormField = styled.div`
  width: calc(50% - 8px);
`;
