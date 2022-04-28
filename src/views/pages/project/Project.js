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
                            message.success({
                              content: 'Upload ảnh thành công!!!',
                              duration: 5,
                              maxCount: 1,
                              className: 'custom-class',
                              style: {
                                marginTop: '20vh',
                              },
                            })
                          })
                          .catch((error) => {
                            this.setState({
                              loading: false,
                            })

                            onError(error)
                            message.error({
                              content: JSON.stringify(error),
                              duration: 5,
                              maxCount: 1,
                              className: 'custom-class',
                              style: {
                                marginTop: '20vh',
                              },
                            })
                          })
                      })
                      .catch((error) => {
                        this.setState({
                          loading: false,
                        })

                        message.error({
                          content:
                            'Không chấp nhận file với định dạng này. Thử lại với định dạng khác',
                          duration: 5,
                          maxCount: 1,
                          className: 'custom-class',
                          style: {
                            marginTop: '20vh',
                          },
                        })
                      })
                  }}
                >
                  <Button loading={this.state.loading}>
                    <UploadOutlined /> Tải Hình Ảnh
                  </Button>
                </Upload>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập số hợp đồng
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
                  Vui lòng nhập tên dự án!
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
                  Vui lòng nhập dịch vụ
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
                  Vui lòng nhập số hợp đồng
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
                  Vui lòng nhập ngày đăng ký!
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
                  Vui lòng nhập ngày bắt đầu
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
                  Vui lòng nhập ngày kết thúc
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Kích Cỡ Dự Án</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Kích Cỡ Dự Án"
                  autoComplete="size"
                  name="size"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập ngày đăng ký!
                </CFormText> */}
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
                {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập ngày kết thúc
                </CFormText> */}
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
                  Vui lòng chọn khách hàng!
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
                  Vui lòng nhập địa điểm!
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
            <CModalTitle>CẬP NHẬT</CModalTitle>
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
                                message.success({
                                  content: 'Upload ảnh thành công!!!',
                                  duration: 5,
                                  maxCount: 1,
                                  className: 'custom-class',
                                  style: {
                                    marginTop: '20vh',
                                  },
                                })
                              })
                              .catch((error) => {
                                this.setState({
                                  loading: false,
                                })

                                onError(error)
                                message.error({
                                  content: JSON.stringify(error),
                                  duration: 5,
                                  maxCount: 1,
                                  className: 'custom-class',
                                  style: {
                                    marginTop: '20vh',
                                  },
                                })
                              })
                          })
                          .catch((error) => {
                            this.setState({
                              loading: false,
                            })

                            message.error({
                              content:
                                'Không chấp nhận file với định dạng này. Thử lại với định dạng khác',
                              duration: 5,
                              maxCount: 1,
                              className: 'custom-class',
                              style: {
                                marginTop: '20vh',
                              },
                            })
                          })
                      }}
                    >
                      <Button loading={this.state.loading}>
                        <UploadOutlined /> Tải Hình Ảnh
                      </Button>
                    </Upload>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập số hợp đồng
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
                      value={this.state.name}
                      name="name"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập tên dự án!
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Dịch Vụ</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Dịch Vụ"
                      autoComplete="service"
                      value={this.state.service}
                      name="service"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập dịch vụ
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
                      value={this.state.contract_number}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập số hợp đồng
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
                      value={this.state.signing_date}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập ngày đăng ký!
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
                      Vui lòng nhập ngày bắt đầu
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
                      Vui lòng nhập ngày kết thúc
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Kích Cỡ Dự Án</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Kích Cỡ Dự Án"
                      autoComplete="size"
                      value={this.state.size}
                      name="size"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập ngày đăng ký!
                </CFormText> */}
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ghi Chú</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Ghi Chú"
                      autoComplete="note"
                      name="note"
                      value={this.state.note}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">File Đính Kèm</CFormLabel>
                    <CFormInput
                      type="text"
                      value={this.state.file}
                      placeholder="File Đính Kèm"
                      autoComplete="file"
                      name="file"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui lòng nhập ngày kết thúc
                </CFormText> */}
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
                      Vui lòng chọn khách hàng!
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
                      value={this.state.location}
                      name="location"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập địa điểm!
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

export default Project
