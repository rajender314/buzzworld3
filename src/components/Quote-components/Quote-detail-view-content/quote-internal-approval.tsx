import { PiLabelName, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import { RepairInfoSection } from "@app/components/detail-view-content/detail-view-content.component";
import {
  NoRepairFound,
  RepairCardsHeader,
} from "@app/components/RepairItems/repair-items.component";
import { UserRoleField } from "@app/components/usersComponents/userslist/userslist.component";

export default function QuoteInternalApproval({
  internalApprovalsDetails,
}: any) {
  const [internalApproval, setInternalApproval] = useState(
    internalApprovalsDetails
  );
  useEffect(() => {
    // console.log(internalApprovalsDetails, 1111111111111111111111)
    setInternalApproval(internalApprovalsDetails);
  }, [internalApprovalsDetails]);
  return (
    <RepairInfoSection>
      <RepairCardsHeader>
        <PiTypography component="h4">Internal Approvals</PiTypography>
      </RepairCardsHeader>
      {/* <hr /> */}
      {internalApproval &&
        internalApproval.length > 0 &&
        internalApproval.map((obj: any) => (
          <div
            style={{ borderBottom: "1px solid var(--greyCardBorder)" }}
            className="internal-approvals"
          >
            <PiTypography component="h4">{obj.approval_type}</PiTypography>
            <div className="field-details">
              <UserRoleField className="calc-width-25 ellipsis">
                <PiLabelName
                  description={obj.approval_type ? obj.approval_type : "-"}
                  label="Approval Type"
                  className="header_font"
                />
              </UserRoleField>
              <UserRoleField className="calc-width-25 ellipsis">
                <PiLabelName
                  description={obj.created_date ? obj.created_date : "-"}
                  label="Created Date"
                />
              </UserRoleField>
            </div>
            <div className="field-details">
              {obj.code === "10k_quote_approval" && (
                <>
                  <UserRoleField className="calc-width-25 ellipsis">
                    <PiLabelName
                      description={
                        obj.approval_values.budgetry_type
                          ? obj.approval_values.budgetry_type.label
                          : "-"
                      }
                      label="Type"
                    />
                  </UserRoleField>
                  <UserRoleField className="calc-width-25 ellipsis">
                    <PiLabelName
                      description={
                        obj.approval_values.competitions
                          ? obj.approval_values.competitions
                          : "-"
                      }
                      label="Competition"
                    />
                  </UserRoleField>
                  <UserRoleField className="calc-width-25 ellipsis">
                    <PiLabelName
                      description={`${obj.approval_values.budgetry_amount ? `$ ${obj.approval_values.budgetry_amount}` : "-"}`}
                      label="Budgetary Amount"
                    />
                  </UserRoleField>

                  <UserRoleField className="calc-width-25 ellipsis">
                    <PiLabelName
                      description={
                        obj.approval_values.key_decision_maker
                          ? obj.approval_values.key_decision_maker
                          : "-"
                      }
                      label="Key Decision Maker"
                    />
                  </UserRoleField>
                </>
              )}
              {obj.code === "50k_quote_approval" && (
                <>
                  <UserRoleField className="calc-width-25 ellipsis">
                    <PiLabelName
                      description={
                        obj.approval_values.last_Look
                          ? obj.approval_values.last_Look
                          : "-"
                      }
                      label="Last Look"
                    />
                  </UserRoleField>
                  <UserRoleField className="calc-width-25 ellipsis">
                    <PiLabelName
                      description={
                        obj.approval_values.current_customer
                          ? obj.approval_values.current_customer
                          : "-"
                      }
                      label="Current Customer"
                    />
                  </UserRoleField>
                  <UserRoleField className="calc-width-25 ellipsis">
                    <PiLabelName
                      description={
                        obj.approval_values.special_Pricing
                          ? obj.approval_values.special_Pricing
                          : "-"
                      }
                      label="Non Standard Pricing"
                    />
                  </UserRoleField>

                  <UserRoleField className="calc-width-25 ellipsis">
                    <PiLabelName
                      description={
                        obj.approval_values.programming_needed
                          ? obj.approval_values.programming_needed
                          : "-"
                      }
                      label="Programming Needed"
                    />
                  </UserRoleField>
                  <UserRoleField className="calc-width-25 ellipsis">
                    <PiLabelName
                      description={
                        obj.approval_values.reasons
                          ? obj.approval_values.reasons
                          : "-"
                      }
                      label="Reasons"
                    />
                  </UserRoleField>
                </>
              )}
              {obj.code === "25k_quote_approval" && (
                <>
                  <UserRoleField className="calc-width-25 ellipsis">
                    <PiLabelName
                      description={
                        obj.approval_values.timeline
                          ? obj.approval_values.timeline.label
                          : "-"
                      }
                      label="Time Line"
                    />
                  </UserRoleField>
                  <UserRoleField className="calc-width-25 ellipsis">
                    <PiLabelName
                      description={
                        obj.approval_values.pain
                          ? obj.approval_values.pain
                          : "-"
                      }
                      label="Pain"
                    />
                  </UserRoleField>
                  <UserRoleField className="calc-width-25 ellipsis">
                    <div className="appro-comments">
                      <PiLabelName
                        description={
                          obj.approval_values.decision_making_process
                            ? obj.approval_values.decision_making_process
                            : "-"
                        }
                        label="Decision Making Process"
                      />
                    </div>
                  </UserRoleField>
                  <UserRoleField className="calc-width-25 ellipsis">
                    <PiLabelName
                      description={
                        obj.approval_values.delivery_due_date
                          ? obj.approval_values.delivery_due_date
                          : "-"
                      }
                      label="Delivery Due Date"
                    />
                  </UserRoleField>
                </>
              )}
            </div>
          </div>
        ))}
      {internalApproval.length === 0 && (
        <NoRepairFound>Internal Approval(s) Not Available</NoRepairFound>
      )}
    </RepairInfoSection>
  );
}
