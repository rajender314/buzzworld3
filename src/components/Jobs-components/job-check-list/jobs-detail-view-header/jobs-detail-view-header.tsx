import { PiBackSection } from "pixel-kit";
import { useEffect, useState } from "react";
// import DetailView from '../../assets/images/detailview.svg'

// import defaultImg from '@app/assets/images/defaultImg.svg'
// import JobsDetailImg from "@app/assets/images/jobs-detail-view.svg";
import JobsDetailImg from "@app/assets/images/Jobs-logo.svg";
import { QuoteActivityPill } from "@app/core/components/gridStatus/gridStatus.component";
import { getStatusClassName } from "@app/modules/Quotes/Repair-Quotes/helpers/quote-helpers";
import {
  HeaderContainer,
  BackSection,
  RepairIdsDiv,
  RepairIds,
} from "./jobs-detail-view-header.component";

export default function JobsDetailViewHeader({ jobInfo }: any) {
  const [jobDetails, setJobDetails] = useState(jobInfo);
  useEffect(() => {
    setJobDetails(jobInfo);
  }, [jobInfo]);
  return (
    <HeaderContainer>
      <BackSection>
        <div>
          <PiBackSection
            backOptions={{
              name: "",
              route: "/jobs",
            }}
          />
        </div>
        <RepairIdsDiv>
          <img
            className="repair-view-left-image"
            src={JobsDetailImg}
            alt="loading"
          />
          <RepairIds>
            <div className="quote-num-and-status">
              <div className="id-num">
                #{jobDetails ? jobDetails.job_id : "-"}
              </div>
              <QuoteActivityPill
                className={getStatusClassName(
                  jobDetails.job_status ? jobDetails.job_status : ""
                )}
              >
                {jobDetails.job_status ? jobDetails.job_status : ""}
              </QuoteActivityPill>
            </div>
            <div
              className="repair-name"
              title={jobDetails ? jobDetails.customer_name : "_"}
            >
              {jobDetails ? jobDetails.customer_name : "_"}
            </div>
          </RepairIds>
        </RepairIdsDiv>
      </BackSection>
    </HeaderContainer>
  );
}
