import styled from 'styled-components';

export const AccessDeniedContainer = styled.div`
  top: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  p {
    color: #6d7992;
    font-family: var(--themeFont);
    font-size: 16px;
    font-weight: 500;
  }
`;
export const AcknowledgeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  .message {
    font-weight: 600;
    color: #2e374a;
  }
  .ellipse {
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
