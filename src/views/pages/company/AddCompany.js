import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import openNotificationWithIcon from '../../../utils/notification'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import Page404 from '../page404/Page404'

import { Form, Button, Upload, Card, Input } from 'antd'

import {
  CRow,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CContainer,
  CImage,
  CButton,
} from '@coreui/react'
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import CIcon from '@coreui/icons-react'
import { cilCircle } from '@coreui/icons'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class AddCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      companies: [],
      loading: false,
      status: true,
      key: '',
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
      logo: '',
      logo_url: '',
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
        {
          address2: '',
          country2: '',
          city2: '',
          province2: '',
          district2: '',
          commune2: '',
          postcode2: '',
          lat2: '',
          lng2: '',
          type2: '',
        },
      ],
    }
  }
  componentDidMount() {
    if (localStorage.getItem('role') !== 'admin') {
      this.setState({
        status: false,
      })
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

  handleInsertSubmit = (value) => {
    const newItem = {
      company: value['company'],
      name: value['name'],
      phone: value['phone'],
      email: value['email'],
      tax_code: value['tax_code'],
      fax: value['fax'],
      website: value['website'],
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
    API({ REGISTER_URL: '/admin/companies/', ACTION: 'POST', DATA: newItem })
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
        {this.state.status ? (
          <>
            <h2>Thêm Công Ty</h2>
            <Card title="" bordered={false}>
              <Form name="validate_other" {...formItemLayout} onFinish={this.handleInsertSubmit}>
                <h3>Thông Tin Cơ Bản</h3>
                <hr />
                <Form.Item
                  name="company"
                  label={
                    <>
                      <b>Mã công ty</b>
                    </>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mã công ty!',
                    },
                  ]}
                  onChange={this.handleInputChange}
                >
                  <Input placeholder="vd: ITR" />
                </Form.Item>
                <Form.Item
                  name="name"
                  label={
                    <>
                      <b>Tên công ty</b>
                    </>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên công ty!',
                    },
                  ]}
                  onChange={this.handleInputChange}
                >
                  <Input placeholder="vd: Công ty cổng phần ITR" />
                </Form.Item>
                <Form.Item
                  name="tax_code"
                  label={
                    <>
                      <b>Mã số thuế</b>
                    </>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mã số thuế!',
                    },
                  ]}
                  onChange={this.handleInputChange}
                >
                  <Input placeholder="vd: 123456789" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label={
                    <>
                      <b>Số điện thoại</b>
                    </>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập SDT!',
                    },
                  ]}
                  onChange={this.handleInputChange}
                >
                  <Input placeholder="vd: +84342666676" type="tel" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label={
                    <>
                      <b>Email</b>
                    </>
                  }
                  rules={[
                    {
                      type: 'email',
                      message: 'Vui lòng nhập đúng định dạng email!',
                    },
                    {
                      required: true,
                      message: 'Vui lòng nhập Email!',
                    },
                  ]}
                  onChange={this.handleInputChange}
                >
                  <Input placeholder="vd: info@gmail.com" />
                </Form.Item>
                <Form.Item
                  label={
                    <>
                      <b>Link website</b>
                    </>
                  }
                  name="website"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập website!',
                    },
                  ]}
                  onChange={this.handleInputChange}
                >
                  <Input placeholder="vd: http://example.com" />
                </Form.Item>
                <Form.Item
                  label={
                    <>
                      <b>Số fax</b>
                    </>
                  }
                  name="fax"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập fax!',
                    },
                  ]}
                  onChange={this.handleInputChange}
                >
                  <Input placeholder="vd: 123456789" />
                </Form.Item>
                <Form.Item
                  label={
                    <>
                      <b>Logo</b>
                    </>
                  }
                >
                  <Upload
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
                            message: 'Tải ảnh không thành công!!!',
                            description:
                              'Không chấp nhận file với định dạng này. Thử lại với định dạng khác',
                            placement: 'topRight',
                          })
                        })
                    }}
                  >
                    <Button loading={this.state.loading}>
                      <UploadOutlined /> Bấm vào để tải ảnh lên
                    </Button>
                  </Upload>
                  {this.state.logo_url ? (
                    <CImage rounded thumbnail src={this.state.logo_url} width={200} height={200} />
                  ) : (
                    ''
                  )}
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    span: 12,
                    offset: 6,
                  }}
                >
                  {' '}
                </Form.Item>
                <h3>Thông Tin Địa chỉ</h3>

                <hr />
                <h4>Địa Chỉ Văn Phòng Làm Việc</h4>
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
                <CContainer>
                  {' '}
                  <h4>Địa Chỉ Trụ Sở Chính</h4>
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
                          name="address2"
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
                          name="country2"
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
                          name="city2"
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
                          name="province2"
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
                          name="district2"
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
                          name="commune2"
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
                          name="postcode2"
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
                          name="type2"
                          value="working_office_address"
                          onChange={this.handleInputChange}
                        />
                      </CInputGroup>{' '}
                    </CCol>
                  </CRow>
                </CContainer>
                <CButton color="primary" type="submit">
                  Lưu
                </CButton>
              </Form>
            </Card>
          </>
        ) : (
          <Page404 />
        )}
      </>
    )
  }
}
export default AddCompany
