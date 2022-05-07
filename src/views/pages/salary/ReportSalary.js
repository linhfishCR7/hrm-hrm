import { CContainer, CForm, CFormSelect, CRow, CCol } from '@coreui/react'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Select } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import Loading from '../../../utils/loading'

import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
const { Option } = Select

const ReportSalary = () => {
  const [data, setData] = useState({})
  const [dataStaff, setDataStaff] = useState('')
  const [dataListStaff, setDataListStaff] = useState([{}])
  const [dataListSalary, setDataListSalary] = useState([{}])
  const [dataSalary, setDataSalary] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchListStaffAPI = () => {
    API({
      REGISTER_URL: '/hrm/staffs/?no_pagination=true',
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

  const fetchListSalaryAPI = (dataStaff) => {
    API({
      REGISTER_URL: '/hrm/salary/?no_pagination=true&staff__id=' + dataStaff,
      ACTION: 'GET',
    })
      .then((res) => {
        const data = res.data
        setDataListSalary(data)
        setLoading(false)
      })
      .catch((error) => {})
  }

  const fetchSalaryAPI = (dataSalary) => {
    API({
      REGISTER_URL: '/hrm/salary/' + dataSalary + '/',
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

    fetchListSalaryAPI(dataStaff)
  }, [dataStaff])

  useEffect(() => {
    setLoading(true)

    fetchSalaryAPI(dataSalary)
  }, [dataSalary])

  return (
    <>
      <Loading loading={loading} />
      {/* <CContainer>
        <CRow className="mb-3">
          <CCol md={8}>
            <CFormSelect
              value={dataStaff}
              aria-label="Chọn Nhân Viên"
              onChange={(event) => setDataStaff(event.target.value)}
            >
              <option key="0" value="">
                Chọn Nhân Viên
              </option>
              {dataListStaff.map((item) => (
                <option key={item.id} value={item.id}>
                  (Mã Số: {item.staff}) Họ Tên: {item.last_name} {item.first_name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol md={8}>
            <CFormSelect
              value={dataSalary}
              aria-label="Chọn Bảng Lương"
              onChange={(event) => setDataSalary(event.target.value)}
            >
              <option key="0" value="">
                Chọn Bảng Lương
              </option>
              {dataListSalary.map((item) => (
                <option key={item.id} value={item.id}>
                  Tháng: {item.month} - Năm: {item.year}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
      </CContainer> */}

      <CContainer>
        <CRow className="mb-3">
          <CCol md={8}>
            <Select
              allowClear
              showSearch
              style={{ width: 700 }}
              placeholder="Tìm kiếm họ tên và mã nhân viên"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              //   filterSort={(optionA, optionB) =>
              //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              //   }
              //   value={dataStaff}
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
        <CRow className="mb-3">
          <CCol md={8}>
            <Select
              allowClear
              showSearch
              style={{ width: 700 }}
              placeholder="Tìm kiếm theo tháng và năm"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              //   filterSort={(optionA, optionB) =>
              //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              //   }
              //   value={dataStaff}
              onChange={(event) => setDataSalary(event)}
            >
              <Option key="0" value="">
                Chọn Bảng Lương Tháng
              </Option>
              {dataListSalary.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.month + '-' + item.year}
                </Option>
              ))}
            </Select>
          </CCol>
        </CRow>
      </CContainer>

      <CContainer className="content">
        <div className="row">
          <div className="col-sm-12">
            <h5 className="mt-3 mb-4 fw-bold">Bảng Lương Nhân Viên PDF</h5>
            <embed src={data.key} type="application/pdf" height="1000px" width="100%" />
          </div>
        </div>
      </CContainer>
    </>
  )
}
export default ReportSalary