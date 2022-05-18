import React, { useEffect, useState } from 'react'
import Pool from '../../utils/UserPool'
import { useNavigate } from 'react-router-dom'
import getProfile from '../../utils/getProfile'
import axios from '../../utils/axios'
import { TOKEN } from '../../constants/Config'
import Loading from '../../utils/loading'

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilCloudUpload, cilUser } from '@coreui/icons'
import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import '../../assets/style.css'
import openNotificationWithIcon from '../../utils/notification'

const Profile = () => {
  let navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [dayofbirth, setDayOfBirth] = useState('')
  const [image, setImage] = useState('')
  const [loading_spin, setLoadingSpin] = useState(true)

  const user = Pool.getCurrentUser()
  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    getProfile()
      .then((results) => {
        setEmail(results.data.email)
        setFirstName(results.data.first_name)
        setLastName(results.data.last_name)
        setPhone(results.data.phone)
        setImage(results.data.image.image_s3_url)
        setDayOfBirth(results.data.date_of_birth)
        setLoadingSpin(false)
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.code === 'AUTH_0') {
            user.signOut()
            localStorage.removeItem('token')
            navigate('/login')
          }
        }
      })
  }, [])
  const [loading, setLoading] = useState(false)
  const [key, setKey] = useState('')
  const [logo, setLogo] = useState('')
  const [logo_url, setLogoUrl] = useState('')

  const updateProfile = async (key) => {
    await axios.put('/auth/profile/', key, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        // Accept: 'application/json',
      },
    })
  }
  const onSubmit = () => {
    const data = {
      email: email,
      first_name: firstname,
      last_name: lastname,
      phone: phone,
      date_of_birth: dayofbirth,
    }
    updateProfile(data)
      .then((res) => {
        openNotificationWithIcon({
          type: 'success',
          message: 'Cập nhật dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
      })
      .catch((error) => {
        openNotificationWithIcon({
          type: 'error',
          message: 'Cập nhật dữ liệu không thành công!!!',
          description: '',
          placement: 'topRight',
        })
      })
  }
  return (
    <>
      <Loading loading={loading_spin} />

      <CCard className="mb-4">
        <CCardBody>
          <h1> My Profile </h1> <p className="text-medium-emphasis"></p>{' '}
          <CRow className="mb-3">
            <CCol md={4}></CCol>
            <CCol md={8}>
              {' '}
              {image ? (
                <CImage src={image} width={160} height={160} className="rounded-circle mb-5" />
              ) : (
                <CImage
                  src="https://hrm-s3.s3.amazonaws.com/6e98775b-4d5hrm-profile.png"
                  width={160}
                  height={160}
                  className="rounded-circle"
                />
              )}
              <Upload
                disabled={loading}
                accept="image/*"
                customRequest={({ file, onError, onSuccess, onProgress }) => {
                  const fileType = file.type
                  const file_name = file.name
                  setLoading(true)
                  setKey(file.name)

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
                          setLoading(false)
                          setLogo(key)
                          setLogoUrl(signedRequest + key)
                          setImage(signedRequest + key)
                          const key_data = { image: key }
                          updateProfile(key_data)
                          onSuccess(result, file)
                          openNotificationWithIcon({
                            type: 'success',
                            message: 'Upload ảnh thành công!!!',
                            description: '',
                            placement: 'topRight',
                          })
                        })
                        .catch((error) => {
                          setLoading(false)

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
                      setLoading(false)
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
                <Button loading={loading}>
                  <UploadOutlined />
                </Button>
              </Upload>
            </CCol>
          </CRow>
          <CForm onSubmit={onSubmit}>
            <CRow>
              <CCol>
                {' '}
                <CInputGroup className="mb-3">
                  <CInputGroupText> @ </CInputGroupText>{' '}
                  <CFormInput
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    type="email"
                    readOnly="readonly"
                  />
                </CInputGroup>{' '}
              </CCol>
              <CCol>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />{' '}
                  </CInputGroupText>{' '}
                  <CFormInput
                    type="text"
                    placeholder="First name"
                    autoComplete="firstname"
                    value={firstname}
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                  />
                </CInputGroup>{' '}
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />{' '}
                  </CInputGroupText>{' '}
                  <CFormInput
                    type="text"
                    placeholder="Last name"
                    autoComplete="lastname"
                    value={lastname}
                    onChange={(event) => setLastName(event.target.value)}
                    required
                  />
                </CInputGroup>{' '}
              </CCol>
              <CCol>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />{' '}
                  </CInputGroupText>{' '}
                  <CFormInput
                    type="phone"
                    placeholder="Phone"
                    autoComplete="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </CInputGroup>{' '}
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6}>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />{' '}
                  </CInputGroupText>{' '}
                  <CFormInput
                    type="date"
                    placeholder="Day Of Birth"
                    autoComplete="dayofbirth"
                    value={dayofbirth}
                    onChange={(event) => setDayOfBirth(event.target.value)}
                    required
                    // data-date=""
                    // data-date-format="YYYY MM DD"
                  />
                </CInputGroup>{' '}
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <div>
                  <CButton color="info" type="submit">
                    Lưu{' '}
                  </CButton>{' '}
                </div>{' '}
              </CCol>
            </CRow>
          </CForm>{' '}
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center"></CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default Profile
