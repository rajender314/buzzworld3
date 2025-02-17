import { useContext, useEffect, useState } from "react";
import {
  RolesAndPermissionContainer,
  Permissions,
} from "@app/components/userRolePermissions/user-role-permissions.component";
import TermsForm from "@app/components/popups/client-approval-form/terms-form/terms-form";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import AccesssDenied from "@app/modules/access-denied/component";
import { AuthContext } from "@app/providers";

export default function Termsdata(props: any) {
  const { sideNavData } = props;
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
  useEffect(() => {
    let userPerm: any = getLocalStorage("userPermission");
    userPerm = userPerm ? JSON.parse(userPerm) : null;

    const tifOptions: any = [];
    if (userPerm) {
      Object.keys(userPerm.permissions).forEach((key) => {
        tifOptions.push(userPerm.permissions[key]);
      });
      sideNavData.map((obj: any) => {
        tifOptions.map((ele: any) => {
          if (Object.prototype.hasOwnProperty.call(ele, obj.key)) {
            obj.display = ele[obj.key].View;
          }
          return ele;
        });
        return obj;
      });
    }
  }, [sideNavData]);

  return (
    <>
      {Object.keys(permissionObject).length > 0 && permissionObject.View && (
        <RolesAndPermissionContainer>
          <Permissions>
            <TermsForm />
          </Permissions>
        </RolesAndPermissionContainer>
      )}
      {Object.keys(permissionObject).length > 0 && !permissionObject.View && (
        <AccesssDenied />
      )}
    </>
  );
}
