import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios'
import { TOKEN, BRANCH } from '../../constants/Config'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CButton,
  CTooltip,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import Loading from '../../utils/loading'
import { Table, Space, Card, Avatar, Divider } from 'antd'
import { EditOutlined, DeleteOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

const { Meta } = Card
const { Column } = Table

const WidgetsDropdown = () => {
  const [data, setData] = useState({})
  const [dataProject, setDataProject] = useState([{}])
  const [dataStaff, setDataStaff] = useState([{}])
  const [dataCustomer, setDataCustomer] = useState([{}])
  const [dataDepartment, setDataDepartment] = useState([{}])
  const [dataID, setDataID] = useState('')
  const [dataName, setDataName] = useState('')
  const [liststaffs, setListStaffs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardAPI = async () => {
    await axios
      .get('/hrm/dashboard/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
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
        withCredentials: true,
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
        withCredentials: true,
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
        withCredentials: true,
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
        withCredentials: true,
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
              withCredentials: true,
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
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data
        setListStaffs(data)
        setLoading(false)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    fetchDashboardAPI()
    fetchProjectAPI()
    fetchStaffAPI()
    fetchDepartmentAPI()
    // fetchListStaffAPI()
    fetchCustomerAPI()
  }, [])
  return (
    <>
      <Loading loading={loading} />

      <CRow>
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
      <CRow>
        {liststaffs.map((item) => (
          <CCol key={item.id} md={4} xl={3}>
            <Card
              key={item.id}
              className="mb-3"
              hoverable={true}
              // style={{ width: 300 }}
              //   cover={
              //     <img
              //       alt="example"
              //       src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              //     />
              //   }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
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
                  item.position_data == 'Giám Đốc' ? <h6>Giám Đốc</h6> : item.position_data
                }
              />
            </Card>
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default WidgetsDropdown
