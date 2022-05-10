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
import axios from '../../../utils/axios'
import getProfile from '../../../utils/getProfile'

const Login = () => {
  var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
  let navigate = useNavigate()
  const user = UserPool.getCurrentUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState(false)
  const [load, setLoad] = useState(false)
  const [visible, setVisible] = useState(false)
  const [branch, setBranch] = useState('')
  const [company, setCompany] = useState('')
  const [branchdata, setBranchData] = useState([{}])
  const [companydata, setCompanyData] = useState([{}])

  const getCompany = async () => {
    const REGISTER_URL = '/hrm/companies/list/'
    return await axios.get(REGISTER_URL, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
  }

  useEffect(async () => {
    if (user) {
      navigate('/dashboard')
      return
    }
    getCompany().then(async (results) => {
      setCompanyData(results.data.results)
      setCompany(results.data.results[1].id)
    })
  }, [])

  useEffect(async () => {
    const result = await getBranch(company)
    setBranchData(result.data.results)
  }, [company])

  const getBranch = async (company) => {
    const REGISTER_URL = '/hrm/branchs/list/?company__id=' + company
    return await axios.get(REGISTER_URL, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
  }

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
        getProfile().then((results) => {
          if (results.data.is_active === false) {
            user.signOut()
            localStorage.removeItem('token')
            setStatus(false)
            setLoad(false)
            navigate('/login')
            setError('Tại khoản đã bị khoá bởi Admin. Liên hệ Admin để biết thêm chi tiết')
            setVisible(true)
          } else if (results.data.is_staff === false) {
            user.signOut()
            localStorage.removeItem('token')
            setStatus(false)
            setLoad(false)
            navigate('/login')
            setError('Bạn không có quyền truy cập. Liên hệ Admin để biết thêm chi tiết')
            setVisible(true)
          } else {
            setLoad(false)
            const getAuthorization = async () => {
              const REGISTER_URL = '/auth/authorization/'
              return await axios.get(REGISTER_URL, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
              })
            }
            getAuthorization().then((results) => {
              if (results.data.company === company) {
                if (results.data.branch === branch) {
                  localStorage.setItem('company', results.data.company)
                  localStorage.setItem('branch', results.data.branch)
                  localStorage.setItem('role', 'staff')
                  navigate('/dashboard')
                } else {
                  user.signOut()
                  localStorage.removeItem('token')
                  setStatus(false)
                  setLoad(false)
                  setError('Bạn không có quyền truy cập vào chi nhánh này. Vui lòng thử lại!')
                  setVisible(true)
                }
              } else {
                user.signOut()
                localStorage.removeItem('token')
                setStatus(false)
                setLoad(false)
                setError('Bạn không có quyền truy cập vào công ty này. Vui lòng thử lại!')
                setVisible(true)
              }
            })
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
                          Đóng
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
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilHome} />{' '}
                      </CInputGroupText>{' '}
                      <CFormSelect
                        value={company}
                        aria-label="Please choose your company"
                        onChange={(event) => setCompany(event.target.value)}
                      >
                        <option key="0" value="">
                          Chọn công ty
                        </option>
                        {companydata.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>{' '}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilApps} />{' '}
                      </CInputGroupText>{' '}
                      <CFormSelect
                        value={branch}
                        aria-label="Please choose your branch"
                        onChange={(event) => setBranch(event.target.value)}
                      >
                        <option key="0" value="">
                          Chọn chi nhánh
                        </option>
                        {branchdata.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>{' '}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className={load ? 'hide' : 'px-4'} type="submit">
                          Đăng nhập
                        </CButton>{' '}
                        <CButton disabled className={load ? '' : 'hide'}>
                          <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                          Đang tải...
                        </CButton>
                      </CCol>{' '}
                      <CCol xs={6} className="text-right">
                        <Link to="/forgot-password">
                          <CButton color="link" className="px-0">
                            Quên mật khẩu?
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
                  width: '100%',
                }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2> Đăng ký </h2> <p>Chào Mừng Bạn Đã Đến Với Hệ Thống Quản Lý Nhân Sự HRM</p>{' '}
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Đăng ký ngay!
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
