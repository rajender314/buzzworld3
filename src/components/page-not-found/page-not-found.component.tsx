import styled from 'styled-components';

export const ErrorContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const ErrorImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  max-width: 60%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  img {
    width: 400px;
    display: block;
  }
  p {
    margin: 0;
    text-align: center;
    color: #6d7992;
    font-size: 24px;
    line-height: 36px;
    font-weight: 600;
  }
`;
