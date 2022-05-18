import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios'
import { TOKEN, BRANCH } from '../../constants/Config'
import { Link } from 'react-router-dom'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CButton,
  CContainer,
  CForm,
  CTooltip,
  CFormInput,
  CFormLabel,
  CFormText,
  CCard,
  CFormSelect,
  CPopover,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
  cilArrowBottom,
  cilArrowTop,
  cilOptions,
  cilCircle,
  cilInfo,
  cilBook,
  cilMediaStop,
  cilCalendar,
  cilContact,
  cilAirplaneMode,
  cilStar,
  cilFunctions,
  cilMoney,
  cilArrowCircleRight,
  cilNotes,
  cilEducation,
  cilExpandUp,
  cilStarHalf,
  cilDisabled,
  cilHandPointUp,
  cilMemory,
  cilNewspaper,
} from '@coreui/icons'
import Loading from '../../utils/loading'
import { Table, Space, Card, Avatar, Divider, Collapse, Input, Popover, Button } from 'antd'
import {
  EditOutlined,
  ThunderboltOutlined,
  CalculatorOutlined,
  DeleteOutlined,
  RiseOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons'
const { Column } = Table
const { Panel } = Collapse
const { Meta } = Card
const gridStyle = {
  width: '25%',
  textAlign: 'center',
}
const WidgetsDropdown = () => {
  const [data, setData] = useState({})
  const [dataProject, setDataProject] = useState([{}])
  const [dataStaff, setDataStaff] = useState([{}])
  const [dataCustomer, setDataCustomer] = useState([{}])
  const [dataDepartment, setDataDepartment] = useState([{}])
  const [dataID, setDataID] = useState('')
  const [dataName, setDataName] = useState('')
  const [liststaffs, setListStaffs] = useState([])
  // const [listprojects, setListProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [ListStaffModal, setListStaffModal] = useState({
    modalSettingIsOpen: false,
    id: '',
    name: '',
    staff: '',
  })
  const fetchDashboardAPI = async () => {
    await axios
      .get('/hrm/dashboard/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => console.log(error))
  }

  const fetchProjectAPI = async () => {
    await axios
      .get('/hrm/dashboard/project-by-time/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        setDataProject(res.data)
        // console.log(res.data[0].month)
      })
      .catch((error) => console.log(error))
  }

  const fetchStaffAPI = async () => {
    await axios
      .get('/hrm/dashboard/staff-by-time/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        setDataStaff(res.data)
        // console.log(res.data[0].month)
      })
      .catch((error) => console.log(error))
  }

  const fetchCustomerAPI = async () => {
    await axios
      .get('/hrm/dashboard/staff-by-time/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        setDataCustomer(res.data)
        // console.log(res.data[0].month)
      })
      .catch((error) => console.log(error))
  }

  const fetchDepartmentAPI = async () => {
    await axios
      .get('/hrm/departments/?no_pagination=true&branch__id=' + BRANCH, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        const data = res.data
        setDataDepartment(data)
        setDataID(data['0'].id)
        setDataName(data['0'].name)
        axios
          .get(
            '/hrm/staffs/?no_pagination=true&is_active=true&department__name__in=' + data['0'].name,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`,
              },
            },
          )
          .then((res) => {
            const data = res.data
            setListStaffs(data)
            setLoading(false)
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
  }

  const handleSetDeparment = async (item) => {
    setDataID(item.id)
    setDataName(item.name)
    setLoading(true)
    await axios
      .get('/hrm/staffs/?no_pagination=true&is_active=true&department__name__in=' + item.name, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        const data = res.data
        setListStaffs(data)
        setLoading(false)
      })
      .catch((error) => console.log(error))
  }

  const openSettingModal = (item) => {
    setListStaffModal({
      modalSettingIsOpen: true,
      id: item.id,
      name: item.first_name + ' ' + item.last_name,
      staff: item.staff,
    })
    localStorage.setItem('staff', item.id)
    localStorage.setItem('staff_name', item.first_name + ' ' + item.last_name)
  }

  const closeSettingModal = () => {
    setListStaffModal({
      modalSettingIsOpen: false,
    })
  }

  useEffect(() => {
    fetchDashboardAPI()
    fetchProjectAPI()
    fetchStaffAPI()
    fetchDepartmentAPI()
    fetchCustomerAPI()
  }, [])
  return (
    <>
      <Loading loading={loading} />

      <CRow className="mb-5">
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="info"
            value={
              <>
                {data.total_customer}{' '}
                {/* <span className="fs-6 fw-normal">
                (40.9% <CIcon icon={cilArrowTop} />)
              </span> */}
              </>
            }
            title="Khách Hàng"
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: dataCustomer.map((item) => 'Tháng ' + item.month),
                  datasets: [
                    {
                      label: 'Khách Hàng Theo Tháng',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-info'),
                      data: dataCustomer.map((item) => item.sum_amount),
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: -9,
                      max: 39,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="warning"
            value={
              <>
                {data.total_staff}{' '}
                {/* <span className="fs-6 fw-normal">
                (84.7% <CIcon icon={cilArrowTop} />)
              </span> */}
              </>
            }
            title="Nhân Viên"
            chart={
              <CChartLine
                className="mt-3"
                style={{ height: '70px' }}
                data={{
                  labels: dataStaff.map((item) => 'Tháng ' + item.month),
                  datasets: [
                    {
                      label: 'Nhân Viên Theo Tháng',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: dataStaff.map((item) => item.sum_amount),
                      fill: true,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={
              <>
                {data.total_project}{' '}
                {/* <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom} />)
              </span> */}
              </>
            }
            title="Dự Án"
            chart={
              <CChartBar
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: dataProject.map((item) => 'Tháng ' + item.month),
                  datasets: [
                    {
                      label: 'Dự Án Theo Tháng',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: dataProject.map((item) => item.sum_amount),
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                        drawBorder: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
              <>
                {data.total_department}{' '}
                {/* <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span> */}
              </>
            }
            title="Bộ Phận (Phòng Ban)"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                  <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                  {dataDepartment.map((item) => (
                    <CDropdownItem key={dataDepartment.id} onClick={() => handleSetDeparment(item)}>
                      {/* <div style={{ textTransform: 'lowercase' }}>{item.name}</div> */}
                      {item.name}
                    </CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: dataStaff.map((item) => 'Tháng ' + item.month),
                  datasets: [
                    {
                      label: 'Test',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-primary'),
                      data: dataStaff.map((item) => item.sum_amount),
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: 30,
                      max: 89,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                      tension: 0.4,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <h4 id="traffic" className="card-title mb-0">
            Danh Sách Nhân Viên Chính Thức Của: {dataName}
          </h4>
        </CCol>
      </CRow>
      <Divider />
      <CRow className="mb-5">
        {liststaffs.map((item) => (
          <CCol key={item.id} md={4} xl={3}>
            <Card
              key={item.id}
              className="mb-3"
              hoverable={true}
              actions={[
                <SettingOutlined key="setting" onClick={() => openSettingModal(item)} />,
                <Popover
                  content={
                    <Card
                      // hoverable
                      style={{ width: 340 }}
                      cover={
                        <img
                          alt={item.user.first_name + ' ' + item.user.last_name}
                          src={
                            item.user.image != null
                              ? item.user.image.image_s3_url
                              : 'https://hrm-s3.s3.amazonaws.com/6e98775b-4d5hrm-profile.png'
                          }
                        />
                      }
                    >
                      <Meta
                        title={'Họ tên: ' + item.user.first_name + ' ' + item.user.last_name}
                        // description={item.user.first_name + ' ' + item.user.last_name}
                      />
                      <Divider />
                      <Meta title={'Email cty: ' + item.email} />
                      <Meta title={'Email cá nhân: ' + item.personal_email} />
                      <Divider />
                      <Meta title={'Facebook: ' + item.facebook} />
                      <Divider />
                      <Meta title={'Link: ' + item.url} />
                      <Divider />
                      <Meta title={'SĐT: ' + item.user.phone} />
                    </Card>
                  }
                  title="THÔNG TIN LIÊN HỆ"
                  trigger="hover"
                  key="ellipsis"
                >
                  <EllipsisOutlined />
                </Popover>,
              ]}
            >
              <Meta
                avatar={
                  <Avatar
                    src={
                      item.user.image != null
                        ? item.user.image.image_s3_url
                        : 'https://hrm-s3.s3.amazonaws.com/6e98775b-4d5hrm-profile.png'
                    }
                  />
                }
                title={item.last_name + ' ' + item.first_name}
                description={
                  item.position_data === 'Giám Đốc' ? <h6>Giám Đốc</h6> : item.position_data
                }
              />
            </Card>
          </CCol>
        ))}
      </CRow>

      {/* Detail */}
      <CModal
        visible={ListStaffModal.modalSettingIsOpen}
        onClose={closeSettingModal}
        size="xl"
        scrollable={true}
      >
        <CModalHeader>
          <CModalTitle>Cập nhật chi tiết thông tin nhân viên</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <h4 style={{ textTransform: 'uppercase', textAlign: 'center' }}>
              Mã nhân viên: {ListStaffModal.staff}
            </h4>
            <Card>
              <Card.Grid style={gridStyle}>
                <CTooltip content="Thông Tin Liên Hệ Khẩn" placement="top">
                  <Link to="/staff/contact" target="_blank">
                    <CIcon icon={cilContact} customClassName="nav-icon" width="60" height="60" />
                    <br />
                    Thông Tin Liên Hệ Khẩn
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <CTooltip content="Bằng Cấp" placement="top">
                  <Link to="/staff/degree" target="_blank">
                    <CIcon icon={cilBook} customClassName="nav-icon" width="60" height="60" />
                    <br />
                    Bằng Cấp
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <CTooltip content="Chứng Chỉ" placement="top">
                  <Link to="/staff/certificate" target="_blank">
                    <CIcon icon={cilNewspaper} customClassName="nav-icon" width="60" height="60" />
                    <br />
                    Chứng Chỉ
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <CTooltip content="Kỹ Năng" placement="top">
                  <Link to="/staff/skill" target="_blank">
                    <CIcon icon={cilFunctions} customClassName="nav-icon" width="60" height="60" />
                    <br />
                    Kỹ Năng
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                {' '}
                <CTooltip content="Công Tác" placement="top">
                  <Link to="/staff/on-business" target="_blank">
                    <CIcon
                      icon={cilAirplaneMode}
                      customClassName="nav-icon"
                      width="60"
                      height="60"
                    />
                    <br />
                    Công Tác
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                {' '}
                <CTooltip content="Chấm Công" placement="top">
                  <Link to="/staff/timekeeping" target="_blank">
                    <CIcon icon={cilCalendar} customClassName="nav-icon" width="60" height="60" />
                    <br />
                    Chấm Công
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <CTooltip content="Phép Năm" placement="top">
                  <Link to="/staff/day-off-year" target="_blank">
                    <CIcon icon={cilMediaStop} customClassName="nav-icon" width="60" height="60" />
                    <br />
                    Phép Năm
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                {' '}
                <CTooltip content="Tiền Lương" placement="top">
                  <Link to="/staff/salary" target="_blank">
                    <CIcon icon={cilMoney} customClassName="nav-icon" width="60" height="60" />
                    <br />
                    Tiền Lương
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <CTooltip content="Điều Chỉnh Lương" placement="top">
                  <Link to="/staff/up-salary" target="_blank">
                    {/* <CIcon
                        icon={cilArrowCircleRight}
                        customClassName="nav-icon"
                        width="60"
                        height="60"
                      /> */}
                    <CalculatorOutlined style={{ fontSize: '428.571428571%', height: '60' }} />
                    <br />
                    Điều Chỉnh Lương
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <CTooltip content="Hợp Đồng Lao Động" placement="top">
                  <Link to="/staff/contract" target="_blank">
                    <CIcon icon={cilNotes} customClassName="nav-icon" width="60" height="60" />
                    <br />
                    Hợp Đồng Lao Động
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <CTooltip content="Đào Tạo" placement="top">
                  <Link to="/staff/trainning" target="_blank">
                    <CIcon icon={cilEducation} customClassName="nav-icon" width="60" height="60" />
                    <br />
                    Đào Tạo
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <CTooltip content="Thăng Tiến" placement="top">
                  <Link to="/staff/promotion" target="_blank">
                    <RiseOutlined style={{ fontSize: '428.571428571%', height: '60' }} />
                    <br />
                    Thăng Tiến
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <CTooltip content="Khen Thưởng" placement="top">
                  <Link to="/staff/bonus" target="_blank">
                    <CIcon icon={cilStar} customClassName="nav-icon" width="60" height="60" />
                    <br />
                    Khen Thưởng
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <CTooltip content="Kỷ Luật" placement="top">
                  <Link to="/staff/discipline" target="_blank">
                    {/* <CIcon icon={cilDisabled} customClassName="nav-icon" width="60" height="60" /> */}
                    <ThunderboltOutlined style={{ fontSize: '428.571428571%', height: '60' }} />
                    <br /> Kỷ Luật
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <CTooltip content="Sức Khoẻ" placement="top">
                  <Link to="/staff/health" target="_blank">
                    <CIcon
                      icon={cilHandPointUp}
                      customClassName="nav-icon"
                      width="60"
                      height="60"
                    />
                    <br /> Sức Khoẻ
                  </Link>
                </CTooltip>
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                <CTooltip content="Cài Đặt" placement="top">
                  <Link to="#">
                    <CIcon icon={cilMemory} customClassName="nav-icon" width="60" height="60" />
                    <br /> Cài Đặt
                  </Link>
                </CTooltip>
              </Card.Grid>
            </Card>
          </CForm>{' '}
        </CModalBody>
      </CModal>
    </>
  )
}

export default WidgetsDropdown
