import React, { Component } from 'react'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Divider, Input, Button, Upload, message } from 'antd'
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import Loading from '../../../utils/loading'
import axios from '../../../utils/axios'

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
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCircle } from '@coreui/icons'
import Modal from 'react-modal'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import openNotificationWithIcon from '../../../utils/notification'
const { TextArea } = Input

const { Column } = Table

class Project extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      customers: [{}],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      loadingSpin: true,
      name: '',
      location: '',
      service: '',
      contract_number: '',
      signing_date: null,
      start_date: null,
      finish_date: null,
      status: '',
      size: '',
      note: '',
      file: '',
      customer: '',
      loading: false,
      logo: '',
      logo_url: '',
      image_url: '',
      key: '',
      image: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    API({
      REGISTER_URL: '/hrm/customers/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const customers = res.data
        this.setState({
          customers: customers,
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
    API({
      REGISTER_URL: '/hrm/projects/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const projects = res.data
        this.setState({
          projects: projects,
          loadingSpin: false,
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
    console.log(item.image_url)
    this.setState({
      modalIsOpen: true,
      id: item.id,
      name: item.name,
      location: item.location,
      service: item.service,
      contract_number: item.contract_number,
      signing_date: item.signing_date,
      start_date: item.start_date,
      finish_date: item.finish_date,
      status: item.status,
      size: item.size,
      image_url: item.image_url,
      image: item.image_key,
      note: item.note,
      file: item.file,
      customer: item.customer_data,
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

    API({ REGISTER_URL: '/hrm/projects/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          projects: prevState.projects.filter((el) => el.id !== this.state.id),
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
      name: this.state.name,
      location: this.state.location,
      service: this.state.service,
      contract_number: this.state.contract_number,
      signing_date: this.state.signing_date,
      start_date: this.state.start_date,
      finish_date: this.state.finish_date,
      status: this.state.status,
      size: this.state.size,
      image: this.state.image,
      note: this.state.note,
      file: this.state.file,
      customer: this.state.customer,
    }
    API({
      REGISTER_URL: '/hrm/projects/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/projects/?no_pagination=true',
          ACTION: 'GET',
        })
          .then((res) => {
            const projects = res.data
            this.setState({
              projects: projects,
              loadingSpin: false,
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
      name: this.state.name,
      location: this.state.location,
      service: this.state.service,
      contract_number: this.state.contract_number,
      signing_date: this.state.signing_date,
      start_date: this.state.start_date,
      finish_date: this.state.finish_date,
      status: this.state.status,
      size: this.state.size,
      image: this.state.image,
      note: this.state.note,
      file: this.state.file,
      customer: this.state.customer,
    }
    API({
      REGISTER_URL: '/hrm/projects/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/hrm/projects/?no_pagination=true',
          ACTION: 'GET',
        })
          .then((res) => {
            const projects = res.data
            this.setState({
              projects: projects,
              loadingSpin: false,
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

  handleSearch = (event) => {
    let value = event.target.value
    API({
      REGISTER_URL: '/hrm/projects/?no_pagination=true&search=' + value,
      ACTION: 'GET',
    }).then((res) => {
      this.setState({ projects: res.data })
    })
  }
  render() {
    return (
      <>
        {' '}
        <Loading loading={this.state.loadingSpin} />
        <h2>Dự Án</h2>
        <CForm onSubmit={this.handleAddSubmit}>
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                {this.state.logo_url ? (
                  <CImage rounded thumbnail src={this.state.logo_url} width={200} height={200} />
                ) : (
                  <CImage
                    rounded
                    thumbnail
                    src=""
                    width={200}
                    alt="Chưa tải hình ảnh lên"
                    height={200}
                  />
                )}
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Hình Ảnh</CFormLabel>
                <br />
                <Upload
                  disabled={this.state.loading}
                  accept="image/*"
                  customRequest={({ file, onError, onSuccess, onProgress }) => {
                    const file_name = file.name
                    this.setState({
                      loading: true,
                      key: file.name,
                    })
                    axios
                      .post('/common/upload/policy/', {
                        file_name,
                      })
                      .then((results) => {
                        var returnData = results.data
                        var signedRequest = returnData.url
                        var content = returnData.fields
                        var key = content.key
                        var formData = new FormData()
                        Object.keys(returnData.fields).forEach((key) =>
                          formData.append(key, returnData.fields[key]),
                        )
                        formData.append('file', file)

                        fetch(signedRequest, {
                          method: 'POST',
                          body: formData,
                        })
                          .then(async (result) => {
                            this.setState({
                              loading: false,
                              logo: key,
                              logo_url: signedRequest + key,
                              image: key,
                            })
                            onSuccess(result, file)
                            openNotificationWithIcon({
                              type: 'success',
                              message: 'Upload ảnh thành công!!!',
                              description: '',
                              placement: 'topRight',
                            })
                          })
                          .catch((error) => {
                            this.setState({
                              loading: false,
                            })

                            onError(error)
                            openNotificationWithIcon({
                              type: 'error',
                              message: 'Upload ảnh không thành công!!!',
                              description: '',
                              placement: 'topRight',
                            })
                          })
                      })
                      .catch((error) => {
                        this.setState({
                          loading: false,
                        })
                        openNotificationWithIcon({
                          type: 'error',
                          message:
                            'Không chấp nhận file với định dạng này. Thử lại với định dạng khác',
                          description: '',
                          placement: 'topRight',
                        })
                      })
                  }}
                >
                  <Button loading={this.state.loading}>
                    <UploadOutlined /> Tải Hình Ảnh
                  </Button>
                </Upload>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng tải hình ảnh dự án
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Tên Dự Án</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Tên Dự Án"
                  autoComplete="name"
                  name="name"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Tên dự án bắt buộc nhập
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Dịch Vụ</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Dịch Vụ"
                  autoComplete="service"
                  name="service"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Dịch vụ bắt buộc nhập
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Số Hợp Đồng</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Số Hợp Đồng"
                  autoComplete="contract_number"
                  name="contract_number"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Số hợp đồng bắt buộc nhập
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ngày Đăng Ký</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Ngày Đăng Ký"
                  autoComplete="signing_date"
                  name="signing_date"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ngày đăng ký bắt buộc nhập
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ngày Bắt Đầu</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Ngày Bắt Đầu"
                  autoComplete="start_date"
                  name="start_date"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ngày bắt đầu bắt buộc nhập
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ngày Kết Thúc</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Ngày Kết Thúc"
                  autoComplete="finish_date"
                  name="finish_date"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ngày kết thúc dự án bắt buộc nhập
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Quy Mô Dự Án</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Quy Mô Dự Án"
                  autoComplete="size"
                  name="size"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Quy mô dự án có thể nhập hoặc không
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
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">File Đính Kèm</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="File Đính Kèm"
                  autoComplete="file"
                  name="file"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  File đính kèm có thể nhập hoặc không
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Khách Hàng</CFormLabel>

                <CFormSelect
                  // value={this.state.customer}
                  name="customer"
                  aria-label="Vui lòng chọn khách hàng"
                  onChange={this.handleInputChange}
                >
                  <option key="0" value="">
                    Chọn khách hàng
                  </option>
                  {this.state.customers.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Khách hàng của dự án bắt buộc chọn
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Địa Điểm</CFormLabel>
                <TextArea
                  rows={4}
                  type="text"
                  placeholder="Địa Điểm"
                  autoComplete="location"
                  name="location"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />{' '}
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Địa điểm có thể nhập hoặc không
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
        <CRow>
          <CCol md={4}>
            <Input.Search
              placeholder="Tìm kiếm tên dự án, mã dự án và ngày kí nhận"
              onChange={(event) => this.handleSearch(event)}
              className="mb-3"
            />
          </CCol>
        </CRow>
        <Table dataSource={this.state.projects} bordered>
          <Column title="Mã Dự Án" dataIndex="project" key="project" />
          <Column title="Tên Dự Án" dataIndex="name" key="name" />
          <Column title="Địa Điểm" dataIndex="location" key="location" />
          <Column title="Dịch Vụ" dataIndex="service" key="service" />
          <Column title="Số Hợp Đồng" dataIndex="contract_number" key="contract_number" />
          <Column title="Ngày Kí" dataIndex="signing_date" key="signing_date" />
          <Column title="Ngày Bắt Đầu" dataIndex="start_date" key="start_date" />
          <Column title="Ngày Kết Thúc" dataIndex="finish_date" key="finish_date" />
          <Column
            title="Trạng Thái"
            dataIndex="status_data"
            key="status_data"
            filters={[
              { text: 'Đang Đợi Duyệt', value: 'Đang Đợi Duyệt' },
              { text: 'Đang Thi Công', value: 'Đang Thi Công' },
              { text: 'Đã Nghiệm Thu', value: 'Đã Nghiệm Thu' },
            ]}
            onFilter={(value, record) => record.status_data.startsWith(value)}
            filterSearch={true}
          />
          <Column
            title="Hành động"
            key={this.state.projects}
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
                    {this.state.image_url ? (
                      <CImage
                        rounded
                        thumbnail
                        src={this.state.image_url}
                        width={200}
                        height={200}
                      />
                    ) : (
                      ''
                    )}
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Hình Ảnh</CFormLabel>
                    <br />
                    <Upload
                      disabled={this.state.loading}
                      accept="image/*"
                      customRequest={({ file, onError, onSuccess, onProgress }) => {
                        const file_name = file.name
                        this.setState({
                          loading: true,
                          key: file.name,
                        })
                        axios
                          .post('/common/upload/policy/', {
                            file_name,
                          })
                          .then((results) => {
                            var returnData = results.data
                            var signedRequest = returnData.url
                            var content = returnData.fields
                            var key = content.key
                            var formData = new FormData()
                            Object.keys(returnData.fields).forEach((key) =>
                              formData.append(key, returnData.fields[key]),
                            )
                            formData.append('file', file)

                            fetch(signedRequest, {
                              method: 'POST',
                              body: formData,
                            })
                              .then(async (result) => {
                                this.setState({
                                  loading: false,
                                  logo: key,
                                  // logo_url: signedRequest + key,
                                  image_url: signedRequest + key,
                                  image: key,
                                })
                                onSuccess(result, file)
                                openNotificationWithIcon({
                                  type: 'success',
                                  message: 'Upload ảnh thành công!!!',
                                  description: '',
                                  placement: 'topRight',
                                })
                              })
                              .catch((error) => {
                                this.setState({
                                  loading: false,
                                })

                                onError(error)
                                openNotificationWithIcon({
                                  type: 'error',
                                  message: 'Upload ảnh không thành công!!!',
                                  description: '',
                                  placement: 'topRight',
                                })
                              })
                          })
                          .catch((error) => {
                            this.setState({
                              loading: false,
                            })
                            openNotificationWithIcon({
                              type: 'error',
                              message:
                                'Không chấp nhận file với định dạng này. Thử lại với định dạng khác',
                              description: '',
                              placement: 'topRight',
                            })
                          })
                      }}
                    >
                      <Button loading={this.state.loading}>
                        <UploadOutlined /> Tải Hình Ảnh
                      </Button>
                    </Upload>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng tải hình ảnh dự án
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Tên Dự Án</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Tên Dự Án"
                      autoComplete="name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Tên dự án bắt buộc nhập
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Dịch Vụ</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Dịch Vụ"
                      autoComplete="service"
                      name="service"
                      value={this.state.service}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Dịch vụ bắt buộc nhập
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Số Hợp Đồng</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Số Hợp Đồng"
                      autoComplete="contract_number"
                      name="contract_number"
                      value={this.state.contract_number}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Số hợp đồng bắt buộc nhập
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày Đăng Ký</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày Đăng Ký"
                      autoComplete="signing_date"
                      value={this.state.signing_date}
                      name="signing_date"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày đăng ký bắt buộc nhập
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày Bắt Đầu</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày Bắt Đầu"
                      autoComplete="start_date"
                      name="start_date"
                      value={this.state.start_date}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày bắt đầu bắt buộc nhập
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày Kết Thúc</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày Kết Thúc"
                      autoComplete="finish_date"
                      name="finish_date"
                      value={this.state.finish_date}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày kết thúc dự án bắt buộc nhập
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Quy Mô Dự Án</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Quy Mô Dự Án"
                      autoComplete="size"
                      name="size"
                      value={this.state.size}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Quy mô dự án có thể nhập hoặc không
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
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">File Đính Kèm</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="File Đính Kèm"
                      autoComplete="file"
                      name="file"
                      value={this.state.file}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      File đính kèm có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Khách Hàng</CFormLabel>

                    <CFormSelect
                      value={this.state.customer}
                      name="customer"
                      aria-label="Vui lòng chọn khách hàng"
                      onChange={this.handleInputChange}
                    >
                      <option key="0" value="">
                        Chọn khách hàng
                      </option>
                      {this.state.customers.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Khách hàng của dự án bắt buộc chọn
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Địa Điểm</CFormLabel>
                    <TextArea
                      rows={4}
                      type="text"
                      placeholder="Địa Điểm"
                      autoComplete="location"
                      name="location"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Địa điểm có thể nhập hoặc không
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
              <h2>Bạn có chắc chắn xoá {this.state.name}?</h2>
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

export default Project
