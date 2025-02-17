import styled from 'styled-components';

export const JobChecklistDocumentContainer = styled.div`
  display: flex;
  margin: 10px 0;
`;
export const JobChecklistIconContainer = styled.div`
  height: 50px;
  width: 50px;
  img {
    height: 100%;
    width: 100%;
  }
`;
export const JobChecklistContentContainer = styled.div`
  // display: flex;
  margin: 6px 0;
`;
export const DocumentName = styled.div`
  margin: 0 4px;
  font-size: 16px;
  font-weight: 600;
  // display: flex;
  // align-items: center;
  // justify-content: center;
`;
export const DocumentSize = styled.div`
  font-size: 14px;
  color: #6d7992;
  font-weight: 500;
  margin: 0 4px;
`;
export const CloseIcon = styled.div`
    margin: 24px;
    cursor: pointer;
}`;
export const JobChecklistMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  border-bottom: 1px dashed #d0daec;
`;
