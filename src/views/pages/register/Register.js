import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { message } from 'antd'
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
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import UserPool from '../../../utils/UserPool'
import '../../../assets/style.css'
import Loading from '../../../utils/loading'
import openNotificationWithIcon from '../../../utils/notification'
import axios from '../../../utils/axios'

const Register = () => {
  const navigate = useNavigate()

  const user_logged = UserPool.getCurrentUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [department, setDepartment] = useState('')
  const [departments, setDepartments] = useState([])
  const [code, setCode] = useState('')
  const [user, setUser] = useState('')
  const [error, setError] = useState(false)
  const [errorcode, setErrorcode] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [visibleForm, setVisibleForm] = useState(true)

  const getDepartment = async () => {
    const REGISTER_URL = '/hrm/departments/list/'
    return await axios.get(REGISTER_URL, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  useEffect(() => {
    if (user_logged) {
      navigate('/dashboard')
      return
    }
    getDepartment().then((results) => {
      setDepartments(results.data.results)
      setLoading(false)
    })
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        setError(true)
        openNotificationWithIcon({
          type: 'error',
          message: 'Đăng ký tài khoản không thành công!!!',
          description: '',
          placement: 'topRight',
        })
        return
      } else {
        setSuccess(true)
        openNotificationWithIcon({
          type: 'success',
          message: 'Đăng ký tài khoản thành công!!!',
          description: '',
          placement: 'topRight',
        })
        setUser(data.user)
        return
      }
    })
  }

  const onSubmitConfirm = (event) => {
    event.preventDefault()
    user.confirmRegistration(code, true, function (err, result) {
      if (err) {
        setErrorcode(true)
        openNotificationWithIcon({
          type: 'error',
          message: 'Xác nhận tài khoản không thành công!!!',
          description: '',
          placement: 'topRight',
        })
        return
      } else {
        setVisibleForm(false)
      }
    })
  }

  const onSubmitCreateStaff = async (event) => {
    event.preventDefault()
    const newItem = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      department: department,
    }
    console.log(newItem)

    await axios
      .post('/auth/signup/', newItem, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        navigate('/login')
      })
      .catch((error) => {
        openNotificationWithIcon({
          type: 'error',
          message: 'Tạo hồ sơ nhân viên không thành công!!!',
          description: '',
          placement: 'topRight',
        })
      })
  }

  return (
    <>
      <Loading loading={loading} />
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
          {visibleForm ? (
            <CRow className="justify-content-center">
              <CCol md={9} lg={7} xl={6}>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CForm onSubmit={onSubmit} className={success ? 'hide' : ''}>
                      <h1> Đăng Ký </h1> <p className="text-medium-emphasis"> Tạo Tài Khoản </p>{' '}
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
                          placeholder="Mật Khẩu"
                          autoComplete="new-password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          required
                        />
                      </CInputGroup>{' '}
                      <div className="d-grid">
                        <CButton color="info" type="submit">
                          Tạo tài Khoản{' '}
                        </CButton>{' '}
                      </div>{' '}
                    </CForm>{' '}
                    <br />
                    <CForm onSubmit={onSubmitConfirm} className={success ? '' : 'hide'}>
                      <h1> Xác Nhận </h1>{' '}
                      <p className="text-medium-emphasis"> Xác Nhận Tài Khoản </p>{' '}
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
                          Xác nhận{' '}
                        </CButton>{' '}
                      </div>{' '}
                    </CForm>{' '}
                    <div className="d-grid">
                      <Link to="/login">
                        <CButton color="secondary" className="mt-3" active tabIndex={-1}>
                          Trở về đăng nhập{' '}
                        </CButton>{' '}
                      </Link>{' '}
                    </div>{' '}
                  </CCardBody>{' '}
                </CCard>{' '}
              </CCol>{' '}
            </CRow>
          ) : (
            <CRow className="justify-content-center">
              <CCol md={9} lg={7} xl={6}>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CForm onSubmit={onSubmitCreateStaff}>
                      <h1> Tạo Hồ Sơ </h1>{' '}
                      <p className="text-medium-emphasis"> Tạo Hồ Sơ Nhân Viên </p>{' '}
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
                          type="text"
                          placeholder="Tên"
                          autoComplete="first_name"
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                          required
                        />
                      </CInputGroup>{' '}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />{' '}
                        </CInputGroupText>{' '}
                        <CFormInput
                          type="text"
                          placeholder="Họ"
                          autoComplete="last_name"
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                          required
                        />
                      </CInputGroup>{' '}
                      <CFormSelect
                        className="mb-3"
                        name="department"
                        aria-label="Chọn Bộ Phận Làm Việc"
                        onChange={(event) => setDepartment(event.target.value)}
                      >
                        <option key="0" value="">
                          Chọn bộ phận làm việc
                        </option>
                        {departments.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.data}
                          </option>
                        ))}
                      </CFormSelect>
                      <div className="d-grid">
                        <CButton color="info" type="submit">
                          Tạo hồ sơ nhân viên{' '}
                        </CButton>{' '}
                      </div>{' '}
                    </CForm>{' '}
                  </CCardBody>{' '}
                </CCard>{' '}
              </CCol>{' '}
            </CRow>
          )}
        </CContainer>{' '}
      </div>
    </>
  )
}

export default Register
