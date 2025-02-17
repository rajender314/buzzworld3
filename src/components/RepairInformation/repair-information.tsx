import { PiTypography, PiLabelName, PiSelect } from "pixel-kit";
// import AvatarIcon from '@app/assets/images/None.svg'
import Avatar from "@app/assets/images/avator.svg";

import { useEffect, useState } from "react";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import GlobalVariables from "@app/core/globalVariables/globalVariables";
import {
  getRepairPriorityApi,
  getTechnicianList,
  getUserLoggedPermission,
} from "@app/helpers/helpers";
import { UserRoleField } from "../usersComponents/userslist/userslist.component";
import UserRoleDropdown from "../usersComponents/userDetails/user-detail.component";
import { AvatarSection, UserNameField } from "./repair-information.component";
import { RepairInfoSection } from "../detail-view-content/detail-view-content.component";

export default function RepairInformation({
  repairRef,
  repairInfo,
  sendEvent,
}: any) {
  const [repairDetails, setRepairDetails]: any = useState(repairInfo);
  // const [customerDetails, setCustomerDetails]: any = useState()
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [isPriorityEdit, setPriorityEdit] = useState<boolean>(false);
  const [repairPriorityLevel, setRepairPriorityLevel]: any = useState([]);

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject(GlobalVariables.routePath);
      const priorityList = await getRepairPriorityApi();
      setRepairPriorityLevel([...priorityList]);
      setpermissionObject({ ...permission });
      await getTechnicianList();
    })();
  }, []);
  useEffect(() => {
    setPriorityEdit(false);
    setRepairDetails({ ...repairInfo });
    // setCustomerDetails(repairInfo.customer_info)
  }, [repairInfo]);

  const selectPriority = (e: any) => {
    repairDetails.repair_info.priority = e;
    repairDetails.repair_info.assignee_id =
      repairDetails.repair_info.assignee.value;
    repairDetails.customer_info.customer_id =
      repairDetails.customer_info.customer_name.value;
    repairDetails.repair_info.repair_statuses_id =
      repairDetails.repair_info.status.value;
    // let obj = { ...repairDetails.customer_info, ...repairDetails.repair_info }
    // delete obj.status
    setRepairDetails({ ...repairDetails });
  };

  const saveRepairData = () => {
    repairDetails.customer_info.customer_id =
      repairDetails.customer_info.customer_name.value;
    repairDetails.repair_info.priority =
      repairDetails.repair_info.priority.value;
    sendEvent({
      success: true,
      repairDetails: {
        ...repairDetails.customer_info,
        ...repairDetails.repair_info,
      },
      section: "repairs_info",
    });
  };
  const resetData = () => {
    sendEvent({
      success: false,
      repairDetails: {
        ...repairDetails.customer_info,
        ...repairDetails.repair_info,
      },
      section: "repairs_info",
    });
  };

  return (
    <>
      <RepairInfoSection ref={repairRef} id="repair-info-id">
        <div className="rep-label-typo">
          <PiTypography component="h4">Repair Information</PiTypography>
        </div>
        {/* <hr /> */}
        <div className="field-details">
          <UserRoleField
            className={`repiar-infosection-items ${getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"}`}
          >
            <PiLabelName
              description={
                repairDetails.repair_info
                  ? repairDetails.repair_info.rma_number
                  : "-"
              }
              label="RMA Number"
            />
          </UserRoleField>
          <UserRoleField
            className={`repiar-infosection-items ${getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"}`}
          >
            <PiLabelName
              description={
                repairDetails.repair_info
                  ? repairDetails.repair_info.created_date
                  : "-"
              }
              label="Date Created"
            />
          </UserRoleField>
          <UserRoleField
            className={`repiar-infosection-items ${getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"}`}
          >
            {!isPriorityEdit && (
              <>
                <PiLabelName
                  description={
                    repairDetails.repair_info
                      ? repairDetails.repair_info.priorityDisplay.label
                      : "-"
                  }
                  label="Priority Level"
                  isEditIcon={
                    !!(permissionObject.Edit && getUserLoggedPermission())
                  }
                  emitSave={() => setPriorityEdit(true)}
                />
                {/* {permissionObject['Edit'] && getUserLoggedPermission() && (
                  <img
                    src={ThemecolorEdit}
                    className="edit-icon"
                    alt="loading"
                    onClick={() => {
                      setPriorityEdit(true)
                    }}
                  />
                )} */}
              </>
            )}

            {isPriorityEdit && (
              <UserRoleDropdown className="user_role_dropdown repair-edit-select">
                <PiSelect
                  name="priority"
                  label="Priority Level"
                  placeholder="Priority"
                  onChange={selectPriority}
                  options={repairPriorityLevel}
                  defaultValue={repairDetails.repair_info.priorityDisplay}
                  isIcons
                  emitSave={saveRepairData}
                  emitUndo={resetData}
                />
              </UserRoleDropdown>
            )}
          </UserRoleField>
          {/* <RepStatusLozenge
            className="repiar-infosection-items"
            style={{ paddingLeft: '7px' }}
          >
            <PiTypography component="label">Status</PiTypography>
            <RepairItemStatus>
              <PiLabelName
                description={QuoteStatusAppearance(
                  repairDetails.repair_info.status.label,
                )}
                label=""
              />
            </RepairItemStatus>
          </RepStatusLozenge> */}
          {/* <UserRoleField
            className={`${
              getUserLoggedPermission()
                ? "calc-width-33 padd-zero"
                : "calc-width-25 padd-zero"
            }`}
          >
            <PiLabelName
              description={QuoteStatusAppearance(
                repairDetails.repair_info.status.label
              )}
              label="Status"
            />
          </UserRoleField> */}
          <UserNameField
            className={`repiar-infosection-items ${getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"}`}
          >
            <p>Sales Person Name</p>
            <AvatarSection>
              <img
                src={
                  repairDetails.repair_info &&
                  repairDetails.repair_info.sales_person_img_url &&
                  repairDetails.repair_info.sales_person_img_url
                    ? repairDetails.repair_info.sales_person_img_url
                    : Avatar
                }
                alt="loading"
              />
              <p className="user-name">
                {repairDetails.repair_info
                  ? repairDetails.repair_info.sales_person
                  : "-"}
              </p>
            </AvatarSection>
          </UserNameField>
        </div>
        {/* {showSavePanel && (
          <PermissionFooter>
            <PiButton
              appearance="secondary"
              label={'Cancel'}
              onClick={resetData}
            />
            <PiButton
              appearance="primary"
              label={'Save'}
              onClick={saveRepairData}
            />
          </PermissionFooter>
        )} */}
      </RepairInfoSection>

      <RepairInfoSection ref={repairRef} id="repair-info-id">
        <div className="rep-label-typo">
          <PiTypography component="h4">Customer Information</PiTypography>
        </div>
        <div className="field-details">
          <UserRoleField
            className={`repiar-infosection-items ${getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"}`}
          >
            <PiLabelName
              description={
                repairDetails.customer_info
                  ? repairDetails.customer_info.customer_name.label
                  : "-"
              }
              label="Customer Name"
            />
          </UserRoleField>
          <UserRoleField
            className={`repiar-infosection-items ${getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"}`}
          >
            <PiLabelName
              description={
                repairDetails.customer_info &&
                repairDetails.customer_info.syspro_id
                  ? repairDetails.customer_info.syspro_id
                  : "-"
              }
              label="Syspro ID"
            />
          </UserRoleField>
          <UserRoleField
            className={`repiar-infosection-items ${getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"}`}
          >
            <PiLabelName
              description={
                repairDetails.customer_info
                  ? repairDetails.customer_info.contact_name
                  : "-"
              }
              label="Contact Name"
            />
          </UserRoleField>
          <UserRoleField
            className={`repiar-infosection-items ${getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"}`}
          >
            <PiLabelName
              description={
                repairDetails.customer_info
                  ? repairDetails.customer_info.contact_phone_number
                  : "-"
              }
              label="Contact Phone Number"
            />
          </UserRoleField>
          <UserRoleField
            className={`repiar-infosection-items ${getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"}`}
          >
            <PiLabelName
              description={
                repairDetails.customer_info
                  ? repairDetails.customer_info.email_id
                  : "-"
              }
              label="Email ID"
            />
          </UserRoleField>
          {/* <UserNameField>
            <p>Sales Person Name</p>
            <AvatarSection>
              <PiAvatar
                appearance="circle"
                src={Avatar}
                onClick={function noRefCheck() {}}
              />
              <p className="user-name">
                {repairDetails.customer_info
                  ? repairDetails.customer_info.sales_person
                  : '-'}
              </p>
            </AvatarSection>
          </UserNameField> */}
        </div>
      </RepairInfoSection>

      {/* <NewActivityLog activityDetails={activityDetails}/> */}
    </>
  );
}
