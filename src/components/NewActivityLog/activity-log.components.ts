import styled from 'styled-components';

export const ActivityLogWrapper = styled.div`
  /* overflow: auto; */

  /*position: fixed;
  top: 200px;
  bottom: 60px;
  right: 0;
  display: flex;
  transform: translateX(340px);
  z-index: 1;
  transition: all 0.75s ease;
  &.open{
    transform: translateX(0);
  }*/
`;

export const ActivityLogTrigger = styled.div`
  width: 40px;
  height: 40px;
  background-color: var(--themeBlue800);
  border-radius: 8px 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:not(.open) {
    animation: blink 2s infinite;
  }
  @keyframes blink {
    0% {
      opacity: 0.85;
    }
    50% {
      opacity: 0.65;
    }
    100% {
      opacity: 0.85;
    }
  }
`;

export const ActivityLogContainer = styled.div`
  /*width: 340px;*/
  height: 100%;
  background-color: #fff;
  /* border: 1px solid #e3eaf6; */
  /*border-bottom-left-radius: 8px;*/
  /* padding: 24px; */
  padding: 16px;
  padding-right: 8px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 16px;
  &.open {
    /*box-shadow: 0 0 16px rgb(49 118 210 / 15%);*/
  }
`;

export const ActivityLogHeader = styled.div`
  padding-bottom: 8px;
  /*border-bottom: 1px solid #D0DAEC;*/
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ActivityLogTitle = styled.h3`
  flex: 1;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--modelTitleColor);
  margin: 0;
`;

export const ActivityCloseButton = styled.span`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.75;
  transition: all 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

export const ActivityLogDataContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const ActivityLogData = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  overflow: auto;
  max-height: 820px;
  &.activity-log {
    max-height: unset !important;
  }
`;

export const ActivityLogDetails = styled.div`
  display: flex;
  gap: 8px;
  color: var(--modelTitleColor);
  padding-right: 16px;
  &:not(:last-child) {
    padding-bottom: 12px;
    border-bottom: 1px dotted #e3eaf6;
    margin-bottom: 12px;
  }
`;

export const ActivityLogByImage = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  min-width: 32px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  @media only screen and (max-width: 1080px) {
    width: 24px;
    height: 24px;
    min-width: 24px;
  }
`;

export const ActivityLogInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 15px;
  line-height: 1.5;
  word-break: break-word;
`;

export const ActivityActor = styled.h4`
  font-weight: 700;
  margin: 0;
`;

export const ActivityPill = styled.span`
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  margin: 0 0 4px;
  &.approved {
    background-color: #19836a;
    color: #fff;
  }
`;

export const Activity = styled.p`
  font-weight: 400;
  color: #6d7992;
  margin: 0 0 16px;
  @media only screen and (max-width: 1080px) {
    font-size: 14px;
  }
`;

export const ActivityTimeStamp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 400;
  color: #8e99b2;
`;

export const ActivityActions = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 15px;
  font-weight: 600;
  color: var(--themeBlue800);
  margin-top: 24px;
  cursor: pointer;
  opacity: 0.85;
  transition: all 0.3s ease;
  &:hover {
    opacity: 1;
    & span img {
      transform: translateX(4px);
    }
  }
`;

export const ActivityActionText = styled.span`
  flex: 1;
`;

export const ActivityActionBtn = styled.span`
  & img {
    transition: all 0.3s ease;
  }
`;
export const StatusPillContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
