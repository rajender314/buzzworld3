import { useEffect, useState } from "react";
import { PageProps } from "@app/services/schema/schema";
import AdminImg from "@app/assets/images/admin.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import UserRolesPermissions from "@app/components/userRolePermissions";
import { getAdminMenuList } from "@app/helpers/componentHelpers";
import Loader from "@app/components/Loader/loader";

export default function UserRoles({ sendAdminEvent, gridInteraction }: any) {
  const [loading, setloading] = useState(true);
  const [isUserRoleAdded, setIsUserRoleAdded] = useState<boolean>();

  useEffect(() => {
    (async () => {
      await getAdminMenuList();
      setloading(false);
    })();
  }, []);

  useEffect(() => {
    if (gridInteraction) {
      setIsUserRoleAdded(
        gridInteraction && gridInteraction.success
          ? gridInteraction.success
          : false
      );
    }
  }, [gridInteraction]);

  const getuserRoleData = async (e: any) => {
    sendAdminEvent(e);
  };

  const props: PageProps = {
    pageLabel: "user_roles",
    displayLabel: "User Roles",
    sideNavData: [],
    apiDataUrl: EndpointUrl.permissionList,
    pageLogo: AdminImg,
    apiData: {
      apiUrl: AdminImg,
      params: {},
    },
  };
  return (
    <div style={{ display: "contents" }}>
      {!loading ? (
        <UserRolesPermissions
          props={props}
          sendUserRoleData={getuserRoleData}
          isUserRoleAdded={isUserRoleAdded || false}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}
