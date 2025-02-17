import OrderIdImg from "@app/assets/images/job-related-orderid.svg";
import {
  JobsRelatedActivityLogWrapper,
  JobsActivityLogContainer,
  JobsRelatedActivityLogDetails,
  JobsRelatedActivityLogHeader,
  JobsRelatedActivityLogTitle,
  JobsRelatedActivityLogData,
  JobsRelatedActivityLogDataContainer,
  JobsRelatedActivityActor,
  JobsRelatedActivityLogByImage,
  JobsRelatedActivityLogInfo,
} from "./jobs-related.components";

export default function JobsRelated() {
  // const [showAllActivity, setShowAllActivity] = useState(false);

  // function viewAllActivityLog() {
  //   setShowAllActivity(true);
  // }

  return (
    <JobsRelatedActivityLogWrapper className="open">
      <JobsActivityLogContainer className="open">
        <JobsRelatedActivityLogHeader>
          <JobsRelatedActivityLogTitle>Related to</JobsRelatedActivityLogTitle>
        </JobsRelatedActivityLogHeader>

        <JobsRelatedActivityLogDataContainer className="border-bottom">
          <JobsRelatedActivityLogData>
            <JobsRelatedActivityLogDetails>
              <JobsRelatedActivityLogByImage>
                <img src={OrderIdImg} alt="loading" />
              </JobsRelatedActivityLogByImage>
              <JobsRelatedActivityLogInfo>
                <JobsRelatedActivityActor>
                  Order ID 12234
                </JobsRelatedActivityActor>
              </JobsRelatedActivityLogInfo>
            </JobsRelatedActivityLogDetails>
          </JobsRelatedActivityLogData>
        </JobsRelatedActivityLogDataContainer>
      </JobsActivityLogContainer>
    </JobsRelatedActivityLogWrapper>
  );
}
