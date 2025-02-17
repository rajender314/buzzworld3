import styled from 'styled-components';

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  cursor: pointer;
  img {
    height: 35px;
  }
`;
export const UploadText = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  color: #2e374a;
  padding: 0 24px;
  max-width: 100%;
  span {
    color: #1976d2;
    cursor: pointer;
    text-decoration-line: underline;
    text-decoration-line: 2px;
    text-underline-offset: 6px;
  }
`;
