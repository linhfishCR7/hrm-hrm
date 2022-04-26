import React, { Component } from 'react'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Divider } from 'antd'
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
import { cilCircle, cilCheck, cilXCircle, cilInfo } from '@coreui/icons'
import Modal from 'react-modal'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import openNotificationWithIcon from '../../../utils/notification'

const { Column } = Table
const staff_id = localStorage.getItem('staff')
const staff_name = localStorage.getItem('staff_name')

class DayOffYear extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dayOffYear: [],
      dayOffYearDetail: [],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      modalRefuseIsOpen: false,
      modalSettingIsOpen: false,

      id: '',
      loading: true,
      date: null,
      reason: '',
      contact: '',
      status: false,
      hand_over: '',
      approved_by: '',

      status_year_off: false,
      year_off_id: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    API({
      REGISTER_URL: '/hrm/day-off-years/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const dayOffYear = res.data
        this.setState({
          dayOffYear: dayOffYear,
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
      staff: staff_id,
    })
  }

  openRefuseModal = (item) => {
    this.setState({
      modalRefuseIsOpen: true,
      id: item.id,
      status: item.status,
      staff: staff_id,
    })
  }

  openModalDetail = (item) => {
    this.setState({
      modalIsOpen: true,
      id: item.day_off_years_id,
      staff: staff_id,
    })
  }

  openRefuseModalDetail = (item) => {
    this.setState({
      modalRefuseIsOpen: true,
      id: item.day_off_years_id,
      status: item.day_off_years_status,
      staff: staff_id,
    })
  }

  openDeleteModal = (item) => {
    this.setState({
      modalDeleteIsOpen: true,
      id: item.id,
      name: item.name,
    })
  }
  openSettingModal = (item) => {
    API({
      REGISTER_URL: '/user/day-off-year-details/?no_pagination=true&day_off_years__id=' + item.id,
      ACTION: 'GET',
    })
      .then((res) => {
        const dayOffYearDetail = res.data
        this.setState({
          dayOffYearDetail: dayOffYearDetail,
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
    this.setState({
      status_year_off: item.status,
      year_off_id: item.id,
      modalSettingIsOpen: true,
    })
  }
  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    })
  }
  closeRefuseModal = () => {
    this.setState({
      modalRefuseIsOpen: false,
    })
  }

  closeDeleteModal = () => {
    this.setState({
      modalDeleteIsOpen: false,
    })
  }

  closeSettingModal = () => {
    this.setState({
      modalSettingIsOpen: false,
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

    API({ REGISTER_URL: '/hrm/day-off-years/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          dayOffYear: prevState.dayOffYear.filter((el) => el.id !== this.state.id),
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

  handleEditAcceptSubmit = (event) => {
    event.preventDefault()

    const newUpdate = {
      status: true,
    }
    API({
      REGISTER_URL: '/hrm/day-off-years/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        let key = this.state.id
        this.setState((prevState) => ({
          dayOffYear: prevState.dayOffYear.map((elm) =>
            elm.id === key
              ? {
                  ...elm,
                  status_text: 'Đã Phê Duyệt',
                }
              : elm,
          ),
        }))
        this.closeModal()
        openNotificationWithIcon({
          type: 'success',
          message: 'Chấp nhận đơn xin nghỉ phép thành công!!!!',
          description: '',
          placement: 'topRight',
        })
        setTimeout(function () {
          window.location.reload()
        }, 3000)
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.closeModal()
          openNotificationWithIcon({
            type: 'error',
            message: 'Chấp nhận đơn xin nghỉ phép không thành công!!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          this.closeModal()
          openNotificationWithIcon({
            type: 'error',
            message: 'Chấp nhận đơn xin nghỉ phép không thành công!!!!',
            description: error,
            placement: 'topRight',
          })
        }
      })
  }

  handleEditRefuseSubmit = (event) => {
    event.preventDefault()

    const newUpdate = {
      status: false,
    }
    API({
      REGISTER_URL: '/hrm/day-off-years/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        let key = this.state.id
        this.setState((prevState) => ({
          dayOffYear: prevState.dayOffYear.map((elm) =>
            elm.id === key
              ? {
                  ...elm,
                  status_text: 'Chờ Phê Duyệt',
                }
              : elm,
          ),
        }))
        this.closeRefuseModal()
        openNotificationWithIcon({
          type: 'success',
          message: 'Từ chối đơn xin nghỉ phép thành công!!!!',
          description: '',
          placement: 'topRight',
        })
        setTimeout(function () {
          window.location.reload()
        }, 3000)
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.closeRefuseModal()
          openNotificationWithIcon({
            type: 'error',
            message: 'Từ chối đơn xin nghỉ phép không thành công!!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          this.closeRefuseModal()
          openNotificationWithIcon({
            type: 'error',
            message: 'Từ chối đơn xin nghỉ phép không thành công!!!!',
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
        <h2>{staff_name} - Kỹ Năng</h2>
        <Divider />
        <Table dataSource={this.state.dayOffYear} bordered>
          <Column title="Ngày Xin Nghỉ" dataIndex="date" key="date" />
          <Column title="Lý Do" dataIndex="reason" key="reason" />
          <Column title="Người Liên Hệ" dataIndex="contact" key="contact" />
          <Column title="Người Đảm Nhiệm" dataIndex="hand_over" key="hand_over" />
          <Column title="Xác Nhận" dataIndex="approved_by_name" key="approved_by_name" />
          <Column title="Trạng Thái" dataIndex="status_text" key="status_text" />
          <Column
            title="Hành động"
            // key={this.state.dayOffYear}
            render={(text, record) => (
              <Space size="middle">
                {record.status ? (
                  <CTooltip content="Từ chối đơn xin nghỉ" placement="top">
                    <CButton
                      color="warning"
                      style={{ marginRight: '10px' }}
                      onClick={() => this.openRefuseModal(record)}
                    >
                      <CIcon icon={cilXCircle} />
                    </CButton>
                  </CTooltip>
                ) : (
                  <CTooltip content="Chấp nhận đơn xin nghỉ" placement="top">
                    <CButton
                      color="secondary"
                      style={{ marginRight: '10px' }}
                      onClick={() => this.openModal(record)}
                    >
                      <CIcon icon={cilCheck} />
                    </CButton>
                  </CTooltip>
                )}
                <CTooltip content="Xoá Dữ Liệu" placement="top">
                  <CButton color="danger" onClick={() => this.openDeleteModal(text)}>
                    <DeleteOutlined />
                  </CButton>
                </CTooltip>
                <CTooltip content="Chi Tiết" placement="top">
                  <CButton color="info" onClick={() => this.openSettingModal(text)}>
                    {/* <CIcon icon={cilDelete} /> */}
                    <CIcon icon={cilInfo} />
                  </CButton>
                </CTooltip>
              </Space>
            )}
          />
        </Table>
        {/* Accept */}
        <CModal visible={this.state.modalIsOpen} onClose={this.closeModal}>
          <CModalHeader>
            <CModalTitle>XÁC NHẬN</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditAcceptSubmit}>
              <h2 style={{ textTransform: 'uppercase' }}>
                Bạn có chắc chắn chấp nhận đơn xin nghỉ?
              </h2>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeModal}>
                  ĐÓNG
                </CButton>
                <CButton color="primary" type="submit">
                  CHẤP NHẬN
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Refuse */}
        <CModal visible={this.state.modalRefuseIsOpen} onClose={this.closeRefuseModal}>
          <CModalHeader>
            <CModalTitle>TỪ CHỐI</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditRefuseSubmit}>
              <h2 style={{ textTransform: 'uppercase' }}>Bạn có chắc chắn từ chối đơn xin nghỉ?</h2>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeRefuseModal}>
                  ĐÓNG
                </CButton>
                <CButton color="warning" type="submit">
                  ĐỒNG Ý
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
        {/* Detail */}
        <CModal visible={this.state.modalSettingIsOpen} onClose={this.closeSettingModal} size="lg">
          <CModalHeader>
            <CModalTitle>CHI TIẾT NGÀY PHÉP</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <>
              <Table dataSource={this.state.dayOffYearDetail} bordered>
                <Column title="Từ Ngày" dataIndex="from_date" key="from_date" />
                <Column title="Đến Ngày" dataIndex="to_date" key="to_date" />
                <Column title="Số Lượng" dataIndex="amount" key="amount" />
                <Column title="Ghi Chú" dataIndex="note" key="note" />
                <Column
                  title="Loại Ngày Nghỉ"
                  dataIndex="day_off_years_name"
                  key="day_off_years_name"
                />
                <Column title="Họ Tên" dataIndex="full_name" key="full_name" />
                <Column
                  title="Hành động"
                  // key={this.state.dayOffYear}
                  render={(text, record) => (
                    <Space size="middle">
                      {this.state.status_year_off ? (
                        <CTooltip content="Từ chối đơn xin nghỉ" placement="top">
                          <CButton
                            color="warning"
                            style={{ marginRight: '10px' }}
                            onClick={() => this.openRefuseModalDetail(record)}
                          >
                            <CIcon icon={cilXCircle} />
                          </CButton>
                        </CTooltip>
                      ) : (
                        <CTooltip content="Chấp nhận đơn xin nghỉ" placement="top">
                          <CButton
                            color="secondary"
                            style={{ marginRight: '10px' }}
                            onClick={() => this.openModalDetail(record)}
                          >
                            <CIcon icon={cilCheck} />
                          </CButton>
                        </CTooltip>
                      )}
                    </Space>
                  )}
                />
              </Table>
            </>

            <CModalFooter>
              <CButton color="secondary" onClick={this.closeSettingModal}>
                ĐÓNG
              </CButton>
            </CModalFooter>
          </CModalBody>
        </CModal>
      </>
    )
  }
}

export default DayOffYear