import React, { Component } from 'react'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Divider, Input, Collapse } from 'antd'
import { EditOutlined, DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons'
import Loading from '../../../utils/loading'

import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CButton,
  CRow,
  CCol,
  CTooltip,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CContainer,
  CFormLabel,
  CFormText,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCircle } from '@coreui/icons'
import Modal from 'react-modal'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import openNotificationWithIcon from '../../../utils/notification'
const { TextArea } = Input
const { Panel } = Collapse
const { Column, ColumnGroup } = Table
const staff_id = localStorage.getItem('staff')
const staff_name = localStorage.getItem('staff_name')

class Contract extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contract: [],
      contractType: [{}],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      loading: true,
      name: '',
      from_date: null,
      to_date: null,
      place_working: '',
      number_employee: '',
      content: '',
      time_working: 'Theo qui định của công ty',
      uniform: 'Theo qui định của công ty',
      vehicles: 'Theo qui định của công ty',
      basic_salary: 0,
      extra: 0,
      other_support: 0,
      transfer: '',
      up_salary: 'Theo qui định của công ty',
      bonus: 'Theo qui định của công ty',
      training: 'Theo qui định của công ty',
      resort_mode: 'Theo qui định của công ty',
      insurance: 'Theo qui định của công ty',
      sign_day: null,
      status: false,
      employer: '',
      position: '',
      type: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    API({ REGISTER_URL: '/hrm/employment-contract-types/?no_pagination=true', ACTION: 'GET' })
      .then((res) => {
        const contractType = res.data
        this.setState({
          contractType: contractType,
        })
      })
      .catch((error) => console.log(error))
    this.setState({
      modalAddIsOpen: true,
      staff: staff_id,
    })
    API({
      REGISTER_URL: '/hrm/employment-contract/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const contract = res.data
        this.setState({
          contract: contract,
          loading: false,
        })
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'Có lỗi xảy ra',
          description: error,
          placement: 'topRight',
        }),
      )
  }
  UNSAFE_componentWillMount() {
    Modal.setAppElement('body')
  }
  openModal = (item) => {
    console.log(item.type)
    API({ REGISTER_URL: '/hrm/employment-contract-types/?no_pagination=true', ACTION: 'GET' })
      .then((res) => {
        const contractType = res.data
        this.setState({
          contractType: contractType,
        })
      })
      .catch((error) => console.log(error))
    this.setState({
      modalIsOpen: true,
      id: item.id,
      name: item.name,
      from_date: item.from_date,
      to_date: item.to_date,
      place_working: item.place_working,
      number_employee: item.number_employee,
      content: item.content,
      time_working: item.time_working,
      uniform: item.uniform,
      vehicles: item.vehicles,
      basic_salary: item.basic_salary,
      extra: item.extra,
      other_support: item.other_support,
      transfer: item.transfer,
      up_salary: item.up_salary,
      bonus: item.bonus,
      training: item.training,
      resort_mode: item.resort_mode,
      insurance: item.insurance,
      sign_day: item.sign_day,
      status: item.status,
      employer: item.employer,
      position: item.position,
      type: item.type_data,
      staff: staff_id,
    })
  }

  openDeleteModal = (item) => {
    this.setState({
      modalDeleteIsOpen: true,
      id: item.id,
      employer: item.employer,
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    })
  }

  closeDeleteModal = () => {
    this.setState({
      modalDeleteIsOpen: false,
    })
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  handleDelete = (event) => {
    event.preventDefault()

    API({ REGISTER_URL: '/hrm/employment-contract/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          contract: prevState.contract.filter((el) => el.id !== this.state.id),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Xoá dữ liệu thành công!!!',
          description: 'Xoá dữ liệu thành công!!!',
          placement: 'topRight',
        })
        this.closeDeleteModal()
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'Xoá dữ liệu không thành công!!!',
          description: error,
          placement: 'topRight',
        }),
      )
  }

  handleEditSubmit = (event) => {
    event.preventDefault()

    const newUpdate = {
      name: this.state.name,
      from_date: this.state.from_date,
      to_date: this.state.to_date,
      place_working: this.state.place_working,
      number_employee: this.state.number_employee,
      content: this.state.content,
      time_working: this.state.time_working,
      uniform: this.state.uniform,
      vehicles: this.state.vehicles,
      basic_salary: this.state.basic_salary,
      extra: this.state.extra,
      other_support: this.state.other_support,
      transfer: this.state.transfer,
      up_salary: this.state.up_salary,
      bonus: this.state.bonus,
      training: this.state.training,
      resort_mode: this.state.resort_mode,
      insurance: this.state.insurance,
      sign_day: this.state.sign_day,
      status: this.state.status,
      employer: this.state.employer,
      position: this.state.position,
      type: this.state.type,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/employment-contract/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        let key = this.state.id
        this.setState((prevState) => ({
          contract: prevState.contract.map((elm) =>
            elm.id === key
              ? {
                  ...elm,
                  name: this.state.name,
                  from_date: this.state.from_date,
                  to_date: this.state.to_date,
                  place_working: this.state.place_working,
                  number_employee: this.state.number_employee,
                  content: this.state.content,
                  time_working: this.state.time_working,
                  uniform: this.state.uniform,
                  vehicles: this.state.vehicles,
                  basic_salary: this.state.basic_salary,
                  extra: this.state.extra,
                  other_support: this.state.other_support,
                  transfer: this.state.transfer,
                  up_salary: this.state.up_salary,
                  bonus: this.state.bonus,
                  training: this.state.training,
                  resort_mode: this.state.resort_mode,
                  insurance: this.state.insurance,
                  sign_day: this.state.sign_day,
                  status: this.state.status,
                  employer: this.state.employer,
                  position: this.state.position,
                  type: this.state.type,
                }
              : elm,
          ),
        }))
        this.closeModal()
        openNotificationWithIcon({
          type: 'success',
          message: 'Cập nhật dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        setTimeout(function () {
          window.location.reload()
        }, 3000)
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.closeModal()
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          this.closeModal()
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: error,
            placement: 'topRight',
          })
        }
      })
  }

  handleAddSubmit = (event) => {
    event.preventDefault()

    const newData = {
      name: this.state.name,
      from_date: this.state.from_date,
      to_date: this.state.to_date,
      place_working: this.state.place_working,
      number_employee: this.state.number_employee,
      content: this.state.content,
      time_working: this.state.time_working,
      uniform: this.state.uniform,
      vehicles: this.state.vehicles,
      basic_salary: this.state.basic_salary,
      extra: this.state.extra,
      other_support: this.state.other_support,
      transfer: this.state.transfer,
      up_salary: this.state.up_salary,
      bonus: this.state.bonus,
      training: this.state.training,
      resort_mode: this.state.resort_mode,
      insurance: this.state.insurance,
      sign_day: this.state.sign_day,
      status: this.state.status,
      employer: this.state.employer,
      position: this.state.position,
      type: this.state.type,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/employment-contract/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        let contract = this.state.contract
        contract = [newData, ...contract]
        this.setState({ contract: contract })
        openNotificationWithIcon({
          type: 'success',
          message: 'Thêm dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        setTimeout(function () {
          window.location.reload()
        }, 3000)
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Thêm dữ liệu không thành công!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Thêm dữ liệu không thành công!!!',
            description: error,
            placement: 'topRight',
          })
        }
      })
  }
  render() {
    return (
      <>
        {' '}
        <Loading loading={this.state.loading} />
        <h2>{staff_name} - Chứng Chỉ</h2>
        <CForm onSubmit={this.handleAddSubmit}>
          {/* defaultActiveKey={['1']} */}
          <Collapse bordered={false} className="mb-3">
            <Panel header="THÔNG TIN CƠ BẢN" key="1">
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Từ Ngày</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Từ Ngày"
                      autoComplete="from_date"
                      name="from_date"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày bắt đầu hợp đồng có hiệu lực
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Đến Ngày</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Đến Ngày"
                      autoComplete="to_date"
                      name="to_date"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày kết thúc hợp đồng
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày Ký Hợp Đồng</CFormLabel>

                    <CFormInput
                      type="date"
                      placeholder="Ngày Ký Hợp Đồng"
                      autoComplete="sign_day"
                      name="sign_day"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày ký hợp đồng
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Tên Hợp Đồng</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Tên Hợp Đồng"
                      autoComplete="name"
                      name="name"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Tên hợp đồng vui lòng viết IN HOA
                    </CFormText>
                  </CCol>

                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Mã Số Nhân Viên</CFormLabel>

                    <CFormInput
                      type="text"
                      placeholder="Mã Số Nhân Viên"
                      autoComplete="number_employee"
                      name="number_employee"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Mã số nhân viên lấy từ tài khoản nhân viên (linh-ha-bo-phan-du-an)
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Địa Điểm Làm Việc</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Địa Điểm Làm Việc"
                      autoComplete="place_working"
                      name="place_working"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập địa điểm làm việc
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Đồng Phục</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Đồng Phục"
                      autoComplete="uniform"
                      name="uniform"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập nếu có yêu cầu
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nội Dung Hợp Đồng</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Nội Dung Hợp Đồng"
                      autoComplete="content"
                      name="content"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng nhập nội dung hợp đồng
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Thời Gian Làm Việc</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Thời Gian Làm Việc"
                      autoComplete="time_working"
                      name="time_working"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Thời gian làm việc
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Đồng Phục</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Đồng Phục"
                      autoComplete="uniform"
                      name="uniform"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập nếu có yêu cầu
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Phương Tiện Đi Lại</CFormLabel>

                    <CFormInput
                      type="text"
                      placeholder="Phương Tiện Đi Lại"
                      autoComplete="vehicles"
                      name="vehicles"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập nếu có cung cấp
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Lương Cơ Bản</CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="Lương Cơ Bản"
                      autoComplete="basic_salary"
                      name="basic_salary"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Lương cơ bản của nhân viên
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Phục Cấp</CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="Phụ Cấp"
                      autoComplete="extra"
                      name="extra"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập nếu có phụ cấp
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Hỗ Trợ Khác</CFormLabel>

                    <CFormInput
                      type="number"
                      placeholder="Hỗ Trợ Khác"
                      autoComplete="other_support"
                      name="other_support"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập nếu có hỗ trợ
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Hình Thức Trả Tiền Lương
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Hình Thức Trả Tiền Lương"
                      autoComplete="transfer"
                      name="transfer"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Hình Thức Trả Tiền Lương
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Tên Nhân Viên</CFormLabel>

                    <CFormInput
                      type="text"
                      placeholder="Tên Nhân Viên"
                      autoComplete="employer"
                      name="employer"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Tên nhân viên
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Vị Trí</CFormLabel>

                    <CFormInput
                      type="text"
                      placeholder="Vị Trí"
                      autoComplete="position"
                      name="position"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vị trí làm việc
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Trạng Thái Hợp Đồng</CFormLabel>

                    <CFormSelect
                      name="status"
                      aria-label="Vui lòng chọn trạng thái"
                      onChange={this.handleInputChange}
                    >
                      <option key="true" value={true}>
                        Còn Hiệu Lực
                      </option>
                      <option key="false" value={false}>
                        Hết Hiệu Lực
                      </option>
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng chọn trạng thái
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Loại Hợp Đồng</CFormLabel>

                    <CFormSelect
                      name="type"
                      aria-label="Vui lòng chọn loại hợp đồng"
                      onChange={this.handleInputChange}
                    >
                      <option key="0" value="">
                        Chọn loại hợp đồng
                      </option>
                      {this.state.contractType.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui lòng chọn loại hợp đồng!
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
            </Panel>
            <Panel header="THÔNG TIN CHẾ ĐỘ" key="2">
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Chế Độ Tăng Lương</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Chế Độ Tăng Lương"
                      autoComplete="up_salary"
                      name="up_salary"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Chế Độ Tăng Lương
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Chế Độ Thưởng Và Phúc Lợi
                    </CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Hỗ Trợ Khác"
                      autoComplete="bonus"
                      name="bonus"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Chế độ thưởng và phúc lợi nếu có
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Chế Độ Tập Huấn</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Chế Tập Huấn"
                      autoComplete="training"
                      name="training"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Chế độ tập huấn
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Chế Độ Nghỉ Dưỡng</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Chế Độ Nghỉ Dưỡng"
                      autoComplete="resort_mode"
                      name="resort_mode"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Chế độ bảo hiểm
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Chế Độ Bảo Hiểm</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Chế Độ Bảo Hiểm"
                      autoComplete="insurance"
                      name="insurance"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />{' '}
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Chế độ bảo hiểm
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
            </Panel>
          </Collapse>
          <CContainer>
            <CRow>
              <CCol>
                <CButton color="primary" type="submit">
                  LƯU
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </CForm>{' '}
        <Divider />
        <Table dataSource={this.state.contract} bordered>
          <Column title="Số Hợp Đồng" dataIndex="number_contract" key="number_contract" />
          <Column title="Tên Hợp Đồng" dataIndex="name" key="name" />
          <Column title="Từ Ngày" dataIndex="from_date" key="from_date" />
          <Column title="Đến Ngày" dataIndex="to_date" key="to_date" />
          <Column title="Địa Điểm Làm Việc" dataIndex="place_working" key="place_working" />
          <Column title="Mã Số Nhân Viên" dataIndex="number_employee" key="number_employee" />
          <Column title="Thời Gian Làm Việc" dataIndex="time_working" key="time_working" />
          <Column title="Lương Cơ Bản" dataIndex="basic_salary_data" key="basic_salary_data" />
          <Column title="Phụ Cấp" dataIndex="extra_data" key="extra_data" />
          <Column title="Hỗ Trợ Khác" dataIndex="other_support_data" key="other_support_data" />
          <Column
            title="Hành động"
            key={this.state.contract}
            render={(text, record) => (
              <Space size="middle">
                <CTooltip content="Cập Nhật Dự Liệu" placement="top">
                  <CButton
                    color="warning"
                    style={{ marginRight: '10px' }}
                    onClick={() => this.openModal(record)}
                  >
                    <EditOutlined />
                  </CButton>
                </CTooltip>
                <CTooltip content="Xoá Dữ Liệu" placement="top">
                  <CButton color="danger" onClick={() => this.openDeleteModal(text)}>
                    <DeleteOutlined />
                  </CButton>
                </CTooltip>
              </Space>
            )}
          />
        </Table>
        {/* Update */}
        <CModal visible={this.state.modalIsOpen} onClose={this.closeModal} size="xl">
          <CModalHeader>
            <CModalTitle>CẬP NHẬT</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              {/* defaultActiveKey={['1']} */}

              <Collapse bordered={false} className="mb-3">
                <Panel header="THÔNG TIN CƠ BẢN" key="1">
                  <CContainer>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Từ Ngày</CFormLabel>
                        <CFormInput
                          type="date"
                          placeholder="Từ Ngày"
                          autoComplete="from_date"
                          name="from_date"
                          value={this.state.from_date}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Ngày bắt đầu hợp đồng có hiệu lực
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Đến Ngày</CFormLabel>
                        <CFormInput
                          type="date"
                          placeholder="Đến Ngày"
                          autoComplete="to_date"
                          value={this.state.to_date}
                          name="to_date"
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Ngày kết thúc hợp đồng
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Ngày Ký Hợp Đồng</CFormLabel>

                        <CFormInput
                          type="date"
                          placeholder="Ngày Ký Hợp Đồng"
                          autoComplete="sign_day"
                          name="sign_day"
                          value={this.state.sign_day}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Ngày ký hợp đồng
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Tên Hợp Đồng</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Tên Hợp Đồng"
                          autoComplete="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Tên hợp đồng vui lòng viết IN HOA
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Mã Số Nhân Viên</CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Mã Số Nhân Viên"
                          autoComplete="number_employee"
                          name="number_employee"
                          value={this.state.number_employee}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Mã số nhân viên lấy từ tài khoản nhân viên (linh-ha-bo-phan-du-an)
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Địa Điểm Làm Việc
                        </CFormLabel>
                        <TextArea
                          rows={8}
                          type="text"
                          placeholder="Địa Điểm Làm Việc"
                          autoComplete="place_working"
                          value={this.state.place_working}
                          name="place_working"
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />{' '}
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập địa điểm làm việc
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Đồng Phục</CFormLabel>
                        <TextArea
                          rows={8}
                          type="text"
                          placeholder="Đồng Phục"
                          autoComplete="uniform"
                          name="uniform"
                          value={this.state.uniform}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />{' '}
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập nếu có yêu cầu
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Nội Dung Hợp Đồng
                        </CFormLabel>
                        <TextArea
                          rows={8}
                          type="text"
                          placeholder="Nội Dung Hợp Đồng"
                          autoComplete="content"
                          name="content"
                          value={this.state.content}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />{' '}
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Vui lòng nhập nội dung hợp đồng
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Thời Gian Làm Việc
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Thời Gian Làm Việc"
                          autoComplete="time_working"
                          name="time_working"
                          value={this.state.time_working}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Thời gian làm việc
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Phương Tiện Đi Lại
                        </CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Phương Tiện Đi Lại"
                          autoComplete="vehicles"
                          name="vehicles"
                          value={this.state.vehicles}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập nếu có cung cấp
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Lương Cơ Bản</CFormLabel>
                        <CFormInput
                          type="number"
                          placeholder="Lương Cơ Bản"
                          autoComplete="basic_salary"
                          name="basic_salary"
                          value={this.state.basic_salary}
                          onChange={this.handleInputChange}
                          required
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Lương cơ bản của nhân viên
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Phục Cấp</CFormLabel>
                        <CFormInput
                          type="number"
                          placeholder="Phụ Cấp"
                          autoComplete="extra"
                          name="extra"
                          value={this.state.extra}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập nếu có phụ cấp
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Hỗ Trợ Khác</CFormLabel>

                        <CFormInput
                          type="number"
                          placeholder="Hỗ Trợ Khác"
                          autoComplete="other_support"
                          name="other_support"
                          value={this.state.other_support}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập nếu có hỗ trợ
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Hình Thức Trả Tiền Lương
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Hình Thức Trả Tiền Lương"
                          autoComplete="transfer"
                          name="transfer"
                          value={this.state.transfer}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Hình Thức Trả Tiền Lương
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Tên Nhân Viên</CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Tên Nhân Viên"
                          autoComplete="employer"
                          name="employer"
                          value={this.state.employer}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Tên nhân viên
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Vị Trí</CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Vị Trí"
                          autoComplete="position"
                          name="position"
                          value={this.state.position}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Vị trí làm việc
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Trạng Thái Hợp Đồng
                        </CFormLabel>

                        <CFormSelect
                          name="status"
                          aria-label="Vui lòng chọn trạng thái"
                          onChange={this.handleInputChange}
                          value={this.state.status}
                        >
                          <option key="true" value={true}>
                            Còn Hiệu Lực
                          </option>
                          <option key="false" value={false}>
                            Hết Hiệu Lực
                          </option>
                        </CFormSelect>
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Vui lòng chọn trạng thái
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Loại Hợp Đồng</CFormLabel>

                        <CFormSelect
                          name="type"
                          aria-label="Vui lòng chọn loại hợp đồng"
                          onChange={this.handleInputChange}
                          value={this.state.type}
                        >
                          <option key="0" value="">
                            Chọn loại hợp đồng
                          </option>
                          {this.state.contractType.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </CFormSelect>
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Vui lòng chọn loại hợp đồng!
                        </CFormText>
                      </CCol>
                    </CRow>
                  </CContainer>
                </Panel>
                <Panel header="THÔNG TIN CHẾ ĐỘ" key="2">
                  <CContainer>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Chế Độ Tăng Lương
                        </CFormLabel>
                        <TextArea
                          rows={8}
                          type="text"
                          placeholder="Chế Độ Tăng Lương"
                          autoComplete="up_salary"
                          name="up_salary"
                          value={this.state.up_salary}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />{' '}
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Chế Độ Tăng Lương
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Chế Độ Thưởng Và Phúc Lợi
                        </CFormLabel>
                        <TextArea
                          rows={8}
                          type="text"
                          placeholder="Hỗ Trợ Khác"
                          autoComplete="bonus"
                          name="bonus"
                          value={this.state.bonus}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />{' '}
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Chế độ thưởng và phúc lợi nếu có
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Chế Độ Tập Huấn</CFormLabel>
                        <TextArea
                          rows={8}
                          type="text"
                          placeholder="Chế Tập Huấn"
                          autoComplete="training"
                          name="training"
                          value={this.state.training}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />{' '}
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Chế độ tập huấn
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Chế Độ Nghỉ Dưỡng
                        </CFormLabel>
                        <TextArea
                          rows={8}
                          type="text"
                          placeholder="Chế Độ Nghỉ Dưỡng"
                          autoComplete="resort_mode"
                          name="resort_mode"
                          value={this.state.resort_mode}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />{' '}
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Chế độ bảo hiểm
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Chế Độ Bảo Hiểm</CFormLabel>
                        <TextArea
                          rows={8}
                          type="text"
                          placeholder="Chế Độ Bảo Hiểm"
                          value={this.state.insurance}
                          autoComplete="insurance"
                          name="insurance"
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />{' '}
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Chế độ bảo hiểm
                        </CFormText>
                      </CCol>
                    </CRow>
                  </CContainer>
                </Panel>
              </Collapse>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeModal}>
                  ĐÓNG
                </CButton>
                <CButton color="primary" type="submit">
                  CẬP NHẬT
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Delete */}
        <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
          <CModalHeader>
            <CModalTitle>XOÁ</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {' '}
            <CForm onSubmit={this.handleDelete}>
              <h2 style={{ textTransform: 'uppercase' }}>
                Bạn có chắc chắn xoá {this.state.employer}?
              </h2>
              <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="contract_types"
                  autoComplete="contract_types"
                  name="id"
                  value={this.state.id}
                  onChange={this.handleInputChange}
                  required
                />
              </CInputGroup>{' '}
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeDeleteModal}>
                  HUỶ
                </CButton>
                <CButton color="danger" type="submit">
                  ĐỒNG Ý
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
      </>
    )
  }
}

export default Contract
