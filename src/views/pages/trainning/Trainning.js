import React, { Component } from 'react'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Divider, Input } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
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
import { COMPANY, BRANCH } from '../../../constants/Config'

const { TextArea } = Input
const { Column } = Table
const staff_id = localStorage.getItem('staff')
const staff_name = localStorage.getItem('staff_name')

class Trainning extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trainning: [],
      branchs: [{}],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      loading: true,
      date_requirement: null,
      content: '',
      course_name: '',
      organizational_units: '',
      time_organizational: null,
      estimated_cost: 0,
      place: '',
      sign_by: '',
      unit_head: '',
      approved_by: '',
      unit: '',
      branch: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    API({
      REGISTER_URL: '/hrm/branchs/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const branchs = res.data
        this.setState({
          branchs: branchs,
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
    API({
      REGISTER_URL:
        '/hrm/trainning-requirement/?no_pagination=true&staff__id=' +
        staff_id +
        '&branch__id=' +
        BRANCH,
      ACTION: 'GET',
    })
      .then((res) => {
        const trainning = res.data
        this.setState({
          trainning: trainning,
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
  }
  UNSAFE_componentWillMount() {
    Modal.setAppElement('body')
  }
  openModal = (item) => {
    this.setState({
      modalIsOpen: true,
      id: item.id,
      date_requirement: item.date_requirement,
      content: item.content,
      course_name: item.course_name,
      organizational_units: item.organizational_units,
      time_organizational: item.time_organizational,
      estimated_cost: item.estimated_cost,
      place: item.place,
      sign_by: item.sign_by,
      unit_head: item.unit_head,
      approved_by: item.approved_by,
      unit: item.unit,
      branch: BRANCH,
    })
  }

  openDeleteModal = (item) => {
    this.setState({
      modalDeleteIsOpen: true,
      id: item.id,
      date_requirement: item.date_requirement,
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

    API({ REGISTER_URL: '/hrm/trainning-requirement/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          trainning: prevState.trainning.filter((el) => el.id !== this.state.id),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Xoá dữ liệu thành công!!!',
          description: '',
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
      date_requirement: this.state.date_requirement,
      content: this.state.content,
      course_name: this.state.course_name,
      organizational_units: this.state.organizational_units,
      time_organizational: this.state.time_organizational,
      estimated_cost: this.state.estimated_cost,
      place: this.state.place,
      sign_by: this.state.sign_by,
      unit_head: this.state.unit_head,
      approved_by: this.state.approved_by,
      unit: this.state.unit,
      branch: BRANCH,
    }
    API({
      REGISTER_URL: '/hrm/trainning-requirement/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        let key = this.state.id
        this.setState((prevState) => ({
          trainning: prevState.trainning.map((elm) =>
            elm.id === key
              ? {
                  ...elm,
                  date_requirement: this.state.date_requirement,
                  content: this.state.content,
                  course_name: this.state.course_name,
                  organizational_units: this.state.organizational_units,
                  time_organizational: this.state.time_organizational,
                  estimated_cost: this.state.estimated_cost,
                  place: this.state.place,
                  sign_by: this.state.sign_by,
                  unit_head: this.state.unit_head,
                  approved_by: this.state.approved_by,
                  unit: this.state.unit,
                  branch: BRANCH,
                }
              : elm,
          ),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Cập nhật dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeModal()
        setTimeout(function () {
          window.location.reload()
        }, 3000)
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
          this.closeModal()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: error,
            placement: 'topRight',
          })
          this.closeModal()
        }
      })
  }

  handleAddSubmit = (event) => {
    event.preventDefault()

    const newData = {
      date_requirement: this.state.date_requirement,
      content: this.state.content,
      course_name: this.state.course_name,
      organizational_units: this.state.organizational_units,
      time_organizational: this.state.time_organizational,
      estimated_cost: this.state.estimated_cost,
      place: this.state.place,
      sign_by: this.state.sign_by,
      unit_head: this.state.unit_head,
      approved_by: this.state.approved_by,
      unit: this.state.unit,
      branch: BRANCH,
    }
    API({
      REGISTER_URL: '/hrm/trainning-requirement/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        let trainning = this.state.trainning
        trainning = [newData, ...trainning]
        this.setState({ trainning: trainning })
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
        <h2>{staff_name} - Chương Trình Đào Tạo</h2>
        <CForm onSubmit={this.handleAddSubmit}>
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ngày Yêu Cầu</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Ngày Yêu Cầu"
                  autoComplete="date_requirement"
                  name="date_requirement"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Chọn Ngày Yêu Cầu
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Tên Khoá Học</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Tên Khoá Học"
                  autoComplete="course_name"
                  name="course_name"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập tên khoá học
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Nội Dung Chương Trình</CFormLabel>
                <TextArea
                  rows={8}
                  type="text"
                  placeholder="Loại Kỹ Năng"
                  autoComplete="content"
                  name="content"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />{' '}
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập nội dung chương trình
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Đơn Vị Tổ Chức</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Ngày Yêu Cầu"
                  autoComplete="organizational_units"
                  name="organizational_units"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Đơn vị tổ chức
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Thời Gian Tổ Chức</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Thời Gian Tổ Chức"
                  autoComplete="time_organizational"
                  name="time_organizational"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng chọn thời gian tổ chức
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Chi Phí Dự Kiến</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Chi Phí Dự Kiến"
                  autoComplete="estimated_cost"
                  name="estimated_cost"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập chi phí dự kiến
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Đơn Vị</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Đơn Vị"
                  autoComplete="unit"
                  name="unit"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập tên đơn vị
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Trưởng Đơn Vị</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Trưởng Đơn Vị"
                  autoComplete="unit_head"
                  name="unit_head"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập tên trưởng đơn vị
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Địa Điểm Tổ Chức</CFormLabel>
                <TextArea
                  rows={8}
                  type="text"
                  placeholder="Địa Điểm Tổ Chức"
                  autoComplete="place"
                  name="place"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />{' '}
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập địa điểm tổ chức
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              {/* <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Chi Nhánh</CFormLabel>
                <CFormSelect
                  value={this.state.branch}
                  name="branch"
                  aria-label="Vui lòng chọn chi nhánh"
                  onChange={this.handleInputChange}
                >
                  <option key="0" value="">
                    Chọn chi nhánh
                  </option>
                  {this.state.branchs.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Chọn chi nhánh
                </CFormText>
              </CCol> */}
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Phê Duyệt</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Phê Duyệt"
                  autoComplete="approved_by"
                  name="approved_by"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập tên người phê duyệt
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Người Đăng Ký</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Ngày Yêu Cầu"
                  autoComplete="sign_by"
                  name="sign_by"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập người đăng ký
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
        <Table dataSource={this.state.trainning} bordered>
          <Column title="Ngày Yêu Cầu" dataIndex="date_requirement" key="date_requirement" />
          <Column title="Tên Khoá Học" dataIndex="course_name" key="course_name" />
          <Column
            title="Đơn Vị Tổ Chức"
            dataIndex="organizational_units"
            key="organizational_units"
          />
          <Column
            title="Thời Gian Tổ Chức"
            dataIndex="time_organizational"
            key="time_organizational"
          />
          <Column
            title="Kinh Phí Dự Kiến"
            dataIndex="estimated_cost_data"
            key="estimated_cost_data"
          />
          <Column title="Phê Duyệt" dataIndex="approved_by" key="approved_by" />
          <Column title="Chi Nhánh" dataIndex="branch_name" key="branch_name" />
          <Column title="Trưởng Đơn Vị" dataIndex="unit" key="unit" />
          <Column
            title="Hành động"
            key={this.state.trainning}
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày Yêu Cầu</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày Yêu Cầu"
                      autoComplete="date_requirement"
                      name="date_requirement"
                      value={this.state.date_requirement}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Chọn Ngày Yêu Cầu
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Tên Khoá Học</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Tên Khoá Học"
                      autoComplete="course_name"
                      name="course_name"
                      value={this.state.course_name}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập tên khoá học
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Nội Dung Chương Trình
                    </CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      value={this.state.content}
                      placeholder="Loại Kỹ Năng"
                      autoComplete="content"
                      name="content"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập nội dung chương trình
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Đơn Vị Tổ Chức</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Ngày Yêu Cầu"
                      autoComplete="organizational_units"
                      value={this.state.organizational_units}
                      name="organizational_units"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Đơn vị tổ chức
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Thời Gian Tổ Chức</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Thời Gian Tổ Chức"
                      autoComplete="time_organizational"
                      name="time_organizational"
                      value={this.state.time_organizational}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng chọn thời gian tổ chức
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Chi Phí Dự Kiến</CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="Chi Phí Dự Kiến"
                      autoComplete="estimated_cost"
                      name="estimated_cost"
                      value={this.state.estimated_cost}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập chi phí dự kiến
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Đơn Vị</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Đơn Vị"
                      autoComplete="unit"
                      value={this.state.unit}
                      name="unit"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập tên đơn vị
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Trưởng Đơn Vị</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Trưởng Đơn Vị"
                      autoComplete="unit_head"
                      value={this.state.unit_head}
                      name="unit_head"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập tên trưởng đơn vị
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Địa Điểm Tổ Chức</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Địa Điểm Tổ Chức"
                      value={this.state.place}
                      autoComplete="place"
                      name="place"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập địa điểm tổ chức
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  {/* <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Chi Nhánh</CFormLabel>
                    <CFormSelect
                      value={this.state.branch}
                      name="branch"
                      aria-label="Vui lòng chọn chi nhánh"
                      onChange={this.handleInputChange}
                    >
                      <option key="0" value="">
                        Chọn chi nhánh
                      </option>
                      {this.state.branchs.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Chọn chi nhánh
                    </CFormText>
                  </CCol> */}
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Phê Duyệt</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Phê Duyệt"
                      autoComplete="approved_by"
                      name="approved_by"
                      value={this.state.approved_by}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập tên người phê duyệt
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Người Đăng Ký</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Ngày Yêu Cầu"
                      autoComplete="sign_by"
                      value={this.state.sign_by}
                      name="sign_by"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập người đăng ký
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
                Bạn có chắc chắn xoá {this.state.date_requirement}?
              </h2>
              <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder=""
                  autoComplete=""
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

export default Trainning
