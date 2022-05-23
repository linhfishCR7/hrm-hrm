import { CContainer, CForm, CFormSelect, CRow, CCol } from '@coreui/react'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Select } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import Loading from '../../../utils/loading'
import { BRANCH } from '../../../constants/Config'

import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
const { Option } = Select

const ContractReport = () => {
  const [data, setData] = useState([{}])
  const [dataStaff, setDataStaff] = useState('')
  const [dataListStaff, setDataListStaff] = useState([{}])
  const [dataListContract, setDataListContract] = useState([{}])
  const [datacontract, setDataContract] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchListStaffAPI = () => {
    API({
      REGISTER_URL:
        '/hrm/staffs/?no_pagination=true&is_active=true&department__branch__id=' + BRANCH,
      ACTION: 'GET',
    })
      .then((res) => {
        const data = res.data
        setDataListStaff(data)
        setDataStaff(res.data[1].id)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  const fetchListContractAPI = (dataStaff) => {
    API({
      REGISTER_URL:
        '/hrm/employment-contract/list-employment-contract/?no_pagination=true&staff__id=' +
        dataStaff,
      ACTION: 'GET',
    })
      .then((res) => {
        const data = res.data
        setDataListContract(data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  const fetchContractAPI = (datacontract) => {
    API({
      REGISTER_URL:
        '/hrm/employment-contract/list-employment-contract/?no_pagination=true&id=' + datacontract,
      ACTION: 'GET',
    })
      .then((res) => {
        const data = res.data
        setData(data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true)
    fetchListStaffAPI()
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchListContractAPI(dataStaff)
  }, [dataStaff])

  useEffect(() => {
    setLoading(true)
    fetchContractAPI(datacontract)
  }, [datacontract])

  return (
    <>
      <Loading loading={loading} />
      <h2>Hợp Đồng Nhân Viên - PDF</h2>

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
              placeholder="Tìm kiếm theo ngày xin phép"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              //   filterSort={(optionA, optionB) =>
              //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              //   }
              //   value={dataStaff}
              onChange={(event) => setDataContract(event)}
            >
              <Option key="0" value="">
                Chọn Hợp Đồng
              </Option>
              {dataListContract.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </CCol>
        </CRow>
      </CContainer>

      <CContainer className="content">
        <div className="row">
          <div className="col-sm-12">
            <embed src={data[0].key} type="application/pdf" height="1000px" width="100%" />
          </div>
        </div>
      </CContainer>
    </>
  )
}
export default ContractReport
