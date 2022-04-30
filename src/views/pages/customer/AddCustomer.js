import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Card } from 'antd'

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
  CFormText,
} from '@coreui/react'
import { TOKEN } from '../../../constants/Config'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import CIcon from '@coreui/icons-react'
import { cilCircle } from '@coreui/icons'
import openNotificationWithIcon from '../../../utils/notification'

class AddCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: [],
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
        <h2>Khách Hàng</h2>
        <Card title="Thêm Khách Hàng" bordered={false}>
          <CForm onSubmit={this.handleInsertSubmit}>
            <h3>Thông Tin Cơ Bản</h3>
            <hr />
            <CContainer>
              <CRow className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="exampleFormControlInput1">Tên Công Ty</CFormLabel>
                  <CFormInput
                    type="text"
                    placeholder="Tên Công Ty"
                    autoComplete="company"
                    name="company"
                    onChange={this.handleInputChange}
                    required
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CCol>
                <CCol>
                  <CFormLabel htmlFor="exampleFormControlInput1">Tên Khách Hàng</CFormLabel>

                  <CFormInput
                    type="text"
                    placeholder="Tên Khách Hàng"
                    autoComplete="name"
                    name="name"
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
                    // value={this.state.phone}
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
                  <CFormLabel htmlFor="exampleFormControlInput1">Đường dẫn file</CFormLabel>
                  <CFormInput
                    type="text"
                    placeholder="Đường dẫn file"
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
            <h3>Địa chỉ</h3>

            <hr />
            <h4>Địa Chỉ Trụ Sở Chính</h4>
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
                      placeholder="Địa chỉ"
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
                      placeholder="Quốc gia"
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
                      placeholder="Thành phố"
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
                      placeholder="Tỉnh"
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
                      placeholder="Huyện"
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
                      placeholder="Xã"
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
                      placeholder="Mã Zip"
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
                      placeholder="Loại"
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
              LƯU
            </CButton>
          </CForm>
        </Card>
      </>
    )
  }
}
export default AddCustomer
