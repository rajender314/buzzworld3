import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@app/core/localStorage/localStorage";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";

export default function PermissionApiComponent() {
  const history = useHistory();
  const userPermissions = useCallback(() => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.userPermissions}`,
      headers: {},
    };
    triggerApi(apiObject).then((response: ApiResponse) => {
      if (response.result.success) {
        let userPermissionsData = [];
        userPermissionsData = response.result.data;
        const smartLink = getLocalStorage("payload")
          ? JSON.parse(getLocalStorage("payload") as string)
          : null;

        setLocalStorage("userPermission", JSON.stringify(userPermissionsData));
        if (response.result.data.user_type === "1") {
          if (smartLink) {
            history.push(smartLink.smart_link);
          } else {
            history.push(
              response.result.data.user_type === "1"
                ? userPermissionsData.default_route
                : "/quote_for_parts"
            );
          }
        } else {
          history.push("/access-denied");
        }
        removeLocalStorage("payload");
      }
    });
  }, [history]);
  useEffect(() => {
    userPermissions();
  }, [userPermissions]);

  return <div />;
}
