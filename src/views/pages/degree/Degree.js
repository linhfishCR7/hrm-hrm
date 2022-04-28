import React, { Component } from 'react'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Divider } from 'antd'
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

const { Column, ColumnGroup } = Table
const staff_id = localStorage.getItem('staff')
const staff_name = localStorage.getItem('staff_name')

class Degree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      degree: [],
      degreeType: [{}],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      name: '',
      loading: true,
      number: '',
      place: '',
      attach: '',
      type_data: '',
      date: null,
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    API({ REGISTER_URL: '/hrm/degree-types/?no_pagination=true', ACTION: 'GET' })
      .then((res) => {
        const degreeType = res.data
        this.setState({
          degreeType: degreeType,
        })
      })
      .catch((error) => console.log(error))
    this.setState({
      modalAddIsOpen: true,
      staff: staff_id,
    })
    API({
      REGISTER_URL: '/hrm/degree/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const degree = res.data
        this.setState({
          degree: degree,
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
    console.log(item.type)
    API({ REGISTER_URL: '/hrm/degree-types/?no_pagination=true', ACTION: 'GET' })
      .then((res) => {
        const degreeType = res.data
        this.setState({
          degreeType: degreeType,
        })
      })
      .catch((error) => console.log(error))
    this.setState({
      modalIsOpen: true,
      id: item.id,
      number: item.number,
      name: item.name,
      date: item.date,
      place: item.place,
      attach: item.attach,
      type_data: item.type_data,
      staff: staff_id,
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

    API({ REGISTER_URL: '/hrm/degree/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          degree: prevState.degree.filter((el) => el.id !== this.state.id),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Xoá dữ liệu thành công!!!',
          description: 'Xoá dữ liệu thành công!!!',
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
      number: this.state.number,
      date: this.state.date,
      place: this.state.place,
      attach: this.state.attach,
      type: this.state.type_data,
      name: this.state.name,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/degree/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        let key = this.state.id
        this.setState((prevState) => ({
          degree: prevState.degree.map((elm) =>
            elm.id === key
              ? {
                  ...elm,
                  number: this.state.number,
                  name: this.state.name,
                  place: this.state.place,
                  attach: this.state.attach,
                  type_data: this.state.type_data,
                }
              : elm,
          ),
        }))
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
      number: this.state.number,
      name: this.state.name,
      date: this.state.date,
      place: this.state.place,
      attach: this.state.attach,
      type: this.state.type_data,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/degree/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        let degree = this.state.degree
        degree = [newData, ...degree]
        this.setState({ degree: degree })
        openNotificationWithIcon({
          type: 'success',
          message: 'Thêm dữ liệu thành công!!!',
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
  render() {
    return (
      <>
        {' '}
        <Loading loading={this.state.loading} />
        <h2>{staff_name} - Bằng Cấp</h2>
        <CForm onSubmit={this.handleAddSubmit}>
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Số Bằng Cấp</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Số Bằng Cấp"
                  autoComplete="number"
                  name="number"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Thông tin này không được chỉnh sửa!
                    </CFormText> */}
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Tên Bằng Cấp</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Tên Bằng Cấp"
                  autoComplete="name"
                  name="name"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập tên Bằng Cấp
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Cấp Ngày</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Cấp Ngày"
                  autoComplete="date"
                  name="date"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ngày cấp Bằng Cấp
                </CFormText>
              </CCol>

              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Nơi Cấp</CFormLabel>

                <CFormInput
                  type="text"
                  placeholder="Nơi Cấp"
                  autoComplete="place"
                  name="place"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập nơi cấp Bằng Cấp
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
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
                  Nhập đính kèm nếu có
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Loại Bằng Cấp</CFormLabel>

                <CFormSelect
                  name="type_data"
                  aria-label="Vui lòng chọn loại Bằng Cấp"
                  onChange={this.handleInputChange}
                >
                  <option key="0" value="">
                    Chọn loại Bằng Cấp
                  </option>
                  {this.state.degreeType.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng chọn loại Bằng Cấp!
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
        <Table dataSource={this.state.degree} bordered>
          <Column title="Số" dataIndex="number" key="number" />
          <Column title="Tên Bằng Cấp" dataIndex="name" key="name" />
          <Column title="Cấp Ngày" dataIndex="date" key="date" />
          <Column title="Nơi Cấp" dataIndex="place" key="place" />
          <Column title="Đính Kèm" dataIndex="attach" key="attach" />
          <Column
            title="Hành động"
            key={this.state.degree}
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Số Bằng Cấp</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Số Bằng Cấp"
                      autoComplete="number"
                      name="number"
                      value={this.state.number}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Thông tin này không được chỉnh sửa!
                    </CFormText> */}
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Tên Bằng Cấp</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Tên Bằng Cấp"
                      autoComplete="name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập tên Bằng Cấp
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Cấp Ngày</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Cấp Ngày"
                      autoComplete="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày cấp Bằng Cấp
                    </CFormText>
                  </CCol>

                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nơi Cấp</CFormLabel>

                    <CFormInput
                      type="text"
                      placeholder="Nơi Cấp"
                      autoComplete="place"
                      name="place"
                      value={this.state.place}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập nơi cấp Bằng Cấp
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
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
                      Nhập đính kèm nếu có
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Loại Bằng Cấp</CFormLabel>

                    <CFormSelect
                      value={this.state.type_data}
                      name="type_data"
                      aria-label="Vui lòng chọn loại Bằng Cấp"
                      onChange={this.handleInputChange}
                    >
                      <option key="0" value="">
                        Chọn loại Bằng Cấp
                      </option>
                      {this.state.degreeType.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng chọn loại Bằng Cấp!
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
              <h2 style={{ textTransform: 'uppercase' }}>
                Bạn có chắc chắn xoá {this.state.name}?
              </h2>
              <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="degree_types"
                  autoComplete="degree_types"
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

export default Degree
