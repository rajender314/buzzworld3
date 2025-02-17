import { useEffect, useState } from "react";
import AddTimeEntry from "@app/assets/images/Add_time.svg";

import { PiSpinner, PiTooltip } from "pixel-kit";
import Avatar from "@app/assets/images/avator.svg";
import moment from "moment";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import AddLogo from "@app/assets/images/Plus.svg";
import {
  ImgTag,
  LinkWithIcon,
} from "@app/components/secondaryheader/secondaryheader.component";
import Manual from "@app/components/Jobs-components/new-time-entry-manualForm/new-manual-entry-manual";
import {
  ActivityLogWrapper,
  ActivityLogContainer,
  ActivityLogDetails,
  ActivityLogHeader,
  ActivityLogTitle,
  ActivityLogData,
  Activity,
  ActivityLogInfo,
  TimeEntryIconContainer,
  ActivityLogByImage,
  ActivityActor,
  ActivityTimeStamp,
  NotimeEnterys,
} from "./jobs-time-tracking.components";

export default function JobstimeTracking({ sendModelData, jobInfo }: any) {
  const [showTimeEntry, setShowTimeEntry] = useState<boolean>(false);
  const [totalHrs, setToatlHrs]: any = useState();
  const [loading, setLoading] = useState(false);
  const [isEditEnable, setIsEditEnable] = useState(false);

  const newTimeentry = () => {
    setShowTimeEntry(true);
  };

  async function getEventData(e: any) {
    if (e && e.closeModel) {
      setShowTimeEntry(false);
    } else if (e && e.addTimeEntry) {
      setShowTimeEntry(false);
      sendModelData({ timeAdded: true });
    }
  }

  useEffect(() => {
    setLoading(true);
    if (jobInfo && jobInfo.time_tracking) {
      setToatlHrs(jobInfo.time_tracking.totalHours);
      setLoading(false);
    }
  }, [jobInfo]);
  useEffect(() => {
    (async () => {
      const permission: any = await getPermissionObject("jobs");

      if (permission.Edit && !jobInfo?.is_job_complete) {
        setIsEditEnable(true);
      } else {
        setIsEditEnable(false);
      }
    })();
  }, [jobInfo]);

  return (
    <>
      <ActivityLogWrapper className="open">
        <ActivityLogContainer className="open">
          <ActivityLogHeader>
            <ActivityLogTitle>
              Time Tracking
              {totalHrs && <span>({totalHrs})</span>}
            </ActivityLogTitle>
            {isEditEnable &&
              jobInfo &&
              jobInfo.time_tracking &&
              jobInfo.time_tracking.lists &&
              jobInfo.time_tracking.lists.length > 0 && (
                <TimeEntryIconContainer
                  className="on-visited"
                  onClick={newTimeentry}
                >
                  <PiTooltip content="Time Entry" libraryType="atalskit">
                    <img
                      src={AddTimeEntry}
                      alt="upload"
                      style={{ display: "flex", height: "26px", width: "26px" }}
                    />
                  </PiTooltip>
                </TimeEntryIconContainer>
              )}
          </ActivityLogHeader>
          {loading && (
            <SpinnerDiv style={{ height: "100%" }}>
              <PiSpinner color="primary" size={50} libraryType="atalskit" />
            </SpinnerDiv>
          )}
          {!loading && (
            <ActivityLogData>
              {jobInfo &&
              jobInfo.time_tracking &&
              jobInfo.time_tracking.lists &&
              jobInfo.time_tracking.lists.length > 0 ? (
                jobInfo.time_tracking.lists.map((data: any) => (
                  <ActivityLogDetails>
                    <ActivityLogByImage>
                      <img src={Avatar} alt="loading" />
                    </ActivityLogByImage>

                    <ActivityLogInfo>
                      <ActivityActor>{data.employee_name}</ActivityActor>

                      <Activity>{data.work_centre_desc}</Activity>
                      <ActivityTimeStamp>
                        <span>{moment(data.date).format("DD-MM-YYYY")}</span>
                        <span>{data.total_time}</span>
                      </ActivityTimeStamp>
                    </ActivityLogInfo>
                  </ActivityLogDetails>
                ))
              ) : (
                <ActivityLogDetails>
                  <NotimeEnterys>
                    <Activity>{" Time Entries Not Added"}</Activity>

                    {isEditEnable && (
                      // <div className="time_btn">
                      //   <PiButton
                      //     appearance="secondary"
                      //     label="Add TimeLog"
                      //     onClick={newTimeentry}
                      //     className="Secondarys"
                      //   />
                      // </div>
                      <div className="Button-Icon-Display time_btn">
                        <LinkWithIcon
                          className="Icon-space primary-button"
                          onClick={newTimeentry}
                        >
                          <ImgTag src={AddLogo} alt="loading" />
                          <span className="button-icon-text">Add Time Log</span>
                        </LinkWithIcon>
                      </div>
                    )}
                  </NotimeEnterys>
                </ActivityLogDetails>
              )}
            </ActivityLogData>
          )}
        </ActivityLogContainer>
      </ActivityLogWrapper>
      {showTimeEntry && (
        <Manual
          addTimeentryStatus={(e: any) => getEventData(e)}
          jobInfos={jobInfo}
        />
      )}
    </>
  );
}
