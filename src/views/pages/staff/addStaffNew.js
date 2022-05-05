import React, { useState, useEffect } from 'react'
import { CContainer, CForm, CSpinner } from '@coreui/react'
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
        })
        .catch((error) => {
          openNotificationWithIcon({
            type: 'error',
            message: 'Có lỗi xảy ra',
            description: error,
            placement: 'topRight',
          })
        })
    })
  }
  return (
    <>
      <Loading loading={loading} />
      <h5 className="mt-3 mb-4 fw-bold">THÊM MỚI NHÂN VIÊN</h5>
      <p className="mb-5">
        Sau khi tạo nhân viên thành công tài khoản nhân viên được lưu vào file ở thư mục Downloads
      </p>
      <CForm onSubmit={onSubmit}>
        {inputList.map((x, i) => {
          return (
            <>
              <h6 className="mb-3">Nhân Viên Số {i + 1}</h6>
              <CContainer className="content mb-5" key={i}>
                <div className="row mb-4">
                  <div className="col-md-5 col-sm-12">
                    <label>Họ Nhân Viên</label>
                    <input
                      type="text"
                      name="last_name"
                      className="form-control"
                      placeholder="Nhập Họ Nhân Viên"
                      onChange={(e) => handleinputchange(e, i)}
                      required
                    />
                  </div>
                  <div className="col-md-5 col-sm-12">
                    <label>Tên Nhân Viên</label>
                    <input
                      type="text"
                      name="first_name"
                      className="form-control"
                      placeholder="Nhập Tên Nhân Viên"
                      onChange={(e) => handleinputchange(e, i)}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5 col-sm-12">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Nhập Email"
                      onChange={(e) => handleinputchange(e, i)}
                      required
                    />
                  </div>
                  <div className="col-md-5 col-sm-12">
                    <label>Chọn Bộ Phận</label>
                    <select
                      name="department"
                      className="form-control"
                      onChange={(e) => handleinputchange(e, i)}
                      required
                    >
                      <option value="" key="0">
                        Chọn Bộ Phận
                      </option>
                      {departments.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2 col-sm-12">
                    {inputList.length !== 1 && (
                      <button className="btn btn-danger mx-1" onClick={() => handleremove(i)}>
                        <CIcon icon={cilDelete} /> Xoá Nhân Viên
                      </button>
                    )}
                    {inputList.length - 1 === i && (
                      <button className="btn btn-success mt-4" onClick={handleaddclick}>
                        <CIcon icon={cilPlus} />
                        Thêm Nhân Viên
                      </button>
                    )}
                  </div>
                </div>
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
                    Vui Lòng Chờ...
                  </>
                ) : (
                  <>Tạo Nhân Viên</>
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
