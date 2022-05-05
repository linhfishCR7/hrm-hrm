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
]

export default _navAdmin
