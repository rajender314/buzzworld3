import { PiLeftMenu } from "pixel-kit";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import TenkApproval from "@app/components/popups/ten-k-Approval/ten-k-Approval";
import TwentyFiveApproval from "@app/components/popups/twanty-five-k-Approval/twenty-five-k-Approval";
import FiftykApproval from "@app/components/popups/fifty-k-Approval/fifty-k-Approval";
import {
  RolesAndPermissionContainer,
  UserRoleSideHeading,
  RoleHeadingDiv,
  RoleHeadingTextDiv,
  Permissions,
} from "@app/components/userRolePermissions/user-role-permissions.component";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import { AuthContext } from "@app/providers";
import AccesssDenied from "@app/modules/access-denied/component";
import SideMenuList from "@app/components/sidelist";
import { SideMenuContainer } from "../../commonLayout/commonLayout.component";

export default function Quotedata({ displayLabel }: any) {
  const [activeRole, setActiveRole] = useState("all");
  const statusFilter = useMemo(
    () => [
      { label: "$10k", key: "quote", display: true },
      { label: "$25k", key: "active", display: true },
      { label: "$50k", key: "twenty", display: true },
    ],
    []
  );
  const [openTenApprovalModel, setOpenTenApprovalModel] =
    useState<boolean>(true);
  const [openFiftyApprovalModel, setOpenFiftyApprovalModel] =
    useState<boolean>(false);
  const [openTwentyFiveApprovalModel, setOpenTwentyFiveApprovalModel] =
    useState<boolean>(false);

  const [permissionObject, setpermissionObject] = useState<any>({});
  const authcontextvalue = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject(
        window.location.pathname.substring(1)
      );
      setpermissionObject(permission);
    })();
  }, [authcontextvalue]);

  const usersList = useCallback(
    (userId?: string) => {
      let list = [];
      list = statusFilter.map((items: any) => ({
        key: items.key,
        label: items.label,
        display: true,
        ...items,
      }));
      // console.log(list[0].key);
      setActiveRole(userId || list[0].key);
    },
    [statusFilter]
  );
  useEffect(() => {
    if (permissionObject.View) {
      usersList();
    }
  }, [usersList, permissionObject]);
  async function getModel(e: any) {
    console.log(e);
    if (e.success) {
      setOpenTenApprovalModel(false);
      setOpenFiftyApprovalModel(false);
      setOpenTwentyFiveApprovalModel(false);
    }
  }

  function onRoleClick(obj: any) {
    setOpenTenApprovalModel(false);
    setOpenTwentyFiveApprovalModel(false);
    setOpenFiftyApprovalModel(false);
    setActiveRole(obj.key);
    usersList(obj.key);
    if (obj.key === "quote") {
      setOpenTenApprovalModel(true);
    } else if (obj.key === "active") {
      setOpenTwentyFiveApprovalModel(true);
    } else if (obj.key === "twenty") {
      setOpenFiftyApprovalModel(true);
    }
  }
  return (
    <>
      {Object.keys(permissionObject).length > 0 && permissionObject.View && (
        <RolesAndPermissionContainer>
          <SideMenuContainer className="menu-inside-menu">
            <div className="sideList-Search-1">
              <RoleHeadingDiv className="side">
                <RoleHeadingTextDiv>
                  <UserRoleSideHeading>{displayLabel}</UserRoleSideHeading>
                </RoleHeadingTextDiv>
              </RoleHeadingDiv>
              <SideMenuList isActive={activeRole} className="menu-list">
                <div className="left-menu" style={{ padding: "16px" }}>
                  <PiLeftMenu
                    activeKey={activeRole}
                    onMenuClick={(e) => onRoleClick(e)}
                    options={statusFilter}
                  />
                </div>
              </SideMenuList>
            </div>
          </SideMenuContainer>
          <Permissions>
            {openTenApprovalModel && (
              <TenkApproval
                sendModelData={(e: any) => getModel(e)}
                approvalInputData={undefined}
              />
            )}

            {openTwentyFiveApprovalModel && (
              <TwentyFiveApproval
                sendModelData={(e: any) => getModel(e)}
                approvalInputData={undefined}
              />
            )}
            {openFiftyApprovalModel && (
              <FiftykApproval
                sendModelData={(e: any) => getModel(e)}
                approvalInputData={undefined}
              />
            )}
          </Permissions>
        </RolesAndPermissionContainer>
      )}
      {Object.keys(permissionObject).length > 0 && !permissionObject.View && (
        <AccesssDenied />
      )}
    </>
  );
}
