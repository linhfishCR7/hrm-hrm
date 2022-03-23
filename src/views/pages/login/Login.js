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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import UserPool from '../../../utils/UserPool'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

const Login = () => {
  var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
  let navigate = useNavigate()
  const user = UserPool.getCurrentUser()
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
      return
    }
  }, [])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

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
        // console.log('onSuccess: ', data)
        navigate('/dashboard')
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err))
      },
      newPasswordRequired: (data) => {
        console.log('newPasswordRequired: ', data)
      },
    })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1> Login </h1>{' '}
                    <p className="text-medium-emphasis"> Sign In to your account </p>{' '}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />{' '}
                      </CInputGroupText>{' '}
                      <CFormInput
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
                        <CButton color="primary" className="px-4" type="submit">
                          Login{' '}
                        </CButton>{' '}
                      </CCol>{' '}
                      <CCol xs={6} className="text-right">
                        <Link to="/forgot-password">
                          <CButton color="link" className="px-0">
                            Forgot password ?
                          </CButton>{' '}
                        </Link>
                      </CCol>{' '}
                    </CRow>{' '}
                  </CForm>{' '}
                </CCardBody>{' '}
              </CCard>{' '}
              <CCard
                className="text-white bg-primary py-5"
                style={{
                  width: '44%',
                }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2> Sign up </h2> <p>Welcome to HRM human resource management </p>{' '}
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>{' '}
                    </Link>{' '}
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

export default Login
