import React, { Component } from 'react'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Input } from 'antd'
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

const { Column } = Table

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
        API({ REGISTER_URL: '/hrm/certificate-types/?no_pagination=true', ACTION: 'GET' })
          .then((res) => {
            const certificateType = res.data
            this.setState({
              certificateType: certificateType,
              loading: false,
            })
          })
          .catch((error) => console.log(error))
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
        API({ REGISTER_URL: '/hrm/certificate-types/?no_pagination=true', ACTION: 'GET' })
          .then((res) => {
            const certificateType = res.data
            this.setState({
              certificateType: certificateType,
              loading: false,
            })
          })
          .catch((error) => console.log(error))
        openNotificationWithIcon({
          type: 'success',
          message: 'Cập nhật dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeModal()
      })
      .catch(function (error) {
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

  handleDelete = (event) => {
    event.preventDefault()

    API({ REGISTER_URL: '/hrm/certificate-types/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          certificateType: prevState.certificateType.filter((el) => el.id !== this.state.id),
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
        <h2> Loại Chứng Chỉ</h2>
        <CForm onSubmit={this.handleInsertSubmit}>
          <CRow>
            <CCol md={5}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="Loại chứng chỉ"
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
                  placeholder="Tên loại chứng chỉ"
                  autoComplete="name"
                  name="name"
                  onChange={this.handleInputChange}
                  required
                />
              </CInputGroup>{' '}
            </CCol>
            <CCol md={2}>
              <CButton color="primary" type="submit">
                Lưu
              </CButton>
            </CCol>
          </CRow>
        </CForm>{' '}
        <hr />
        <CRow>
          <CCol md={4}>
            <Input.Search
              placeholder="Tìm kiếm tên hoặc mã loại chứng nhận"
              onChange={(event) => this.handleSearch(event)}
              className="mb-3"
            />
          </CCol>
        </CRow>
        <Table dataSource={this.state.certificateType} bordered>
          <Column title="Mã" dataIndex="certificate_types" key="certificate_types" />
          <Column title="Tên" dataIndex="name" key="name" />
          <Column
            title="Hành động"
            key={this.state.certificateType}
            render={(text, record) => (
              <Space size="middle">
                <CTooltip content="Cập Nhật Dự Liệu" placement="top">
                  <CButton
                    color="warning"
                    style={{ marginRight: '10px' }}
                    // key={record.id}
                    onClick={() => this.openModal(record)}
                  >
                    <EditOutlined />
                  </CButton>
                </CTooltip>
                <CTooltip content="Xoá Dữ Liệu" placement="top">
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
            <CModalTitle>Cập nhật</CModalTitle>{' '}
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              <CInputGroup className="mb-3 mt-3">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="Loại chứng chỉ"
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
                  placeholder="Tên loại chứng chỉ"
                  autoComplete="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
              </CInputGroup>{' '}
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
        <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
          <CModalHeader>
            <CModalTitle>Xoá</CModalTitle>{' '}
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleDelete}>
              <p>Bạn có chắc chắn xoá {this.state.name}?</p>
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

export default CertificateType
