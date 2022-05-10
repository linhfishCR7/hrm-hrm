import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { USER_POOL_ID, REGION, CLIENT_ID } from '../../../constants/Config'
import openNotificationWithIcon from '../../../utils/notification'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'

import UserPool from '../../../utils/UserPool'
import { Auth, Amplify } from 'aws-amplify'
import '../../../assets/style.css'

const ForgotPassword = () => {
  const navigate = useNavigate()

  try {
    Amplify.configure({
      Auth: {
        userPoolId: USER_POOL_ID,
        region: REGION,
        userPoolWebClientId: CLIENT_ID,
      },
    })
  } catch (error) {}

  const user_logged = UserPool.getCurrentUser()
  useEffect(() => {
    if (user_logged) {
      navigate('/dashboard')
      return
    }
  }, [])
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [code, setCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [error, setError] = useState('')
  const [errorcode, setErrorcode] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSendCodeClick(event) {
    event.preventDefault()

    setIsSendingCode(true)

    try {
      await Auth.forgotPassword(email)
      setCodeSent(true)
      setSuccess('Vui kiểm tra email đến lấy mã code')
    } catch (error) {
      setError(error.message || JSON.stringify(error))
      setIsSendingCode(false)
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault()

    setIsConfirming(true)
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword)
      setConfirmed(true)
      navigate('/login')
    } catch (error) {
      setErrorcode(error.message || JSON.stringify(error))
      setIsConfirming(false)
    }
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSendCodeClick} className={success ? 'hide' : ''}>
                  <h1> Quên Mật Khẩu</h1>{' '}
                  <p className="text-medium-emphasis"> Quên Mật Khẩu Tài Khoản </p>{' '}
                  <CToast
                    autohide={error ? false : true}
                    visible={error ? true : false}
                    color="danger"
                    className="text-white align-items-center"
                  >
                    <div className="d-flex">
                      <CToastBody>{error}</CToastBody>
                      <CToastClose className="me-2 m-auto" white />
                    </div>
                  </CToast>
                  <CInputGroup className="mb-3 mt-3">
                    <CInputGroupText> @ </CInputGroupText>{' '}
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      type="email"
                    />
                  </CInputGroup>{' '}
                  <div className="d-grid">
                    <CButton color="info" type="submit">
                      Quên mật khẩu{' '}
                    </CButton>{' '}
                  </div>{' '}
                </CForm>{' '}
                <br />
                <CForm onSubmit={handleConfirmClick} className={success ? '' : 'hide'}>
                  <h1> Reset Mật Khẩu </h1>{' '}
                  <p className="text-medium-emphasis"> Reset Mật Khẩu Tài Khoản </p>{' '}
                  <CToast
                    autohide={errorcode ? false : true}
                    visible={errorcode ? true : false}
                    color="danger"
                    className="text-white align-items-center"
                  >
                    <div className="d-flex">
                      <CToastBody>{errorcode}</CToastBody>
                      <CToastClose className="me-2 m-auto" white />
                    </div>
                  </CToast>
                  <CToast
                    autohide={success ? false : true}
                    visible={success ? true : false}
                    color="success"
                    className="text-white align-items-center mt-3"
                  >
                    <div className="d-flex">
                      <CToastBody>{success}</CToastBody>
                      <CToastClose className="me-2 m-auto" white />
                    </div>
                  </CToast>
                  <CInputGroup className="mb-3 mt-3">
                    <CInputGroupText> @ </CInputGroupText>{' '}
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      type="email"
                    />
                  </CInputGroup>{' '}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="number"
                      placeholder="Code"
                      autoComplete="code"
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      required
                    />
                  </CInputGroup>{' '}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="password"
                      placeholder="New Password"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      required
                    />
                  </CInputGroup>{' '}
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Xác nhận{' '}
                    </CButton>{' '}
                  </div>{' '}
                </CForm>{' '}
                <div className="d-grid">
                  <Link to={localStorage.getItem('role') === 'admin' ? '/login-admin' : '/login'}>
                    <CButton color="secondary" className="mt-3" active tabIndex={-1}>
                      Quay về trang đăng nhập{' '}
                    </CButton>{' '}
                  </Link>{' '}
                </div>{' '}
              </CCardBody>{' '}
            </CCard>{' '}
          </CCol>{' '}
        </CRow>{' '}
      </CContainer>{' '}
    </div>
  )
}

export default ForgotPassword
