import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Input } from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import openNotificationWithIcon from '../../../utils/notification'

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
import Loading from '../../../utils/loading'

const { Column } = Table

class DegreeType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      degreeType: [],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      degree_types: '',
      name: '',
      loading: true,
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  fectchAPI = async () => {
    return await axios
      .get('/hrm/degree-types/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        const degreeType = res.data
        this.setState({
          degreeType: degreeType,
          loading: false,
        })
      })
      .catch((error) => console.log(error))
  }

  componentDidMount() {
    this.fectchAPI()
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
      degree_types: this.state.degree_types,
      name: this.state.name,
    }

    await axios
      .post('/hrm/degree-types/', newItem, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        this.fectchAPI()
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
      degree_types: item.degree_types,
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

  handleEditSubmit = async (event) => {
    event.preventDefault()

    const newUpdate = {
      degree_types: this.state.degree_types,
      name: this.state.name,
    }

    await axios
      .put('/hrm/degree-types/' + this.state.id + '/', newUpdate, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        this.fectchAPI()

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
      .delete('/hrm/degree-types/' + this.state.id + '/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        this.setState((prevState) => ({
          degreeType: prevState.degreeType.filter((el) => el.id !== this.state.id),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Xoá dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeDeleteModal()
      })
      .catch(function (error) {
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
    const REGISTER_URL = '/hrm/degree-types/?no_pagination=true&search=' + value
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    this.setState({ degreeType: res.data })
  }
  render() {
    return (
      <>
        <Loading loading={this.state.loading} />
        <h2> Loại Bằng Cấp</h2>
        <CForm onSubmit={this.handleInsertSubmit}>
          <CRow>
            <CCol md={5}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="Loại bằng cấp"
                  autoComplete="degree_types"
                  name="degree_types"
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
                  placeholder="Tên loại bằng cấp"
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
              placeholder="Tìm kiếm tên và loại bằng cấp"
              onChange={(event) => this.handleSearch(event)}
              className="mb-3"
            />
          </CCol>
        </CRow>
        <Table dataSource={this.state.degreeType} bordered scroll={{ y: 240 }}>
          <Column title="Mã" dataIndex="degree_types" key="degree_types" />
          <Column title="Tên" dataIndex="name" key="name" />
          <Column
            title="Hành động"
            key={this.state.degreeType}
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
                  placeholder="Loại bằng cấp"
                  autoComplete="degree_types"
                  name="degree_types"
                  value={this.state.degree_types}
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
                  placeholder="Tên loại bằng cấp"
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
                  placeholder="id"
                  autoComplete="id"
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

export default DegreeType
