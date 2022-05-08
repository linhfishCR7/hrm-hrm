import React, { useEffect, useState } from 'react'
import Pool from '../../utils/UserPool'
import { useNavigate } from 'react-router-dom'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

import WidgetsDropdownAdmin from '../widgets/WidgetsDropdownAdmin'

const DashboardAdmin = () => {
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
    if (localStorage.getItem('role') !== 'admin') {
      navigate('/404')
    }
    getSession().then(() => {
      setStatus(true)
    })
  }, [])
  const user = Pool.getCurrentUser()
  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      if (localStorage.getItem('role') !== 'admin') {
        navigate('/404')
      }
    }
  }, [])

  return (
    <>
      <WidgetsDropdownAdmin />
    </>
  )
}

export default DashboardAdmin
