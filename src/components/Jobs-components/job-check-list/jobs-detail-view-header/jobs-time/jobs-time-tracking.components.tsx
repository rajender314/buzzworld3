import styled from 'styled-components';

export const ActivityLogWrapper = styled.div``;

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

  border-radius: 8px;
  background-color: #fff;
  /* border: 1px solid #e3eaf6; */
  /*border-bottom-left-radius: 8px;*/
  /* padding: 24px; */
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  &.open {
    /*box-shadow: 0 0 16px rgb(49 118 210 / 15%);*/
  }
`;

export const ActivityLogHeader = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #d0daec;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ActivityLogTitle = styled.h3`
  flex: 1;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.5;
  color: var(--modelTitleColor);
  margin: 0;
  span {
    color: #8e99b2;
    font-size: 16px;
    font-weight: 400;
  }
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
  /* flex: 1;
  overflow: hidden; */
  .time_log {
    /* height: 100%;
    display: flex;
    flex-direction: column;
    padding: 24px 0;
    overflow: auto;
    align-items: center; */
  }
  .time_btn {
    /* padding: 0px 0px 0px 20px; */
  }
  .Secondarys {
    /* border: 2px solid #134c85 !important;
    -webkit-align-items: baseline;
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
    border-width: 0;
    border-radius: 3px;
    box-sizing: border-box;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: inherit;
    font-style: normal;
    font-family: inherit;
    font-weight: 500;
    max-width: 100%;
    position: relative;
    text-align: center;
    -webkit-text-decoration: none;
    text-decoration: none;
    -webkit-transition: background 0.1s ease-out,
      box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);
    transition: background 0.1s ease-out,
      box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);
    white-space: nowrap;
    background: var(--ds-background-neutral, rgba(9, 30, 66, 0.04));
    color: var(--ds-text, #42526e) !important;
    cursor: pointer;
    height: 2.2857142857142856em;
    line-height: 2.2857142857142856em;
    padding: 0 10px;
    vertical-align: middle;
    width: auto;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center; */
  }
`;

export const ActivityLogData = styled.div`
  /* height: 100%; */
  /* display: flex;
  flex-direction: column;
  padding: 24px 0;
  overflow: auto; */
  margin: 16px 0 0;
  min-height: 100px;
  max-height: 250px;
  overflow: auto;
`;

export const ActivityLogDetails = styled.div`
  display: flex;
  gap: 8px;
  color: var(--modelTitleColor);
  padding-right: 16px;
  &:not(:last-child) {
    padding-bottom: 24px;
    border-bottom: 1px dashed #e3eaf6;
    margin-bottom: 24px;
  }
`;

export const ActivityLogByImage = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const ActivityLogInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 15px;
  line-height: 1.5;
  margin: 0 12px;
`;
export const NotimeEnterys = styled.div`
  justify-content: center !important;
  align-items: center !important;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 15px;
  line-height: 1.5;
  margin: 0 12px;
`;

export const ActivityActor = styled.h4`
  font-weight: 700;
  margin: 0 0 4px;
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
export const TimeEntryIconContainer = styled.div`
  cursor: pointer;
  opacity: 0.8;
  &.on-visited:hover {
    opacity: 1;
  }
`;
export const Tab = styled.div`
  height: 100%;
  padding: 0;
  .css-452jbn-TabList {
    display: flex;
    justify-content: space-evenly;
  }
  .css-10njyld-Tabs {
    height: 100%;
    .css-iqp89u-TabList {
      display: flex;
      justify-content: space-around;
    }
  }
  div[role="tabpanel"] {
    justify-content: unset;
    & > div {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;
