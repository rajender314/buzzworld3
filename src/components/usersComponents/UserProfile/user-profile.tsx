import { Fragment, useContext, useEffect, useState } from "react";
import Loader from "@app/components/Loader/loader";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { GlobalUserPermissions } from "@app/helpers/helpers";
import { AuthContext } from "@app/providers";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import UserDetails from "../userDetails/user-details";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState(true);
  const { userInfo, setUserInfo }: any = useContext(AuthContext);
  const getUserProfile = () => {
    console.log(userInfo);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.userProfile}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          await setUserProfile(data);
          setLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  async function triggerEvent() {
    const data: any = await GlobalUserPermissions();
    console.log(data);
    setUserInfo([...data]);
  }
  return (
    <>
      {!loading && (
        <div style={{ margin: "14px" }}>
          <UserDetails
            userDetails={userProfile}
            sendEvent={() => triggerEvent()}
          />
        </div>
      )}
      {loading && <Loader />}
    </>
  );
}
