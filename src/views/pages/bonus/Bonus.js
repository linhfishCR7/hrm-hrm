import React, { Component } from 'react'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Divider } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Loading from '../../../utils/loading'
import Page404Admin from '../page404/Page404Admin'

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

class Bonus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bonus: [],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      loading: true,
      id: '',
      amount_data: '',
      date: null,
      reason: '',
      note: '',
      status: true,
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('role') !== 'staff') {
      this.setState({
        status: false,
      })
    }
    API({
      REGISTER_URL: '/hrm/bonuses/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const bonus = res.data
        this.setState({
          bonus: bonus,
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
      amount_data: item.amount,
      date: item.date,
      reason: item.reason,
      note: item.note,
      staff: staff_id,
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

    API({ REGISTER_URL: '/hrm/bonuses/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          bonus: prevState.bonus.filter((el) => el.id !== this.state.id),
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
      amount: this.state.amount_data,
      date: this.state.date,
      reason: this.state.reason,
      note: this.state.note,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/bonuses/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/bonuses/?no_pagination=true&staff__id=' + staff_id,
          ACTION: 'GET',
        })
          .then((res) => {
            const bonus = res.data
            this.setState({
              bonus: bonus,
            })
          })
          .catch((error) =>
            openNotificationWithIcon({
              type: 'error',
              message: 'Có lỗi xảy ra',
              description: '',
              placement: 'topRight',
            }),
          )
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
      amount: this.state.amount_data,
      date: this.state.date,
      reason: this.state.reason,
      note: this.state.note,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/bonuses/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/bonuses/?no_pagination=true&staff__id=' + staff_id,
          ACTION: 'GET',
        })
          .then((res) => {
            const bonus = res.data
            this.setState({
              bonus: bonus,
            })
          })
          .catch((error) =>
            openNotificationWithIcon({
              type: 'error',
              message: 'Có lỗi xảy ra',
              description: '',
              placement: 'topRight',
            }),
          )
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
        {this.state.status ? (
          <>
            <Loading loading={this.state.loading} />
            <h2>{staff_name} - Khen Thưởng</h2>
            <CForm onSubmit={this.handleAddSubmit}>
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày Khen Thưởng</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày Khen Thưởng"
                      autoComplete="date"
                      name="date"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Chọn ngày khen thưởng
                    </CFormText>
                  </CCol>

                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Lí Do Khen Thưởng</CFormLabel>

                    <CFormInput
                      type="text"
                      placeholder="Lí Do Khen Thưởng"
                      autoComplete="reason"
                      name="reason"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập lí do khen thưởng
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ghi Chú</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Ghi Chú"
                      autoComplete="note"
                      name="note"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập Ghi Chú
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Số Lượng</CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="Số Lượng"
                      autoComplete="amount_data"
                      name="amount_data"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập số lượng
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CButton color="primary" type="submit">
                      Lưu
                    </CButton>
                  </CCol>
                </CRow>
              </CContainer>
            </CForm>{' '}
            <Divider />
            <Table dataSource={this.state.bonus} bordered>
              <Column title="Ngày Khen Thưởng" dataIndex="date" key="date" />
              <Column title="Lí Do" dataIndex="reason" key="reason" />
              <Column title="Ghi Chú" dataIndex="note" key="note" />
              <Column title="Số Lượng" dataIndex="amount_data" key="amount_data" />
              <Column
                title="Hành động"
                key={this.state.bonus}
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Ngày Khen Thưởng</CFormLabel>
                        <CFormInput
                          type="date"
                          placeholder="Ngày Khen Thưởng"
                          autoComplete="date"
                          name="date"
                          value={this.state.date}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Chọn ngày khen thưởng
                        </CFormText>
                      </CCol>

                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Lí Do Khen Thưởng
                        </CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Lí Do Khen Thưởng"
                          autoComplete="reason"
                          name="reason"
                          value={this.state.reason}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập lí do khen thưởng
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Ghi Chú</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Ghi Chú"
                          autoComplete="note"
                          name="note"
                          value={this.state.note}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập Ghi Chú
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Số Lượng</CFormLabel>
                        <CFormInput
                          type="number"
                          placeholder="Số Lượng"
                          autoComplete="amount_data"
                          name="amount_data"
                          onChange={this.handleInputChange}
                          value={this.state.amount_data}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập số lượng
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
                  <p>Bạn có chắc chắn xoá {this.state.date}?</p>
                  <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="bonus_types"
                      autoComplete="bonus_types"
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
          </>
        ) : (
          <Page404Admin />
        )}
      </>
    )
  }
}

export default Bonus
