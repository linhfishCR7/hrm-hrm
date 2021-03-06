import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, message, Input } from 'antd'
import { TOKEN } from '../../../constants/Config'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCircle } from '@coreui/icons'
import Modal from 'react-modal'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import openNotificationWithIcon from '../../../utils/notification'

const { Column, ColumnGroup } = Table

class CertificateType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      certificateType: [],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      certificate_types: '',
      name: '',
      loading: true,
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    API({ REGISTER_URL: '/hrm/certificate-types/?no_pagination=true', ACTION: 'GET' })
      .then((res) => {
        const certificateType = res.data
        this.setState({
          certificateType: certificateType,
          loading: false,
        })
      })
      .catch((error) => console.log(error))
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  handleInsertSubmit = async (event) => {
    event.preventDefault()

    const newItem = {
      certificate_types: this.state.certificate_types,
      name: this.state.name,
    }
    API({ REGISTER_URL: '/hrm/certificate-types/', ACTION: 'POST', DATA: newItem })
      .then((res) => {
        let certificateType = this.state.certificateType
        certificateType = [newItem, ...certificateType]
        this.setState({ certificateType: certificateType })
        openNotificationWithIcon({
          type: 'success',
          message: 'Th??m d??? li???u th??nh c??ng!!!',
          description: 'S??? t??? ?????ng t???i l???i trang',
          placement: 'topRight',
        })
        setTimeout(function () {
          window.location.reload()
        }, 3000)
      })
      .catch(function (error) {
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
  UNSAFE_componentWillMount() {
    Modal.setAppElement('body')
  }

  openModal = (item) => {
    this.setState({
      modalIsOpen: true,
      id: item.id,
      certificate_types: item.certificate_types,
      name: item.name,
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
  handleEditSubmit = (event) => {
    event.preventDefault()

    const newUpdate = {
      //   id: this.state.id,
      certificate_types: this.state.certificate_types,
      name: this.state.name,
    }
    API({
      REGISTER_URL: '/hrm/certificate-types/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        let key = this.state.id
        this.setState((prevState) => ({
          certificateType: prevState.certificateType.map((elm) =>
            elm.id === key
              ? {
                  ...elm,
                  certificate_types: this.state.certificate_types,
                  name: this.state.name,
                }
              : elm,
          ),
        }))
        this.closeModal()
        openNotificationWithIcon({
          type: 'success',
          message: 'C???p nh???t d??? li???u th??nh c??ng!!!',
          description: 'C???p nh???t d??? li???u th??nh c??ng!!!',
          placement: 'topRight',
        })
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'C???p nh???t d??? li???u kh??ng th??nh c??ng!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'C???p nh???t d??? li???u kh??ng th??nh c??ng!!!',
            description: error,
            placement: 'topRight',
          })
        }
      })
  }

  handleDelete = (event) => {
    event.preventDefault()

    const Id = {
      id: this.state.id,
    }
    API({ REGISTER_URL: '/hrm/certificate-types/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          certificateType: prevState.certificateType.filter((el) => el.id !== this.state.id),
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
  handleSearch = (event) => {
    let value = event.target.value
    API({
      REGISTER_URL: '/hrm/certificate-types/?no_pagination=true&search=' + value,
      ACTION: 'GET',
    }).then((res) => {
      this.setState({ certificateType: res.data })
    })
  }
  render() {
    return (
      <>
        {' '}
        <Loading loading={this.state.loading} />
        <h2> Lo???i Ch???ng Ch???</h2>
        <CForm onSubmit={this.handleInsertSubmit}>
          <CRow>
            <CCol md={5}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="Lo???i ch???ng ch???"
                  autoComplete="certificate_types"
                  name="certificate_types"
                  onChange={this.handleInputChange}
                  required
                />
              </CInputGroup>{' '}
            </CCol>
            <CCol md={5}>
              <CInputGroup className="mb-4">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="T??n lo???i ch???ng ch???"
                  autoComplete="name"
                  name="name"
                  onChange={this.handleInputChange}
                  required
                />
              </CInputGroup>{' '}
            </CCol>
            <CCol md={2}>
              <CButton color="primary" type="submit">
                L??u
              </CButton>
            </CCol>
          </CRow>
        </CForm>{' '}
        <hr />
        <CRow>
          <CCol md={4}>
            <Input.Search
              placeholder="Search..."
              onChange={(event) => this.handleSearch(event)}
              className="mb-3"
            />
          </CCol>
        </CRow>
        <Table dataSource={this.state.certificateType} bordered scroll={{ y: 240 }}>
          <Column title="M??" dataIndex="certificate_types" key="certificate_types" />
          <Column title="T??n" dataIndex="name" key="name" />
          <Column
            title="H??nh ?????ng"
            key={this.state.certificateType}
            render={(text, record) => (
              <Space size="middle">
                <CTooltip content="Edit data" placement="top">
                  <CButton
                    color="warning"
                    style={{ marginRight: '10px' }}
                    // key={record.id}
                    onClick={() => this.openModal(record)}
                  >
                    <EditOutlined />
                  </CButton>
                </CTooltip>
                <CTooltip content="Remove data" placement="top">
                  <CButton color="danger" onClick={() => this.openDeleteModal(text)}>
                    {/* <CIcon icon={cilDelete} /> */}
                    <DeleteOutlined />
                  </CButton>
                </CTooltip>
              </Space>
            )}
          />
        </Table>
        <CModal visible={this.state.modalIsOpen} onClose={this.closeModal}>
          <CModalHeader>
            <CModalTitle>UPDATE</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              <CInputGroup className="mb-3 mt-3">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="Lo???i ch???ng ch???"
                  autoComplete="certificate_types"
                  name="certificate_types"
                  value={this.state.certificate_types}
                  onChange={this.handleInputChange}
                  required
                />
              </CInputGroup>{' '}
              <CInputGroup className="mb-4">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="T??n lo???i ch???ng ch???"
                  autoComplete="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
              </CInputGroup>{' '}
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeModal}>
                  Close
                </CButton>
                <CButton color="primary" type="submit">
                  Save changes
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
          <CModalHeader>
            <CModalTitle>DELETE</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleDelete}>
              <h2 style={{ textTransform: 'uppercase' }}>
                B???n c?? ch???c ch???n xo?? {this.state.name}?
              </h2>
              <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="certificate_types"
                  autoComplete="certificate_types"
                  name="id"
                  value={this.state.id}
                  onChange={this.handleInputChange}
                  required
                />
              </CInputGroup>{' '}
              <CInputGroup className="mb-4" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="Name"
                  autoComplete="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
              </CInputGroup>{' '}
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeDeleteModal}>
                  HU???
                </CButton>
                <CButton color="danger" type="submit">
                  OK
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
      </>
    )
  }
}

export default CertificateType
