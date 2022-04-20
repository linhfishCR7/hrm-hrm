import React, { Component, useEffect, useState } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { useNavigate, useParams } from 'react-router-dom'

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
  CFormText,
  CImage,
  CTooltip,
} from '@coreui/react'
import { TOKEN } from '../../../constants/Config'
import { Link } from 'react-router-dom'

import { UploadOutlined, InboxOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPencil, cilPlus, cilCircle, cilMediaStepBackward } from '@coreui/icons'
import Loading from '../../../utils/loading'

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

const CompanyDetail = () => {
  const { id } = useParams()
  const [dataAdress, setDataAddress] = useState([{}])
  const [data, setData] = useState({})
  const [dataLogo, setDataLogo] = useState({})
  const [loading, setLoading] = useState(true)
  const [newData, setNewData] = useState({ ['name']: 'defaultValue' })

  const fetchAPI = async () => {
    await axios
      .get('/hrm/companies/' + id + '/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const companies = res.data
        setData(companies)
        setDataAddress(companies.addresses)
        setDataLogo(companies.logo)
        setLoading(false)
      })
      .catch((error) => console.log(error))
  }
  useEffect(() => {
    fetchAPI()
  }, [])

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setNewData({
      [name]: value,
    })
    console.log({
      [name]: value,
    })
  }

  return (
    <>
      <Loading loading={loading} />
      <h2>Công Ty</h2>
      <Card title="Chi Tiết Công Ty" bordered={false}>
        <CForm>
          <h3>Basic</h3>
          <hr />
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Mã Công Ty</CFormLabel>

                <CFormInput
                  type="text"
                  label="Mã công ty"
                  //placeholder="abc"
                  // text="Nhập đúng dịnh dạng email"
                  aria-describedby="exampleFormControlInputHelpInline"
                  name="company"
                  defaultValue={data.company}
                  onChange={handleInputChange}
                  required
                />
                {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng SDT
                </CFormText> */}
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Tên Công Ty</CFormLabel>

                <CFormInput
                  type="text"
                  label="Tên công ty"
                  // //placeholder="Tên Công Ty"
                  text="abc"
                  aria-describedby="exampleFormControlInputHelpInline"
                  name="name"
                  defaultValue={data.name}
                  onChange={handleInputChange}
                  required
                />
                {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng SDT
                </CFormText> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Địa Chỉ Email</CFormLabel>
                <CFormInput
                  type="email"
                  label="Email address"
                  // //placeholder="name@example.com"
                  text="Nhập đúng dịnh dạng email"
                  aria-describedby="exampleFormControlInputHelpInline"
                  name="email"
                  defaultValue={data.email}
                  onChange={handleInputChange}
                  required
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng email
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Số Điện Thoại</CFormLabel>

                <CFormInput
                  type="tel"
                  label="Số điện thoại"
                  // //placeholder="+(84)034266666"
                  text="Nhập đúng dịnh dạng SDT"
                  aria-describedby="exampleFormControlInputHelpInline"
                  name="phone"
                  defaultValue={data.phone}
                  onChange={handleInputChange}
                  required
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
                  label="Mã số thuế"
                  // //placeholder="123456789"
                  // text="Nhập đúng dịnh dạng email"
                  aria-describedby="exampleFormControlInputHelpInline"
                  name="tax_code"
                  defaultValue={data.tax_code}
                  onChange={handleInputChange}
                  required
                />
                {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng SDT
                </CFormText> */}
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Số Fax</CFormLabel>

                <CFormInput
                  type="text"
                  label="Số Fax"
                  // //placeholder="034266666"
                  // text="abc"
                  aria-describedby="exampleFormControlInputHelpInline"
                  name="fax"
                  defaultValue={data.fax}
                  onChange={handleInputChange}
                  required
                />
                {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng SDT
                </CFormText> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Website</CFormLabel>

                <CFormInput
                  type="text"
                  label="Website"
                  // //placeholder="http://example.com/"
                  // text="Nhập đúng dịnh dạng email"
                  aria-describedby="exampleFormControlInputHelpInline"
                  name="website"
                  defaultValue={data.website}
                  onChange={handleInputChange}
                  required
                />
                {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng SDT
                </CFormText> */}
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Logo</CFormLabel>
                {/* <CFormInput
                  type="file"
                  label="Số Fax"
                  // //placeholder="034266666"
                  // text="abc"
                  aria-describedby="exampleFormControlInputHelpInline"
                  name="logo"
                  defaultValue={dataLogo.image_key}
                  onChange={handleInputChange}
                  className="mb-3"
                /> */}
                {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng SDT
                </CFormText> */}
                <CImage rounded thumbnail src={dataLogo.image_s3_url} width={200} height={200} />
              </CCol>
            </CRow>
          </CContainer>

          <h3>Địa chỉ</h3>
          <hr />
          {dataAdress.map((n) => (
            <>
              {n.type === 'working_office_address' ? (
                <h4>Địa Chỉ Văn Phòng Làm Việc</h4>
              ) : (
                <h4>Địa Chỉ Trụ Sở Chính</h4>
              )}
              <CContainer key={n.address}>
                {' '}
                <CRow>
                  <CCol md={12}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilCircle} />{' '}
                      </CInputGroupText>{' '}
                      <CFormInput
                        type="text"
                        //placeholder="Địa chỉ"
                        autoComplete="company"
                        name="address"
                        defaultValue={n.address}
                        onChange={handleInputChange}
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
                        //placeholder="Quốc gia"
                        autoComplete="country"
                        name="country"
                        defaultValue={n.country}
                        // onChange={this.handleInputChange}
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
                        //placeholder="Thành phố"
                        autoComplete="city"
                        name="city"
                        defaultValue={n.city}
                        // onChange={this.handleInputChange}
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
                        //placeholder="Tỉnh"
                        autoComplete="province"
                        name="province"
                        defaultValue={n.province}

                        // onChange={this.handleInputChange}
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
                        //placeholder="Huyện"
                        autoComplete="district"
                        name="district"
                        defaultValue={n.district}

                        // onChange={this.handleInputChange}
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
                        //placeholder="Xã"
                        autoComplete="commune"
                        name="commune"
                        defaultValue={n.commune}

                        // onChange={this.handleInputChange}
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
                        //placeholder="Mã Zip"
                        autoComplete="postcode"
                        name="postcode"
                        defaultValue={n.postcode}

                        // onChange={this.handleInputChange}
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
                        //placeholder="Loại"
                        autoComplete="type"
                        name="type"
                        // defaultValue="working_office_address"
                        defaultValue={n.type}
                        // onChange={this.handleInputChange}
                      />
                    </CInputGroup>{' '}
                  </CCol>
                </CRow>
              </CContainer>
            </>
          ))}
          <CTooltip content="Back List Data" placement="top">
            <Link to={'/company/'}>
              <CButton color="info" style={{ marginRight: '10px' }}>
                <CIcon icon={cilMediaStepBackward} />
              </CButton>
            </Link>
          </CTooltip>
        </CForm>
      </Card>
    </>
  )
}

export default CompanyDetail
