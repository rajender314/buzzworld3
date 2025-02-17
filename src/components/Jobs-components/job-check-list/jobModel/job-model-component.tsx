import styled from 'styled-components';

export const JobFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 16px;
  .width-50 {
    width: calc(50% - 16px);
    margin: 0 8px;
    > div {
      margin-top: 0;
    }
  }
  .stock {
    display: none;
  }

  row-gap: 12px;
`;

export const JobTextAreaField = styled.div`
  width: calc(100% - 16px);
  margin: 8px 8px;
`;

export const JobSearchLabel = styled.label`
  font-family: "Inter", sans-serif;
  font-style: normal;
  color: #6d7992;
  font-weight: bold;
  font-size: 14px;
`;
export const JobCmpanyOptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  .cmpny_name {
    font-size: 14px;
    font-weight: 800 !important;
  }
  .account_no {
    font-size: 12px;
  }
  .cmpny_address {
    font-size: 12px;
  }
`;

export const JobSideDrawerW40 = styled.div`
  width: 40% !important;
`;
export const CloseButton = styled.div`
  position: relative;
  left: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;

  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background: #f2f7ff;
  }
`;
export const JobPopupHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  h3 {
    margin: 0 12px;
  }
`;
