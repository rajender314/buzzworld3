import { useEffect, useState } from "react";
import Avatar from "@app/assets/images/avator.svg";
import ChevronRight from "@app/assets/images/chevron_right.svg";
import { ActivityProps } from "@app/modules/repair-detail-view/schema/repairs";
import { PiSpinner, PiTooltip } from "pixel-kit";
import { QuoteActivityPill } from "@app/core/components/gridStatus/gridStatus.component";
import { getStatusClassName } from "@app/modules/Quotes/Repair-Quotes/helpers/quote-helpers";
import ViewAllActivity from "@app/components/NewActivityLog/view-all-activity";
import useScrollWithShadow from "@app/components/scrollbar-shadow/hook";
import { NoUserFound } from "../usersComponents/userslist/userslist.component";
import { SpinnerDiv } from "../fileuploadModel/fileuploadModel.component";
import {
  ActivityLogWrapper,
  ActivityLogContainer,
  ActivityLogDetails,
  ActivityLogHeader,
  ActivityLogTitle,
  ActivityLogData,
  ActivityLogDataContainer,
  Activity,
  ActivityActor,
  ActivityLogByImage,
  ActivityLogInfo,
  ActivityTimeStamp,
  ActivityActions,
  ActivityActionText,
  ActivityActionBtn,
  StatusPillContainer,
} from "./activity-log.components";

type Props = {
  activityDetails: ActivityProps[];
};
export default function NewActivityLog({ activityDetails }: Props) {
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [activityData, setActivityData] = useState<ActivityProps[]>([]);
  const [loading, setLoading] = useState(true);
  const enableShadow = true;
  const { boxShadow, onScrollHandler } = useScrollWithShadow();

  useEffect(() => {
    // if(activityDetails.length > 0) {
    setLoading(false);
    // }
    const activity = activityDetails.slice(0, 10);
    setActivityData(activity);
  }, [activityDetails]);

  function viewAllActivityLog() {
    setShowAllActivity(true);
  }

  return (
    <>
      <ActivityLogWrapper className="open">
        {/* <ActivityLogTrigger
          onClick={showActivityLog}
          className={ActivityLog ? 'open' : ''}
          title="Activity Log"
        >
          <img src={ActivityAvatar} alt="Activity Log" />
        </ActivityLogTrigger> */}
        <ActivityLogContainer className="open">
          <ActivityLogHeader>
            <ActivityLogTitle>Activity Log</ActivityLogTitle>
            {/* <ActivityCloseButton
              onClick={() => openActivityLog(false)}
              title="Close Activity Log"
            >
              <img src={CloseIcon} alt="Close Activity Log" />
            </ActivityCloseButton> */}
          </ActivityLogHeader>
          {activityDetails && activityDetails.length > 0 && (
            <ActivityLogDataContainer>
              <ActivityLogData
                onScroll={onScrollHandler}
                className="scrollArea"
                style={enableShadow ? { boxShadow } : {}}
              >
                {activityData.map((obj: ActivityProps) => (
                  <ActivityLogDetails>
                    <ActivityLogByImage>
                      <img
                        src={obj.image_url ? obj.image_url : Avatar}
                        alt="loading"
                      />
                    </ActivityLogByImage>
                    <ActivityLogInfo>
                      <ActivityActor>{obj.actor}</ActivityActor>
                      {/* <ActivityPill className="approved">
                      Customer Approved
                    </ActivityPill> */}
                      <StatusPillContainer>
                        {/* <PiLozenge
                            className="item-status"
                            appearance={getAppearence(obj.status_code)}
                          >
                            {obj.status}
                          </PiLozenge> */}
                        {/* <PiLabelName
                            description={QuoteStatusAppearance(obj.status)}
                            label=""
                          /> */}
                        <QuoteActivityPill
                          className={getStatusClassName(
                            obj.status ? obj.status : ""
                          )}
                        >
                          {obj.status ? obj.status : ""}
                        </QuoteActivityPill>
                        {obj.stock_code && (
                          <PiTooltip
                            content="Stock Code"
                            libraryType="atalskit"
                          >
                            <ActivityActor>{obj.stock_code}</ActivityActor>
                          </PiTooltip>
                        )}
                      </StatusPillContainer>
                      <Activity>{obj.message}</Activity>
                      <ActivityTimeStamp>
                        <span>{obj.date}</span>
                        <span>{obj.time}</span>
                      </ActivityTimeStamp>
                    </ActivityLogInfo>
                  </ActivityLogDetails>
                ))}
              </ActivityLogData>
            </ActivityLogDataContainer>
          )}
          {loading && (
            <SpinnerDiv style={{ height: "100%" }}>
              <PiSpinner color="primary" size={50} libraryType="atalskit" />
            </SpinnerDiv>
          )}
          {!loading && activityDetails && activityDetails.length === 0 && (
            <NoUserFound> Activity Logs Not Available</NoUserFound>
          )}
          {activityDetails.length > 10 && (
            <ActivityActions>
              <ActivityActionText onClick={() => viewAllActivityLog()}>
                See all activity logs
              </ActivityActionText>
              <ActivityActionBtn>
                <img src={ChevronRight} alt="See more..." />
              </ActivityActionBtn>
            </ActivityActions>
          )}
        </ActivityLogContainer>
      </ActivityLogWrapper>
      {showAllActivity && (
        <ViewAllActivity
          activityDetails={activityDetails}
          sendData={() => setShowAllActivity(false)}
        />
      )}
    </>
  );
}
