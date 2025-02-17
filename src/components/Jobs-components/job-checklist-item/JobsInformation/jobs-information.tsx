import { PiTypography, PiLabelName } from "pixel-kit";
import { useEffect, useState } from "react";
import QuoteStatusAppearance from "@app/core/components/gridStatus/quote-status-apperance";
import { UserRoleField } from "../../../usersComponents/userslist/userslist.component";
import RepairInfoSections from "./jobs-information.component";

export default function JobsInformation({ jobInfo }: any) {
  const [jobDetailsInfo, setJobDetailsInfo]: any = useState(jobInfo);

  useEffect(() => {
    setJobDetailsInfo(jobInfo);
  }, [jobInfo]);

  return (
    <RepairInfoSections>
      <div className="rep-label-typo">
        <PiTypography component="h4">Job Information</PiTypography>
      </div>
      {/* <hr /> */}
      <div className="field-details">
        <UserRoleField className="repiar-infosection-items calc-width-33">
          <PiLabelName
            description={
              jobDetailsInfo && jobDetailsInfo.job_description
                ? jobDetailsInfo.job_description
                : "-"
            }
            label="Job Description"
          />
        </UserRoleField>
        <UserRoleField className="repiar-infosection-items calc-width-33">
          <PiLabelName
            description={
              jobDetailsInfo && jobDetailsInfo.job_status
                ? QuoteStatusAppearance(jobDetailsInfo.job_status)
                : "-"
            }
            label="Job Status"
          />
        </UserRoleField>
        {/* <UserRoleField className="repiar-infosection-items calc-width-33">
            <PiLabelName
              description={
                jobDetailsInfo && jobDetailsInfo.job_id
                  ? jobDetailsInfo.job_id
                  : "-"
              }
              label="Job ID"
            />
          </UserRoleField> */}
        <UserRoleField className="repiar-infosection-items calc-width-33">
          <PiLabelName
            description={jobDetailsInfo ? jobDetailsInfo.stock_code : "-"}
            label="Item Code"
          />
        </UserRoleField>
        <UserRoleField className="repiar-infosection-items calc-width-33">
          <PiLabelName
            description={
              jobDetailsInfo && jobDetailsInfo.stock_description
                ? jobDetailsInfo.stock_description
                : "-"
            }
            label="Item Description"
          />
        </UserRoleField>
        <UserRoleField className="repiar-infosection-items calc-width-33">
          <PiLabelName
            description={
              jobDetailsInfo && jobDetailsInfo.warehouse
                ? jobDetailsInfo.warehouse
                : "-"
            }
            label="Warehouse"
          />
        </UserRoleField>
        <UserRoleField className="repiar-infosection-items calc-width-33">
          <PiLabelName
            description={
              jobDetailsInfo && jobDetailsInfo.customer
                ? `${jobDetailsInfo.customer}-${jobDetailsInfo.customer_name}`
                : "-"
            }
            label="Customer-Customer Name"
          />
        </UserRoleField>
        <UserRoleField className="repiar-infosection-items calc-width-33">
          <PiLabelName
            description={
              jobDetailsInfo && jobDetailsInfo.job_delivery_date
                ? jobDetailsInfo.job_delivery_date
                : "-"
            }
            label="Job Delivery Date"
          />
        </UserRoleField>
      </div>
    </RepairInfoSections>
  );
}
