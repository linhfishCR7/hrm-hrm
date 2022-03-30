import React, { useEffect, useState } from 'react'
import Pool from '../../utils/UserPool'
import { useNavigate } from 'react-router-dom'

import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import axios from '../../utils/axios'

const AppHeaderDropdown = () => {
  let navigate = useNavigate()
  const user = Pool.getCurrentUser()

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser()
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject()
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err)
                } else {
                  const results = {}

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute
                    results[Name] = Value
                  }

                  resolve(results)
                }
              })
            })

            resolve({
              user,
              ...session,
              ...attributes,
            })
          }
        })
      } else {
        reject()
      }
    })
  }
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

  const [status, setStatus] = useState(false)
  useEffect(() => {
    getSession().then(() => {
      setStatus(true)
    })
    getProfile().then((results) => {
      console.log(results.data.is_active)
      if (results.data.is_active == false) {
        alert('Your account has been suspended. Contact us for more details')
        user.signOut()
        setStatus(false)
        navigate('/login')
      }
    })
  }, [])
  const logout = () => {
    if (user) {
      user.signOut()
      setStatus(false)
      // return <Redirect to="/login" />
      navigate('/login')
    }
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={logout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          {status ? 'Logout' : 'Login'}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
