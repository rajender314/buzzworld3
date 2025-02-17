import styled from 'styled-components';

export const ActivityLogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 1.5;
`;

export const ActivityLogRow = styled.div`
  display: flex;
  align-items: stretch;
  padding: 0 16px;
  &:not(.header) {
    opacity: 0.65;
  }
  &.header {
    background-color: #f9fbff;
    border-radius: 8px;
    padding: 20px 16px;
    font-weight: 500;
    color: #6d7992;
    margin-bottom: 24px;
  }
  &.current {
    opacity: 1;
    .date {
      color: var(--themeBlue800);
      &::after {
        background-color: var(--themeBlue800);
      }
      &::before {
        top: 24px;
      }
    }
    .status-pill {
      background-color: #00a67e;
      color: #fff;
    }
  }
  &.data:last-child {
    & > div {
      margin-bottom: 0;
    }
    .date::before {
      height: 24px;
    }
  }
  .status-pill {
    display: inline-block;
    padding: 4px 8px;
    background-color: #ccede5;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    color: #00a67e;
  }
`;

export const ActivityLogColumn = styled.div`
  width: 250px;
  font-size: 14px;
  font-weight: 500;
  color: #2e374a;
  box-sizing: border-box;
  position: relative;
  color: #6d7992;
  &.flexed {
    flex: 1;
  }
  &.header-label {
    font-weight: 600;
  }
  &.date {
    min-height: 100%;
    padding-top: 16px;
    padding-right: 56px;
    &::after {
      content: "";
      width: 8px;
      height: 8px;
      background-color: #b6c1d6;
      border-radius: 50%;
      position: absolute;
      top: 24px;
      right: 40px;
    }
    &::before {
      content: "";
      width: 2px;
      height: 100%;
      background-color: #b6c1d6;
      position: absolute;
      top: 0px;
      right: 43px;
    }
  }
`;

export const ActivityBlock = styled.div`
  flex: 1;
  background-color: #f2f7ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 12px 0 12px 24px;
  margin: 0 0 16px -24px;
  position: relative;
  box-sizing: border-box;
  &::before {
    content: "";
    width: 2px;
    height: calc(100% - 24px);
    background-color: transparent;
    position: absolute;
    top: 12px;
    left: 8px;
    bottom: 12px;
  }
  &.current {
    &::before {
      background-color: var(--themeBlue800);
    }
  }
`;
