import styled from "styled-components";
import OrderIdImg from "@app/assets/images/job-related-orderid.svg";
import QuotesImg from "@app/assets/images/quotes.svg";
import RepairsImg from "@app/assets/images/repairs.svg";
import Jobs from "@app/assets/images/Jobs_related.svg";
import SalesOrder from "@app/assets/images/salesOrder.svg";
import PartPurchaseImg from "@app/assets/images/partspurchase-detailview.svg";

type Props = {
  id_type?: string;
};
export const JobsRelatedActivityLogWrapper = styled.div``;

export const JobsActivityLogTrigger = styled.div`
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

export const JobsActivityLogContainer = styled.div`
  height: 100%;
  border-radius: 16px;
  background-color: #fff;

  padding: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  &.open {
  }
`;

export const JobsRelatedActivityLogHeader = styled.div`
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const JobsRelatedActivityLogTitle = styled.h3`
  flex: 1;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--modelTitleColor);
  margin: 0;
`;

export const JobsRelatedActivityCloseButton = styled.span`
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

export const JobsRelatedActivityLogDataContainer = styled.div`
  flex: 1;
  overflow: hidden;
  &.border-bottom {
  }
`;

export const JobsRelatedActivityLogData = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  overflow: auto;
  max-height: 260px;
`;

export const JobsRelatedActivityLogDetails = styled.div`
  display: flex;
  gap: 8px;
  color: var(--modelTitleColor);
  padding-right: 16px;
  flex-wrap: wrap;
  cursor: pointer;
  &:not(:last-child) {
    padding-bottom: 2px;
    border-bottom: 1px dotted #e3eaf6;
    margin-bottom: 8px;
  }
`;

export const JobsRelatedActivityLogByImage = styled.div`
  width: 32px;
  height: 32px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const JobsRelatedActivityLogInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 15px;
  line-height: 1.5;
`;

export const JobsRelatedActivityActor = styled.h4`
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--themeBlue900);
`;

export const JobsRelatedActivityPill = styled.span`
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

export const JobsRelatedActivity = styled.p`
  font-weight: 400;
  color: #6d7992;
  margin: 0 0 16px;
`;

export const JobsRelatedActivityTimeStamp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 400;
  color: #8e99b2;
`;

export const JobsRelatedActivityActions = styled.a`
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

export const JobsRelatedActivityActionText = styled.span`
  flex: 1;
`;

export const JobsRelatedActivityActionBtn = styled.span`
  & img {
    transition: all 0.3s ease;
  }
`;

export const RelatedToItems = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 2px solid transparent;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
  &::before {
    content: "";
    background-repeat: no-repeat;
    height: 25px;
    width: 20px;
    ${({ id_type }: Props) => {
      if (id_type === "Repair ID") {
        return ` background-image: url(${RepairsImg})`;
      }
      if (id_type === "Quote ID") {
        return ` background-image: url(${QuotesImg})`;
      }
      if (id_type === "Job ID") {
        return ` background-image: url(${Jobs})`;
      }
      if (id_type === "Order ID") {
        return ` background-image: url(${SalesOrder})`;
      }
      if (id_type === "Parts Purchase ID") {
        return ` background-image: url(${PartPurchaseImg})`;
      }
      return ` background-image: url(${OrderIdImg})`;
    }}
  }

  .ellipsis {
    max-width: 124px;
    width: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const SyncContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  &:hover {
    background: #dde2eb;
    border-radius: 50%;
  }
`;
export const ModalBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  position: relative;
`;
export const FieldContainer = styled.div`
  /* width: 70%; */
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 0;
`;
export const PopupContainer = styled.div`
  top: 30%;
  height: 100%;
  > div {
    display: contents;
  }
`;
export const ValidationMsg = styled.div`
  color: #f70505;
  overflow: hidden;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 70%;

  &.open {
    &::before {
      content: "";
    }
  }
`;
