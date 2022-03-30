import React, { useEffect, useState } from 'react'
import Pool from '../../utils/UserPool'
import { useNavigate } from 'react-router-dom'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CImage,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import '../../assets/style.css'

import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Profile = () => {
  let navigate = useNavigate()

  const user = Pool.getCurrentUser()
  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          {/* <CForm onSubmit={onSubmit} className={success ? 'hide' : ''}> */}
          <CForm>
            <h1> Register </h1> <p className="text-medium-emphasis"> Create your account </p>{' '}
            {/* <CToast
                    autohide={error ? false : true}
                    visible={error ? true : false}
                    color="danger"
                    className="text-white align-items-center"
                  >
                    <div className="d-flex">
                      <CToastBody>{error}</CToastBody>
                      <CToastClose className="me-2 m-auto" white />
                    </div>
                  </CToast> */}
            <CRow>
              <CCol>
                <CImage
                  // rounded
                  // thumbnail
                  src="https://cdn.pixabay.com/photo/2022/03/27/11/23/cat-7094808_1280.jpg"
                  width={160}
                  height={160}
                  className="mb-3 rounded-circle"
                />
              </CCol>
              <CCol>
                <CInputGroup className="mb-5">
                  <CFormInput type="file" id="inputGroupFile02" />
                  <CInputGroupText component="label" htmlFor="inputGroupFile02">
                    Upload
                  </CInputGroupText>
                </CInputGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                {' '}
                <CInputGroup className="mb-3">
                  <CInputGroupText> @ </CInputGroupText>{' '}
                  <CFormInput
                    placeholder="Email"
                    autoComplete="email"
                    // value={email}
                    // onChange={(event) => setEmail(event.target.value)}
                    required
                    type="email"
                  />
                </CInputGroup>{' '}
              </CCol>
              <CCol>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />{' '}
                  </CInputGroupText>{' '}
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    // value={password}
                    // onChange={(event) => setPassword(event.target.value)}
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
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    // value={password}
                    // onChange={(event) => setPassword(event.target.value)}
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
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    // value={password}
                    // onChange={(event) => setPassword(event.target.value)}
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
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    // value={password}
                    // onChange={(event) => setPassword(event.target.value)}
                    required
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
