import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Input, Collapse, Spin } from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import openNotificationWithIcon from '../../../utils/notification'

import {
  CFormTextarea,
  CContainer,
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
  CFormLabel,
  CFormText,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCircle, cilInfo } from '@coreui/icons'
import Modal from 'react-modal'
const { Column } = Table
const { Panel } = Collapse

class Staff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      staffs: [],
      departments: [{}],
      departmentData: [{}],
      nationalites: [{}],
      ethnicities: [{}],
      religions: [{}],
      literacies: [{}],
      positions: [{}],
      positionData: [{}],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      modalSettingIsOpen: false,
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      is_active: false,
      department: '',
      nationality: '',
      ethnicity: '',
      religion: '',
      literacy: '',
      position: '',
      position_data: '',
      staff: '',
      gender: '',
      marital_status: '',
      number_of_children: 0,
      identity_card: '',
      issuance_date: null,
      place_of_issuance: '',
      start_work_date: null,
      probationary_end_date: null,
      labor_contract_signing_date: null,
      personal_email: '',
      facebook: '',
      social_insurance_number: '',
      tax_code: '',
      bank_account: '',
      elect_notifications: '',
      elect_decision: '',
      url: '',
      note: '',
      address: '',
      country: '',
      city: '',
      province: '',
      district: '',
      commune: '',
      postcode: '',
      lat: '',
      lng: '',
      type: 'place_of_birth_address',

      address2: '',
      country2: '',
      city2: '',
      province2: '',
      district2: '',
      commune2: '',
      postcode2: '',
      lat2: '',
      lng2: '',
      type2: 'permanent_address',

      address3: '',
      country3: '',
      city3: '',
      province3: '',
      district3: '',
      commune3: '',
      postcode3: '',
      lat3: '',
      lng3: '',
      type3: 'temporary_residence_address',
      loading: true,
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  fetchDeparmentFilterAPI = (event) => {
    API({
      REGISTER_URL: '/hrm/departments/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const departmentss = res.data
        const data = []
        departmentss.map((item) =>
          // this.setState({
          data.push({
            text: item.name,
            value: item.name,
          }),
        )
        this.setState({
          departmentData: data,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchPositionFilterAPI = (event) => {
    API({
      REGISTER_URL: '/hrm/positions/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const positionss = res.data
        const data = []
        positionss.map((item) =>
          // this.setState({
          data.push({
            text: item.name,
            value: item.name,
          }),
        )
        this.setState({
          positionData: data,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchDeparmentAPI = async (event) => {
    await axios
      .get('/hrm/departments/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const departments = res.data
        this.setState({
          departments: departments,
        })
      })
      .catch((error) => console.log(error))
  }
  fetchNationalityAPI = async (event) => {
    await axios
      .get('/hrm/nationalities/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const nationalites = res.data
        this.setState({
          nationalites: nationalites,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchEthnicityAPI = async (event) => {
    await axios
      .get('/hrm/ethnicities/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const ethnicities = res.data
        this.setState({
          ethnicities: ethnicities,
        })
      })
      .catch((error) => console.log(error))
  }
  fetchReligionAPI = async (event) => {
    await axios
      .get('/hrm/religions/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const religions = res.data
        this.setState({
          religions: religions,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchLiteracyAPI = async (event) => {
    await axios
      .get('/hrm/literacy/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const literacies = res.data
        this.setState({
          literacies: literacies,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchPositionAPI = async (event) => {
    await axios
      .get('/hrm/positions/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const positions = res.data
        this.setState({
          positions: positions,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchStaffAPI = async (event) => {
    await axios
      .get('/hrm/staffs/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const staffs = res.data
        this.setState({
          staffs: staffs,
          loading: false,
        })
      })
      .catch((error) => console.log(error))
  }
  componentDidMount() {
    this.setState({
      loading: true,
    })
    this.fetchStaffAPI()
    this.fetchDeparmentFilterAPI()
    this.fetchPositionFilterAPI()
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  UNSAFE_componentWillMount() {
    Modal.setAppElement('body')
  }

  openModal = (item) => {
    this.fetchDeparmentAPI()
    this.fetchNationalityAPI()
    this.fetchEthnicityAPI()
    this.fetchReligionAPI()
    this.fetchLiteracyAPI()
    this.fetchPositionAPI()
    axios
      .get('/hrm/staffs/' + item.id + '/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const staffs = res.data
        if (staffs.addresses === '') {
          this.setState({
            address: '',
            country: '',
            city: '',
            province: '',
            district: '',
            commune: '',
            postcode: '',
            lat: '',
            lng: '',
            type: 'place_of_birth_address',

            address2: '',
            country2: '',
            city2: '',
            province2: '',
            district2: '',
            commune2: '',
            postcode2: '',
            lat2: '',
            lng2: '',
            type2: 'permanent_address',

            address3: '',
            country3: '',
            city3: '',
            province3: '',
            district3: '',
            commune3: '',
            postcode3: '',
            lat3: '',
            lng3: '',
            type3: 'temporary_residence_address',
          })
        } else {
          this.setState({
            address: staffs.addresses[0].address,
            country: staffs.addresses[0].country,
            city: staffs.addresses[0].city,
            province: staffs.addresses[0].province,
            district: staffs.addresses[0].district,
            commune: staffs.addresses[0].commune,
            postcode: staffs.addresses[0].postcode,
            lat: staffs.addresses[0].lat,
            lng: staffs.addresses[0].lng,
            type: 'place_of_birth_address',

            address2: staffs.addresses[1].address,
            country2: staffs.addresses[1].country,
            city2: staffs.addresses[1].city,
            province2: staffs.addresses[1].province,
            district2: staffs.addresses[1].district,
            commune2: staffs.addresses[1].commune,
            postcode2: staffs.addresses[1].postcode,
            lat2: staffs.addresses[1].lat,
            lng2: staffs.addresses[1].lng,
            type2: 'permanent_address',

            address3: staffs.addresses[2].address,
            country3: staffs.addresses[2].country,
            city3: staffs.addresses[2].city,
            province3: staffs.addresses[2].province,
            district3: staffs.addresses[2].district,
            commune3: staffs.addresses[2].commune,
            postcode3: staffs.addresses[2].postcode,
            lat3: staffs.addresses[2].lat,
            lng3: staffs.addresses[2].lng,
            type3: 'temporary_residence_address',
          })
        }
        this.setState({
          modalIsOpen: true,
          id: staffs.id,
          gender: staffs.gender,
          first_name: staffs.first_name,
          last_name: staffs.last_name,
          email: staffs.email,
          phone: staffs.phone,
          is_active: staffs.is_active,
          marital_status: staffs.marital_status,
          number_of_children: staffs.number_of_children,
          identity_card: staffs.identity_card,
          issuance_date: staffs.issuance_date,
          place_of_issuance: staffs.place_of_issuance,
          start_work_date: staffs.start_work_date,
          probationary_end_date: staffs.probationary_end_date,
          labor_contract_signing_date: staffs.labor_contract_signing_date,
          personal_email: staffs.personal_email,
          facebook: staffs.facebook,
          social_insurance_number: staffs.social_insurance_number,
          tax_code: staffs.tax_code,
          bank_account: staffs.bank_account,
          elect_notifications: staffs.elect_notifications,
          elect_decision: staffs.elect_decision,
          url: staffs.url,
          note: staffs.note,
          department: staffs.department ? staffs.department.id : '',
          nationality: staffs.nationality ? staffs.nationality.id : '',
          ethnicity: staffs.ethnicity ? staffs.ethnicity.id : '',
          religion: staffs.religion ? staffs.religion.id : '',
          literacy: staffs.literacy ? staffs.literacy.id : '',
          position: staffs.position ? staffs.position.id : '',
        })
      })
      .catch((error) => console.log(error))
  }
  openDeleteModal = (item) => {
    this.setState({
      modalDeleteIsOpen: true,
      id: item.id,
      first_name: item.first_name,
      last_name: item.last_name,
    })
  }
  openSettingModal = (item) => {
    this.setState({
      modalSettingIsOpen: true,
      id: item.id,
      name: item.first_name + ' ' + item.last_name,
      staff: item.staff,
    })
    localStorage.setItem('staff', item.id)
    localStorage.setItem('staff_name', item.first_name + ' ' + item.last_name)
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

  closeSettingModal = () => {
    this.setState({
      modalSettingIsOpen: false,
    })
  }

  handleEditSubmit = async (event) => {
    event.preventDefault()
    const newUpdate = {
      gender: this.state.gender,
      is_active: this.state.is_active,
      marital_status: this.state.marital_status,
      number_of_children: this.state.number_of_children,
      identity_card: this.state.identity_card,
      issuance_date: this.state.issuance_date,
      place_of_issuance: this.state.place_of_issuance,
      start_work_date: this.state.start_work_date,
      probationary_end_date: this.state.probationary_end_date,
      labor_contract_signing_date: this.state.labor_contract_signing_date,
      personal_email: this.state.personal_email,
      facebook: this.state.facebook,
      social_insurance_number: this.state.social_insurance_number,
      tax_code: this.state.tax_code,
      bank_account: this.state.bank_account,
      elect_notifications: this.state.elect_notifications,
      elect_decision: this.state.elect_decision,
      url: this.state.url,
      note: this.state.note,
      department: this.state.department,
      nationality: this.state.nationality,
      ethnicity: this.state.ethnicity,
      religion: this.state.religion,
      literacy: this.state.literacy,
      position: this.state.position,
      addresses: [
        {
          address: this.state.address,
          country: this.state.country,
          city: this.state.city,
          province: this.state.province,
          district: this.state.district,
          commune: this.state.commune,
          postcode: this.state.postcode,
          lat: this.state.lat,
          lng: this.state.lng,
          type: 'place_of_birth_address',
        },
        {
          address: this.state.address2,
          country: this.state.country2,
          city: this.state.city2,
          province: this.state.province2,
          district: this.state.district2,
          commune: this.state.commune2,
          postcode: this.state.postcode2,
          lat: this.state.lat2,
          lng: this.state.lng2,
          type: 'permanent_address',
        },
        {
          address: this.state.address3,
          country: this.state.country3,
          city: this.state.city3,
          province: this.state.province3,
          district: this.state.district3,
          commune: this.state.commune3,
          postcode: this.state.postcode3,
          lat: this.state.lat3,
          lng: this.state.lng3,
          type: 'temporary_residence_address',
        },
      ],
    }
    await axios
      .put('/hrm/staffs/' + this.state.id + '/', newUpdate, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        this.fetchStaffAPI()
        openNotificationWithIcon({
          type: 'success',
          message: 'Cập nhật dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeModal()
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          this.closeModal()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          this.closeModal()
        }
      })
  }

  handleDelete = (event) => {
    event.preventDefault()

    axios
      .delete('/hrm/staffs/' + this.state.id + '/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        this.setState((prevState) => ({
          staffs: prevState.staffs.filter((el) => el.id !== this.state.id),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Xoá dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeDeleteModal()
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Xoá dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          this.closeDeleteModal()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Xoá dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          this.closeDeleteModal()
        }
      })
  }
  handleSearch = async (event) => {
    let value = event.target.value
    const REGISTER_URL = '/hrm/staffs/?no_pagination=true&search=' + value
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    })
    this.setState({ staffs: res.data })
  }
  render() {
    return (
      <>
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spin tip="Vui lòng chờ..." size="large"></Spin>}
          styles={{ wrapper: { backgroundColor: 'black' } }}
          // text="Loading your content..."
        ></LoadingOverlay>
        <h2>Nhân Viên</h2>
        <CRow>
          <CCol md={8}>
            <Input.Search
              placeholder="Tìm kiếm họ tên, email và số điện thoại"
              onChange={(event) => this.handleSearch(event)}
              className="mb-3"
            />
          </CCol>
        </CRow>
        <Table dataSource={this.state.staffs} bordered>
          <Column
            title="Mã Số"
            dataIndex="staff"
            key="staff"
            sorter={(a, b) => a.staff.length - b.staff.length}
            sortDirections={['descend', 'ascend']}
          />
          <Column title="Họ" dataIndex="last_name" key="last_name" />
          <Column title="Tên" dataIndex="first_name" key="first_name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Số điện thoại" dataIndex="phone" key="phone" />
          <Column
            title="Bộ phận"
            dataIndex="department_data"
            key="department_data"
            filters={this.state.departmentData}
            onFilter={(value, record) => record.department_data.startsWith(value)}
            filterSearch={true}
            width="20%"
          />
          <Column
            title="Chức Vụ"
            dataIndex="position_data"
            key="position_data"
            filters={this.state.positionData}
            onFilter={(value, record) => record.position_data.startsWith(value)}
            filterSearch={true}
          />
          <Column
            title="Tình Trạng"
            dataIndex="is_active_data"
            key="is_active_data"
            filters={[
              { text: 'Nghỉ Làm', value: 'Nghỉ Làm' },
              { text: 'Còn Làm', value: 'Còn Làm' },
            ]}
            onFilter={(value, record) => record.is_active_data.startsWith(value)}
            filterSearch={true}
          />
          <Column
            title="Hành động"
            key={this.state.staff}
            render={(text, record) => (
              <Space size="middle">
                <CTooltip content="Cập Nhật Dự Liệu" placement="top">
                  <CButton
                    color="warning"
                    style={{ marginRight: '10px' }}
                    // key={record.id}
                    onClick={() => this.openModal(record)}
                  >
                    <EditOutlined />
                  </CButton>
                </CTooltip>
                <CTooltip content="Xoá Dữ Liệu" placement="top">
                  <CButton color="danger" onClick={() => this.openDeleteModal(text)}>
                    {/* <CIcon icon={cilDelete} /> */}
                    <DeleteOutlined />
                  </CButton>
                </CTooltip>
                <CTooltip content="Chi tiết nhân viên" placement="top">
                  <CButton color="info" onClick={() => this.openSettingModal(text)}>
                    {/* <CIcon icon={cilDelete} /> */}
                    <CIcon icon={cilInfo} />
                  </CButton>
                </CTooltip>
              </Space>
            )}
          />
        </Table>
        {/* Detail */}
        <CModal
          visible={this.state.modalSettingIsOpen}
          onClose={this.closeSettingModal}
          size="lg"
          scrollable={true}
        >
          <CModalHeader>
            <CModalTitle>Chi tiết nhân viên</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <h3 style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                Mã nhân viên: {this.state.staff}
              </h3>
              <CTooltip content="Thông Tin Khẩn Cấp" placement="top">
                <Link to="/staff/contact" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Thông Tin Khẩn Cấp
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Bằng Cấp" placement="top">
                <Link to="/staff/degree" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Bằng Cấp
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Chứng Chỉ" placement="top">
                <Link to="/staff/certificate" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */} Chứng Chỉ
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Kỹ Năng" placement="top">
                <Link to="/staff/skill" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Kỹ Năng
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Công Tác" placement="top">
                <Link to="/staff/on-business" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */} Công Tác
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Chấm Công" placement="top">
                <Link to="/staff/timekeeping" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Chấm Công
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Phép Năm" placement="top">
                <Link to="/staff/day-off-year" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Phép Năm
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Tiền Lương" placement="top">
                <Link to="/staff/salary" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Tiền Lương
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Điều Chỉnh Lương" placement="top">
                <Link to="/staff/up-salary" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Điều Chỉnh Lương
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Hợp Đồng Lao Động" placement="top">
                <Link to="/staff/contract" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Hợp Đồng Lao Động
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Đào Tạo" placement="top">
                <Link to="/staff/trainning" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Đào Tạo
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Thăng Tiến" placement="top">
                <Link to="/staff/promotion" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Thăng Tiến
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Khen Thưởng" placement="top">
                <Link to="/staff/bonus" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Khen Thưởng
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Kỷ Luật" placement="top">
                <Link to="/staff/discipline" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Kỷ Luật
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Sức Khoẻ" placement="top">
                <Link to="/staff/health" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Sức Khoẻ
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeSettingModal}>
                  Đóng
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Delete */}
        <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
          <CModalHeader>
            <CModalTitle>Xoá</CModalTitle>{' '}
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleDelete}>
              <h2>
                Bạn có chắc chắn xoá {this.state.last_name} {this.state.first_name}?
              </h2>
              <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="staff"
                  autoComplete="staff"
                  name="id"
                  value={this.state.id}
                  onChange={this.handleInputChange}
                />
              </CInputGroup>{' '}
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeDeleteModal}>
                  Huỷ
                </CButton>
                <CButton color="danger" type="submit">
                  Đồng ý
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Update */}
        <CModal
          visible={this.state.modalIsOpen}
          onClose={this.closeModal}
          size="xl"
          scrollable={true}
        >
          <CModalHeader>
            <CModalTitle>
              Cập nhật thông tin: {this.state.last_name + ' ' + this.state.first_name}{' '}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel header="Thông Tin Cá Nhân" key="1">
                  <CContainer>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Họ Tên</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="name"
                          autoComplete="name"
                          name="name"
                          value={this.state.last_name + ' ' + this.state.first_name}
                          // onChange={this.handleInputChange}
                          // required
                          aria-describedby="exampleFormControlInputHelpInline"
                          readOnly
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Thông tin này không được chỉnh sửa!
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Email"
                          autoComplete="email"
                          name="email"
                          value={this.state.email}
                          // onChange={this.handleInputChange}
                          // required
                          aria-describedby="exampleFormControlInputHelpInline"
                          readOnly
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Thông tin này không được chỉnh sửa!
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Số Điện Thoại</CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Số Điện Thoại"
                          autoComplete="phone"
                          name="phone"
                          value={this.state.phone}
                          // onChange={this.handleInputChange}
                          // required
                          aria-describedby="exampleFormControlInputHelpInline"
                          readOnly
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Thông tin này không được chỉnh sửa!
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Mã Số Thuế</CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Mã số thuế"
                          autoComplete="tax_code"
                          name="tax_code"
                          value={this.state.tax_code}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập mã số thuế
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Số Tài Khoản Ngân Hàng
                        </CFormLabel>

                        <CFormInput
                          type="number"
                          placeholder="Tài khoản ngân hàng"
                          autoComplete="bank_account"
                          name="bank_account"
                          value={this.state.bank_account}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập ngày đăng ký CCCD
                    </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Quốc Tịch</CFormLabel>
                        <CFormSelect
                          value={this.state.nationality}
                          name="nationality"
                          aria-label="Vui lòng chọn quốc tịch"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Chọn quốc tịch
                          </option>
                          {this.state.nationalites.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Dân Tộc</CFormLabel>
                        <CFormSelect
                          value={this.state.ethnicity}
                          name="ethnicity"
                          aria-label="Vui lòng chọn dân tộc"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Chọn dân tộc
                          </option>
                          {this.state.ethnicities.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng SDT
                </CFormText> */}
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Giới Tính</CFormLabel>
                        <CFormSelect
                          value={this.state.gender}
                          name="gender"
                          aria-label="Vui lòng chọn giới tính"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Chọn giới tính
                          </option>
                          <option key="male" value="male">
                            Nam
                          </option>
                          <option key="female" value="female">
                            Nữ
                          </option>
                          <option key="unknown" value="unknown">
                            Không xác định
                          </option>
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng SDT
                </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Tình Trạng Hôn Nhân
                        </CFormLabel>
                        <CFormSelect
                          value={this.state.marital_status}
                          name="marital_status"
                          aria-label="Vui lòng chọn tình trạng hôn nhân"
                          onChange={this.handleInputChange}
                        >
                          {' '}
                          <option key="0" value="">
                            Chọn tình trạng hôn nhân
                          </option>
                          <option key="got_married" value="got_married">
                            Đã lập gia đình
                          </option>
                          <option key="single" value="single">
                            Chưa lập gia đình
                          </option>
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng SDT
                </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Số Con</CFormLabel>

                        <CFormInput
                          type="number"
                          placeholder="Số con"
                          autoComplete="number_of_children"
                          name="number_of_children"
                          value={this.state.number_of_children}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập số con nếu đã lập gia đình
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Tôn Giáo</CFormLabel>
                        <CFormSelect
                          value={this.state.religion}
                          name="religion"
                          aria-label="Vui lòng chọn tôn giáo"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Chọn tôn giáo
                          </option>
                          {this.state.religions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng SDT
                </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Trình Độ Học Vấn</CFormLabel>
                        <CFormSelect
                          value={this.state.literacy}
                          name="literacy"
                          aria-label="Vui lòng chọn trình độ học vấn"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Chọn trình độ học vấn
                          </option>
                          {this.state.literacies.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng SDT
                </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Tình Trạng Làm Việc
                        </CFormLabel>
                        <CFormSelect
                          value={this.state.is_active}
                          name="is_active"
                          aria-label="Tình trạng làm việc"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Chọn trạng thái làm việc
                          </option>
                          <option key="true" value={true}>
                            Đang làm
                          </option>
                          <option key="false" value={false}>
                            Nghỉ làm
                          </option>
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nhập đúng dịnh dạng SDT
                </CFormText> */}
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Địa điểm Làm CCCD
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Địa điểm làm CCCD"
                          autoComplete="place_of_issuance"
                          name="place_of_issuance"
                          value={this.state.place_of_issuance}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập địa điểm làm chứng CCCD (vd: An Giang)
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Thẻ CCCD</CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Thẻ CCCD"
                          autoComplete="identity_card"
                          name="identity_card"
                          value={this.state.identity_card}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          required
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập đúng số CCCD
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Ngày đăng ký CCCD
                        </CFormLabel>

                        <CFormInput
                          type="date"
                          placeholder="Ngày đăng ký CCCD"
                          autoComplete="issuance_date"
                          name="issuance_date"
                          value={this.state.issuance_date}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập ngày đăng ký CCCD
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Email Cá Nhân</CFormLabel>
                        <CFormInput
                          type="email"
                          placeholder="Email cá nhân"
                          autoComplete="personal_email"
                          name="personal_email"
                          value={this.state.personal_email}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập địa chỉ email nếu có (vd: info@gmail.com)
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Đường link Facebook
                        </CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Link facebook"
                          autoComplete="facebook"
                          name="facebook"
                          value={this.state.facebook}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập tài khoản facebook nếu có (vd: facebook.com/linhha1904)
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Số Bảo Hiểm Xã Hội
                        </CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Số BHXH"
                          autoComplete="social_insurance_number"
                          name="social_insurance_number"
                          value={this.state.social_insurance_number}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập ngày đăng ký CCCD
                    </CFormText> */}
                      </CCol>
                    </CRow>
                  </CContainer>
                </Panel>
                <Panel header="Thông Tin Nhân Viên" key="2">
                  <CContainer>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Ngày Bắt Đầu Làm Việc
                        </CFormLabel>
                        <CFormInput
                          type="date"
                          placeholder="Ngày bắt đầu làm việc"
                          autoComplete="start_work_date"
                          name="start_work_date"
                          value={this.state.start_work_date}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập số con nếu đã lâp gia đình
                    </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Ngày Kết Thúc Thử Việc
                        </CFormLabel>

                        <CFormInput
                          type="date"
                          placeholder="Ngày kết thúc thử việc"
                          autoComplete="probationary_end_date"
                          name="probationary_end_date"
                          value={this.state.probationary_end_date}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập đúng số CCCD
                    </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Ngày Ký Hợp Đồng Lao Động
                        </CFormLabel>

                        <CFormInput
                          type="date"
                          placeholder="Ngày ký hợp đồng lao động"
                          autoComplete="labor_contract_signing_date"
                          name="labor_contract_signing_date"
                          value={this.state.labor_contract_signing_date}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nhập ngày đăng ký CCCD
                    </CFormText> */}
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Đường Dẫn</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Đường dẫn"
                          autoComplete="url"
                          name="url"
                          value={this.state.url}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập đường dẫn thông tin liên hệ nếu có
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Bộ Phận</CFormLabel>
                        <CFormSelect
                          value={this.state.department}
                          name="department"
                          aria-label="Vui lòng chọn bộ phận làm việc"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Chọn bộ phận làm việc
                          </option>
                          {this.state.departments.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Chức Vụ</CFormLabel>
                        <CFormSelect
                          value={this.state.position}
                          name="position"
                          aria-label="Vui lòng chọn chức vụ"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Chọn chức vụ
                          </option>
                          {this.state.positions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                          k
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Thông Báo Trúng Tuyền
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Thông báo trúng tuyển"
                          autoComplete="elect_notifications"
                          name="elect_notifications"
                          value={this.state.elect_notifications}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập đường dẫn đến thông báo trúng tuyển
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Quyết Định Trúng Tuyển
                        </CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Quyết định trúng tuyển"
                          autoComplete="elect_decision"
                          name="elect_decision"
                          value={this.state.elect_decision}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập đường dẫn đến quyết định trúng tuyển
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Ghi Chú</CFormLabel>
                        <CFormTextarea
                          rows="3"
                          name="note"
                          value={this.state.note}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        ></CFormTextarea>
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nhập từ 8-20 ký tự
                        </CFormText>
                      </CCol>
                    </CRow>
                  </CContainer>
                </Panel>
                <Panel header="Địa Chỉ Nơi Sinh" key="3">
                  <CContainer>
                    {' '}
                    <CRow>
                      <CCol md={12}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Địa Chỉ</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Địa Chỉ"
                          autoComplete="address"
                          name="address"
                          value={this.state.address}
                          onChange={this.handleInputChange}
                          // required
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Thành Phố</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Thành Phố"
                          autoComplete="city"
                          name="city"
                          value={this.state.city}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Tỉnh</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Tỉnh"
                          autoComplete="province"
                          name="province"
                          value={this.state.province}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Huyện</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Huyện"
                          autoComplete="district"
                          name="district"
                          value={this.state.district}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Xã</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Xã"
                          autoComplete="commune"
                          name="commune"
                          value={this.state.commune}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Quốc Gia</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Quốc Gia"
                          autoComplete="country"
                          name="country"
                          value={this.state.country}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Zip</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Mã Code"
                          autoComplete="postcode"
                          name="postcode"
                          value={this.state.postcode}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow style={{ display: 'none' }}>
                      <CCol md={6} style={{ display: 'none' }}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Loại</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="type"
                          autoComplete="type"
                          name="type"
                          value={this.state.type.type}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                  </CContainer>
                </Panel>
                <Panel header="Địa Chỉ Thường Trú" key="4">
                  <CContainer>
                    {' '}
                    <CRow>
                      <CCol md={12}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Địa Chỉ</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Địa Chỉ"
                          autoComplete="address"
                          name="address2"
                          value={this.state.address2}
                          onChange={this.handleInputChange}
                          // required
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Thành Phố</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Thành Phố"
                          autoComplete="city"
                          name="city2"
                          value={this.state.city2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Tỉnh</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Tỉnh"
                          autoComplete="province"
                          name="province2"
                          value={this.state.province2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Huyện</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Huyện"
                          autoComplete="district"
                          name="district2"
                          value={this.state.district2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Xã</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Xã"
                          autoComplete="commune"
                          name="commune2"
                          value={this.state.commune2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Quốc Gia</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Quốc Gia"
                          autoComplete="country"
                          name="country2"
                          value={this.state.country2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Zip</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Mã Code"
                          autoComplete="postcode"
                          name="postcode2"
                          value={this.state.postcode2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow style={{ display: 'none' }}>
                      <CCol md={6} style={{ display: 'none' }}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Loại</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="type"
                          autoComplete="type"
                          name="type2"
                          value={this.state.type2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                  </CContainer>
                </Panel>
                <Panel header="Địa Chỉ Tạm Trú" key="5">
                  <CContainer>
                    {' '}
                    <CRow>
                      <CCol md={12}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Địa Chỉ</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Địa Chỉ"
                          autoComplete="address"
                          name="address3"
                          value={this.state.address3}
                          onChange={this.handleInputChange}
                          // required
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Thành Phố</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Thành Phố"
                          autoComplete="city"
                          name="city3"
                          value={this.state.city3}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Tỉnh</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Tỉnh"
                          autoComplete="province"
                          name="province3"
                          value={this.state.province3}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Huyện</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Huyện"
                          autoComplete="district"
                          name="district3"
                          value={this.state.district3}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Xã</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Xã"
                          autoComplete="commune"
                          name="commune3"
                          value={this.state.commune3}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Quốc Gia</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Quốc Gia"
                          autoComplete="country"
                          name="country3"
                          value={this.state.country3}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Zip</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Mã Code"
                          autoComplete="postcode"
                          name="postcode3"
                          value={this.state.postcode3}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                    <CRow style={{ display: 'none' }}>
                      <CCol md={6} style={{ display: 'none' }}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Loại</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="type"
                          autoComplete="type"
                          name="type3"
                          value={this.state.type3.type}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                    </CRow>
                  </CContainer>
                </Panel>
              </Collapse>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeModal}>
                  Đóng
                </CButton>
                <CButton color="primary" type="submit">
                  Cập nhật
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
      </>
    )
  }
}

export default Staff
