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
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/dashboard',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Religion',
        to: '/religion',
      },
      {
        component: CNavItem,
        name: 'Nationality',
        to: '/nationality',
      },
      {
        component: CNavItem,
        name: 'Ethnicity',
        to: '/ethnicity',
      },
      {
        component: CNavItem,
        name: 'Position',
        to: '/position',
      },
      {
        component: CNavItem,
        name: 'Literacy',
        to: '/literacy',
      },
      // {
      //   component: CNavItem,
      //   name: 'Cards',
      //   to: '/base/cards',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Carousel',
      //   to: '/base/carousels',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Collapse',
      //   to: '/base/collapses',
      // },
      // {
      //   component: CNavItem,
      //   name: 'List group',
      //   to: '/base/list-groups',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Navs & Tabs',
      //   to: '/base/navs',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Pagination',
      //   to: '/base/paginations',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Placeholders',
      //   to: '/base/placeholders',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Popovers',
      //   to: '/base/popovers',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Progress',
      //   to: '/base/progress',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Spinners',
      //   to: '/base/spinners',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Tables',
      //   to: '/base/tables',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Tooltips',
      //   to: '/base/tooltips',
      // },
    ],
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Certificate',
    to: '/certificate-type',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Certificate Type',
        to: '/certificate-type',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Degree',
    to: '/degree-type',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Degree Type',
        to: '/degree-type',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Day Off',
    to: '/day-off-type',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Day Off Type',
        to: '/day-off-type',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Employment Contract',
    to: '/employment-contract-type',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Contract Type',
        to: '/employment-contract-type',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Kind Off Work',
    to: '/kind-off-work',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Kind Off Work',
        to: '/kind-off-work',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Company',
    to: '/company',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List Company',
        to: '/company',
      },
      {
        component: CNavItem,
        name: 'Add Company',
        to: '/add-company',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Customer',
    to: '/customer',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List Customer',
        to: '/customer',
      },
      // {
      //   component: CNavItem,
      //   name: 'Add Company',
      //   to: '/add-company',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Nhân Viên',
    to: '/list-staff',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Quản Lý Nhân Viên',
        to: '/list-staff',
      },
      {
        component: CNavItem,
        name: 'Cập Nhật Nhân Viên',
        to: '/staff',
      },
      // {
      //   component: CNavItem,
      //   name: 'Add Company',
      //   to: '/add-company',
      // },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
]

export default _nav
