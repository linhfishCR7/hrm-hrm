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
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'C?? l???i x???y ra',
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
          message: 'Xo?? d??? li???u th??nh c??ng!!!',
          description: 'Xo?? d??? li???u th??nh c??ng!!!',
          placement: 'topRight',
        })
        this.closeDeleteModal()
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'Xo?? d??? li???u kh??ng th??nh c??ng!!!',
          description: error,
          placement: 'topRight',
        }),
      )
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
        this.closeModal()
        openNotificationWithIcon({
          type: 'success',
          message: 'C???p nh???t d??? li???u th??nh c??ng!!!',
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
            message: 'C???p nh???t d??? li???u kh??ng th??nh c??ng!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          this.closeModal()
          openNotificationWithIcon({
            type: 'error',
            message: 'C???p nh???t d??? li???u kh??ng th??nh c??ng!!!',
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
        let promotions = this.state.promotions
        promotions = [newData, ...promotions]
        this.setState({ promotions: promotions })
        openNotificationWithIcon({
          type: 'success',
          message: 'Th??m d??? li???u th??nh c??ng!!!',
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
            message: 'Th??m d??? li???u kh??ng th??nh c??ng!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Th??m d??? li???u kh??ng th??nh c??ng!!!',
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
        <h2>{staff_name} - Th??ng Ti???n</h2>
        <CForm onSubmit={this.handleAddSubmit}>
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ng??y Th??ng Ch???c</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Ng??y Th??ng Ch???c"
                  autoComplete="date"
                  name="date"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ng??y th??ng ch???c
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ch???c V???</CFormLabel>

                <CFormSelect
                  name="position"
                  aria-label="Vui l??ng ch???n ch???c v???"
                  onChange={this.handleInputChange}
                >
                  <option key="0" value="">
                    Ch???n ch???c v???
                  </option>
                  {this.state.positions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui l??ng ch???n ch???c v???!
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
                  Nh???p file n???u c??
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">N???i Dung</CFormLabel>
                <TextArea
                  rows={8}
                  type="text"
                  placeholder="N???i Dung"
                  autoComplete="content"
                  name="content"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p n???i dung
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ghi Ch??</CFormLabel>
                <TextArea
                  rows={8}
                  type="text"
                  placeholder="Ghi Ch??"
                  autoComplete="note"
                  name="note"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ghi ch?? n???u c??
                </CFormText>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CButton color="primary" type="submit">
                  L??U
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </CForm>{' '}
        <Divider />
        <Table dataSource={this.state.promotions} bordered>
          <Column title="Ng??y Th??ng Ch???c" dataIndex="date" key="date" />
          <Column title="Ch???c V???" dataIndex="position_name" key="position_name" />
          <Column title="N???i Dung" dataIndex="content" key="content" />
          <Column title="File" dataIndex="file" key="file" />
          <Column title="Ghi Ch??" dataIndex="note" key="note" />
          <Column
            title="H??nh ?????ng"
            key={this.state.promotions}
            render={(text, record) => (
              <Space size="middle">
                <CTooltip content="C???p Nh???t D??? Li???u" placement="top">
                  <CButton
                    color="warning"
                    style={{ marginRight: '10px' }}
                    onClick={() => this.openModal(record)}
                  >
                    <EditOutlined />
                  </CButton>
                </CTooltip>
                <CTooltip content="Xo?? D??? Li???u" placement="top">
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
            <CModalTitle>C???P NH???T</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ng??y Th??ng Ch???c</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ng??y Th??ng Ch???c"
                      autoComplete="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ng??y th??ng ch???c
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ch???c V???</CFormLabel>

                    <CFormSelect
                      name="position"
                      aria-label="Vui l??ng ch???n ch???c v???"
                      value={this.state.position}
                      onChange={this.handleInputChange}
                    >
                      <option key="0" value="">
                        Ch???n ch???c v???
                      </option>
                      {this.state.positions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui l??ng ch???n ch???c v???!
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
                      Nh???p file n???u c??
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">N???i Dung</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="N???i Dung"
                      autoComplete="content"
                      value={this.state.content}
                      name="content"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p n???i dung
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ghi Ch??</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Ghi Ch??"
                      autoComplete="note"
                      name="note"
                      value={this.state.note}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ghi ch?? n???u c??
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeModal}>
                  ????NG
                </CButton>
                <CButton color="primary" type="submit">
                  C???P NH???T
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Delete */}
        <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
          <CModalHeader>
            <CModalTitle>XO??</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {' '}
            <CForm onSubmit={this.handleDelete}>
              <h2 style={{ textTransform: 'uppercase' }}>
                B???n c?? ch???c ch???n xo?? {this.state.position_name}?
              </h2>
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
                  HU???
                </CButton>
                <CButton color="danger" type="submit">
                  ?????NG ??
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
