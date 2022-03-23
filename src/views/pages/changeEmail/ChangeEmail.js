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

const ChangeEmail = () => {
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
  const [code, setCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)

  async function handleUpdateClick(event) {
    event.preventDefault()

    setIsSendingCode(true)

    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.updateUserAttributes(user, { email: email })
      setCodeSent(true)
    } catch (error) {
      alert(error.message || JSON.stringify(error))
      setIsSendingCode(false)
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault()

    setIsConfirming(true)

    try {
      await Auth.verifyCurrentUserAttributeSubmit('email', code)

      navigate('/dashboard')
    } catch (error) {
      alert(error.message || JSON.stringify(error))
      setIsConfirming(false)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleUpdateClick}>
                  <h1> Change Email </h1>
                  <p className="text-medium-emphasis"> Change Email your account </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText> @ </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="info" type="submit">
                      Submit
                    </CButton>
                  </div>
                </CForm>
                <br />
                <CForm onSubmit={handleConfirmClick}>
                  <h1> New Email </h1>
                  <p className="text-medium-emphasis"> New email your account </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="number"
                      placeholder="Code"
                      autoComplete="code"
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Confirm
                    </CButton>
                  </div>
                  <br />
                  <div className="d-grid">
                    <Link to="/login">
                      <CButton color="secondary" className="mt-3" active tabIndex={-1}>
                        Back Login
                      </CButton>
                    </Link>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ChangeEmail
