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

class OnBusiness extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onBusiness: [],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      loading: true,
      id: '',
      company: '',
      date: null,
      start_date: null,
      position: '',
      content: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    API({
      REGISTER_URL: '/hrm/on-business/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const onBusiness = res.data
        this.setState({
          onBusiness: onBusiness,
          loading: false,
        })
      })
      .catch((error) => {
        openNotificationWithIcon({
          type: 'error',
          message: 'Có lỗi xảy ra',
          description: error,
          placement: 'topRight',
        })
      })
  }
  UNSAFE_componentWillMount() {
    Modal.setAppElement('body')
  }
  openModal = (item) => {
    this.setState({
      modalIsOpen: true,
      id: item.id,
      company: item.company,
      date: item.date,
      start_date: item.start_date,
      position: item.position,
      content: item.content,
      staff: staff_id,
    })
  }

  openDeleteModal = (item) => {
    this.setState({
      modalDeleteIsOpen: true,
      id: item.id,
      start_date: item.start_date,
      date: item.date,
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

    API({ REGISTER_URL: '/hrm/on-business/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          onBusiness: prevState.onBusiness.filter((el) => el.id !== this.state.id),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Xoá dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeDeleteModal()
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Xoá dữ liệu không thành công!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
          this.closeDeleteModal()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Xoá dữ liệu không thành công!!!',
            description: error,
            placement: 'topRight',
          })
          this.closeDeleteModal()
        }
      })
  }

  handleEditSubmit = (event) => {
    event.preventDefault()

    const newUpdate = {
      company: this.state.company,
      date: this.state.date,
      start_date: this.state.start_date,
      position: this.state.position,
      content: this.state.content,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/on-business/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/on-business/?no_pagination=true&staff__id=' + staff_id,
          ACTION: 'GET',
        })
          .then((res) => {
            const onBusiness = res.data
            this.setState({
              onBusiness: onBusiness,
              loading: false,
            })
          })
          .catch((error) => {
            openNotificationWithIcon({
              type: 'error',
              message: 'Có lỗi xảy ra',
              description: error,
              placement: 'topRight',
            })
          })
        openNotificationWithIcon({
          type: 'success',
          message: 'Cập nhật dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeModal()
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
      company: this.state.company,
      date: this.state.date,
      start_date: this.state.start_date,
      position: this.state.position,
      content: this.state.content,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/on-business/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/on-business/?no_pagination=true&staff__id=' + staff_id,
          ACTION: 'GET',
        })
          .then((res) => {
            const onBusiness = res.data
            this.setState({
              onBusiness: onBusiness,
              loading: false,
            })
          })
          .catch((error) => {
            openNotificationWithIcon({
              type: 'error',
              message: 'Có lỗi xảy ra',
              description: error,
              placement: 'topRight',
            })
          })
        openNotificationWithIcon({
          type: 'success',
          message: 'Thêm dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
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
        <h2>{staff_name} - Công Tác</h2>
        <CForm onSubmit={this.handleAddSubmit}>
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ngày Bắt Đầu</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Ngày Bắt Đầu"
                  autoComplete="start_date"
                  name="start_date"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ngày bắt đầu đi công tác bắt buộc chọn
                </CFormText>
              </CCol>

              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ngày Kết Thúc</CFormLabel>

                <CFormInput
                  type="date"
                  placeholder="Ngày Kết Thúc"
                  autoComplete="date"
                  name="date"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ngày kết thúc chuyến công tác bắt buộc chọn
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Công Ty</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Công Ty"
                  autoComplete="company"
                  name="company"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Tên công ty bắc buộc nhập
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Vị Trí</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Vị Trí"
                  autoComplete="position"
                  name="position"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vị trí công tác có thể nhập hoặc không
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Nội Dung Công Việc</CFormLabel>
                <TextArea
                  rows={4}
                  type="text"
                  placeholder="Nội Dung Công Việc"
                  autoComplete="content"
                  name="content"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />{' '}
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nội dung công việc có thể nhập hoặc không
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
        <Table dataSource={this.state.onBusiness} bordered>
          <Column title="Từ Ngày" dataIndex="start_date" key="start_date" />
          <Column title="Đến Ngày" dataIndex="date" key="date" />
          <Column title="Công Ty" dataIndex="company" key="company" />
          <Column title="Vị Trí" dataIndex="position" key="position" />
          <Column title="Nội Dung" dataIndex="content" key="content" />
          <Column
            title="Hành động"
            key={this.state.onBusiness}
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày Bắt Đầu</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày Bắt Đầu"
                      autoComplete="start_date"
                      name="start_date"
                      value={this.state.start_date}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày bắt đầu đi công tác bắt buộc chọn
                    </CFormText>
                  </CCol>

                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày Kết Thúc</CFormLabel>

                    <CFormInput
                      type="date"
                      placeholder="Ngày Kết Thúc"
                      autoComplete="date"
                      name="date"
                      onChange={this.handleInputChange}
                      required
                      value={this.state.date}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày kết thúc chuyến công tác bắt buộc chọn
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Công Ty</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Công Ty"
                      autoComplete="company"
                      name="company"
                      onChange={this.handleInputChange}
                      required
                      value={this.state.company}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Tên công ty bắt buộc nhập
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Vị Trí</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Vị Trí"
                      autoComplete="position"
                      name="position"
                      value={this.state.position}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vị trí công tác có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nội Dung Công Việc</CFormLabel>
                    <TextArea
                      rows={4}
                      type="text"
                      placeholder="Nội Dung Công Việc"
                      autoComplete="content"
                      name="content"
                      value={this.state.content}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nội dung công việc có thể nhập hoặc không
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
              <h2>
                Bạn có chắc chắn xoá {this.state.start_date} đến {this.state.date}?
              </h2>
              <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="onBusiness_types"
                  autoComplete="onBusiness_types"
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

export default OnBusiness
