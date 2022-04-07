import React, { useEffect, useState } from 'react'
import Pool from '../../utils/UserPool'
import { useNavigate } from 'react-router-dom'
import getProfile from '../../utils/getProfile'
import axios from '../../utils/axios'

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
import '../../assets/style.css'

const Profile = () => {
  let navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState('')
  const [dayofbirth, setDayOfBirth] = useState('')
  const [imagenew, setImageNew] = useState('')
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
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.code)
          console.log(error.response.status)
          console.log(error.response.headers)
          if (error.response.data.code === 'AUTH_0') {
            user.signOut()
            localStorage.removeItem('token')
            navigate('/login')
          }
        }
      })
  }, [])
  const [field, setField] = useState({})
  const [visible, setVisible] = useState(false)
  // const [policy, setPolicy] = useState('')
  // const [algorithm, setAlgorithm] = useState('')
  // const [credential, setCredential] = useState('')
  // const [date, setDate] = useState('')
  // const [signature, setSignature] = useState('')
  // const [url, setUrl] = useState('')

  // const submitForm = (event) => {
  //   event.preventDefault()

  //   const REGISTER_URL = '/common/upload/policy/'
  //   axios
  //     .post(REGISTER_URL, {
  //       file_name: imagenew,
  //     })
  //     .then((response) => {
  //       return setField(response.data.fields)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })

  //   axios
  //     .post('https://hrm-s3.s3.amazonaws.com/', {
  //       file: imagenew,
  //       // type: field.Content-Type,
  //       // key: field.key,
  //       // algorithm: field.x-amz-algorithm,
  //       // credential: field.x-amz-credential,
  //       // date: field.x-amz-date,
  //       // policy: field.policy,
  //       // signature: field.x-amz-signature,
  //     })
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* <CImage fluid src={key} /> */}
          <CForm>
            <CInputGroup className="mb-3">
              <CFormInput
                type="file"
                id="inputGroupFile02"
                value={imagenew}
                onChange={(event) => setImageNew(event.target.value)}
              />
              <CInputGroupText component="label" htmlFor="inputGroupFile02">
                UPLOAD
              </CInputGroupText>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
      <CCard className="mb-4">
        <CCardBody>
          <h1> My Profile </h1> <p className="text-medium-emphasis"></p>{' '}
          {/* <CForm onSubmit={onSubmit} className={success ? 'hide' : ''}> */}
          <CForm>
            <CRow>
              <CCol>
                <CInputGroup className="mb-3">
                  {/* <CImage src={image} width={160} height={160} className="mb-3 rounded-circle" /> */}
                  <CButton
                    color="white"
                    className="rounded-circle"
                    onClick={() => setVisible(!visible)}
                  >
                    {image ? (
                      <CImage src={image} width={160} height={160} className="rounded-circle" />
                    ) : (
                      <CImage
                        src="https://hrm-s3.s3.amazonaws.com/6e98775b-4d5hrm-profile.png"
                        width={160}
                        height={160}
                        className="rounded-circle"
                      />
                    )}
                  </CButton>{' '}
                </CInputGroup>{' '}
              </CCol>
            </CRow>
          </CForm>{' '}
          <br />
          <CForm>
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
              <CCol>
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
                <div className="d-grid">
                  <CButton color="info" type="submit">
                    Create Account{' '}
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
