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

const { Column } = Table
const staff_id = localStorage.getItem('staff')
const staff_name = localStorage.getItem('staff_name')

class Discipline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      discipline: [],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      loading: true,
      id: '',
      content: '',
      date: null,
      expire: null,
      attach: '',
      note: '',
      form_of_discipline: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    API({
      REGISTER_URL: '/hrm/discipline/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const discipline = res.data
        this.setState({
          discipline: discipline,
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
      content: item.content,
      date: item.date,
      expire: item.expire,
      attach: item.attach,
      note: item.note,
      form_of_discipline: item.form_of_discipline,
      staff: staff_id,
    })
  }

  openDeleteModal = (item) => {
    this.setState({
      modalDeleteIsOpen: true,
      id: item.id,
      form_of_discipline: item.form_of_discipline,
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

    API({ REGISTER_URL: '/hrm/discipline/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          discipline: prevState.discipline.filter((el) => el.id !== this.state.id),
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
      content: this.state.content,
      date: this.state.date,
      expire: this.state.expire,
      attach: this.state.attach,
      note: this.state.note,
      form_of_discipline: this.state.form_of_discipline,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/discipline/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/discipline/?no_pagination=true&staff__id=' + staff_id,
          ACTION: 'GET',
        })
          .then((res) => {
            const discipline = res.data
            this.setState({
              discipline: discipline,
              loading: false,
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
      content: this.state.content,
      date: this.state.date,
      expire: this.state.expire,
      attach: this.state.attach,
      note: this.state.note,
      form_of_discipline: this.state.form_of_discipline,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/discipline/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/discipline/?no_pagination=true&staff__id=' + staff_id,
          ACTION: 'GET',
        })
          .then((res) => {
            const discipline = res.data
            this.setState({
              discipline: discipline,
              loading: false,
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
        {' '}
        <Loading loading={this.state.loading} />
        <h2>{staff_name} - Kỷ Luật</h2>
        <CForm onSubmit={this.handleAddSubmit}>
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ngày Bị Kỷ Luật</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Ngày Bị Kỷ Luật"
                  autoComplete="date"
                  name="date"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ngày kỷ luật bắt buộc chọn
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Kỷ Luật Đến Ngày</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Kỷ Luật Đến Ngày"
                  autoComplete="expire"
                  name="expire"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ngày hết hạn kỷ luật bắt buộc chọn
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Hình Thức Kỷ Luật</CFormLabel>

                <CFormInput
                  type="text"
                  placeholder="Hình Thức Kỷ Luật"
                  autoComplete="form_of_discipline"
                  name="form_of_discipline"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Hình thức kỷ luật bắt buộc nhập
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Nội Dung</CFormLabel>
                <TextArea
                  rows={4}
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
                <CFormLabel htmlFor="exampleFormControlInput1">Đính Kèm</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Đính Kèm"
                  autoComplete="attach"
                  name="attach"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Đính kèm có thể nhập hoặc không
                </CFormText>
              </CCol>
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
        <Table dataSource={this.state.discipline} bordered>
          <Column title="Từ Ngày" dataIndex="date" key="date" />
          <Column title="Đến Ngày" dataIndex="expire" key="expire" />
          <Column
            title="Hình Thức Kỷ Luật"
            dataIndex="form_of_discipline"
            key="form_of_discipline"
          />
          <Column title="Nội Dung" dataIndex="content" key="content" />
          <Column title="Đính Kèm" dataIndex="attach" key="attach" />
          <Column title="Ghi Chú" dataIndex="note" key="note" />
          <Column
            title="Hành động"
            key={this.state.discipline}
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày Bị Kỷ Luật</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày Bị Kỷ Luật"
                      autoComplete="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày kỷ luật bắt buộc chọn
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Kỷ Luật Đến Ngày</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Kỷ Luật Đến Ngày"
                      autoComplete="expire"
                      name="expire"
                      value={this.state.expire}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày hết hạn kỷ luật bắt buộc chọn
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Hình Thức Kỷ Luật</CFormLabel>

                    <CFormInput
                      type="text"
                      placeholder="Hình Thức Kỷ Luật"
                      autoComplete="form_of_discipline"
                      name="form_of_discipline"
                      value={this.state.form_of_discipline}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Hình thức kỷ luật bắt buộc nhập
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nội Dung</CFormLabel>
                    <TextArea
                      rows={4}
                      type="text"
                      placeholder="Nội Dung"
                      autoComplete="content"
                      name="content"
                      value={this.state.content}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nội dung có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Đính Kèm</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Đính Kèm"
                      autoComplete="attach"
                      name="attach"
                      value={this.state.attach}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Đính kèm có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ghi Chú</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Ghi Chú"
                      autoComplete="note"
                      value={this.state.note}
                      name="note"
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
              <p>Bạn có chắc chắn xoá {this.state.form_of_discipline}?</p>
              <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="discipline_types"
                  autoComplete="discipline_types"
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

export default Discipline
