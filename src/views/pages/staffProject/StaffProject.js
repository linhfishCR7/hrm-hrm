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

const { Column } = Table
const staff_id = localStorage.getItem('staff')
const staff_name = localStorage.getItem('staff_name')

class StaffProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      staffProject: [],
      staffs: [{}],
      projects: [{}],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      staff: '',
      loading: true,
      project: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    API({
      REGISTER_URL: '/hrm/staffs/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const staffs = res.data
        this.setState({
          staffs: staffs,
        })
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'Có lỗi xảy ra',
          description: error,
          placement: 'topRight',
        }),
      )
    API({
      REGISTER_URL: '/hrm/projects/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const projects = res.data
        this.setState({
          projects: projects,
        })
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'Có lỗi xảy ra',
          description: error,
          placement: 'topRight',
        }),
      )
    API({
      REGISTER_URL: '/hrm/staff-project/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const staffProject = res.data
        this.setState({
          staffProject: staffProject,
          loading: false,
        })
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'Có lỗi xảy ra',
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
      staff: item.staff_id,
      project: item.project_id,
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

    API({ REGISTER_URL: '/hrm/staff-project/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          staffProject: prevState.staffProject.filter((el) => el.id !== this.state.id),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Xoá dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeDeleteModal()
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'Xoá dữ liệu không thành công!!!',
          description: error,
          placement: 'topRight',
        }),
      )
  }

  handleEditSubmit = (event) => {
    event.preventDefault()

    const newUpdate = {
      staff: this.state.staff,
      project: this.state.project,
    }
    API({
      REGISTER_URL: '/hrm/staff-project/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/staff-project/?no_pagination=true',
          ACTION: 'GET',
        })
          .then((res) => {
            const staffProject = res.data
            this.setState({
              staffProject: staffProject,
            })
          })
          .catch((error) =>
            openNotificationWithIcon({
              type: 'error',
              message: 'Có lỗi xảy ra',
              description: error,
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
            description: error.response.data.message,
            placement: 'topRight',
          })
          this.closeModal()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: error,
            placement: 'topRight',
          })
          this.closeModal()
        }
      })
  }

  handleAddSubmit = (event) => {
    event.preventDefault()

    const newData = {
      staff: this.state.staff,
      project: this.state.project,
    }
    API({
      REGISTER_URL: '/hrm/staff-project/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/staff-project/?no_pagination=true',
          ACTION: 'GET',
        })
          .then((res) => {
            const staffProject = res.data
            this.setState({
              staffProject: staffProject,
            })
          })
          .catch((error) =>
            openNotificationWithIcon({
              type: 'error',
              message: 'Có lỗi xảy ra',
              description: error,
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
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Thêm dữ liệu không thành công!!!',
            description: error,
            placement: 'topRight',
          })
        }
      })
  }
  handleSearch = (event) => {
    let value = event.target.value
    API({
      REGISTER_URL: '/hrm/staff-project/?no_pagination=true&search=' + value,
      ACTION: 'GET',
    }).then((res) => {
      this.setState({ staffProject: res.data })
    })
  }
  render() {
    return (
      <>
        {' '}
        <Loading loading={this.state.loading} />
        <h2>Nhân Viên Làm Dự Án</h2>
        <CForm onSubmit={this.handleAddSubmit}>
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Nhân Viên</CFormLabel>
                <CFormSelect
                  name="staff"
                  aria-label="Chọn Nhân Viên"
                  onChange={this.handleInputChange}
                >
                  <option key="0" value="">
                    Chọn Nhân Viên
                  </option>
                  {this.state.staffs.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.staff} - {item.name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng chọn nhân viên!
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Dự Án</CFormLabel>
                <CFormSelect
                  name="project"
                  aria-label="Chịn Dự Án"
                  onChange={this.handleInputChange}
                >
                  <option key="0" value="">
                    Chọn Dự Án
                  </option>
                  {this.state.projects.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.project} - {item.name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng chọn dự án!
                </CFormText>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CButton color="primary" type="submit">
                  LƯU
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </CForm>{' '}
        <Divider />
        <CRow>
          <CCol md={4}>
            <Input.Search
              placeholder="Tìm kiếm..."
              onChange={(event) => this.handleSearch(event)}
              className="mb-3"
            />
          </CCol>
        </CRow>
        <Table dataSource={this.state.staffProject} bordered>
          <Column title="Mã Nhân Viên" dataIndex="staff_staff" key="staff_staff" />
          <Column title="Nhân Viên" dataIndex="staff_name" key="staff_name" />
          <Column title="Mã Dự Án" dataIndex="project_project" key="project_project" />
          <Column title="Dự Án" dataIndex="project_name" key="project_name" />
          <Column
            title="Hành động"
            key={this.state.staffProject}
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
            <CModalTitle>CẬP NHẬT</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nhân Viên</CFormLabel>
                    <CFormSelect
                      name="staff"
                      aria-label="Chọn Nhân Viên"
                      value={this.state.staff}
                      onChange={this.handleInputChange}
                    >
                      <option key="0" value="">
                        Chọn Nhân Viên
                      </option>
                      {this.state.staffs.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.staff} - {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng chọn nhân viên!
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Dự Án</CFormLabel>
                    <CFormSelect
                      name="project"
                      aria-label="Chịn Dự Án"
                      value={this.state.project}
                      onChange={this.handleInputChange}
                    >
                      <option key="0" value="">
                        Chọn Dự Án
                      </option>
                      {this.state.projects.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.project} - {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng chọn dự án!
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeModal}>
                  ĐÓNG
                </CButton>
                <CButton color="primary" type="submit">
                  CẬP NHẬT
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Delete */}
        <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
          <CModalHeader>
            <CModalTitle>XOÁ</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {' '}
            <CForm onSubmit={this.handleDelete}>
              <h2 style={{ textTransform: 'uppercase' }}>Bạn có chắc chắn xoá?</h2>
              <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder=""
                  autoComplete=""
                  name="id"
                  value={this.state.id}
                  onChange={this.handleInputChange}
                  required
                />
              </CInputGroup>{' '}
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeDeleteModal}>
                  HUỶ
                </CButton>
                <CButton color="danger" type="submit">
                  ĐỒNG Ý
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
      </>
    )
  }
}

export default StaffProject
