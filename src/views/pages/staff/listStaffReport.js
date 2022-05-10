import { CContainer, CForm, CFormSelect, CRow, CCol } from '@coreui/react'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Select } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import Loading from '../../../utils/loading'
import { BRANCH } from '../../../constants/Config'

import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}

const ListStaffReport = () => {
  const [dataListStaff, setDataListStaff] = useState([{}])
  const [loading, setLoading] = useState(true)

  const fetchListStaffAPI = () => {
    API({
      REGISTER_URL: '/hrm/staffs/list-all-staff-report/?no_pagination=true&branch=' + BRANCH,
      ACTION: 'GET',
    })
      .then((res) => {
        const data = res.data
        setDataListStaff(data)
        setLoading(false)
      })
      .catch((error) => {})
  }

  useEffect(() => {
    setLoading(true)
    fetchListStaffAPI()
  }, [])

  return (
    <>
      <Loading loading={loading} />
      <CContainer className="content">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="mt-3 mb-4 fw-bold">Danh Sách Nhân Viên PDF</h2>
            <embed
              src={dataListStaff.key_list_staff}
              type="application/pdf"
              height="1000px"
              width="100%"
            />
          </div>
        </div>
      </CContainer>
    </>
  )
}
export default ListStaffReport
