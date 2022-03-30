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
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import UserPool from '../../../utils/UserPool'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import '../../../assets/style.css'
import axios from '../../../utils/axios'

const Login = () => {
  var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
  let navigate = useNavigate()
  const user = UserPool.getCurrentUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState(false)
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
      return
    }
  }, [])
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
        const getProfile = async () => {
          const REGISTER_URL = '/auth/profile/'
          return await axios.get(REGISTER_URL, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer eyJraWQiOiJjbU52ekJDRmlBc3ltbTV1cjRMVExFSklEM3VwSU13XC95M3U4ME9cL3pzVkU9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI4Y2JhZDI3Ni1iMGYwLTQxNTYtYjA4NC1kM2I4MTZjOTA4MzEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xXzhGbG9qODlsdCIsImNvZ25pdG86dXNlcm5hbWUiOiI4Y2JhZDI3Ni1iMGYwLTQxNTYtYjA4NC1kM2I4MTZjOTA4MzEiLCJvcmlnaW5fanRpIjoiMmFjYTEzMmQtNjY0ZS00MzM0LWI0NzQtZDYzYjFmNWUyNGQyIiwiYXVkIjoiM3RnNGMyN2Z0MGRhODIwaDkxOWcxcDM5NDMiLCJjdXN0b206bGFzdF9uYW1lIjoiSGEiLCJldmVudF9pZCI6IjM2NWJiZGZhLWU0MjMtNGMwNy05NGRhLTc3YzIwNWFhYjc1OCIsImN1c3RvbTpmaXJzdF9uYW1lIjoiTGluaEhSTSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQ4NjYyNTU2LCJleHAiOjE2NDg2NjYxNTYsImlhdCI6MTY0ODY2MjU1NiwianRpIjoiZWQ4NzE3NzktMmNjMS00YTIxLWIzMjgtZjBhNTNlN2QxNDk1IiwiZW1haWwiOiJsaW5oaGFocm1AbWFpbGluYXRvci5jb20ifQ.otfl4oWCv5Zk-NImsLvoegwm7W1Bm6mbfMOOlttTQ6xNZtA6kqb6F5i4jxuvSJwLcd03qzZJ_lKe6C75h0wNz7gOSi84ikuU9Og56b2vl8bAwSANHRhon5LgQzd1wDjB8rRN0G0l84_i_-h_pjA-BCgu8H64v5YD7cJXwVK67oBooVLFvnBgZzmWNidiinugtrMFNyKGx1MOZHdRWEY0PkhQ8mctzpHNkfzuP_5a0z4cW7ljilQI140W6dHM78UaoJANhiwS5DTwrkIAEVzG0Yl8b6D7p4VESFo4WspRbOgGvDb2zpt0UFW1u_Ef5QXUjE_3LKD4KKbtBSbtwDGzmQ`,
            },
            withCredentials: true,
            // mode: 'cors',
            // credentials: 'include',
          })
        }
        getProfile().then((results) => {
          console.log(results.data.is_active)
          if (results.data.is_active == false) {
            user.signOut()
            setStatus(false)
            navigate('/login')
            alert('Your account has been suspended. Contact us for more details')
          } else {
            navigate('/dashboard')
          }
        })
      },
      onFailure: (err) => {
        // alert(err.message || JSON.stringify(err))
        setError(err.message || JSON.stringify(err))
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
          <CCol md={5}>
            <h1 style={{ marginBottom: '100px', fontWight: 'bolder', color: 'light' }}>
              WELCOME TO HRM SYSTEM
            </h1>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1> Login </h1>{' '}
                    <p className="text-medium-emphasis"> Sign In to your account </p>{' '}
                    {/* <CAlert color="danger" className={error ? '' : 'offscreen'}>
                      {error}
                    </CAlert> */}
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
