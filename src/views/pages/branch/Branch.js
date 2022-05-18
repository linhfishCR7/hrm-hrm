import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, message, Input } from 'antd'
import { TOKEN, BRANCH } from '../../../constants/Config'
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
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCircle } from '@coreui/icons'
import Modal from 'react-modal'
const { Column } = Table

class Branch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      branchs: [],
      companies: [{}],
      companies_data: [{}],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      branch: '',
      name: '',
      company: '',
      loading: true,
      status: true,
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  fetchAPI = async () => {
    return await axios
      .get('/admin/branchs/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        const data = res.data
        this.setState({
          branchs: data,
          loading: false,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchCompanyAPI = async () => {
    return await axios
      .get('/admin/companies/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        const companies = res.data
        const data = []
        companies.map((item) =>
          data.push({
            text: item.name,
            value: item.name,
          }),
        )
        this.setState({
          companies: companies,
          loading: false,
          companies_data: data,
        })
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
    this.fetchCompanyAPI()
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
      branch: this.state.branch,
      name: this.state.name,
      company: this.state.company,
    }

    await axios
      .post('/admin/branchs/', newItem, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        this.fetchAPI()
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
            type: 'success',
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
      branch: item.branch,
      name: item.name,
      company: item.company_id,
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

  handleEditSubmit = async (event) => {
    event.preventDefault()

    const newUpdate = {
      branch: this.state.branch,
      name: this.state.name,
      company: this.state.company,
    }

    await axios
      .put('/admin/branchs/' + this.state.id + '/', newUpdate, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        this.fetchAPI()
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

    axios
      .delete('/admin/branchs/' + this.state.id + '/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        this.setState((prevState) => ({
          branchs: prevState.branchs.filter((el) => el.id !== this.state.id),
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

  handleSearch = async (event) => {
    let value = event.target.value
    const REGISTER_URL = '/admin/branchs/?no_pagination=true&search=' + value
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    this.setState({ branchs: res.data })
  }
  render() {
    return (
      <>
        {this.state.status ? (
          <>
            <Loading loading={this.state.loading} />
            <h2>Chi Nhánh</h2>
            <CForm onSubmit={this.handleInsertSubmit}>
              <CRow>
                <CCol>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="Mã Chi Nhánh"
                      autoComplete="branch"
                      name="branch"
                      onChange={this.handleInputChange}
                      required
                    />
                  </CInputGroup>{' '}
                </CCol>
                <CCol>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="Tên Chi Nhánh"
                      autoComplete="name"
                      name="name"
                      onChange={this.handleInputChange}
                      required
                    />
                  </CInputGroup>{' '}
                </CCol>
                <CCol>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormSelect
                      name="company"
                      aria-label="Chọn Công Ty"
                      onChange={this.handleInputChange}
                      required
                    >
                      <option key="0" value="">
                        Chọn Công Ty
                      </option>
                      {this.state.companies.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.company} - {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>{' '}
                </CCol>
                <CCol>
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
                  placeholder="Tìm kiếm tên và mã chi nhánh"
                  onChange={(event) => this.handleSearch(event)}
                  className="mb-3"
                />
              </CCol>
            </CRow>
            <Table dataSource={this.state.branchs} bordered>
              <Column title="Mã" dataIndex="branch" key="branch" />
              <Column title="Tên" dataIndex="name" key="name" />
              <Column
                title="Công Ty"
                dataIndex="company_data"
                key="company_data"
                filters={this.state.companies_data}
                onFilter={(value, record) => record.company_data.startsWith(value)}
                filterSearch={true}
              />
              <Column
                title="Hành động"
                key={this.state.branchs}
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
            <CModal visible={this.state.modalIsOpen} onClose={this.closeModal}>
              <CModalHeader>
                <CModalTitle>Cập nhật</CModalTitle>{' '}
              </CModalHeader>
              <CModalBody>
                <CForm onSubmit={this.handleEditSubmit}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="Mã Chi Nhánh"
                      autoComplete="branch"
                      name="branch"
                      value={this.state.branch}
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
                      placeholder="Tên Chi Nhánh"
                      autoComplete="name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      required
                    />
                  </CInputGroup>{' '}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormSelect
                      name="company"
                      aria-label="Chọn Công Ty"
                      value={this.state.company}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option key="0" value="">
                        Chọn Công Ty
                      </option>
                      {this.state.companies.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.company} - {item.name}
                        </option>
                      ))}
                    </CFormSelect>
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
                <CModalTitle>Xoá</CModalTitle>
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
                      placeholder="id"
                      autoComplete="id"
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
          <Page404 />
        )}
      </>
    )
  }
}

export default Branch
