import React, { useEffect, useState } from 'react'
import axios from '../../../utils/axios'
import { TOKEN, BRANCH } from '../../../constants/Config'
import openNotificationWithIcon from '../../../utils/notification'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}

import {
  CRow,
  CCol,
  CButton,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormText,
  CCard,
  CFormSelect,
  CPopover,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Loading from '../../../utils/loading'
import { Table, Space, Card, Avatar, Divider, Collapse, Input, Popover, Button } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
const { Column } = Table
const { Panel } = Collapse

const TimeKeepingAllStaff = () => {
  const [dataStaff, setDataStaff] = useState([{}])
  const [kindWork, setkindWork] = useState([{}])
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

  const fetchTimeKeepingAPI = async () => {
    await axios
      .get('/hrm/timekeeping/?no_pagination=true&date=' + new Date().toISOString().slice(0, 10), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        const data = res.data
        setTimeKeeping(data)
        setLoading(false)
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
              description: '',
              placement: 'topRight',
            })
          } else {
            openNotificationWithIcon({
              type: 'error',
              message: 'Chấm công không thành công!!!',
              description: '',
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
    })
    setListStaffTimeKeeping(res.data)
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
    })
    setTimeKeeping(res.data)
  }

  useEffect(() => {
    fetchStaffAPI()
    fetchKindWorkAPI()
    fetchStaffTimeKeepingAPI()
    fetchTimeKeepingAPI()
  }, [])
  return (
    <>
      <Loading loading={loading} />

      <h2 className="mb-3">Chấm Công Nhân Viên Ngày : {new Date().toISOString().slice(0, 10)}</h2>
      {localStorage.getItem('timekeeping') === new Date().toISOString().slice(0, 10) ? (
        <CAlert color="success" className="mb-3">
          Đã hoàn thành chấm công ngày: {new Date().toISOString().slice(0, 10)}
        </CAlert>
      ) : (
        <CAlert color="warning" className="mb-3">
          Bạn chưa hoàn thành chấm công ngày: {new Date().toISOString().slice(0, 10)}. Vui lòng chấm
          công!
        </CAlert>
      )}
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
                        <h5 className="mt-2">Bảng Chấm Công</h5>
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
                              // step="0.1"
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
                        Chấm công
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
                <Panel header={<h5 className="mt-2">Danh Sách Nhân Viên Đã Được Chấm Công</h5>}>
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
                    <Column title="Nhân Viên" dataIndex="staff_name" width="30%" key="staff_name" />
                    <Column
                      title="Dự Án"
                      dataIndex="project_name"
                      key="project_name"
                      filters={liststafftimekeeping.project_name}
                      onFilter={(value, record) => record.project_name.startsWith(value)}
                      filterSearch={true}
                    />
                    <Column
                      title="Số Lượng (Ngày)"
                      dataIndex="amount_in_project"
                      key="amount_in_project"
                      width="10%"
                    />
                    <Column
                      title="Giờ Làm Thêm (Giờ)"
                      dataIndex="amount_time"
                      key="amount_time"
                      width="10%"
                    />
                    <Column
                      dataIndex="type_time"
                      title="Loại Giờ Làm Thêm"
                      key="type_time"
                      filters={[
                        { text: 'Giờ Hành Chính', value: 'Giờ Hành Chính' },
                        { text: 'Làm Thêm Ngày Thường', value: 'Làm Thêm Ngày Thường' },
                        { text: 'Làm Thêm Ngày Cuối Tuần', value: 'Làm Thêm Ngày Cuối Tuần' },
                        { text: 'Làm Thêm Ngày Lễ Tết', value: 'Làm Thêm Ngày Lễ Tết' },
                      ]}
                      onFilter={(value, record) => record.type_time.startsWith(value)}
                      filterSearch={true}
                      width="30%"
                    />
                  </Table>
                </Panel>
              </Collapse>
            </CCard>
          ) : (
            ''
          )}
        </CCol>
      </CRow>
    </>
  )
}

export default TimeKeepingAllStaff
