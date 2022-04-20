import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Tag, Space, Button, message, Input } from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import {
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTable,
  CSpinner,
  CContainer,
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
  CFormFeedback,
} from '@coreui/react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPencil, cilPlus, cilCircle } from '@coreui/icons'
import Modal from 'react-modal'
import Loading from '../../../utils/loading'

const { Column, ColumnGroup } = Table

class DayOffType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dayOffType: [],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      day_off_types: '',
      name: '',
      loading: true,
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  async componentDidMount() {
    await axios
      .get('/hrm/day-off-types/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const dayOffType = res.data
        this.setState({
          dayOffType: dayOffType,
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
    console.log({
      [name]: value,
    })
  }

  handleInsertSubmit = async (event) => {
    event.preventDefault()

    const newItem = {
      day_off_types: this.state.day_off_types,
      name: this.state.name,
    }

    await axios
      .post('/hrm/day-off-types/', newItem, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        let dayOffType = this.state.dayOffType
        dayOffType = [newItem, ...dayOffType]
        this.setState({ dayOffType: dayOffType })
        message.success({
          content: 'Add data Success!!!',
          duration: 5,
          maxCount: 1,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        })
        setTimeout(function () {
          window.location.reload()
        }, 3000)
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          message.error({
            content: error.response.data.message,
            duration: 5,
            maxCount: 1,
            className: 'custom-class',
            style: {
              marginTop: '20vh',
            },
          })
        } else {
          message.error({
            content: error,
            duration: 5,
            maxCount: 1,
            className: 'custom-class',
            style: {
              marginTop: '20vh',
            },
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
      day_off_types: item.day_off_types,
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
      //   id: this.state.id,
      day_off_types: this.state.day_off_types,
      name: this.state.name,
    }

    await axios
      .put('/hrm/day-off-types/' + this.state.id + '/', newUpdate, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        let key = this.state.id
        this.setState((prevState) => ({
          dayOffType: prevState.dayOffType.map((elm) =>
            elm.id === key
              ? {
                  ...elm,
                  day_off_types: this.state.day_off_types,
                  name: this.state.name,
                }
              : elm,
          ),
        }))
        this.closeModal()
        message.success({
          content: 'Update data Success!!!',
          duration: 5,
          maxCount: 1,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        })
      })
      .catch((error) =>
        message.error({
          content: error,
          duration: 5,
          maxCount: 1,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        }),
      )
  }

  handleDelete = (event) => {
    event.preventDefault()

    const Id = {
      id: this.state.id,
    }
    axios
      .delete('/hrm/day-off-types/' + this.state.id + '/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        this.setState((prevState) => ({
          dayOffType: prevState.dayOffType.filter((el) => el.id !== this.state.id),
        }))
        message.success({
          content: 'Delete data Success!!!',
          duration: 5,
          maxCount: 1,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        })
        this.closeDeleteModal()
      })
      .catch((error) =>
        message.error({
          content: error,
          duration: 5,
          maxCount: 1,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        }),
      )
  }
  handleSearch = async (event) => {
    let value = event.target.value
    const REGISTER_URL = '/hrm/day-off-types/?no_pagination=true&search=' + value
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    })
    this.setState({ dayOffType: res.data })
  }
  render() {
    return (
      <>
        <Loading loading={this.state.loading} />
        <h2> Loại Phép Năm</h2>
        <CForm onSubmit={this.handleInsertSubmit}>
          <CRow>
            <CCol md={5}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="Loại phép năm"
                  autoComplete="day_off_types"
                  name="day_off_types"
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
                  placeholder="Tên loại phép năm"
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
              placeholder="Search..."
              onChange={(event) => this.handleSearch(event)}
              className="mb-3"
            />
          </CCol>
        </CRow>
        <Table dataSource={this.state.dayOffType} bordered scroll={{ y: 240 }}>
          <Column title="Mã" dataIndex="day_off_types" key="day_off_types" />
          <Column title="Tên" dataIndex="name" key="name" />
          <Column
            title="Hành động"
            key={this.state.dayOffType}
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
                  placeholder="Loại phép năm"
                  autoComplete="day_off_types"
                  name="day_off_types"
                  value={this.state.day_off_types}
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
                  placeholder="Tên loại phép năm"
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
                Bạn có chắc chắn xoá {this.state.name}?
              </h2>
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
                  HUỶ
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

export default DayOffType
