import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilHome,
  cilImage,
  cilImagePlus,
  cilAirplaneModeOff,
  cilContrast,
  cilCheck,
  cilPeople,
  cilContact,
  cilMoney,
  cilCalendar,
  cilSatelite,
  cilRunning,
  cilUser,
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
    component: CNavGroup,
    name: 'Công ty',
    to: '/company',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách Công Ty',
        to: '/company',
      },
      {
        component: CNavItem,
        name: 'Thêm Công Ty',
        to: '/add-company',
      },
    ],
  },
  ,
  {
    component: CNavGroup,
    name: 'Người Dùng',
    to: '/list-user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách Người Dùng',
        to: '/list-user',
      },
    ],
  },
]

export default _navAdmin
