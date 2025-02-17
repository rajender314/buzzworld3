import { useEffect, useState } from "react";

import { Redirect } from "react-router-dom";
import { toQuery } from "@app/core/utils";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "@app/core/localStorage/localStorage";
import Loader from "@app/components/Loader/loader";

export default function Authorization() {
  const authorizationUrl = `${process.env.REACT_APP_AUTHORIZATION_URL}`;
  const clientId = `${process.env.REACT_APP_CLIENT_ID}`;
  const redirectUri = `${process.env.REACT_APP_REDIRECT_URI}`;
  const appServerUrl = `${process.env.REACT_APP_SERVER_URL}`;

  const access_token = getLocalStorage("token");

  // const Organisations = lazy(
  //   () => import('@app/modules/organisations/component')
  // );
  // const history = useHistory();
  const [isToken, setIsToken] = useState(false);

  const [smartLink, setSmartLink]: any = useState();
  useEffect(() => {
    if (!access_token) {
      (async () => {
        // if (state) {
        //   payload.state = state;
        // }
        const urlparams = new URLSearchParams(window.location.search);
        if (urlparams.has("code")) {
          const params = {
            grant_type: `${process.env.REACT_APP_GRANT_TYPE}`,
            client_id: `${process.env.REACT_APP_CLIENT_ID}`,
            client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
            redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
            code: urlparams.get("code"),
            smart_link: smartLink,
          };
          fetch(`${appServerUrl}/token`, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
              "content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((json) => {
              if (json.access_token) {
                setLocalStorage("token", json.access_token);
                setIsToken(true);
                document.cookie = "12121, sdssdd";
              } else {
                removeLocalStorage("token");
                setIsToken(false);
              }
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            });
        } else {
          const payload = {
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: "code",
            smart_link: window.location.pathname,
          };
          const search = toQuery(payload);
          window.location.href = `${authorizationUrl}?${search}`;
          if (payload.smart_link !== "/") {
            setLocalStorage("payload", JSON.stringify(payload));
          }
          setSmartLink(payload.smart_link);
        }
      })();
    }
  }, []);

  return (
    <>
      {isToken && <Redirect exact from="/" to="/loading..." />}
      {!isToken && <Loader />}
    </>
  );
}
