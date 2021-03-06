import React, { Component, useEffect, useState } from 'react'
import axios from '../../../utils/axios'
import axios1 from 'axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../../utils/loading'

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
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [dataCompany, setdataCompany] = useState({})
  const [dataAdress, setDataAddress] = useState([])

  const fetchAPI = async () => {
    await axios
      .get('/hrm/customers/' + id + '/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const customers = res.data
        setData(customers)
        setDataAddress(customers.addresses[0])
        setdataCompany(customers.company)
        setLoading(false)
      })
      .catch((error) => console.log(error))
  }
  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <>
      <Loading loading={loading} />

      <h2>Chi Ti???t Kh??ch H??ng</h2>
      <Card title="Chi Ti???t Kh??ch H??ng" bordered={false}>
        <CForm>
          <h3>Basic</h3>
          <hr />
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Thu???c C??ng Ty</CFormLabel>

                <CFormInput
                  type="text"
                  label="Thu???c c??ng ty"
                  //placeholder="abc"
                  // text="Nh???p ????ng d???nh d???ng email"
                  aria-describedby="exampleFormControlInputHelpInline"
                  name="company"
                  value={dataCompany.name}
                />
                {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ????ng d???nh d???ng SDT
                </CFormText> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">?????a Ch??? Email</CFormLabel>
                <CFormInput type="email" label="Email address" name="email" value={data.email} />
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">S??? ??i???n Tho???i</CFormLabel>

                <CFormInput type="tel" label="S??? ??i???n tho???i" name="phone" value={data.phone} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">File</CFormLabel>

                <CFormInput type="text" label="File" name="file" value={data.file} />
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>

                <CFormInput type="text" label="name" name="name" value={data.name} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Website</CFormLabel>

                <CFormInput type="text" label="Website" name="website" value={data.website} />
              </CCol>
            </CRow>
          </CContainer>

          <h3>?????a ch???</h3>
          <hr />
          <>
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
                      autoComplete="company"
                      name="address"
                      value={dataAdress.address}
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
                      //placeholder="Qu???c gia"
                      autoComplete="country"
                      name="country"
                      value={dataAdress.country}
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
                      autoComplete="city"
                      name="city"
                      value={dataAdress.city}
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
                      //placeholder="T???nh"
                      autoComplete="province"
                      name="province"
                      value={dataAdress.province}
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
                      //placeholder="Huy???n"
                      autoComplete="district"
                      name="district"
                      value={dataAdress.district}
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
                      //placeholder="X??"
                      autoComplete="commune"
                      name="commune"
                      value={dataAdress.commune}
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
                      //placeholder="M?? Zip"
                      autoComplete="postcode"
                      name="postcode"
                      value={dataAdress.postcode}
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
                      //placeholder="Lo???i"
                      autoComplete="type"
                      name="type"
                      value={dataAdress.type}
                    />
                  </CInputGroup>{' '}
                </CCol>
              </CRow>
            </CContainer>
          </>
          <CTooltip content="Back List Data" placement="top">
            <Link to={'/customer'}>
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
