import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios'
import { TOKEN, BRANCH } from '../../constants/Config'
import openNotificationWithIcon from '../../utils/notification'
import API from '../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
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
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import Loading from '../../utils/loading'
import { Table, Space, Card, Avatar, Divider, Collapse, Input, Popover, Button } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
const { Column } = Table
const { Panel } = Collapse
const { Meta } = Card

const WidgetsDropdown = () => {
  const [data, setData] = useState({})
  const [dataProject, setDataProject] = useState([{}])
  const [dataStaff, setDataStaff] = useState([{}])
  const [dataCustomer, setDataCustomer] = useState([{}])
  const [dataDepartment, setDataDepartment] = useState([{}])
  const [kindWork, setkindWork] = useState([{}])
  const [dataID, setDataID] = useState('')
  const [dataName, setDataName] = useState('')
  const [liststaffs, setListStaffs] = useState([])
  const [timeKeeping, setTimeKeeping] = useState([])
  // const [listprojects, setListProjects] = useState([])
  const [liststafftimekeeping, setListStaffTimeKeeping] = useState([])
  const [loading, setLoading] = useState(true)
  const [inputList, setinputList] = useState([
    {
      date: new Date().toISOString().slice(0, 10),
      amount_in_project: 1,
      amount_time: 0,
      type: 1,
      type_work: '',
      staff_project: '',
    },
  ])
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

  const fetchTimeKeepingAPI = async () => {
    await axios
      .get('/hrm/timekeeping/?no_pagination=true&date=' + new Date().toISOString().slice(0, 10), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data
        setTimeKeeping(data)
      })
      .catch((error) => console.log(error))
  }

  const fetchStaffTimeKeepingAPI = async () => {
    await axios
      .get('/hrm/staff-project/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data
        setListStaffTimeKeeping(data)
        const list_data = []

        data.map((item) => {
          list_data.push({
            date: new Date().toISOString().slice(0, 10),
            amount_in_project: 1,
            amount_time: 0,
            type: 1,
            type_work: '',
            staff_project: item.id,
          })
        })
        setinputList(list_data)
      })
      .catch((error) => console.log(error))
  }

  const fetchKindWorkAPI = async () => {
    await axios
      .get('/hrm/kinds-of-work/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data
        setkindWork(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleinputchange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    if (list[index]) {
      list[index][name] = value
    } else {
      list[index] = {
        [name]: value,
      }
    }
    // list[index][name] = value
    setinputList(list)
    console.log(list)
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

  const onSubmit = (event) => {
    event.preventDefault()
    inputList.map((item) =>
      API({
        REGISTER_URL: '/hrm/timekeeping/',
        ACTION: 'POST',
        DATA: {
          amount_in_project: item.amount_in_project,
          amount_time: item.amount_time,
          note: item.note,
          date: new Date().toISOString().slice(0, 10),
          type: item.type,
          type_work: item.type_work,
          staff_project: item.staff_project,
        },
      })
        .then((res) => {
          localStorage.setItem('timekeeping', new Date().toISOString().slice(0, 10))
          openNotificationWithIcon({
            type: 'success',
            message: 'Chấm công thành công!!!',
            description: '',
            placement: 'topRight',
          })
          fetchTimeKeepingAPI()
        })
        .catch((error) => {
          if (error.response.status === 400) {
            openNotificationWithIcon({
              type: 'error',
              message: 'Chấm công không thành công!!!',
              description: error.response.data.message,
              placement: 'topRight',
            })
          } else {
            openNotificationWithIcon({
              type: 'error',
              message: 'Chấm công không thành công!!!',
              description: error,
              placement: 'topRight',
            })
          }
        }),
    )
  }

  const handleSearch = async (event) => {
    let value = event.target.value
    const REGISTER_URL = '/hrm/staff-project/?no_pagination=true&search=' + value
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    })
    setListStaffTimeKeeping(res.data)
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

  const handleSearchListTimeKeeping = async (event) => {
    let value = event.target.value
    const REGISTER_URL =
      '/hrm/timekeeping/?no_pagination=true&date=' +
      new Date().toISOString().slice(0, 10) +
      '&search=' +
      value
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    })
    setTimeKeeping(res.data)
  }

  useEffect(() => {
    fetchDashboardAPI()
    fetchProjectAPI()
    fetchStaffAPI()
    fetchDepartmentAPI()
    fetchCustomerAPI()
    fetchKindWorkAPI()
    fetchStaffTimeKeepingAPI()
    fetchTimeKeepingAPI()
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
            Chấm Công Nhân Viên Hằng Ngày
          </h4>
        </CCol>
      </CRow>
      <Divider />
      <CRow className="mb-5">
        <CCol>
          <CCard className="mb-3">
            <CForm className="mb-3" onSubmit={onSubmit}>
              <Collapse
                bordered={true}
                className="mb-3"
                collapsible={
                  localStorage.getItem('timekeeping') === new Date().toISOString().slice(0, 10)
                    ? 'disabled'
                    : ''
                }
              >
                <Panel
                  header={
                    <>
                      <Space>
                        <h5 className="mt-2">Chấm Công</h5>
                        {localStorage.getItem('timekeeping') ===
                        new Date().toISOString().slice(0, 10) ? (
                          <CPopover
                            title="Chấm công thành công"
                            content={
                              <>
                                <p>
                                  - Mỗi ngày có 1 lần chấm công nếu hoàn thành chấm công thì khoá
                                  bảng chấm công{' '}
                                </p>
                                <p>
                                  - Nếu có sai xót và chỉnh sửa thì vào chi tiết nhân viên để sửa{' '}
                                </p>
                              </>
                            }
                            placement="top"
                          >
                            <CButton color="light" size="sm">
                              <QuestionCircleOutlined />
                            </CButton>
                          </CPopover>
                        ) : (
                          ''
                        )}
                      </Space>
                    </>
                  }
                >
                  <CContainer>
                    <CRow>
                      <CCol md={6}>
                        <Input.Search
                          placeholder="Tìm kiếm họ tên và tên dự án"
                          onChange={(event) => handleSearch(event)}
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                  </CContainer>
                  {liststafftimekeeping.map((item, index) => (
                    <>
                      <h6>{item.staff_name}</h6>
                      <CContainer>
                        <CRow className="mb-3">
                          <CCol>
                            <CFormLabel htmlFor="exampleFormControlInput1">
                              Số Lượng Công Việc Dự Án
                            </CFormLabel>
                            <CFormInput
                              type="number"
                              placeholder="1.0"
                              autoComplete="amount_in_project"
                              name="amount_in_project"
                              onChange={(e) => handleinputchange(e, index)}
                              aria-describedby="exampleFormControlInputHelpInline"
                              className="mb-3"
                            />
                            <CFormText component="span" id="exampleFormControlInputHelpInline">
                              <Space>
                                Số lượng mặc định công của ngày là 1.0
                                <CPopover
                                  title="Tính Số Lượng Công Trong ngày"
                                  content={
                                    <>
                                      <p>
                                        - Khi hoàn thành xong công việc trong 1 ngày và không có gì
                                        phát sinh thì số lượng là 1
                                      </p>
                                      <p>
                                        - Khi chưa hoàn thành công việc trong 1 ngày hoặc xin nghỉ
                                        nữa ngày vì lí riêng thì số lượng là 0.5
                                      </p>
                                      <p>
                                        - Khi xin nghỉ có phép thì mặc định 1.0 không phép nhập 0.0
                                      </p>
                                    </>
                                  }
                                  placement="top"
                                >
                                  <CButton color="light" size="sm">
                                    <QuestionCircleOutlined />
                                  </CButton>
                                </CPopover>
                              </Space>
                            </CFormText>
                          </CCol>
                          <CCol>
                            <CFormLabel htmlFor="exampleFormControlInput1">
                              Số Lượng Làm Thêm
                            </CFormLabel>
                            <CFormInput
                              type="number"
                              placeholder="0"
                              autoComplete="amount_time"
                              name="amount_time"
                              className="mb-3"
                              onChange={(e) => handleinputchange(e, index)}
                              aria-describedby="exampleFormControlInputHelpInline"
                            />
                            <CFormText component="span" id="exampleFormControlInputHelpInline">
                              <Space>
                                Số giờ làm thêm mặc định là 0 nếu không nhập
                                <CPopover
                                  title="Số Giờ Làm Thêm Trong Ngày"
                                  content={
                                    <>
                                      <p>- Làm thêm ngoài giờ hành chính (x1.5)</p>
                                      <p>- Làm thêm ngày cuối tuần (x2.0)</p>
                                      <p>- Làm thêm ngày lễ tết (x3.0)</p>
                                    </>
                                  }
                                  placement="top"
                                >
                                  <CButton color="light" size="sm">
                                    <QuestionCircleOutlined />
                                  </CButton>
                                </CPopover>
                              </Space>
                            </CFormText>
                          </CCol>
                          <CCol>
                            <CFormLabel htmlFor="exampleFormControlInput1">
                              Loại Giờ Làm Thêm
                            </CFormLabel>
                            <CFormSelect
                              name="type"
                              aria-label="Vui lòng chọn loại giờ làm thêm"
                              className="mb-3"
                              onChange={(e) => handleinputchange(e, index)}
                            >
                              <option key="0" value={1}>
                                Giờ Hành Chính
                              </option>
                              <option key="ADMININISTRATION" value={1}>
                                Giờ Hành Chính
                              </option>
                              <option key="OVERTIME" value={1.5}>
                                Ngoài Giờ Hành Chính
                              </option>
                              <option key="DAY_OFF" value={2.0}>
                                Ngày Nghỉ
                              </option>
                              <option key="HOLIDAY_VACATION" value={3.0}>
                                Ngày Lễ Tết
                              </option>
                            </CFormSelect>

                            <CFormText component="span" id="exampleFormControlInputHelpInline">
                              <Space>
                                Loại làm thêm (Mặc định là giờ hành chính nếu không có làm thêm
                                trong ngày)
                                <CPopover
                                  title="Loại Giờ Làm Thêm"
                                  content={
                                    <>
                                      <p>- Xem xét chọn loại giờ làm thêm của nhân viên</p>
                                    </>
                                  }
                                  placement="top"
                                >
                                  <CButton color="light" size="sm">
                                    <QuestionCircleOutlined />
                                  </CButton>
                                </CPopover>
                              </Space>
                            </CFormText>
                          </CCol>
                          {/* <CCol>
                            <CFormLabel htmlFor="exampleFormControlInput1">Loại Công</CFormLabel>
                            <CFormSelect
                              name="type_work"
                              aria-label="Vui lòng chọn loại công"
                              onChange={(e) => handleinputchange(e, index)}
                              className="mb-3"
                            >
                              {kindWork.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </CFormSelect>
                            <CFormText component="span" id="exampleFormControlInputHelpInline">
                              <Space>
                                Chọn loại công
                                <CPopover
                                  title="Loại công"
                                  content={
                                    <>
                                      <p>
                                        - Xem xét chọn loại công để nhân hệ số (Hiện tại chưa áp
                                        dụng hệ số này vào tính lương)
                                      </p>
                                    </>
                                  }
                                  placement="top"
                                >
                                  <CButton color="light" size="sm">
                                    <QuestionCircleOutlined />
                                  </CButton>
                                </CPopover>
                              </Space>
                            </CFormText>
                          </CCol> */}
                        </CRow>
                      </CContainer>
                    </>
                  ))}
                </Panel>
              </Collapse>
              <CContainer className="mb-3">
                <CRow>
                  <CCol>
                    <div className="d-grid">
                      <CButton
                        color="primary"
                        type="submit"
                        disabled={
                          localStorage.getItem('timekeeping') ===
                          new Date().toISOString().slice(0, 10)
                            ? true
                            : false
                        }
                      >
                        {localStorage.getItem('timekeeping') ===
                        new Date().toISOString().slice(0, 10)
                          ? 'ĐÃ CHẤM CÔNG'
                          : 'CHẤM CÔNG'}
                      </CButton>
                    </div>
                  </CCol>
                </CRow>
              </CContainer>
            </CForm>{' '}
          </CCard>
          {localStorage.getItem('timekeeping') === new Date().toISOString().slice(0, 10) ? (
            <CCard>
              <Collapse bordered={true} className="mb-3">
                <Panel header={<h5 className="mt-2">Bảng Chấm Công Hôm Nay</h5>}>
                  <CContainer>
                    <CRow>
                      <CCol md={6}>
                        <Input.Search
                          placeholder="Tìm kiếm họ tên nhân viên và tên dự án"
                          onChange={(event) => handleSearchListTimeKeeping(event)}
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                  </CContainer>
                  <Table dataSource={timeKeeping} bordered>
                    <Column title="Ngày Chấm Công" dataIndex="date" key="date" />
                    <Column
                      title="Số Lượng"
                      dataIndex="amount_in_project"
                      key="amount_in_project"
                    />
                    <Column
                      title="Số Lượng Giờ Làm Thêm"
                      dataIndex="amount_time"
                      key="amount_time"
                    />
                    <Column
                      title="Loại Giờ Làm Thêm"
                      dataIndex="type_time"
                      key="type_time"
                      filters={[
                        { text: 'Giờ Hành Chính', value: 'Giờ Hành Chính' },
                        { text: 'Làm Thêm Ngày Thường', value: 'Làm Thêm Ngày Thường' },
                        { text: 'Làm Thêm Ngày Cuối Tuần', value: 'Làm Thêm Ngày Cuối Tuần' },
                        { text: 'Làm Thêm Ngày Lễ Tết', value: 'Làm Thêm Ngày Lễ Tết' },
                      ]}
                      onFilter={(value, record) => record.type_time.startsWith(value)}
                      filterSearch={true}
                      width="20%"
                    />
                    <Column
                      title="Dự Án"
                      dataIndex="project_name"
                      key="project_name"
                      filters={liststafftimekeeping.project_name}
                      onFilter={(value, record) => record.project_name.startsWith(value)}
                      filterSearch={true}
                    />
                    <Column title="Mã Nhân Viên" dataIndex="staff_staff" key="staff_staff" />
                    <Column title="Nhân Viên" dataIndex="staff_name" key="staff_name" width="20%" />
                  </Table>
                </Panel>
              </Collapse>
            </CCard>
          ) : (
            ''
          )}
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
              // style={{ width: 300 }}
              //   cover={
              //     <img
              //       alt="example"
              //       src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              //     />
              //   }onClick={() => this.openStaffDetailModal(record)}
              actions={[
                <SettingOutlined key="setting" onClick={() => openSettingModal(item)} />,
                // <EditOutlined key="edit" aria-disabled={true} />,
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
                        title={'Họ Tên: ' + item.user.first_name + ' ' + item.user.last_name}
                        // description={item.user.first_name + ' ' + item.user.last_name}
                      />
                      <Divider />
                      <Meta title={'Email CTY: ' + item.email} />
                      <Meta title={'Email Cá Nhân: ' + item.personal_email} />
                      <Divider />
                      <Meta title={'Facebook: ' + item.facebook} />
                      <Divider />
                      <Meta title={'Link: ' + item.url} />
                      <Divider />
                      <Meta title={'SĐT: ' + item.user.phone} />
                    </Card>
                  }
                  title="Thông tin liên hệ"
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
        size="lg"
        scrollable={true}
      >
        <CModalHeader>
          <CModalTitle>CHỨC NĂNG</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <h3 style={{ textTransform: 'uppercase', textAlign: 'center' }}>
              Mã nhân viên: {ListStaffModal.staff}
            </h3>
            {/* <h2 style={{ textTransform: 'uppercase' }}>{this.state.name}</h2> */}

            <CTooltip content="Thông Tin Khẩn Cấp" placement="top">
              <Link to="/staff/contact" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Thông Tin Khẩn Cấp
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Bằng Cấp" placement="top">
              <Link to="/staff/degree" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Bằng Cấp
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Chứng Chỉ" placement="top">
              <Link to="/staff/certificate" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */} Chứng Chỉ
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Kỹ Năng" placement="top">
              <Link to="/staff/skill" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Kỹ Năng
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Công Tác" placement="top">
              <Link to="/staff/on-business" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */} Công Tác
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Chấm Công" placement="top">
              <Link to="/staff/timekeeping" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Chấm Công
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Phép Năm" placement="top">
              <Link to="/staff/day-off-year" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Phép Năm
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Tiền Lương" placement="top">
              <Link to="/staff/salary" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Tiền Lương
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Điều Chỉnh Lương" placement="top">
              <Link to="/staff/up-salary" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Điều Chỉnh Lương
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Hợp Đồng Lao Động" placement="top">
              <Link to="/staff/contract" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Hợp Đồng Lao Động
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Đào Tạo" placement="top">
              <Link to="/staff/trainning" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Đào Tạo
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Thăng Tiến" placement="top">
              <Link to="/staff/promotion" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Thăng Tiến
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Khen Thưởng" placement="top">
              <Link to="/staff/bonus" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Khen Thưởng
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Kỷ Luật" placement="top">
              <Link to="/staff/discipline" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Kỷ Luật
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CTooltip content="Sức Khoẻ" placement="top">
              <Link to="/staff/health" target="_blank">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    {/* <CIcon icon={cilInfo} /> */}Sức Khoẻ
                  </CButton>
                </div>{' '}
              </Link>
            </CTooltip>
            <CModalFooter>
              <CButton color="secondary" onClick={closeSettingModal}>
                ĐÓNG
              </CButton>
            </CModalFooter>
          </CForm>{' '}
        </CModalBody>
      </CModal>
    </>
  )
}

export default WidgetsDropdown
