import { PiButton } from "pixel-kit";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { removeLocalStorage } from "@app/core/localStorage/localStorage";
import { getUserLoggedPermission } from "@app/helpers/helpers";
import { token } from "@app/services";
import { AccessDeniedContainer } from "./access-denied.component";

export default function AccesssDenied() {
  const onLogout = () => {
    window.location.href =
      `${process.env.REACT_APP_API_URL}` +
      `${EndpointUrl.logoutApi}?token=${token}&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
    removeLocalStorage("token");
    removeLocalStorage("userPermission");
  };
  return (
    <AccessDeniedContainer>
      <p>Sorry, you do not have permissions to access this page.</p>
      {!getUserLoggedPermission() && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PiButton appearance="primary" label="Log Out" onClick={onLogout} />
        </div>
      )}
    </AccessDeniedContainer>
  );
}
