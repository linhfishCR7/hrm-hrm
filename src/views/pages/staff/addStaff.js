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
import openNotificationWithIcon from '../../../utils/notification'

const CreateStaff = () => {
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
  const [visibleForm, setVisibleForm] = useState(true)

  const getDepartment = async () => {
    const REGISTER_URL = '/hrm/departments/list/'
    return await axios.get(REGISTER_URL, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
  }

  useEffect(() => {
    if (!user_logged) {
      navigate('/login')
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
        openNotificationWithIcon({
          type: 'error',
          message: 'Có lỗi khi tạo tài khoản',
          description: err.message || JSON.stringify(err),
          placement: 'topRight',
        })
        setError(true)
        return
      } else {
        openNotificationWithIcon({
          type: 'success',
          message: 'Tạo tài khoản thành công',
          description: ' ',
          placement: 'topRight',
        })
        setSuccess(true)
        setUser(data.user)
        return
      }
    })
  }

  const onSubmitConfirm = (event) => {
    event.preventDefault()
    user.confirmRegistration(code, true, function (err, result) {
      if (err) {
        openNotificationWithIcon({
          type: 'error',
          message: 'Có lỗi khi xác nhận tài khoản',
          description: err.message || JSON.stringify(err),
          placement: 'topRight',
        })
        setErrorcode(true)
        return
      } else {
        setVisibleForm(false)
        openNotificationWithIcon({
          type: 'success',
          message: 'Xác nhận tài khoản thành công!!!',
          description: ' ',
          placement: 'topRight',
        })
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
        openNotificationWithIcon({
          type: 'success',
          message: 'Tạo nhân viên thành công!!!',
          description: ' ',
          placement: 'topRight',
        })
        navigate('/staff')
      })
      .catch(function (error) {
        openNotificationWithIcon({
          type: 'error',
          message: error,
          description: ' ',
          placement: 'topRight',
        })
      })
  }

  return (
    <CContainer>
      {visibleForm ? (
        <CRow>
          <CCol>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={onSubmit} className={success ? 'hide' : ''}>
                  <h1> Tạo Tài Khoản Nhân Viên </h1>{' '}
                  <p className="text-medium-emphasis">
                    {' '}
                    Quản lý nhân sự có thể tạo tài khoản người dùng với dữ liệu rỗng{' '}
                  </p>{' '}
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
                  <CButton color="info" type="submit" className="mt-3">
                    Tạo tài Khoản{' '}
                  </CButton>{' '}
                </CForm>{' '}
                <br />
                <CForm onSubmit={onSubmitConfirm} className={success ? '' : 'hide'}>
                  <h1> Xác Nhận Tài Khoản</h1>{' '}
                  <p className="text-medium-emphasis">
                    {' '}
                    Quản lý nhân sự kiểm tra email ({email}) lấy mã code để xác nhận tài khoản{' '}
                  </p>{' '}
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
                  <CButton color="success" type="submit" className="mt-3">
                    Xác Nhận{' '}
                  </CButton>{' '}
                </CForm>{' '}
              </CCardBody>{' '}
            </CCard>{' '}
          </CCol>{' '}
        </CRow>
      ) : (
        <CRow>
          <CCol>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={onSubmitCreateStaff}>
                  <h1> Tạo Hồ Sơ </h1>
                  <p className="text-medium-emphasis">
                    {' '}
                    Quản lý nhân sự chỉ cần tạo một số thông tin cỡ bản{' '}
                  </p>{' '}
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
                  <CButton color="info" type="submit">
                    Tạo Hồ Sơ Nhân Viên{' '}
                  </CButton>{' '}
                </CForm>{' '}
              </CCardBody>{' '}
            </CCard>{' '}
          </CCol>{' '}
        </CRow>
      )}
    </CContainer>
  )
}

export default CreateStaff
