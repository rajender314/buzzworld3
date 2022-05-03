/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Loader from 'src/components/Loader/loader'
import CommmonHeader from 'src/components/commonHeader'

// import Industry from "src/modules/industry/component/industry";

// import Orders from "src/modules/orders/component";
// import Repairs from "../modules/repairs/component/repairs";

import Langugae from '../core/language/language'
import {
  // setLocalStorage,
  getLocalStorage,
  // removeLocalStorage
} from 'src/core/localStorage/localStorage'
const Organisations = lazy(() => import('src/modules/organisations/component'))

const Contacts = lazy(() => import('src/modules/contacts/component'))
const AccountTypes = lazy(() => import('src/modules/accountTypes/component'))
const Classification = lazy(() =>
  import('src/modules/classification/component'),
)
const Industry = lazy(() => import('src/modules/industry/component'))
const SalesPotential = lazy(() =>
  import('src/modules/salesPotential/component'),
)
const ContactTypes = lazy(() => import('src/modules/contactTypes/component'))
const PoMinQty = lazy(() => import('src/modules/poMinQty/component'))
const Pricing = lazy(() => import('src/modules/vendor/component'))
const SpecialPricing = lazy(() =>
  import('src/modules/specialPricing/component'),
)
const DiscountCodes = lazy(() => import('src/modules/discountCodes/component'))
const Authorization = lazy(() => import('src/modules/authentication/component'))

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
  let [token, setToken] = useState('')

  // const authorizationUrl = "https://ssodev-iidm.enterpi.com:8443/Login";
  useEffect(() => {
    token = getLocalStorage('token') as string
    setToken(token)
    console.log(token)
    // const location = useLocation();
    console.log(window.location.pathname)
  }, [])
  const routes = [
    {
      path: '/organisations',
      component: Organisations,
    },

    {
      path: '/contacts',
      component: Contacts,
    },
    {
      path: '/account-type',
      component: AccountTypes,
    },
    {
      path: '/classification',
      component: Classification,
    },
    {
      path: '/industry',
      component: Industry,
    },
    {
      path: '/sales_potential',
      component: SalesPotential,
    },
    {
      path: '/contact_types',
      component: ContactTypes,
    },
    {
      path: '/po_min_qty',
      component: PoMinQty,
    },
    {
      path: '/language',
      component: Langugae,
    },
    {
      path: '/pricing',
      component: Pricing,
    },
    {
      path: '/discount-codes',
      component: DiscountCodes,
    },
    {
      path: '/special-pricing',
      component: SpecialPricing,
    },
  ]

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
            )
          } else {
            return (
              <>
                <Redirect
                  exact
                  from="/"
                  to={
                    window.location.pathname.length > 1
                      ? window.location.pathname
                      : '/pricing'
                  }
                />
                <CommmonHeader></CommmonHeader>
                {routes.map((route, i) => (
                  <Route exact path={route.path} key={i}>
                    <Suspense fallback={null}>
                      <route.component />
                    </Suspense>
                  </Route>
                ))}
              </>
            )
          }
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
  )
}
