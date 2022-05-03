/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { PiHeaderMenu } from 'pixel-kit'
import { PiMenuOptions } from 'src/services/schema/schema'
import Logo from 'src/assets/images/Buzzworldlogo.png'

import EndpointUrl from 'src/core/apiEndpoints/endPoints'
import {
  //   setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from 'src/core/localStorage/localStorage'
import { useHistory } from 'react-router-dom'

import {
  primaryHeaderOptions,
  profileOptions,
} from 'src/modules/organisations/component/organisationRenderdata'

export default function CommmonHeader() {
  let [token, setToken] = useState('')
  let [headerLinkactive, setHeaderLinkactive] = useState('dashboard')

  useEffect(() => {
    token = getLocalStorage('token') as string
    console.log(window.location.pathname)
    setToken(token)
    if (
      window.location.pathname === '/account-type' ||
      window.location.pathname === '/classifications' ||
      window.location.pathname === '/contact_types' ||
      window.location.pathname === '/industry' ||
      window.location.pathname === '/po_min_qty' ||
      window.location.pathname === '/sales_potential' ||
      window.location.pathname === 'Admin'
    ) {
      setHeaderLinkactive('/account-type')
    } else if (
      window.location.pathname === '/pricing' ||
      window.location.pathname === '/discount-codes' ||
      window.location.pathname === '/special-pricing'
    ) {
      setHeaderLinkactive('/pricing')
    } else if (
      window.location.pathname === '/organisations' ||
      window.location.pathname === '/contacts'
    ) {
      setHeaderLinkactive('/organisations')
    }
  }, [])
  const history = useHistory()

  const headerOptions = primaryHeaderOptions
  const profileOptionsData = profileOptions

  // eslint-disable-next-line require-jsdoc
  const MenuClick = (menu: any) => {
    localStorage.removeItem('search')
    history.replace(menu.key)
   
	 if (
      menu.key === '/account-type' ||
      menu.key === '/classifications' ||
      menu.key === '/contact_types' ||
      menu.key === '/industry' ||
      menu.key === '/po_min_qty' ||
      menu.key === '/sales_potential' ||
      menu.key === 'Admin'
    ) {
      setHeaderLinkactive('/account-type')
    } else if (
      menu.key === '/pricing' ||
      menu.key === '/discount-codes' ||
      menu.key === '/special-pricing'
    ) {
      setHeaderLinkactive('/pricing')
    } else if (
      menu.key === '/organisations' ||
      menu.key === '/contacts'
    ) {
      setHeaderLinkactive('/organisations')
     
    }
  }
  // eslint-disable-next-line require-jsdoc
  function ProfileClick(pro: PiMenuOptions) {
    window.location.href =
      `${process.env.REACT_APP_API_URL}` +
      `${EndpointUrl.logoutApi}?token=${token}`
    removeLocalStorage('token')
  }
  return (
    <PiHeaderMenu
      activeKey={headerLinkactive}
      image={Logo}
      onMenuClick={(e: any) => MenuClick(e)}
      onProfileClick={(e: any) => ProfileClick(e)}
      options={headerOptions}
      profileOptions={profileOptionsData}
      xsImage="/Logo.svg"
    />
	
  )
}
