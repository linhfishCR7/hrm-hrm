import React, { Component } from 'react'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Divider, Input } from 'antd'
import { EditOutlined, DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons'
import Loading from '../../../utils/loading'

import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CButton,
  CRow,
  CCol,
  CTooltip,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CContainer,
  CFormLabel,
  CFormText,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCircle } from '@coreui/icons'
import Modal from 'react-modal'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import openNotificationWithIcon from '../../../utils/notification'
const { TextArea } = Input

const { Column, ColumnGroup } = Table
const staff_id = localStorage.getItem('staff')
const staff_name = localStorage.getItem('staff_name')

class TimeKeeping extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeKeeping: [],
      staffProject: [{}],
      kindWork: [{}],
      projectFilter: [{}],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      loading: true,
      date: new Date().toISOString().slice(0, 10),
      amount_in_project: 1,
      amount_time: 0,
      note: '',
      type_work: '',
      type: 1,
      staff_project: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }
  fetchStaffProjectFilterAPI = (event) => {
    API({
      REGISTER_URL: '/hrm/staff-project/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const projectss = res.data
        const data = []
        projectss.map((item) =>
          // this.setState({
          data.push({
            text: item.project_name,
            value: item.project_name,
          }),
        )
        this.setState({
          projectFilter: data,
        })
      })
      .catch((error) => console.log(error))
  }
  fetchStaffProjectAPI = (event) => {
    API({
      REGISTER_URL: '/hrm/staff-project/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const staffProject = res.data
        this.setState({
          staffProject: staffProject,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchKindWorkAPI = (event) => {
    API({
      REGISTER_URL: '/hrm/kinds-of-work/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const kindWork = res.data
        this.setState({
          kindWork: kindWork,
        })
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'Có lỗi xảy ra',
          description: error,
          placement: 'topRight',
        }),
      )
  }

  componentDidMount() {
    this.fetchStaffProjectAPI()
    this.fetchKindWorkAPI()
    this.fetchStaffProjectFilterAPI()
    API({
      REGISTER_URL: '/hrm/timekeeping/?no_pagination=true&staff_project__staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const timeKeeping = res.data
        this.setState({
          timeKeeping: timeKeeping,
          loading: false,
        })
      })
      .catch((error) => console.log(error))
  }
  UNSAFE_componentWillMount() {
    Modal.setAppElement('body')
  }
  openModal = (item) => {
    this.fetchStaffProjectAPI()
    this.fetchKindWorkAPI()
    this.setState({
      modalIsOpen: true,
      id: item.id,
      date: item.date,
      amount_in_project: item.amount_in_project,
      amount_time: item.amount_time,
      note: item.note,
      type_work: item.type_work_id,
      staff_project: item.project_id,
      type: item.type,
    })
  }

  openDeleteModal = (item) => {
    this.setState({
      modalDeleteIsOpen: true,
      id: item.id,
      name: item.name,
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    })
  }

  closeDeleteModal = () => {
    this.setState({
      modalDeleteIsOpen: false,
    })
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  handleDelete = (event) => {
    event.preventDefault()

    API({
      REGISTER_URL: '/hrm/timekeeping/' + this.state.id + '/',
      ACTION: 'DELETE',
    })
      .then((res) => {
        this.setState((prevState) => ({
          timeKeeping: prevState.timeKeeping.filter((el) => el.id !== this.state.id),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Xoá dữ liệu thành công!!!',
          description: 'Xoá dữ liệu thành công!!!',
          placement: 'topRight',
        })
        this.closeDeleteModal()
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'Xoá dữ liệu không thành công!!!',
          description: error,
          placement: 'topRight',
        }),
      )
  }

  handleEditSubmit = (event) => {
    event.preventDefault()

    const newUpdate = {
      date: this.state.date,
      amount_in_project: this.amount_in_project.amount,
      note: this.state.note,
      amount_time: this.state.amount_time,
      type_work: this.state.type_work,
      type: this.state.type,
      staff_project: this.state.staff_project,
    }
    API({
      REGISTER_URL: '/hrm/timekeeping/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/timekeeping/?no_pagination=true&staff__id=' + staff_id,
          ACTION: 'GET',
        })
          .then((res) => {
            const timeKeeping = res.data
            this.setState({
              timeKeeping: timeKeeping,
              loading: false,
            })
          })
          .catch((error) =>
            openNotificationWithIcon({
              type: 'error',
              message: 'Có lỗi xảy ra',
              description: error,
              placement: 'topRight',
            }),
          )
        this.closeModal()
        openNotificationWithIcon({
          type: 'success',
          message: 'Cập nhật dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.closeModal()
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          this.closeModal()
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: error,
            placement: 'topRight',
          })
        }
      })
  }

  handleAddSubmit = (event) => {
    event.preventDefault()

    const newData = {
      date: this.state.date,
      amount_in_project: this.state.amount_in_project,
      note: this.state.note,
      amount_time: this.state.amount_time,
      type: this.state.type,
      type_work: this.state.type_work,
      staff_project: this.state.staff_project,
    }
    API({
      REGISTER_URL: '/hrm/timekeeping/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        let timeKeeping = this.state.timeKeeping
        timeKeeping = [newData, ...timeKeeping]
        this.setState({ timeKeeping: timeKeeping })
        openNotificationWithIcon({
          type: 'success',
          message: 'Thêm dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        setTimeout(function () {
          window.location.reload()
        }, 3000)
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Thêm dữ liệu không thành công!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Thêm dữ liệu không thành công!!!',
            description: error,
            placement: 'topRight',
          })
        }
      })
  }
  render() {
    return (
      <>
        {' '}
        <Loading loading={this.state.loading} />
        <h2>{staff_name} - Đào Tạo</h2>
        <CForm onSubmit={this.handleAddSubmit}>
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ngày Chấm Công</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Ngày Chấm Công"
                  autoComplete="date"
                  name="date"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ngày chấm công mặc định là lấy ngay ngày hiện tại
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Số Lượng Công Việc Dự Án</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Số Lượng"
                  autoComplete="amount_in_project"
                  name="amount_in_project"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Số lượng mặc định là 1
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Dự Án</CFormLabel>
                <CFormSelect
                  name="staff_project"
                  aria-label="Vui lòng chọn dự án"
                  onChange={this.handleInputChange}
                >
                  <option key="0" value="">
                    Chọn dự án
                  </option>
                  {this.state.staffProject.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.project_name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng chọn dự án!
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Số Lượng Làm Thêm</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Số Lượng Làm Thêm"
                  autoComplete="amount_time"
                  name="amount_time"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập giờ làm thêm nếu có
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Loại Giờ Làm Thêm</CFormLabel>
                <CFormSelect
                  name="type"
                  aria-label="Vui lòng chọn loại giờ làm thêm"
                  onChange={this.handleInputChange}
                >
                  <option key="0">Chọn loại giờ làm thêm</option>
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
                  Loại làm thêm (Mặc định là giờ hành chính nếu không có làm thêm trong ngày)
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Loại Công</CFormLabel>
                <CFormSelect
                  name="type_work"
                  aria-label="Vui lòng chọn loại công"
                  onChange={this.handleInputChange}
                >
                  <option key="0" value="">
                    Chọn dự án
                  </option>
                  {this.state.kindWork.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng chọn loại công!
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ghi Chú</CFormLabel>
                <TextArea
                  rows={8}
                  type="text"
                  placeholder="Ghi Chú"
                  autoComplete="note"
                  name="note"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />{' '}
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập nếu có ghi chú
                </CFormText>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CButton color="primary" type="submit">
                  LƯU
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </CForm>{' '}
        <Divider />
        <Table dataSource={this.state.timeKeeping} bordered>
          <Column
            title="Tháng"
            dataIndex="month"
            key="month"
            filters={[
              { text: 'Tháng 1', value: '01' },
              { text: 'Tháng 2', value: '02' },
              { text: 'Tháng 3', value: '03' },
              { text: 'Tháng 4', value: '04' },
              { text: 'Tháng 5', value: '05' },
              { text: 'Tháng 6', value: '06' },
              { text: 'Tháng 7', value: '07' },
              { text: 'Tháng 8', value: '08' },
              { text: 'Tháng 9', value: '09' },
              { text: 'Tháng 10', value: '10' },
              { text: 'Tháng 11', value: '11' },
              { text: 'Tháng 12', value: '12' },
            ]}
            onFilter={(value, record) => record.month.startsWith(value)}
            filterSearch={true}
          />
          <Column
            title="Năm"
            dataIndex="year"
            key="year"
            filters={[
              { text: 'Năm 2009', value: '2009' },
              { text: 'Năm 2010', value: '2010' },
              { text: 'Năm 2011', value: '2011' },
              { text: 'Năm 2012', value: '2012' },
              { text: 'Năm 2013', value: '2013' },
              { text: 'Năm 2014', value: '2014' },
              { text: 'Năm 2015', value: '2015' },
              { text: 'Năm 2016', value: '2016' },
              { text: 'Năm 2017', value: '2017' },
              { text: 'Năm 2018', value: '2028' },
              { text: 'Năm 2019', value: '2029' },
              { text: 'Năm 2020', value: '2020' },
              { text: 'Năm 2021', value: '2021' },
              { text: 'Năm 2022', value: '2022' },
              { text: 'Năm 2023', value: '2023' },
              { text: 'Năm 2024', value: '2024' },
              { text: 'Năm 2025', value: '2025' },
              { text: 'Năm 2026', value: '2026' },
              { text: 'Năm 2027', value: '2027' },
              { text: 'Năm 2028', value: '2028' },
            ]}
            onFilter={(value, record) => record.year.startsWith(value)}
            filterSearch={true}
          />
          <Column title="Ngày Chấm Công" dataIndex="date" key="date" />
          <Column title="Số Lượng" dataIndex="amount_in_project" key="amount_in_project" />
          <Column title="Số Lượng Giờ Làm Thêm" dataIndex="amount_time" key="amount_time" />
          <Column title="Loại Công" dataIndex="type_work_name" key="type_work_name" />
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
            filters={this.state.projectFilter}
            onFilter={(value, record) => record.project_name.startsWith(value)}
            filterSearch={true}
          />
          <Column title="Ghi Chú" dataIndex="note" key="note" />
          <Column
            title="Hành động"
            key={this.state.timeKeeping}
            render={(text, record) => (
              <Space size="middle">
                <CTooltip content="Cập Nhật Dự Liệu" placement="top">
                  <CButton
                    color="warning"
                    style={{ marginRight: '10px' }}
                    onClick={() => this.openModal(record)}
                  >
                    <EditOutlined />
                  </CButton>
                </CTooltip>
                <CTooltip content="Xoá Dữ Liệu" placement="top">
                  <CButton color="danger" onClick={() => this.openDeleteModal(text)}>
                    <DeleteOutlined />
                  </CButton>
                </CTooltip>
              </Space>
            )}
          />
        </Table>
        {/* Update */}
        <CModal visible={this.state.modalIsOpen} onClose={this.closeModal} size="lg">
          <CModalHeader>
            <CModalTitle>CẬP NHẬT</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày Chấm Công</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày Chấm Công"
                      autoComplete="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày chấm công mặc định là lấy ngay ngày hiện tại
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Số Lượng Công Việc Dự Án
                    </CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="Số Lượng"
                      autoComplete="amount_in_project"
                      value={this.state.amount_in_project}
                      name="amount_in_project"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Số lượng mặc định là 1
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Dự Án</CFormLabel>
                    <CFormSelect
                      name="staff_project"
                      aria-label="Vui lòng chọn dự án"
                      onChange={this.handleInputChange}
                      value={this.state.staff_project}
                    >
                      <option key="0" value="">
                        Chọn dự án
                      </option>
                      {this.state.staffProject.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.project_name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng chọn dự án!
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Số Lượng Làm Thêm</CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="Số Lượng Làm Thêm"
                      value={this.state.amount_time}
                      autoComplete="amount_time"
                      name="amount_time"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập giờ làm thêm nếu có
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Loại Giờ Làm Thêm</CFormLabel>
                    <CFormSelect
                      name="type"
                      aria-label="Vui lòng chọn loại giờ làm thêm"
                      onChange={this.handleInputChange}
                      value={this.state.type}
                    >
                      <option key="0" value="">
                        Chọn loại giờ làm thêm
                      </option>
                      <option key="ADMININISTRATION" value="1">
                        Giờ Hành Chính
                      </option>
                      <option key="OVERTIME" value="1.5">
                        Ngoài Giờ Hành Chính
                      </option>
                      <option key="DAY_OFF" value="2.0">
                        Ngày Nghỉ
                      </option>
                      <option key="HOLIDAY_VACATION" value="3.0">
                        Ngày Lễ Tết
                      </option>
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Loại làm thêm (Mặc định là giờ hành chính nếu không có làm thêm trong ngày)
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Loại Công</CFormLabel>
                    <CFormSelect
                      name="type_work"
                      aria-label="Vui lòng chọn loại công"
                      onChange={this.handleInputChange}
                      value={this.state.type_work}
                    >
                      <option key="0" value="">
                        Chọn dự án
                      </option>
                      {this.state.kindWork.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng chọn loại công!
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ghi Chú</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Ghi Chú"
                      autoComplete="note"
                      value={this.state.note}
                      name="note"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập nếu có ghi chú
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeModal}>
                  ĐÓNG
                </CButton>
                <CButton color="primary" type="submit">
                  CẬP NHẬT
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Delete */}
        <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
          <CModalHeader>
            <CModalTitle>XOÁ</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {' '}
            <CForm onSubmit={this.handleDelete}>
              <h2 style={{ textTransform: 'uppercase' }}>
                Bạn có chắc chắn xoá {this.state.name}?
              </h2>
              <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="timeKeeping_types"
                  autoComplete="timeKeeping_types"
                  name="id"
                  value={this.state.id}
                  onChange={this.handleInputChange}
                  required
                />
              </CInputGroup>{' '}
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeDeleteModal}>
                  HUỶ
                </CButton>
                <CButton color="danger" type="submit">
                  ĐỒNG Ý
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
      </>
    )
  }
}

export default TimeKeeping
