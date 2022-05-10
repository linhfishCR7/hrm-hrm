import React, { Component } from 'react'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Divider, Card } from 'antd'
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

const { Column } = Table
const staff_id = localStorage.getItem('staff')
const staff_name = localStorage.getItem('staff_name')

class UpSalary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      upSalary: [],
      upSalaryBefore: [],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      modalCheckIsOpen: false,
      id: '',
      date: '',
      loading: true,
      old_coefficient: 0,
      coefficient: 0,
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    API({
      REGISTER_URL: '/hrm/up-salary/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const upSalary = res.data
        this.setState({
          upSalary: upSalary,
          loading: false,
        })
      })
      .catch((error) => {
        openNotificationWithIcon({
          type: 'error',
          message: 'Có lỗi xảy ra',
          description: '',
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
      date: item.date,
      old_coefficient: item.old_coefficient,
      coefficient: item.coefficient,
      staff: staff_id,
    })
  }

  openCheckModal = (item) => {
    API({
      REGISTER_URL: '/hrm/up-salary/?page_size=1&staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const upSalaryBefore = res.data.results
        this.setState({
          upSalaryBefore: upSalaryBefore,
        })
      })
      .catch((error) => {
        openNotificationWithIcon({
          type: 'error',
          message: 'Có lỗi xảy ra',
          description: '',
          placement: 'topRight',
        })
      })
    this.setState({
      modalCheckIsOpen: true,
    })
  }

  openDeleteModal = (item) => {
    this.setState({
      modalDeleteIsOpen: true,
      id: item.id,
      date: item.date,
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    })
  }

  closeCheckModal = () => {
    this.setState({
      modalCheckIsOpen: false,
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

    API({ REGISTER_URL: '/hrm/up-salary/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          upSalary: prevState.upSalary.filter((el) => el.id !== this.state.id),
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
            description: '',
            placement: 'topRight',
          })
          this.closeDeleteModal()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Xoá dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          this.closeDeleteModal()
        }
      })
  }

  handleEditSubmit = (event) => {
    event.preventDefault()

    const newUpdate = {
      date: this.state.date,
      old_coefficient: this.state.old_coefficient,
      coefficient: this.state.coefficient,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/up-salary/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/up-salary/?no_pagination=true&staff__id=' + staff_id,
          ACTION: 'GET',
        })
          .then((res) => {
            const upSalary = res.data
            this.setState({
              upSalary: upSalary,
              loading: false,
            })
          })
          .catch((error) => {
            openNotificationWithIcon({
              type: 'error',
              message: 'Có lỗi xảy ra',
              description: '',
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
            description: '',
            placement: 'topRight',
          })
          this.closeModal()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          this.closeModal()
        }
      })
  }

  handleAddSubmit = (event) => {
    event.preventDefault()

    const newData = {
      date: this.state.date,
      old_coefficient: this.state.old_coefficient,
      coefficient: this.state.coefficient,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/up-salary/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/up-salary/?no_pagination=true&staff__id=' + staff_id,
          ACTION: 'GET',
        })
          .then((res) => {
            const upSalary = res.data
            this.setState({
              upSalary: upSalary,
              loading: false,
            })
          })
          .catch((error) => {
            openNotificationWithIcon({
              type: 'error',
              message: 'Có lỗi xảy ra',
              description: '',
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
            description: '',
            placement: 'topRight',
          })
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Thêm dữ liệu không thành công!!!',
            description: '',
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
        <h2>{staff_name} - Xét Tăng Lương</h2>
        <CForm onSubmit={this.handleAddSubmit}>
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ngày Xét Tăng Lương</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Ngày Xét Tăng Lương"
                  autoComplete="date"
                  name="date"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng chọn ngày xét tăng lương
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Hệ Số Hiện Tại</CFormLabel>
                <CFormInput
                  type="number"
                  step="0.01"
                  placeholder="Hệ Số Hiện Tại"
                  autoComplete="old_coefficient"
                  name="old_coefficient"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập hệ số hiện tại
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Hệ Số Tăng</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Hệ Số Tăng"
                  step="0.01"
                  autoComplete="coefficient"
                  name="coefficient"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập hệ số tăng
                </CFormText>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <Space size="middle">
                  <CTooltip content="Lưu Dự Liệu" placement="top">
                    <CButton color="primary" type="submit">
                      LƯU
                    </CButton>
                  </CTooltip>
                  <CTooltip content="Kiểm tra Dữ Liệu" placement="top">
                    <CButton color="info" onClick={() => this.openCheckModal()}>
                      HỆ SỐ LƯƠNG HIỆN TẠI
                    </CButton>
                  </CTooltip>
                </Space>
              </CCol>
            </CRow>
          </CContainer>
        </CForm>{' '}
        <Divider />
        <Table dataSource={this.state.upSalary} bordered>
          <Column title="Ngày Xét Tăng Lương" dataIndex="date" key="date" />
          <Column title="Hệ Số Cũ" dataIndex="old_coefficient" key="old_coefficient" />
          <Column title="Hệ Số Mới" dataIndex="coefficient" key="coefficient" />
          <Column
            title="Hành động"
            key={this.state.upSalary}
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
            <CModalTitle>Cập Nhật</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày Xét Tăng Lương</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày Xét Tăng Lương"
                      autoComplete="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng chọn ngày xét tăng lương
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Hệ Số Hiện Tại</CFormLabel>
                    <CFormInput
                      type="number"
                      step="0.01"
                      placeholder="Hệ Số Hiện Tại"
                      autoComplete="old_coefficient"
                      name="old_coefficient"
                      value={this.state.old_coefficient}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập hệ số hiện tại
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Hệ Số Tăng</CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="Hệ Số Tăng"
                      step="0.01"
                      autoComplete="coefficient"
                      name="coefficient"
                      onChange={this.handleInputChange}
                      required
                      value={this.state.coefficient}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập hệ số tăng
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeModal}>
                  Đóng
                </CButton>
                <CButton color="primary" type="submit">
                  Cập nhật
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Delete */}
        <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
          <CModalHeader>
            <CModalTitle>Xoá</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {' '}
            <CForm onSubmit={this.handleDelete}>
              <h2>Bạn có chắc chắn xoá {this.state.date}?</h2>
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
                  Huỷ
                </CButton>
                <CButton color="danger" type="submit">
                  Đồng ý
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Check */}
        <CModal visible={this.state.modalCheckIsOpen} onClose={this.closeCheckModal}>
          <CModalHeader>
            <CModalTitle>Kiểm tra hệ số lương hiện tại</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <Card>
              {this.state.upSalaryBefore.map((item) => (
                <>
                  {' '}
                  <h4>Ngày xét tăng lương: {item.date}</h4>
                  <h4>Hệ số hiện tại: {item.coefficient}</h4>
                </>
              ))}
            </Card>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={this.closeCheckModal}>
              Đóng
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    )
  }
}

export default UpSalary
