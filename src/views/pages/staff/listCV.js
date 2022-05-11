import { CContainer, CForm, CFormSelect, CRow, CCol } from '@coreui/react'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Select } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import Loading from '../../../utils/loading'

import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
const { Option } = Select

const ListCV = () => {
  const [data, setData] = useState({})
  const [dataStaff, setDataStaff] = useState('')
  const [dataListStaff, setDataListStaff] = useState([{}])
  const [loading, setLoading] = useState(true)

  const fetchListStaffAPI = () => {
    API({
      REGISTER_URL: '/hrm/staffs/list-staff-report/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const data = res.data
        setDataListStaff(data)
        setDataStaff(res.data[1].id)
        setLoading(false)
      })
      .catch((error) => {})
  }

  const fetchStaffAPI = (dataStaff) => {
    API({
      REGISTER_URL: '/hrm/staffs/staff-report/' + dataStaff + '/',
      ACTION: 'GET',
    })
      .then((res) => {
        const data = res.data
        setData(data)
        setLoading(false)
      })
      .catch((error) => {})
  }

  useEffect(() => {
    setLoading(true)
    fetchListStaffAPI()
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchStaffAPI(dataStaff)
  }, [dataStaff])

  return (
    <>
      <Loading loading={loading} />
      <CContainer>
        <CRow className="mb-3">
          <CCol md={8}>
            <Select
              showSearch
              style={{ width: 700 }}
              placeholder="Tìm kiếm họ tên và mã nhân viên"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(event) => setDataStaff(event)}
            >
              <Option key="0" value="">
                Chọn Nhân Viên
              </Option>
              {dataListStaff.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.staff + ' ' + item.last_name + ' ' + item.first_name}
                </Option>
              ))}
            </Select>
          </CCol>
        </CRow>
      </CContainer>

      <CContainer className="content">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="mt-3 mb-4 fw-bold">CV Nhân Viên PDF</h2>
            <embed src={data.key} type="application/pdf" height="1000px" width="100%" />
          </div>
        </div>
      </CContainer>
    </>
  )
}
export default ListCV
