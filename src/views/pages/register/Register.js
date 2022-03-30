import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

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
import '../../../assets/style.css'

const Register = () => {
  const navigate = useNavigate()

  const user_logged = UserPool.getCurrentUser()
  useEffect(() => {
    if (user_logged) {
      navigate('/dashboard')
      return
    }
  }, [])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [user, setUser] = useState('')
  const [error, setError] = useState('')
  const [errorcode, setErrorcode] = useState('')
  const [success, setSuccess] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        setError(err.message || JSON.stringify(err))
        return
      } else {
        setSuccess('Please, get code in your email and use them for confirming')
        // console.log(data)
        // let cognitoUser = data.user
        setUser(data.user)
        // console.log('user name is' + cognitoUser.getUsername())
        return
      }
    })
  }

  const onSubmitConfirm = (event) => {
    event.preventDefault()
    user.confirmRegistration(code, true, function (err, result) {
      if (err) {
        setErrorcode(err.message || JSON.stringify(err))
        return
      } else {
        navigate('/login')
      }
    })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <h1 style={{ marginBottom: '100px', fontWight: 'bolder', color: 'light' }}>
              WELCOME TO HRM SYSTEM
            </h1>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={onSubmit} className={success ? 'hide' : ''}>
                  <h1> Register </h1> <p className="text-medium-emphasis"> Create your account </p>{' '}
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
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />{' '}
                    </CInputGroupText>{' '}
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </CInputGroup>{' '}
                  <div className="d-grid">
                    <CButton color="info" type="submit">
                      Create Account{' '}
                    </CButton>{' '}
                  </div>{' '}
                </CForm>{' '}
                <br />
                <CForm onSubmit={onSubmitConfirm} className={success ? '' : 'hide'}>
                  <h1> Confirm </h1> <p className="text-medium-emphasis"> Confirm your account </p>{' '}
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
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Confirm{' '}
                    </CButton>{' '}
                  </div>{' '}
                </CForm>{' '}
                <div className="d-grid">
                  <Link to="/login">
                    <CButton color="secondary" className="mt-3" active tabIndex={-1}>
                      Back Login{' '}
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

export default Register
