import React from 'react'

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

//################################################################
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Religion = React.lazy(() => import('./views/pages/religion/Religion'))
const Nationality = React.lazy(() => import('./views/pages/nationality/Nationality'))
const CertificateType = React.lazy(() => import('./views/pages/certificateType/CertificateType'))
const Certificate = React.lazy(() => import('./views/pages/certificate/Certificate'))
const DegreeType = React.lazy(() => import('./views/pages/degreeType/DegreeType'))
const Degree = React.lazy(() => import('./views/pages/degree/Degree'))
const DayOffType = React.lazy(() => import('./views/pages/dayOffType/DayOffType'))
const Ethnicity = React.lazy(() => import('./views/pages/ethnicity/Ethnicity'))
const Position = React.lazy(() => import('./views/pages/position/Position'))
const Literacy = React.lazy(() => import('./views/pages/literacy/Literacy'))
const EmploymentContractType = React.lazy(() =>
  import('./views/pages/employmentContractType/EmploymentContractType'),
)
const KindOffWork = React.lazy(() => import('./views/pages/kindOffWork/KindOffWork'))
const AddCompany = React.lazy(() => import('./views/pages/company/AddCompany'))
const Company = React.lazy(() => import('./views/pages/company/Company'))
const CompanyDetail = React.lazy(() => import('./views/pages/company/CompanyDetail'))
const Customer = React.lazy(() => import('./views/pages/customer/Customer'))
const CustomerDetail = React.lazy(() => import('./views/pages/customer/CustomerDetail'))
const AddCustomer = React.lazy(() => import('./views/pages/customer/AddCustomer'))
const Staff = React.lazy(() => import('./views/pages/staff/Staff'))
const AddStaff = React.lazy(() => import('./views/pages/staff/addStaff'))
const ListStaff = React.lazy(() => import('./views/pages/staff/listStaff'))
const Salary = React.lazy(() => import('./views/pages/salary/Salary'))
const Skill = React.lazy(() => import('./views/pages/skill/Skill'))
const Contact = React.lazy(() => import('./views/pages/contact/Contact'))
const OnBusiness = React.lazy(() => import('./views/pages/onBusiness/OnBusiness'))
const Health = React.lazy(() => import('./views/pages/health/Health'))
const Discipline = React.lazy(() => import('./views/pages/discipline/Discipline'))
const Bonus = React.lazy(() => import('./views/pages/bonus/Bonus'))
const Promotion = React.lazy(() => import('./views/pages/promotion/Promotion'))
const Contract = React.lazy(() => import('./views/pages/contract/Contract'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/religion', name: 'Tôn Giáo', element: Religion },
  { path: '/nationality', name: 'Quốc Tịch', element: Nationality },
  { path: '/ethnicity', name: 'Dân Tộc', element: Ethnicity },
  { path: '/certificate-type', name: 'Loại Chứng Nhận', element: CertificateType },
  { path: '/staff/certificate', name: 'Chứng Nhận', element: Certificate },
  { path: '/degree-type', name: 'Loại Bằng Cấp', element: DegreeType },
  { path: '/staff/degree', name: 'Bằng Cấp', element: Degree },
  { path: '/day-off-type', name: 'Loại Ngày Nghỉ', element: DayOffType },
  { path: '/position', name: 'Chức Vụ', element: Position },
  { path: '/literacy', name: 'Trình Độ Học Vấn', element: Literacy },
  {
    path: '/employment-contract-type',
    name: 'Hợp Đồng Lao Động',
    element: EmploymentContractType,
  },
  { path: '/kind-off-work', name: 'Công', element: KindOffWork },
  { path: '/add-company', name: 'Thêm Công Ty', element: AddCompany },
  { path: '/company', name: 'Công Ty', element: Company },
  { path: '/company/:id', name: 'Chi Tiết Công Ty', element: CompanyDetail },
  { path: '/customer', name: 'Khách Hàng', element: Customer },
  { path: '/add-customer', name: 'Thêm Khách Hàng', element: AddCustomer },
  { path: '/customer/:id', name: 'Chi Tiết Khách Hàng', element: CustomerDetail },
  { path: '/staff', name: 'Nhân Viên', element: Staff },
  { path: '/add-staff', name: 'Thêm Nhân Viên', element: AddStaff },
  { path: '/list-staff', name: 'Nhân Viên', element: ListStaff },
  { path: '/salary', name: 'Tiền Lương', element: Salary },
  { path: '/staff/skill', name: 'Kỹ Năng', element: Skill },
  { path: '/staff/contact', name: 'Liên Hệ Khẩn Cấp', element: Contact },
  { path: '/staff/on-business', name: 'Công Tác', element: OnBusiness },
  { path: '/staff/health', name: 'Khám Sức Khoẻ', element: Health },
  { path: '/staff/discipline', name: 'Kỷ Luật', element: Discipline },
  { path: '/staff/bonus', name: 'Khen Thưởng', element: Bonus },
  { path: '/staff/promotion', name: 'Thăng Tiến', element: Promotion },
  { path: '/staff/contract', name: 'Hợp Đồng Lao Động', element: Contract },

  // #################################################################

  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
