import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Tag, Space, Button, message, Input, Upload } from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EditOutlined, DeleteOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Loading from '../../../utils/loading'
import openNotificationWithIcon from '../../../utils/notification'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}

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
  CFormFeedback,
  CFormLabel,
  CFormText,
  CImage,
} from '@coreui/react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPencil, cilPlus, cilCircle, cilInfo } from '@coreui/icons'
import Modal from 'react-modal'
const { Column, ColumnGroup } = Table

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
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  async componentDidMount() {
    API({
      REGISTER_URL: '/hrm/companies/?no_pagination=true',
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
      REGISTER_URL: '/hrm/companies/' + item.id + '/',
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
      //   id: this.state.id,
      company: this.state.company,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      tax_code: this.state.tax_code,
      fax: this.state.fax,
      website: this.state.website,
      logo: this.state.logo,
      // logo_key: this.state.logo,
      // name: this.state.name,
      // name: this.state.name,
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
      REGISTER_URL: '/hrm/companies/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        let key = this.state.id
        this.setState((prevState) => ({
          companies: prevState.companies.map((elm) =>
            elm.id === key
              ? {
                  ...elm,
                  company: this.state.company,
                  name: this.state.name,
                  email: this.state.email,
                  phone: this.state.phone,
                  tax_code: this.state.tax_code,
                  fax: this.state.fax,
                  website: this.state.website,
                }
              : elm,
          ),
        }))
        this.closeModal()
        openNotificationWithIcon({
          type: 'success',
          message: 'C???p nh???t d??? li???u th??nh c??ng!!!',
          description: 'C???p nh???t d??? li???u th??nh c??ng!!!',
          placement: 'topRight',
        })
        // setTimeout(function () {
        //   window.location.reload()
        // }, 3000)
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'C???p nh???t d??? li???u kh??ng th??nh c??ng!!!',
          description: error,
          placement: 'topRight',
        }),
      )
  }

  handleDelete = (event) => {
    event.preventDefault()

    const Id = {
      id: this.state.id,
    }
    API({ REGISTER_URL: '/hrm/companies/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          companies: prevState.companies.filter((el) => el.id !== this.state.id),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Xo?? d??? li???u th??nh c??ng',
          description: 'Xo?? d??? li???u th??nh c??ng',
          placement: 'topRight',
        })
        this.closeDeleteModal()
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'success',
          message: 'Xo?? d??? li???u kh??ng th??nh c??ng',
          description: error,
          placement: 'topRight',
        }),
      )
  }
  handleSearch = async (event) => {
    let value = event.target.value
    const REGISTER_URL = '/hrm/companies/?no_pagination=true&search=' + value
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
        <Loading loading={this.state.loading} />

        <h2> C??ng Ty</h2>
        <CRow>
          <CCol md={4}>
            <CTooltip content="Create data" placement="top">
              <Link to="/add-company">
                <CButton color="primary">
                  <CIcon icon={cilPlus} />
                </CButton>
              </Link>
            </CTooltip>
          </CCol>
          <CCol md={8}>
            <Input.Search
              placeholder="Search..."
              onChange={(event) => this.handleSearch(event)}
              className="mb-3"
            />
          </CCol>
        </CRow>
        <Table dataSource={this.state.companies} bordered scroll={{ y: 240 }}>
          <Column title="M??" dataIndex="company" key="nationalty" />
          <Column title="T??n" dataIndex="name" key="name" />
          <Column title="M?? s??? thu???" dataIndex="tax_code" key="tax_code" />
          <Column title="S??T" dataIndex="phone" key="phone" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Website" dataIndex="website" key="website" />
          <Column title="Fax" dataIndex="fax" key="fax" />
          <Column
            title="H??nh ?????ng"
            key={this.state.companies}
            render={(text, record) => (
              // <Space size="middle">
              //   <CTooltip content="Edit data" placement="top">
              //     <Link to={'/company/' + record.id}>
              //       <CButton color="warning" style={{ marginRight: '10px' }}>
              //         <EditOutlined />
              //       </CButton>
              //     </Link>
              //   </CTooltip>
              //   <CTooltip content="Remove data" placement="top">
              //     <CButton color="danger" onClick={() => this.openDeleteModal(text)}>
              //       {/* <CIcon icon={cilDelete} /> */}
              //       <DeleteOutlined />
              //     </CButton>
              //   </CTooltip>
              // </Space>
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
            <CModalTitle>UPDATE</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">M?? C??ng Ty</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="M?? C??ng Ty"
                      autoComplete="company"
                      name="company"
                      value={this.state.company}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ????ng d???nh d???ng SDT
                </CFormText> */}
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">T??n C??ng Ty</CFormLabel>

                    <CFormInput
                      type="text"
                      placeholder="T??n C??ng Ty"
                      autoComplete="name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ????ng d???nh d???ng SDT
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
                      Nh???p ????ng d???nh d???ng Email
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">S??? ??i???n Tho???i</CFormLabel>

                    <CFormInput
                      type="text"
                      placeholder="S??? ??i???n Tho???i"
                      autoComplete="phone"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ????ng d???nh d???ng SDT
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">M?? S??? Thu???</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="M?? S??? Thu???"
                      autoComplete="tax_code"
                      name="tax_code"
                      value={this.state.tax_code}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ????ng d???nh d???ng Email
                    </CFormText> */}
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">S??? Fax</CFormLabel>

                    <CFormInput
                      type="text"
                      placeholder="S??? Fax"
                      autoComplete="fax"
                      name="fax"
                      value={this.state.fax}
                      onChange={this.handleInputChange}
                      // required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ????ng d???nh d???ng SDT
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
                      Nh???p ????ng d???nh d???ng Email
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
                                  message: 'Upload ???nh th??nh c??ng!!!',
                                  description: 'Upload ???nh th??nh c??ng!!!',
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
                                  message: 'Upload ???nh kh??ng th??nh c??ng!!!',
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
                              message: 'Upload ???nh kh??ng th??nh c??ng!!!',
                              description:
                                'Kh??ng ch???p nh???n file v???i ?????nh d???ng n??y. Th??? l???i v???i ?????nh d???ng kh??c',
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
              <h4>?????a Ch??? V??n Ph??ng L??m Vi???c</h4>

              <CContainer>
                {' '}
                <CRow>
                  <CCol md={12}>
                    <CFormLabel htmlFor="exampleFormControlInput1">?????a Ch???</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="address"
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Th??nh Ph???</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="city"
                      autoComplete="city"
                      name="city"
                      value={this.state.city}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                      className="mb-3"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">T???nh</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="province"
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Huy???n</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="district"
                      autoComplete="district"
                      name="district"
                      value={this.state.district}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                      className="mb-3"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">X??</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="commune"
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Qu???c Gia</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="country"
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
                      placeholder="postcode"
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Lo???i</CFormLabel>
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
              <h4>?????a Ch??? Tr??? S??? Ch??nh</h4>
              <CContainer>
                {' '}
                <CRow>
                  <CCol md={12}>
                    <CFormLabel htmlFor="exampleFormControlInput1">?????a Ch???</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="address"
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Th??nh Ph???</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="city"
                      autoComplete="city"
                      name="city2"
                      value={this.state.city2}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                      className="mb-3"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">T???nh</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="province"
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Huy???n</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="district"
                      autoComplete="district"
                      name="district2"
                      value={this.state.district2}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                      className="mb-3"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">X??</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="commune"
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Qu???c Gia</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="country"
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
                      placeholder="postcode"
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Lo???i</CFormLabel>
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
                B???n c?? ch???c ch???n xo?? {this.state.name}?
              </h2>
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
                  HU???
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

export default Company
