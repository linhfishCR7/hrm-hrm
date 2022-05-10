import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! Có sự cố xảy ra.</h4>
              <p className="text-medium-emphasis float-start">
                Trang bạn đang tìm kiếm không tìm thấy.
              </p>
            </div>
            <CInputGroup className="input-prepend">
              <Link to="/dashboard">
                <div className="d-grid mb-3">
                  <CButton color="info" style={{ marginRight: '10px' }}>
                    Trở về trang chủ
                  </CButton>
                </div>{' '}
              </Link>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
