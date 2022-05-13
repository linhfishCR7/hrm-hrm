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
  cilHome,
  cilImage,
  cilBook,
  cilAirplaneModeOff,
  cilContrast,
  cilCheck,
  cilPeople,
  cilContact,
  cilMoney,
  cilCalendar,
  cilSatelite,
  cilRunning,
  cilVolumeOff,
  cilEducation,
  cilWindowRestore,
  cilMediaStop,
  cilStar,
  cilShareAll,
  cilNewspaper,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  {
    component: CNavTitle,
    name: 'Cập Nhật',
  },
  {
    component: CNavGroup,
    name: 'Thông tin chung',
    to: '/dashboard',
    icon: <CIcon icon={cilShareAll} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Tôn giáo',
        to: '/religion',
      },
      {
        component: CNavItem,
        name: 'Quốc tịch',
        to: '/nationality',
      },
      {
        component: CNavItem,
        name: 'Dân tộc',
        to: '/ethnicity',
      },
      {
        component: CNavItem,
        name: 'Chức vụ',
        to: '/position',
      },
      {
        component: CNavItem,
        name: 'Trình độ học vấn',
        to: '/literacy',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Chứng Chỉ',
    to: '/certificate-type',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bằng cấp',
    to: '/degree-type',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Loại Ngày Nghỉ',
    to: '/day-off-type',
    icon: <CIcon icon={cilMediaStop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Hợp Đồng Lao Động',
    to: '/employment-contract-type',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bộ Phận',
    to: '/department',
    icon: <CIcon icon={cilWindowRestore} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Khách Hàng',
    to: '/customer',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Nhân Viên',
    to: '/list-staff',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Cập Nhật Nhân Viên',
        to: '/staff',
      },
      {
        component: CNavItem,
        name: 'Thêm Nhân Viên',
        to: '/add-staff-and-account',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Dự Án',
    to: '/project',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Nhân Viên Làm Dự Án',
    to: '/staff-project',
    icon: <CIcon icon={cilRunning} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Tiền Lương',
    to: '/salary',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Chương Trình Đào Tạo',
    to: '/trainning',
    icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Chấm Công',
    to: '/timekeeping-all',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Quản Lý & Báo Cáo',
  },
  {
    component: CNavGroup,
    name: 'Nhân Viên',
    to: '/list-staff',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách nhân viên',
        to: '/list-staff',
      },
      {
        component: CNavItem,
        name: 'CV nhân viên',
        to: '/list-cv',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Tiền Lương',
    to: '/report-salary',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Hợp Đồng Lao Động',
    to: '/list-contract-pdf',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  ,
  {
    component: CNavItem,
    name: 'Phép Năm Nhân Viên',
    to: '/list-day-off-year-pdf',
    icon: <CIcon icon={cilMediaStop} customClassName="nav-icon" />,
  },
]

export default _nav
