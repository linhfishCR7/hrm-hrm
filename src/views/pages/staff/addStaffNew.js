import React, { useState, useEffect } from 'react'
import {
  CContainer,
  CForm,
  CSpinner,
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
  CAlert,
} from '@coreui/react'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import { BRANCH } from '../../../constants/Config'
import openNotificationWithIcon from '../../../utils/notification'
import Loading from '../../../utils/loading'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilDelete } from '@coreui/icons'
const AddStaff = () => {
  const [inputList, setinputList] = useState([
    { first_name: '', last_name: '', email: '', department: '' },
  ])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadStatusCreate, setLoadStatusCreate] = useState(false)

  const fetchDeparmentAPI = () => {
    API({
      REGISTER_URL: '/hrm/departments/?no_pagination=true&branch__id=' + BRANCH,
      ACTION: 'GET',
    })
      .then((res) => {
        const data = res.data
        setDepartments(data)
        setLoading(false)
      })
      .catch((error) => {
        openNotificationWithIcon({
          type: 'error',
          message: 'Có lỗi xảy ra',
          description: error,
          placement: 'topRight',
        })
      })
  }

  useEffect(() => {
    fetchDeparmentAPI()
  }, [])

  const handleinputchange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setinputList(list)
  }

  const handleremove = (index) => {
    const list = [...inputList]
    list.splice(index, 1)
    setinputList(list)
  }

  const handleaddclick = () => {
    setinputList([...inputList, { first_name: '', last_name: '', email: '', department: '' }])
  }

  const onSubmit = (event) => {
    setLoadStatusCreate(true)
    event.preventDefault()
    inputList.map((item) => {
      API({
        REGISTER_URL: '/hrm/staffs/',
        DATA: item,
        ACTION: 'POST',
      })
        .then((res) => {
          setLoadStatusCreate(false)
          openNotificationWithIcon({
            type: 'success',
            message: 'Tạo Nhân Viên Thành Công!!!',
            description: '',
            placement: 'topRight',
          })
          setTimeout(function () {
            window.location.reload()
          }, 3000)
        })
        .catch((error) => {
          setLoadStatusCreate(false)
          openNotificationWithIcon({
            type: 'error',
            message: 'Có lỗi xảy ra',
            description: '',
            placement: 'topRight',
          })
        })
    })
  }
  return (
    <>
      <Loading loading={loading} />
      <h2>Thêm Mới Nhân Viên</h2>
      <CContainer>
        <CRow>
          <CCol md={8}>
            <CAlert color="info" className="mb-3">
              Sau khi tạo nhân viên thành công thông tin đăng nhập của tài khoản được gửi đến email
              vừa đăng ký
            </CAlert>
          </CCol>
        </CRow>
      </CContainer>

      <CForm onSubmit={onSubmit}>
        {inputList.map((x, i) => {
          return (
            <>
              <h6 className="mb-3">Nhân Viên Số {i + 1}</h6>
              <CContainer className="content mb-5" key={i}>
                <CRow>
                  <CCol md={2}>
                    <CFormInput
                      className="mb-3"
                      placeholder="Nhập Họ"
                      name="last_name"
                      onChange={(e) => handleinputchange(e, i)}
                      required
                      type="text"
                    />
                  </CCol>
                  <CCol md={2}>
                    <CFormInput
                      placeholder="Nhập Tên"
                      type="text"
                      className="mb-3"
                      name="first_name"
                      onChange={(e) => handleinputchange(e, i)}
                      required
                    />
                  </CCol>
                  <CCol md={3}>
                    <CFormSelect
                      className="mb-3"
                      name="department"
                      aria-label="Chọn Bộ Phận Làm Việc"
                      onChange={(e) => handleinputchange(e, i)}
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
                  </CCol>
                  <CCol md={3}>
                    <CFormInput
                      placeholder="Nhập Email"
                      className="mb-3"
                      onChange={(e) => handleinputchange(e, i)}
                      required
                      name="email"
                      type="email"
                    />
                  </CCol>
                  <CCol md={2} className="mb-3">
                    {inputList.length !== 1 && (
                      <button className="btn btn-danger mx-1" onClick={() => handleremove(i)}>
                        <CIcon icon={cilDelete} />
                      </button>
                    )}
                  </CCol>
                </CRow>
                {inputList.length - 1 === i && (
                  <button className="btn btn-success mt-4" onClick={handleaddclick}>
                    <CIcon icon={cilPlus} />
                  </button>
                )}
              </CContainer>
            </>
          )
        })}
        <CContainer className="content">
          <div className="row mb-3">
            <div className="form-group col-md-3">
              <button className="btn btn-info mt-4" type="submit">
                {loadStatusCreate ? (
                  <>
                    <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                    Vui lòng chờ...
                  </>
                ) : (
                  <>Tạo nhân viên</>
                )}
              </button>
            </div>
          </div>
        </CContainer>
      </CForm>
    </>
  )
}
export default AddStaff
