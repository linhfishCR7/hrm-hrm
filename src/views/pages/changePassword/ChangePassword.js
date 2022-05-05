import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { USER_POOL_ID, REGION, CLIENT_ID } from '../../../constants/Config'

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
import openNotificationWithIcon from '../../../utils/notification'

const ChangePassword = () => {
  const navigate = useNavigate()

  try {
    Amplify.configure({
      Auth: {
        userPoolId: USER_POOL_ID,
        region: REGION,
        userPoolWebClientId: CLIENT_ID,
      },
    })
  } catch (error) {
    console.log(error)
  }

  const user_logged = UserPool.getCurrentUser()
  useEffect(() => {
    if (!user_logged) {
      navigate('/login')
      return
    }
  }, [])

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [isChanging, setIsChanging] = useState(false)
  const [error, setError] = useState(false)

  async function handleChangeClick(event) {
    event.preventDefault()
    setIsChanging(true)

    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      await Auth.changePassword(currentUser, oldPassword, newPassword)
      openNotificationWithIcon({
        type: 'success',
        message: 'Đổi mật khẩu thành công!!!',
        description: '',
        placement: 'topRight',
      })
      if (localStorage.getItem('role') === 'admin') {
        navigate('/dashboard-admin')
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      setError(true)
      openNotificationWithIcon({
        type: 'error',
        message: 'Đổi mật khẩu không thành công!!!',
        description: error.message || JSON.stringify(error),
        placement: 'topRight',
      })
      setIsChanging(false)
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
                <CForm onSubmit={handleChangeClick}>
                  <h1> Thay đổi mật khẩu </h1>{' '}
                  <p className="text-medium-emphasis"> Thay đổi mật khẩu tài khoản của bạn </p>{' '}
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
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="password"
                      placeholder="Mật Khẩu Cũ"
                      autoComplete="old-password"
                      value={oldPassword}
                      onChange={(event) => setOldPassword(event.target.value)}
                      required
                    />
                  </CInputGroup>{' '}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="password"
                      placeholder="Mật Khẩu Mới"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      required
                    />
                  </CInputGroup>{' '}
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Xác Nhận{' '}
                    </CButton>{' '}
                  </div>{' '}
                </CForm>{' '}
                <div className="d-grid">
                  <Link
                    to={
                      localStorage.getItem('role') === 'admin' ? '/dashboard-admin' : '/dashboard'
                    }
                  >
                    <CButton color="secondary" className="mt-3" active tabIndex={-1}>
                      Trở Về Trang Chủ{' '}
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

export default ChangePassword
