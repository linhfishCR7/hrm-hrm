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
  CImage,
} from '@coreui/react'
import { TOKEN } from '../../../constants/Config'
import { UploadOutlined, InboxOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPencil, cilPlus, cilCircle } from '@coreui/icons'

const { Option } = Select
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const normFile = (e) => {
  console.log('Upload event:', e)

  if (Array.isArray(e)) {
    console.log('Upload event1:', e)
    return e
  }

  return e && e.fileList
}

// const onFinish = (values) => {
//   console.log('Received values of form: ', values)
// }

// function getBase64(img, callback) {
//   const reader = new FileReader()
//   reader.addEventListener('load', () => callback(reader.result))
//   reader.readAsDataURL(img)
// }

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!')
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!')
//   }
//   return isJpgOrPng && isLt2M
// }

class AddCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      companies: [],
      loading: false,
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

  // handleChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true })
  //     return
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, (imageUrl) =>
  //       this.setState({
  //         imageUrl,
  //         loading: false,
  //       }),
  //     )
  //   }
  // }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  handleInsertSubmit = async (value) => {
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
    await axios
      .post('/hrm/companies/', newItem, {
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
        // setTimeout(function () {
        //   window.location.reload()
        // }, 3000)
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
        <h2>Công Ty</h2>
        <Card title="Thêm Công Ty" bordered={false}>
          <Form name="validate_other" {...formItemLayout} onFinish={this.handleInsertSubmit}>
            <h3>Basic</h3>
            <hr />
            <Form.Item
              name="company"
              label="Company"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập company!',
                },
              ]}
              onChange={this.handleInputChange}
            >
              <Input placeholder="Vui lòng nhập company" />
            </Form.Item>
            <Form.Item
              name="name"
              label="Tên công ty"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên công ty!',
                },
              ]}
              onChange={this.handleInputChange}
            >
              <Input placeholder="Vui lòng nhập tên công ty" />
            </Form.Item>
            <Form.Item
              name="tax_code"
              label="Mã số thuế"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã số thuế!',
                },
              ]}
              onChange={this.handleInputChange}
            >
              <Input placeholder="Vui lòng nhập mã số thuế" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="SĐT"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập SDT!',
                },
              ]}
              onChange={this.handleInputChange}
            >
              <Input placeholder="Vui lòng nhập SDT" type="tel" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
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
              <Input placeholder="Vui lòng nhập Email" />
            </Form.Item>
            <Form.Item
              name="website"
              label="Website"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập website!',
                },
              ]}
              onChange={this.handleInputChange}
            >
              <Input placeholder="Vui lòng nhập website" />
            </Form.Item>
            <Form.Item
              name="fax"
              label="Số Fax"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập fax!',
                },
              ]}
              onChange={this.handleInputChange}
            >
              <Input placeholder="Vui lòng nhập fax" />
            </Form.Item>
            <Form.Item label="Logo">
              <Upload
                disabled={this.state.loading}
                accept="image/*"
                customRequest={({ file, onError, onSuccess, onProgress }) => {
                  const fileType = file.type
                  const file_name = file.name
                  console.log('Preparing the upload')
                  console.log('fileType', fileType)

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
                  <UploadOutlined /> Click to Upload
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
            <h3>Địa chỉ</h3>

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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </>
    )
  }
}
export default AddCompany
