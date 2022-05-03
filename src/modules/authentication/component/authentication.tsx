import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { toQuery } from 'src/core/utils';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
} from 'src/core/localStorage/localStorage';
export default function Authorization() {
  const authorizationUrl = `${process.env.REACT_APP_AUTHORIZATION_URL}`;
  const clientId = `${process.env.REACT_APP_CLIENT_ID}`;
  const redirectUri = `${process.env.REACT_APP_REDIRECT_URI}`;
  const appServerUrl = `${process.env.REACT_APP_SERVER_URL}`;
    
      

  const access_token = getLocalStorage('token');

  // const Organisations = lazy(
  //   () => import('src/modules/organisations/component')
  // );
  // const history = useHistory();
  const [isToken, setIsToken] = useState(false);
 
  
  useEffect(() => {
    if (!access_token) {
      (async () => {
      // if (state) {
      //   payload.state = state;
      // }
      const urlparams = new URLSearchParams(window.location.search);
      console.log(urlparams.has('code'))

      if (urlparams.has('code')) {
        console.log(urlparams.get('code'));
        let params = {
          grant_type: `${process.env.REACT_APP_GRANT_TYPE}`,
          client_id: `${process.env.REACT_APP_CLIENT_ID}`,
          client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
          redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
          code: urlparams.get('code'),
        };
        fetch(`${appServerUrl}/token`, {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((json) => {
           if(json.access_token) {
              setLocalStorage('token', json.access_token);
              setIsToken(true);
            } else {
               removeLocalStorage('token');
               setIsToken(false);
            }
           window.location.reload();
          });
      } else {
        console.log('else called')
        const payload = {
          client_id: clientId,
          redirect_uri: redirectUri,
          response_type: 'code',
        };
        const search = toQuery(payload);
          window.location.href = `${authorizationUrl}?${search}`;
      }
       })();
    } else {
      console.log(3455);
    }
  }, []);

  return (
    <Fragment>{isToken && <Redirect exact from="/" to="/pricing" />}</Fragment>
  );
}
