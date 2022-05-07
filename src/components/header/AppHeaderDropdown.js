import React, { useEffect, useState } from 'react'
import Pool from '../../utils/UserPool'
import getSession from '../../utils/getSession'
import getProfile from '../../utils/getProfile'
import getTokenFCM from '../../utils/firebase'
import Profile from '../../views/profile/Profile'
import { useNavigate } from 'react-router-dom'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { message, Drawer } from 'antd'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'
import { cilFile, cilLockLocked, cilTask, cilUser, cilKeyboard } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  let navigate = useNavigate()
  const user = Pool.getCurrentUser()
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState()
  const [status, setStatus] = useState(false)
  const [isTokenFound, setTokenFound] = useState(false)
  const [visibleprofile, setVisibleProfile] = useState(false)

  useEffect(() => {
    // if (localStorage.getItem('role') !== 'staff') {
    //   navigate('/404-admin')
    // }
    getSession().then(() => {
      setStatus(true)
    })
    getProfile()
      .then((results) => {
        getTokenFCM(setTokenFound, results.data.id)
        setData(results.data.image.image_s3_url)
        if (results.data.is_active === false) {
          alert('Your account has been suspended. Contact us for more details')
          setVisible(true)
          user.signOut()
          localStorage.removeItem('token')
          setStatus(false)
          if (localStorage.getItem('role') === 'admin') {
            navigate('/login-admin')
          } else {
            navigate('/login')
          }
        } else if (results.data.is_staff === false) {
          alert('You do not have permission to access. Contact us for more details')
          setVisible(true)
          user.signOut()
          localStorage.removeItem('token')
          setStatus(false)
          if (results.data.is_superuser === true) {
            navigate('/login-admin')
          } else {
            navigate('/login')
          }
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.code === 'AUTH_0') {
            message.error({
              content: 'Bạn đã hết phiên làm việc. Vui lòng đăng nhập lại',
              duration: 5,
              maxCount: 1,
              className: 'custom-class',
              style: {
                marginTop: '20vh',
              },
            })
            user.signOut()
            localStorage.removeItem('token')
            if (localStorage.getItem('role') === 'admin') {
              navigate('/login-admin')
            } else {
              navigate('/login')
            }
          }
        }
      })
  }, [setTokenFound])

  const logout = () => {
    if (user) {
      user.signOut()
      setStatus(false)
      localStorage.removeItem('token')
      if (localStorage.getItem('role') === 'admin') {
        navigate('/login-admin')
      } else {
        navigate('/login')
      }
    }
  }
  const showDrawer = () => {
    setVisibleProfile(true)
  }

  const onClose = () => {
    setVisibleProfile(false)
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={data} size="xl" shape="rounded" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownHeader className="bg-light fw-semibold py-2">Cài Đặt</CDropdownHeader>
        <CDropdownItem onClick={showDrawer}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <Drawer
          title="My Profile"
          placement="right"
          onClose={onClose}
          visible={visibleprofile}
          // zIndex={99999}
          maskClosable={false}
          size="large"
        >
          <Profile />
        </Drawer>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownItem href="#/change-password">
          <CIcon icon={cilKeyboard} className="me-2" />
          Đổi Mật Khẩu
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={logout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          {status ? 'Đăng Xuất' : 'Đăng Nhập'}
        </CDropdownItem>
      </CDropdownMenu>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>ERROR</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h2>{error}</h2>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CDropdown>
  )
}

export default AppHeaderDropdown
