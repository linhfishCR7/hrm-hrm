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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'

import UserPool from '../../../utils/UserPool'
import { Auth, Amplify } from 'aws-amplify'

const ChangePassword = () => {
  const navigate = useNavigate()

  try {
    Amplify.configure({
      Auth: {
        userPoolId: 'ap-southeast-1_8Floj89lt',
        region: 'ap-southeast-1',
        userPoolWebClientId: '3tg4c27ft0da820h919g1p3943',
      },
    })
  } catch (error) {
    console.log(error)
  }
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [isChanging, setIsChanging] = useState(false)

  async function handleChangeClick(event) {
    event.preventDefault()

    setIsChanging(true)

    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      await Auth.changePassword(currentUser, oldPassword, newPassword)

      navigate('/dashboard')
    } catch (error) {
      alert(error.message || JSON.stringify(error))
      setIsChanging(false)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleChangeClick}>
                  <h1> Change Password </h1>{' '}
                  <p className="text-medium-emphasis"> Change password your account </p>{' '}
                  <CInputGroup className="mb-3">
                    <CInputGroupText> @ </CInputGroupText>{' '}
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
                      placeholder="Old Password"
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
                      placeholder="New Password"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      required
                    />
                  </CInputGroup>{' '}
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Confirm{' '}
                    </CButton>{' '}
                  </div>{' '}
                </CForm>{' '}
              </CCardBody>{' '}
            </CCard>{' '}
          </CCol>{' '}
        </CRow>{' '}
      </CContainer>{' '}
    </div>
  )
}

export default ChangePassword
