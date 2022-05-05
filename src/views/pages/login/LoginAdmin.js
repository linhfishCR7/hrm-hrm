import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilApps, cilHome } from '@coreui/icons'
import UserPool from '../../../utils/UserPool'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import '../../../assets/style.css'
import getProfile from '../../../utils/getProfile'

const LoginAdmin = () => {
  let navigate = useNavigate()
  const user = UserPool.getCurrentUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState(false)
  const [load, setLoad] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(async () => {
    if (user) {
      navigate('/dashboard-admin')
      return
    }
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    setLoad(true)
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    })

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    })

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        const token = data.idToken.jwtToken
        localStorage.setItem('token', token)
        localStorage.setItem('role', 'admin')
        getProfile().then((results) => {
          if (results.data.is_active === false) {
            user.signOut()
            localStorage.removeItem('token')
            setStatus(false)
            setLoad(false)
            navigate('/login-admin')
            setError('Tại khoản đã bị khoá bởi Admin. Liên hệ Admin để biết thêm chi tiết')
            setVisible(true)
          } else if (results.data.is_superuser === false) {
            user.signOut()
            localStorage.removeItem('token')
            setStatus(false)
            setLoad(false)
            navigate('/login-admin')
            setError('Bạn không có quyền truy cập!!!')
            setVisible(true)
          } else {
            navigate('/dashboard-admin')
          }
        })
      },
      onFailure: (err) => {
        // alert(err.message || JSON.stringify(err))
        setVisible(true)
        setError(err.message || JSON.stringify(err))
        setLoad(false)
      },
      newPasswordRequired: (data) => {},
    })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <h1
                style={{
                  marginBottom: '60px',
                  fontWight: 'bolder',
                  color: 'light',
                }}
              >
                CHÀO MỪNG ĐẾN VỚI HỆ THỐNG HRM
              </h1>
            </div>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1> Đăng Nhập </h1>{' '}
                    <p className="text-medium-emphasis"> Đăng Nhập Vào Hệ Thống </p>{' '}
                    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                      <CModalHeader>
                        <CModalTitle>Lỗi</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        <h2>{error}</h2>
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="danger" onClick={() => setVisible(false)}>
                          Close
                        </CButton>
                      </CModalFooter>
                    </CModal>
                    <CInputGroup className="mb-3 mt-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />{' '}
                      </CInputGroupText>{' '}
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </CInputGroup>{' '}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />{' '}
                      </CInputGroupText>{' '}
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                    </CInputGroup>{' '}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className={load ? 'hide' : 'px-4'} type="submit">
                          Đăng Nhập
                        </CButton>{' '}
                        <CButton disabled className={load ? '' : 'hide'}>
                          <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                          Đang tải...
                        </CButton>
                      </CCol>{' '}
                    </CRow>{' '}
                  </CForm>{' '}
                </CCardBody>{' '}
              </CCard>{' '}
              <CCard
                className="text-white bg-primary py-5"
                style={{
                  width: '100%',
                }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Chào Mừng Bạn Đến Với Hệ Thống Quản Lý Nhân Sự HRM</h2>{' '}
                  </div>{' '}
                </CCardBody>{' '}
              </CCard>{' '}
            </CCardGroup>{' '}
          </CCol>{' '}
        </CRow>{' '}
      </CContainer>{' '}
    </div>
  )
}

export default LoginAdmin
