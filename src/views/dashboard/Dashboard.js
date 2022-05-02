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
  CContainer,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  Table,
  Tag,
  Space,
  Button,
  message,
  Input,
  Collapse,
  Card,
  Avatar,
  Spin,
  Alert,
} from 'antd'
import { EditOutlined, DeleteOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
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

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import Loading from '../../utils/loading'
import { Divider } from 'antd'

const { Meta } = Card

const Dashboard = () => {
  let navigate = useNavigate()

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
                  // console.log(results)
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

  const [status, setStatus] = useState(false)
  useEffect(() => {
    getSession().then(() => {
      setStatus(true)
    })
  }, [])
  const user = Pool.getCurrentUser()
  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
  }, [])

  return (
    <>
      <WidgetsDropdown />
    </>
  )
}

export default Dashboard
