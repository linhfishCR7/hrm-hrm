import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, message, Input, Tag } from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Loading from '../../../utils/loading'
import openNotificationWithIcon from '../../../utils/notification'
import Page404 from '../page404/Page404'

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
  CImage,
  CFormSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCircle, cilLockLocked } from '@coreui/icons'
import Modal from 'react-modal'
const { Column } = Table

class ListUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      modalIsOpen: false,
      modalStatusIsOpen: false,
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      image: '',
      phone: null,
      date_of_birth: null,
      is_active: false,
      is_staff: false,
      is_verified_email: false,
      is_superuser: false,
      loading: true,
      status: true,
      role_data: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openStatusModal = this.openStatusModal.bind(this)
  }

  fetchAPI = async () => {
    return await axios
      .get('/admin/user/list/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        const users = res.data
        this.setState({
          users: users,
          loading: false,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchUserDetailAPI = async (id) => {
    return await axios
      .get('/admin/user/' + id + '/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        const users = res.data
        this.setState({
          first_name: users.first_name,
          last_name: users.last_name,
          email: users.email,
          image: users.image,
          phone: users.phone,
          date_of_birth: users.date_of_birth,
          is_active: users.is_active,
          is_staff: users.is_staff,
          is_superuser: users.is_superuser,
        })
        console.log(users.is_staff)
        console.log(users.is_superuser)
      })
      .catch((error) => console.log(error))
  }

  componentDidMount() {
    if (localStorage.getItem('role') !== 'admin') {
      this.setState({
        status: false,
      })
    }
    this.fetchAPI()
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  UNSAFE_componentWillMount() {
    Modal.setAppElement('body')
  }

  openModal = (item) => {
    this.fetchUserDetailAPI(item.id)
    this.setState({
      modalIsOpen: true,
      id: item.id,
    })
  }

  openStatusModal = (item) => {
    this.setState({
      modalStatusIsOpen: true,
      id: item.id,
      is_active_data: item.is_active_data,
      first_name: item.first_name,
      last_name: item.last_name,
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    })
  }

  closeStatusModal = () => {
    this.setState({
      modalStatusIsOpen: false,
    })
  }

  handleEditSubmit = (event) => {
    this.setState({
      loading: true,
    })
    event.preventDefault()

    const newUpdate = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      image: this.state.image,
      phone: this.state.phone,
      date_of_birth: this.state.date_of_birth,
      is_active: this.state.is_active,
      is_staff: this.state.is_staff,
      is_superuser: this.state.is_superuser,
    }
    axios
      .put('/admin/user/' + this.state.id + '/', newUpdate, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        this.fetchAPI()
        openNotificationWithIcon({
          type: 'success',
          message: 'Cập nhật vai trò thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeModal()
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật vai trò không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          this.closeModal()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật vai trò không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          this.closeModal()
        }
      })
  }

  handleStatus = async (event) => {
    event.preventDefault()
    await axios
      .put(
        '/admin/user/block-unblock-user/' + this.state.id + '/',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      )
      .then((res) => {
        this.fetchAPI()
        openNotificationWithIcon({
          type: 'success',
          message: 'Cập nhật liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeStatusModal()
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          this.closeStatusModal()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          this.closeStatusModal()
        }
      })
  }
  handleSearch = async (event) => {
    let value = event.target.value
    const REGISTER_URL = '/admin/user/list/?no_pagination=true&search=' + value
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    this.setState({ users: res.data })
  }
  render() {
    return (
      <>
        {this.state.status ? (
          <>
            <Loading loading={this.state.loading} />
            <h2>Danh Sách Người Dùng</h2>
            <CRow>
              <CCol md={4}>
                <Input.Search
                  placeholder="Tìm kiếm họ tên số điện thoại và email"
                  onChange={(event) => this.handleSearch(event)}
                  className="mb-3"
                />
              </CCol>
            </CRow>
            <Table dataSource={this.state.users} bordered>
              <Column title="Họ" dataIndex="last_name" key="last_name" />
              <Column title="Tên" dataIndex="first_name" key="first_name" />
              <Column title="Email" dataIndex="email" key="email" />
              <Column title="Ngày Tạo" dataIndex="created_at_data" key="created_at_data" />
              <Column
                title="Trạng Thái"
                dataIndex="is_active_data"
                key="is_active_data"
                filters={[
                  {
                    text: 'Hoạt Động',
                    value: 'Hoạt Động',
                  },
                  {
                    text: 'Bị Khoá',
                    value: 'Bị Khoá',
                  },
                ]}
                onFilter={(value, record) => record.is_active_data.startsWith(value)}
                render={(text, record) => (
                  <Space size="middle">
                    {record.is_active_data === 'Hoạt Động' ? (
                      <CTooltip content="Khoá Người Dùng Người Dùng" placement="top">
                        <CButton
                          color="success"
                          style={{ marginRight: '10px' }}
                          onClick={() => this.openStatusModal(record)}
                        >
                          {record.is_active_data}
                        </CButton>
                      </CTooltip>
                    ) : (
                      <CTooltip content="Kích Hoạt Người Dùng" placement="top">
                        <CButton
                          color="secondary"
                          style={{ marginRight: '10px' }}
                          onClick={() => this.openStatusModal(record)}
                        >
                          {record.is_active_data}
                        </CButton>
                      </CTooltip>
                    )}
                  </Space>
                )}
              />
              <Column
                title="Vai Trò"
                dataIndex="role_data"
                key="role_data"
                filters={[
                  {
                    text: 'QLNS',
                    value: 'QLNS',
                  },
                  {
                    text: 'ADMIN',
                    value: 'ADMIN',
                  },
                  {
                    text: 'NHÂN VIÊN',
                    value: 'NHÂN VIÊN',
                  },
                ]}
                // cursor:pointer;
                onFilter={(value, record) => record.role_data.startsWith(value)}
                render={(text, record) => (
                  <>
                    <Space size="middle">
                      <CTooltip content="Cập Nhật Vai Trò Người Dùng" placement="top">
                        {record.role_data === 'QLNS' ? (
                          <Tag
                            color="geekblue"
                            key="QLNS"
                            onClick={() => this.openModal(record)}
                            style={{ cursor: 'pointer' }}
                          >
                            {record.role_data}
                          </Tag>
                        ) : record.role_data === 'ADMIN' ? (
                          <Tag
                            color="gold"
                            key="ADMIN"
                            onClick={() => this.openModal(record)}
                            style={{ cursor: 'pointer' }}
                          >
                            {record.role_data}
                          </Tag>
                        ) : (
                          <Tag
                            color="green"
                            key="NHÂN VIÊN"
                            onClick={() => this.openModal(record)}
                            style={{ cursor: 'pointer' }}
                          >
                            {record.role_data}
                          </Tag>
                        )}
                      </CTooltip>
                    </Space>
                  </>
                )}
              />
            </Table>
            <CModal visible={this.state.modalIsOpen} onClose={this.closeModal} size="lg">
              <CModalHeader>
                <CModalTitle>Cập nhật vai trò người dùng</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm onSubmit={this.handleEditSubmit}>
                  <CRow className="mb-3">
                    <CCol md={4}></CCol>
                    <CCol md={8}>
                      {this.state.image ? (
                        <CImage
                          src={'https://hrm-s3.s3.amazonaws.com/' + this.state.image}
                          width={160}
                          height={160}
                          className="rounded-circle mb-5"
                        />
                      ) : (
                        <CImage
                          src="https://hrm-s3.s3.amazonaws.com/6e98775b-4d5hrm-profile.png"
                          width={160}
                          height={160}
                          className="rounded-circle"
                        />
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      {' '}
                      <CInputGroup className="mb-3">
                        <CInputGroupText> @ </CInputGroupText>{' '}
                        <CFormInput
                          placeholder="Email"
                          autoComplete="email"
                          value={this.state.email}
                          type="email"
                          readOnly="readonly"
                        />
                      </CInputGroup>{' '}
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />{' '}
                        </CInputGroupText>{' '}
                        <CFormInput
                          type="text"
                          placeholder="Họ tên"
                          autoComplete="firstname"
                          value={this.state.last_name + ' ' + this.state.first_name}
                          readOnly="readonly"
                        />
                      </CInputGroup>{' '}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />{' '}
                        </CInputGroupText>{' '}
                        <CFormInput
                          type="date"
                          placeholder="Day Of Birth"
                          autoComplete="dayofbirth"
                          value={this.state.date_of_birth}
                          readOnly="readonly"
                        />
                      </CInputGroup>{' '}
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />{' '}
                        </CInputGroupText>{' '}
                        <CFormInput
                          type="phone"
                          placeholder="Phone"
                          autoComplete="phone"
                          value={this.state.phone}
                          readOnly="readonly"
                        />
                      </CInputGroup>{' '}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6}>
                      <CFormSwitch
                        label={
                          <>
                            <b>Người Dùng QLNS</b>
                          </>
                        }
                        id="is_staff"
                        name="is_staff"
                        checked={this.state.is_staff}
                        size="lg"
                        onChange={(event) => this.setState({ is_staff: event.target.checked })}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormSwitch
                        label={
                          <>
                            <b>Người Dùng Admin</b>
                          </>
                        }
                        id="is_superuser"
                        name="is_superuser"
                        checked={this.state.is_superuser}
                        size="lg"
                        onChange={(event) => this.setState({ is_superuser: event.target.checked })}
                      />
                    </CCol>
                  </CRow>
                  <CModalFooter>
                    <CButton color="secondary" onClick={this.closeModal}>
                      Đóng
                    </CButton>
                    <CButton color="primary" type="submit">
                      Cập Nhật
                    </CButton>
                  </CModalFooter>
                </CForm>{' '}
              </CModalBody>
            </CModal>
            <CModal visible={this.state.modalStatusIsOpen} onClose={this.closeStatusModal}>
              <CModalHeader>
                <CModalTitle>
                  {this.state.is_active_data === 'Bị Khoá'
                    ? 'Kích hoạt người dùng'
                    : 'Khoá người dùng'}
                </CModalTitle>
              </CModalHeader>
              {this.state.is_active_data === 'Bị Khoá' ? (
                <CModalBody>
                  <CForm onSubmit={this.handleStatus}>
                    <h6>
                      Bạn có chắc chắn kích hoạt người dùng {this.state.last_name}{' '}
                      {this.state.first_name}?
                    </h6>
                    <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                      <CInputGroupText>
                        <CIcon icon={cilCircle} />{' '}
                      </CInputGroupText>{' '}
                      <CFormInput
                        type="text"
                        placeholder="id"
                        autoComplete="id"
                        name="id"
                        value={this.state.id}
                        onChange={this.handleInputChange}
                        required
                      />
                    </CInputGroup>{' '}
                    <CModalFooter>
                      <CButton color="secondary" onClick={this.closeStatusModal}>
                        Huỷ
                      </CButton>
                      <CButton color="info" type="submit">
                        Đồng ý
                      </CButton>
                    </CModalFooter>
                  </CForm>{' '}
                </CModalBody>
              ) : (
                <CModalBody>
                  <CForm onSubmit={this.handleStatus}>
                    <h6>
                      Bạn có chắc chắn khoá người dùng {this.state.last_name}{' '}
                      {this.state.first_name}?
                    </h6>
                    <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                      <CInputGroupText>
                        <CIcon icon={cilCircle} />{' '}
                      </CInputGroupText>{' '}
                      <CFormInput
                        type="text"
                        placeholder="id"
                        autoComplete="id"
                        name="id"
                        value={this.state.id}
                        onChange={this.handleInputChange}
                        required
                      />
                    </CInputGroup>{' '}
                    <CModalFooter>
                      <CButton color="secondary" onClick={this.closeStatusModal}>
                        Huỷ
                      </CButton>
                      <CButton color="warning" type="submit">
                        Đồng ý
                      </CButton>
                    </CModalFooter>
                  </CForm>{' '}
                </CModalBody>
              )}
            </CModal>
          </>
        ) : (
          <Page404 />
        )}
      </>
    )
  }
}

export default ListUser
