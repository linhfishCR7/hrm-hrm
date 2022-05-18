import React, { useEffect, useState } from 'react'
import Pool from '../../../utils/UserPool'
import { useNavigate } from 'react-router-dom'
import axios from '../../../utils/axios'
import PropTypes from 'prop-types'

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CRow,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CImage,
} from '@coreui/react'
import '../../../assets/style.css'
import { ListReligion } from './ListReligion'
import Pagination from '../../../utils/Pagination'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const Religion = () => {
  let navigate = useNavigate()
  const [religions, setReligion] = useState([{}])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState('')
  const [statusdata, setStatusData] = useState(false)

  const user = Pool.getCurrentUser()
  ListReligion.propTypes = {
    religions: PropTypes.array,
    loading: PropTypes.bool,
  }
  const fetchReligions = async () => {
    const token = localStorage.getItem('token')
    const REGISTER_URL = '/hrm/religions/?no_pagination=true'
    setLoading(true)
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    setReligion(res.data)
    console.log(res.data)
    setLoading(false)
  }
  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    fetchReligions()
  }, [])
  const handleSearch = async (event) => {
    let value = event.target.value
    console.log(typeof event.target.value)
    const token = localStorage.getItem('token')
    const REGISTER_URL = '/hrm/religions/?no_pagination=true&search=' + value
    setLoading(true)
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    setReligion(res.data)
    console.log(res.data)
    if (res.data.length === 0) {
      setData(
        <>
          <h4>No Data</h4>
          <CImage
            src="https://hrm-s3.s3.amazonaws.com/aa614145-cffnodata.png"
            width={160}
            height={160}
          />
        </>,
      )
      setStatusData(true)
    }
    if (value === '') {
      setStatusData(false)
    }
    setLoading(false)
  }

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h1> Tôn Giáo </h1> <p className="text-medium-emphasis"></p>{' '}
        <CRow>
          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CFormInput
                placeholder="Search Name or Religion"
                aria-label="Search Name or Religion"
                aria-describedby="button-addon2"
                onChange={(event) => handleSearch(event)}
              />
              {/* <CButton type="button" color="secondary" variant="outline" id="button-addon2"> */}
              <CInputGroupText>
                <CIcon icon={cilSearch} />
              </CInputGroupText>

              {/* </CButton> */}
            </CInputGroup>
          </CCol>
        </CRow>
        <ListReligion
          religions={religions}
          loading={loading}
          data={data}
          status={statusdata}
          fetchapi={fetchReligions}
        />
      </CCardBody>
      <CCardFooter>
        <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center"></CRow>
      </CCardFooter>
    </CCard>
  )
}

export default Religion
