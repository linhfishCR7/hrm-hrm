import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import {
  Table,
  message,
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Card,
  Input,
} from 'antd'

import {
  CButton,
  CRow,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CContainer,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormText,
} from '@coreui/react'
import { TOKEN } from '../../../constants/Config'
import { UploadOutlined, InboxOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPencil, cilPlus, cilCircle } from '@coreui/icons'

class AddCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: [],
      companies: [],
      loading: false,
      key: '',
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      company: '',
      name: '',
      phone: '',
      email: '',
      file: '',
      website: '',
      addresses: [
        {
          address: '',
          country: '',
          city: '',
          province: '',
          district: '',
          commune: '',
          postcode: '',
          lat: '',
          lng: '',
          type: '',
        },
      ],
    }
  }
  async componentDidMount() {
    await axios
      .get('/hrm/companies/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const companies = res.data
        this.setState({
          companies: companies,
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
  }

  handleInsertSubmit = async (event) => {
    event.preventDefault()

    const newItem = {
      company: this.state.company,
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      file: this.state.file,
      website: this.state.website,
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
          type: 'head_office_address',
        },
      ],
    }
    await axios
      .post('/hrm/customers/', newItem, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        message.success({
          content: 'Add data Success!!!',
          duration: 5,
          maxCount: 1,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        })
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

  render() {
    const { loading, imageUrl } = this.state
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <>
        <h2>Kh??ch H??ng</h2>
        <Card title="Th??m Kh??ch H??ng" bordered={false}>
          <CForm onSubmit={this.handleInsertSubmit}>
            <h3>Basic</h3>
            <hr />
            <CContainer>
              <CRow className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="exampleFormControlInput1">M?? C??ng Ty</CFormLabel>
                  <CFormSelect
                    // value={this.state.company}
                    name="company"
                    aria-label="Please choose your company"
                    onChange={this.handleInputChange}
                  >
                    <option key="0" value="">
                      Ch???n c??ng ty
                    </option>
                    {this.state.companies.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol>
                  <CFormLabel htmlFor="exampleFormControlInput1">T??n Kh??ch H??ng</CFormLabel>

                  <CFormInput
                    type="text"
                    placeholder="T??n Kh??ch H??ng"
                    autoComplete="name"
                    name="name"
                    // value={this.state.name}
                    onChange={this.handleInputChange}
                    required
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
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
                    // value={this.state.email}
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
                    // value={this.state.phone}
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
                  <CFormLabel htmlFor="exampleFormControlInput1">???????ng d???n file</CFormLabel>
                  <CFormInput
                    type="text"
                    placeholder="???????ng d???n file"
                    autoComplete="file"
                    name="file"
                    // value={this.state.file}
                    onChange={this.handleInputChange}
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CCol>
                <CCol>
                  <CFormLabel htmlFor="exampleFormControlInput1">Website</CFormLabel>
                  <CFormInput
                    type="text"
                    placeholder="Website"
                    autoComplete="website"
                    name="website"
                    // value={this.state.website}
                    onChange={this.handleInputChange}
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CCol>
              </CRow>
            </CContainer>
            <h3>?????a ch???</h3>

            <hr />
            <h4>?????a Ch??? Tr??? S??? Ch??nh</h4>
            <CContainer>
              {' '}
              <CRow>
                <CCol md={12}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="?????a ch???"
                      autoComplete="company"
                      name="address"
                      onChange={this.handleInputChange}
                      required
                    />
                  </CInputGroup>{' '}
                </CCol>
              </CRow>
              <CRow>
                <CCol md={6}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="Qu???c gia"
                      autoComplete="country"
                      name="country"
                      onChange={this.handleInputChange}
                    />
                  </CInputGroup>{' '}
                </CCol>
                <CCol md={6}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="Th??nh ph???"
                      autoComplete="city"
                      name="city"
                      onChange={this.handleInputChange}
                    />
                  </CInputGroup>{' '}
                </CCol>
              </CRow>
              <CRow>
                <CCol md={6}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="T???nh"
                      autoComplete="province"
                      name="province"
                      onChange={this.handleInputChange}
                    />
                  </CInputGroup>{' '}
                </CCol>
                <CCol md={6}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="Huy???n"
                      autoComplete="district"
                      name="district"
                      onChange={this.handleInputChange}
                    />
                  </CInputGroup>{' '}
                </CCol>
              </CRow>
              <CRow>
                <CCol md={6}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="X??"
                      autoComplete="commune"
                      name="commune"
                      onChange={this.handleInputChange}
                    />
                  </CInputGroup>{' '}
                </CCol>
                <CCol md={6}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="M?? Zip"
                      autoComplete="postcode"
                      name="postcode"
                      onChange={this.handleInputChange}
                    />
                  </CInputGroup>{' '}
                </CCol>
              </CRow>
              <CRow style={{ display: 'none' }}>
                <CCol md={6} style={{ display: 'none' }}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="text"
                      placeholder="Lo???i"
                      autoComplete="type"
                      name="type"
                      value="working_office_address"
                      onChange={this.handleInputChange}
                    />
                  </CInputGroup>{' '}
                </CCol>
              </CRow>
            </CContainer>
            <CButton color="primary" type="submit">
              Submit
            </CButton>
          </CForm>
        </Card>
      </>
    )
  }
}
export default AddCustomer
