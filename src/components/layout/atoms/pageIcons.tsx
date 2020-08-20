import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard'
// import PeopleIcon from '@material-ui/icons/People'
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
// import TextFieldsIcon from '@material-ui/icons/TextFields'
// import ImageIcon from '@material-ui/icons/Image'
// import AccountBoxIcon from '@material-ui/icons/AccountBox'
// import SettingsIcon from '@material-ui/icons/Settings'
// import LockOpenIcon from '@material-ui/icons/LockOpen'
import pages, { Page } from '../../../pages'
import withDefault from '../../../helpers/commons/withDefault'

const iconMap = new Map<Page, JSX.Element>()
iconMap.set(pages.dashboard,      <DashboardIcon />)
// iconMap.set(pages.,          <PeopleIcon />)
// iconMap.set('Products',       <ShoppingBasketIcon />)
// iconMap.set('Authentication', <LockOpenIcon />)
// iconMap.set('Typography',     <TextFieldsIcon />)
// iconMap.set('Icons',          <ImageIcon />)
// iconMap.set('Account',        <AccountBoxIcon />)
// iconMap.set('Settings',       <SettingsIcon />)

const defaultOrder = -1

const isLinkedSidebar = (page: Page) => {
  if (page.isLinkedSidebar && page.sidebarOrder === undefined) {
    console.warn(`sidebarOrder of the ${page.title} is not defined. It will be ${defaultOrder}`)
  }
  return page.isLinkedSidebar
}

const attachIcon = (page: Page, icon: JSX.Element | undefined) => {
  if (icon === undefined) {
    console.warn(`The icon of ${page.title} is not attached!`);
  }
  return {
    icon,
    ...page
  }
}

export const sidebarPages
= Object.values(pages)
.filter(isLinkedSidebar)
.map(page => {
  const icon = iconMap.get(page)
  return attachIcon(page, icon)
})
.sort(
  (a, b) => withDefault(a.sidebarOrder, -1) - withDefault(b.sidebarOrder, -1)
)



export default sidebarPages
