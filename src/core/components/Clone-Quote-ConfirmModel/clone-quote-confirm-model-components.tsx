import styled from 'styled-components';

export const ConfirmationContainer = styled.div`
  width: 546px;
  border-radius: 8px;
  position: relative;
  margin: 40px;
  padding: 24px;
  border: 1px solid #dee2e6;
  box-shadow:
    0px 0px 2px rgba(0, 0, 0, 0.12),
    0px 20px 20px rgba(0, 0, 0, 0.08);
`;

export const ToastAction = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const CloseIcon = styled.div`
  background-color: #f2f7ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  right: 10px;

  img {
    opacity: 0.5;
  }

  img:hover {
    opacity: 1;
  }
`;

export const TextContainer = styled.div`
  flex: 1;

  a {
    text-decoration: none;
    font-size: 14px;
    font-weight: 700;
    color: #1976d2;
  }
`;

export const TextContainerHeader = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #4e586d;
  margin-top: 0;
`;
export const TextContainerText = styled.p`
  color: #6d7992;
  font-size: 14px;
  margin-top: 0;
`;

export const TickIcon = styled.div`
  width: 56px;
  height: 56px;
  background-color: #e3f2fd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SuccessContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;
export const FormContainer = styled.div`
  height: fit-content;
`;
