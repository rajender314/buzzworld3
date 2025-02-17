import styled from 'styled-components';

export const BreadCrumbsDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 40px 0;
`;

export const BreadCrumbItem = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--modelTitleColor);
  line-height: 1.5;
  opacity: 0.75;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  &:not(:last-child) {
    padding-right: 12px;
    margin-right: 12px;
    &::after {
      content: "/";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      color: var(--modelTitleColor) !important;
      line-height: 1;
      opacity: 1 !important;
    }
  }
  &:hover {
    opacity: 1;
  }
  &.active {
    color: red;
  }
  &:last-child {
    color: var(--themeBlue800);
  }
`;

export const IconFieldWrapper = styled.div`
  width: 100%;
`;

export const BackButton = styled.div`
  height: 32px;
  width: 32px;
  background: var(--rmaJobInProgressBgColor);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #f2f7ff;
  }
`;
