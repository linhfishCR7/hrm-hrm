import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Button, Input, Upload } from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Loading from '../../../utils/loading'
import openNotificationWithIcon from '../../../utils/notification'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import Page404 from '../page404/Page404'
import {
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
  CFormLabel,
  CFormText,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilCircle, cilInfo } from '@coreui/icons'
import Modal from 'react-modal'
const { Column } = Table

class Company extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companies: [],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      company: '',
      name: '',
      tax_code: '',
      phone: '',
      email: '',
      fax: '',
      website: '',
      logo_key: '',
      logo: '',
      logo_url: '',
      address: '',
      country: '',
      city: '',
      province: '',
      district: '',
      commune: '',
      postcode: '',
      lat: '',
      lng: '',
      type: 'working_office_address',
      address2: '',
      country2: '',
      city2: '',
      province2: '',
      district2: '',
      commune2: '',
      postcode2: '',
      lat2: '',
      lng2: '',
      type2: 'head_office_address',
      loading: true,
      status: true,
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('role') !== 'admin') {
      this.setState({
        status: false,
      })
    }
    API({
      REGISTER_URL: '/admin/companies/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const companies = res.data
        this.setState({
          companies: companies,
          logo: res.data.logo,
          loading: false,
        })
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: error,
          description: error,
          placement: 'topRight',
        }),
      )
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
    API({
      REGISTER_URL: '/admin/companies/' + item.id + '/',
      ACTION: 'GET',
    })
      .then((res) => {
        const companies = res.data
        this.setState({
          modalIsOpen: true,
          id: companies.id,
          company: companies.company,
          name: companies.name,
          email: companies.email,
          phone: companies.phone,
          tax_code: companies.tax_code,
          fax: companies.fax,
          website: companies.website,
          logo_key: companies.logo.image_key,
          logo_url: companies.logo.image_s3_url,

          address: companies.addresses[0].address,
          country: companies.addresses[0].country,
          city: companies.addresses[0].city,
          province: companies.addresses[0].province,
          district: companies.addresses[0].district,
          commune: companies.addresses[0].commune,
          postcode: companies.addresses[0].postcode,
          lat: companies.addresses[0].lat,
          lng: companies.addresses[0].lng,
          type: 'working_office_address',
          address2: companies.addresses[1].address,
          country2: companies.addresses[1].country,
          city2: companies.addresses[1].city,
          province2: companies.addresses[1].province,
          district2: companies.addresses[1].district,
          commune2: companies.addresses[1].commune,
          postcode2: companies.addresses[1].postcode,
          lat2: companies.addresses[1].lat,
          lng2: companies.addresses[1].lng,
          type2: 'head_office_address',
        })
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: error,
          description: error,
          placement: 'topRight',
        }),
      )
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
      company: this.state.company,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      tax_code: this.state.tax_code,
      fax: this.state.fax,
      website: this.state.website,
      logo: this.state.logo,

      addresses: [
        {
          address: this.state.address,
          country: this.state.country,
          city: this.state.city,
          province: this.state.province,
          district: this.state.district,
          commune: this.state.commune,
          postcode: this.state.postcode,
          lat: this.state.lat,
          lng: this.state.lng,
          type: 'working_office_address',
        },
        {
          address: this.state.address2,
          country: this.state.country2,
          city: this.state.city2,
          province: this.state.province2,
          district: this.state.district2,
          commune: this.state.commune2,
          postcode: this.state.postcode2,
          lat: this.state.lat2,
          lng: this.state.lng2,
          type: 'head_office_address',
        },
      ],
    }
    API({
      REGISTER_URL: '/admin/companies/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        API({
          REGISTER_URL: '/admin/companies/?no_pagination=true',
          ACTION: 'GET',
        })
          .then((res) => {
            const companies = res.data
            this.setState({
              companies: companies,
              logo: res.data.logo,
              loading: false,
            })
          })
          .catch((error) =>
            openNotificationWithIcon({
              type: 'error',
              message: error,
              description: error,
              placement: 'topRight',
            }),
          )
        openNotificationWithIcon({
          type: 'success',
          message: 'Cập nhật dữ liệu thành công!!!',
          description: 'Cập nhật dữ liệu thành công!!!',
          placement: 'topRight',
        })
        this.closeModal()
      })
      .catch(function (error) {
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

  handleDelete = (event) => {
    event.preventDefault()

    API({ REGISTER_URL: '/admin/companies/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          companies: prevState.companies.filter((el) => el.id !== this.state.id),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Xoá dữ liệu thành công',
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
            description: error.response.data.message,
            placement: 'topRight',
          })
          this.closeDeleteModal()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Xoá dữ liệu không thành công!!!',
            description: error,
            placement: 'topRight',
          })
          this.closeDeleteModal()
        }
      })
  }
  handleSearch = async (event) => {
    let value = event.target.value
    const REGISTER_URL = '/admin/companies/?no_pagination=true&search=' + value
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    })
    this.setState({ companies: res.data })
  }
  render() {
    return (
      <>
        {this.state.status ? (
          <>
            <Loading loading={this.state.loading} />

            <h2> Công Ty</h2>
            <CRow>
              <CCol md={4}>
                <CTooltip content="Thêm Dữ Liệu" placement="top">
                  <Link to="/add-company">
                    <CButton color="primary">
                      <CIcon icon={cilPlus} /> Thêm Công Ty
                    </CButton>
                  </Link>
                </CTooltip>
              </CCol>
              <CCol md={8}>
                <Input.Search
                  placeholder="Tìm kiếm tên công ty, mã số công ty"
                  onChange={(event) => this.handleSearch(event)}
                  className="mb-3"
                />
              </CCol>
            </CRow>
            <Table dataSource={this.state.companies} bordered>
              <Column title="Mã" dataIndex="company" key="nationalty" />
              <Column title="Tên" dataIndex="name" key="name" />
              <Column title="Mã số thuế" dataIndex="tax_code" key="tax_code" />
              <Column title="SĐT" dataIndex="phone" key="phone" />
              <Column title="Email" dataIndex="email" key="email" />
              <Column title="Website" dataIndex="website" key="website" />
              <Column title="Fax" dataIndex="fax" key="fax" />
              <Column
                title="Hành động"
                key={this.state.companies}
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
                    <CTooltip content="Detail data" placement="top">
                      <Link to={'/company/' + record.id}>
                        <CButton color="info" style={{ marginRight: '10px' }}>
                          <CIcon icon={cilInfo} />
                        </CButton>
                      </Link>
                    </CTooltip>
                  </Space>
                )}
              />
            </Table>
            <CModal visible={this.state.modalIsOpen} onClose={this.closeModal} size="xl">
              <CModalHeader>
                <CModalTitle>Cập nhật</CModalTitle>{' '}
              </CModalHeader>
              <CModalBody>
                <CForm onSubmit={this.handleEditSubmit}>
                  <CContainer>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Mã Công Ty</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Mã Công Ty"
                          autoComplete="company"
                          name="company"
                          value={this.state.company}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
          Nhập đúng dịnh dạng SDT
        </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Tên Công Ty</CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Tên Công Ty"
                          autoComplete="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
          Nhập đúng dịnh dạng SDT
        </CFormText> */}
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Email"
                          autoComplete="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập đúng dịnh dạng Email
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Số Điện Thoại</CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Số Điện Thoại"
                          autoComplete="phone"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập đúng dịnh dạng SDT
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Mã Số Thuế</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Mã Số Thuế"
                          autoComplete="tax_code"
                          name="tax_code"
                          value={this.state.tax_code}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
              Nhập đúng dịnh dạng Email
            </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Số Fax</CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Số Fax"
                          autoComplete="fax"
                          name="fax"
                          value={this.state.fax}
                          onChange={this.handleInputChange}
                          // required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
              Nhập đúng dịnh dạng SDT
            </CFormText> */}
                      </CCol>
                    </CRow>
                    <CRow className="mb-5">
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Website</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Website"
                          autoComplete="website"
                          name="website"
                          value={this.state.website}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
              Nhập đúng dịnh dạng Email
            </CFormText> */}
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Logo</CFormLabel>
                        <br />
                        <Upload.Dragger
                          disabled={this.state.loading}
                          accept="image/*"
                          customRequest={({ file, onError, onSuccess, onProgress }) => {
                            const fileType = file.type
                            const file_name = file.name
                            // const key = `videos/${generateDateForFileName()}_${fileName}`
                            // const file_name = { fileName }

                            this.setState({
                              key: file.name,
                              loading: true,
                            })

                            axios
                              .post('/common/upload/policy/', {
                                file_name,
                              })
                              .then((results) => {
                                var returnData = results.data
                                var signedRequest = returnData.url
                                var content = returnData.fields
                                var formData = new FormData()
                                Object.keys(returnData.fields).forEach((key) =>
                                  formData.append(key, returnData.fields[key]),
                                )
                                formData.append('file', file)

                                // var t0 = performance.now()
                                fetch(signedRequest, {
                                  method: 'POST',
                                  body: formData,
                                })
                                  .then((result) => {
                                    var t1 = performance.now()
                                    // console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.')
                                    this.setState({
                                      loading: false,
                                      logo: content.key,
                                      logo_url: signedRequest + content.key,
                                    })
                                    onSuccess(result, file)

                                    openNotificationWithIcon({
                                      type: 'success',
                                      message: 'Upload ảnh thành công!!!',
                                      description: 'Upload ảnh thành công!!!',
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
                                      description: JSON.stringify(error),
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
                                  message: 'Upload ảnh không thành công!!!',
                                  description:
                                    'Không chấp nhận file với định dạng này. Thử lại với định dạng khác',
                                  placement: 'topRight',
                                })
                              })
                          }}
                        >
                          <Button loading={this.state.loading}>
                            <UploadOutlined /> Click to Upload
                          </Button>
                        </Upload.Dragger>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md={8}></CCol>
                      <CCol md={4}>
                        {this.state.logo_url ? (
                          <CImage
                            rounded
                            thumbnail
                            src={this.state.logo_url}
                            width={200}
                            height={200}
                          />
                        ) : (
                          ''
                        )}
                      </CCol>
                    </CRow>
                  </CContainer>
                  <h4>Địa Chỉ Văn Phòng Làm Việc</h4>

                  <CContainer>
                    {' '}
                    <CRow>
                      <CCol md={12}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Địa Chỉ</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Địa Chỉ"
                          autoComplete="address"
                          name="address"
                          value={this.state.address}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Thành Phố</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Thành Phố"
                          autoComplete="city"
                          name="city"
                          value={this.state.city}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Tỉnh</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Tỉnh"
                          autoComplete="province"
                          name="province"
                          value={this.state.province}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Huyện</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Huyện"
                          autoComplete="district"
                          name="district"
                          value={this.state.district}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Xã</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Xã"
                          autoComplete="commune"
                          name="commune"
                          value={this.state.commune}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Quốc Gia</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Quốc Gia"
                          autoComplete="country"
                          name="country"
                          value={this.state.country}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Zip</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Mã Code"
                          autoComplete="postcode"
                          name="postcode"
                          value={this.state.postcode}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow style={{ display: 'none' }}>
                      <CCol md={6} style={{ display: 'none' }}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Loại</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="type"
                          autoComplete="type"
                          name="type"
                          value={this.state.type}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                  </CContainer>
                  <h4>Địa Chỉ Trụ Sở Chính</h4>
                  <CContainer>
                    {' '}
                    <CRow>
                      <CCol md={12}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Địa Chỉ</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Địa Chỉ"
                          autoComplete="address"
                          name="address2"
                          value={this.state.address2}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Thành Phố</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Thành Phố"
                          autoComplete="city"
                          name="city2"
                          value={this.state.city2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Tỉnh</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Tỉnh"
                          autoComplete="province"
                          name="province2"
                          value={this.state.province2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Huyện</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Huyện"
                          autoComplete="district"
                          name="district2"
                          value={this.state.district2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Xã</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Xã"
                          autoComplete="commune"
                          name="commune2"
                          value={this.state.commune2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Quốc Gia</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Quốc Gia"
                          autoComplete="country"
                          name="country2"
                          value={this.state.country2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Zip</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Mã Code"
                          autoComplete="postcode"
                          name="postcode2"
                          value={this.state.postcode2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow style={{ display: 'none' }}>
                      <CCol md={6} style={{ display: 'none' }}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Loại</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="type"
                          autoComplete="type"
                          name="type2"
                          value={this.state.type2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
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
            <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
              <CModalHeader>
                <CModalTitle>Xoá</CModalTitle>{' '}
              </CModalHeader>
              <CModalBody>
                <CForm onSubmit={this.handleDelete}>
                  <h2>Bạn có chắc chắn xoá {this.state.name}?</h2>
                  <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="company"
                      autoComplete="company"
                      name="id"
                      value={this.state.id}
                      onChange={this.handleInputChange}
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

export default Company
