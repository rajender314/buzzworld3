import { PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import { ActivityProps } from "@app/modules/repair-detail-view/schema/repairs";
import { RepairInfoSection } from "../detail-view-content/detail-view-content.component";
import {
  NoRepairFound,
  RepairCardsHeader,
  RepairItemsListDiv,
} from "../RepairItems/repair-items.component";
import {
  ActivityBlock,
  ActivityLogColumn,
  ActivityLogRow,
  ActivityLogWrapper,
} from "./activitylog.component";

type Props = {
  repairRef: any;
  activityDetails: ActivityProps[];
};

export default function ActivityLog({ repairRef, activityDetails }: Props) {
  const [activityLog, setActivityLog] = useState(activityDetails);

  useEffect(() => {
    setActivityLog(activityDetails);
  }, [activityDetails]);

  return (
    <RepairInfoSection id="repair-activity" ref={repairRef}>
      <RepairCardsHeader>
        <PiTypography component="h4">Activity Log</PiTypography>
      </RepairCardsHeader>
      <hr />
      <ActivityLogWrapper>
        <ActivityLogRow className="header">
          <ActivityLogColumn className="header-label">
            Date & Time
          </ActivityLogColumn>
          <ActivityLogColumn className="header-label">Actor</ActivityLogColumn>
          <ActivityLogColumn className="header-label flexed">
            Activity
          </ActivityLogColumn>
        </ActivityLogRow>
        <RepairItemsListDiv className="activity-log">
          {activityLog.map((obj: ActivityProps) => (
            <ActivityLogRow className="data current">
              <ActivityLogColumn className="date">
                {obj.date}
                <br />
                {obj.time}
              </ActivityLogColumn>
              <ActivityBlock className="current">
                <ActivityLogColumn className="user-name">
                  {obj.actor}
                </ActivityLogColumn>
                <ActivityLogColumn className="flexed">
                  {obj.message}
                </ActivityLogColumn>
              </ActivityBlock>
            </ActivityLogRow>
          ))}
          {activityLog.length === 0 && (
            <NoRepairFound>Activity Logs Not Available</NoRepairFound>
          )}
        </RepairItemsListDiv>
      </ActivityLogWrapper>
    </RepairInfoSection>
  );
}
