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
  const [error, setError] = useState('')
  const [errorcode, setErrorcode] = useState('')
  const [success, setSuccess] = useState('')
  const [visibleForm, setVisibleForm] = useState(true)

  const getDepartment = async () => {
    const REGISTER_URL = '/hrm/departments/list/'
    return await axios.get(REGISTER_URL, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
  }

  useEffect(() => {
    if (user_logged) {
      navigate('/dashboard')
      return
    }
    getDepartment().then((results) => {
      setDepartments(results.data.results)
    })
  }, [])

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
        console.log(res)
        navigate('/login')
      })
      .catch(function (error) {
        message.error({
          content: error,
          duration: 5,
          maxCount: 10,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        })
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
                WELCOME TO HRM SYSTEM
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
                        Tạo tài Khoản{' '}
                      </CButton>{' '}
                    </div>{' '}
                  </CForm>{' '}
                  <br />
                  <CForm onSubmit={onSubmitConfirm} className={success ? '' : 'hide'}>
                    <h1> Xác Nhận </h1> <p className="text-medium-emphasis"> Xác Nhận Tài Khoản </p>{' '}
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
                        Xác Nhận{' '}
                      </CButton>{' '}
                    </div>{' '}
                  </CForm>{' '}
                  <div className="d-grid">
                    <Link to="/login">
                      <CButton color="secondary" className="mt-3" active tabIndex={-1}>
                        Trở Về Đăng Nhập{' '}
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
                        placeholder="first_name"
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
                        placeholder="last_name"
                        autoComplete="last_name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                      />
                    </CInputGroup>{' '}
                    <CFormSelect
                      // value={this.state.company}
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
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <div className="d-grid">
                      <CButton color="info" type="submit">
                        Tạo Hồ Sơ Nhân Viên{' '}
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
  )
}

export default Register
