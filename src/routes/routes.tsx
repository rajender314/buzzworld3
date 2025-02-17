import {
  lazy, Suspense, useEffect, useState,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { LicenseManager } from 'ag-grid-enterprise';
import Cookies from 'js-cookie';
import {
  // setLocalStorage,
  getLocalStorage,
  // removeLocalStorage
} from '@app/core/localStorage/localStorage';
// import Layout from './layout'
import Authorization from '@app/modules/authentication/component';

const Layout = lazy(() => import('@app/routes/layout'));

LicenseManager.setLicenseKey(`${process.env.REACT_APP_AG_LICENCE_KEY}` || '');

/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
    }
}]  */

/**
 * @return {void}
 */
export default function Routes() {
  const [token, setToken]: any = useState('');

  // const authorizationUrl = "https://ssodev-iidm.enterpi.com:8443/Login";
  useEffect(() => {
    const value = getLocalStorage('token');
    setToken(value);
  }, []);

  /*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
    }
}]  */

  /**
   * @return {void}
   */

  console.log(Cookies.get('smartRoute'));
  /**
   * @return {string}
   */
  function getLandingRoute(): any {
    const userInfo = getLocalStorage('userPermission')
      ? JSON.parse(getLocalStorage('userPermission') || '')
      : null;
    if (window.location.pathname.substring(1).split('/')[0]) {
      return window.location.pathname;
    }
    if (userInfo && userInfo.user_type === '1') {
      return userInfo.default_route || 'pricing';
    }
    if (userInfo && userInfo.user_type === '2') {
      return 'quote_for_parts';
    }
    return true;
  }

  return (
    <Router>
      <Switch>
        {(() => {
          if (token === '') {
            return (
              <Route>
                <Suspense fallback={null}>
                  <Authorization />
                </Suspense>
              </Route>
            );
          }
          return (
            <>
              <Redirect exact from="/" to={getLandingRoute()} />
              {/* <CommmonHeader sendEventData={triggerEvent}></CommmonHeader>
                {routes.map((route, i) => (
                  <Route exact path={route.path} key={i}>
                    <Suspense fallback={null}>
                      {route.type === 'repairs' && (
                        <route.component flag={rmaFlag} />
                      )}
                      {route.type !== 'repairs' && <route.component />}
                    </Suspense>
                  </Route>
                ))} */}
              <Suspense fallback={null}>
                <Layout />
              </Suspense>
            </>
          );
        })()}
        {/* <Redirect exact from="/" to="/organisations" />
        {token && <Authorization />}
        {token && <Authorization />}
        {routes.map((route, i) => (
          <Route exact path={route.path} key={i}>
            <Suspense fallback={<Loader />}>
              <Authorization />
            </Suspense>
          </Route>
        ))} */}
      </Switch>
    </Router>
  );
}
