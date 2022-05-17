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
const { TextArea } = Input

const { Column } = Table
const staff_id = localStorage.getItem('staff')
const staff_name = localStorage.getItem('staff_name')

class Promotion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promotions: [],
      positions: [{}],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      loading: true,
      date: null,
      content: '',
      file: '',
      note: '',
      position: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    API({ REGISTER_URL: '/hrm/positions/?no_pagination=true', ACTION: 'GET' })
      .then((res) => {
        const positions = res.data
        this.setState({
          positions: positions,
        })
      })
      .catch((error) => console.log(error))
    this.setState({
      modalAddIsOpen: true,
      staff: staff_id,
    })
    API({
      REGISTER_URL: '/hrm/promotions/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const promotions = res.data
        this.setState({
          promotions: promotions,
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
      content: item.content,
      file: item.file,
      note: item.note,
      position: item.position_data,
      staff: staff_id,
    })
  }

  openDeleteModal = (item) => {
    this.setState({
      modalDeleteIsOpen: true,
      id: item.id,
      position_name: item.position_name,
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

    API({ REGISTER_URL: '/hrm/promotions/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          promotions: prevState.promotions.filter((el) => el.id !== this.state.id),
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
      content: this.state.content,
      file: this.state.file,
      note: this.state.note,
      position: this.state.position,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/promotions/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/promotions/?no_pagination=true&staff__id=' + staff_id,
          ACTION: 'GET',
        })
          .then((res) => {
            const promotions = res.data
            this.setState({
              promotions: promotions,
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
      content: this.state.content,
      file: this.state.file,
      note: this.state.note,
      position: this.state.position,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/promotions/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/promotions/?no_pagination=true&staff__id=' + staff_id,
          ACTION: 'GET',
        })
          .then((res) => {
            const promotions = res.data
            this.setState({
              promotions: promotions,
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
        <h2>{staff_name} - Thăng Tiến</h2>
        <CForm onSubmit={this.handleAddSubmit}>
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ngày Thăng Chức</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Ngày Thăng Chức"
                  autoComplete="date"
                  name="date"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ngày thăng chức bắt buộc chọn
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Chức Vụ</CFormLabel>

                <CFormSelect
                  name="position"
                  aria-label="Vui lòng chọn chức vụ"
                  onChange={this.handleInputChange}
                >
                  <option key="0" value="">
                    Chọn chức vụ
                  </option>
                  {this.state.positions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Chức vụ bắt buộc chọn
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">File</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="File"
                  autoComplete="file"
                  name="file"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  File có thể nhập hoặc không
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Nội Dung</CFormLabel>
                <TextArea
                  rows={8}
                  type="text"
                  placeholder="Nội Dung"
                  autoComplete="content"
                  name="content"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nội dung có thể nhập hoặc không
                </CFormText>
              </CCol>
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
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ghi chú có thể nhập hoặc không
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
        <Table dataSource={this.state.promotions} bordered>
          <Column title="Ngày Thăng Chức" dataIndex="date" key="date" />
          <Column title="Chức Vụ" dataIndex="position_name" key="position_name" />
          <Column title="Nội Dung" dataIndex="content" key="content" />
          <Column title="File" dataIndex="file" key="file" />
          <Column title="Ghi Chú" dataIndex="note" key="note" />
          <Column
            title="Hành động"
            key={this.state.promotions}
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày Thăng Chức</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày Thăng Chức"
                      autoComplete="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày thăng chức bắt buộc chọn
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Chức Vụ</CFormLabel>

                    <CFormSelect
                      name="position"
                      aria-label="Vui lòng chọn chức vụ"
                      value={this.state.position}
                      onChange={this.handleInputChange}
                    >
                      <option key="0" value="">
                        Chọn chức vụ
                      </option>
                      {this.state.positions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Chức vụ bắt buộc nhập
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">File</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="File"
                      autoComplete="file"
                      name="file"
                      value={this.state.file}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      File có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nội Dung</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Nội Dung"
                      autoComplete="content"
                      value={this.state.content}
                      name="content"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nội dung có thể nhập hoặc không
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
                      value={this.state.note}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ghi chú có thể nhập hoặc không
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
              <p>Bạn có chắc chắn xoá {this.state.position_name}?</p>
              <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="position_name"
                  autoComplete="position_name"
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
    )
  }
}

export default Promotion
