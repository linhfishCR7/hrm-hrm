import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBuilding,
  cilHome,
  cilUser,
  cilLibraryBuilding,
  cilWindowRestore,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _navAdmin = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard-admin',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Cập Nhật',
  },
  {
    component: CNavItem,
    name: 'Công ty',
    to: '/company',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Chi Nhánh',
    to: '/branch',
    icon: <CIcon icon={cilLibraryBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bộ Phận',
    to: '/department-admin',
    icon: <CIcon icon={cilWindowRestore} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Người Dùng',
    to: '/list-user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default _navAdmin
