import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Tag, Space, Button, message, Input, Collapse, Spin, Alert } from 'antd'
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
  CFormFeedback,
  CFormLabel,
  CFormText,
  CImage,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPencil, cilPlus, cilCircle, cilInfo } from '@coreui/icons'
import Modal from 'react-modal'
const { Column, ColumnGroup } = Table
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
      department: '',
      nationality: '',
      ethnicity: '',
      religion: '',
      literacy: '',

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
        if (staffs.addresses == '') {
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
    // this.fetchDeparmentAPI()
    // this.fetchNationalityAPI()
    // this.fetchEthnicityAPI()
    // this.fetchReligionAPI()
    // this.fetchLiteracyAPI()
    // this.fetchPositionAPI()
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
        let key = this.state.id
        this.setState((prevState) => ({
          staffs: prevState.staffs.map((elm) =>
            elm.id === key
              ? {
                  ...elm,
                  // TODO autoload
                }
              : elm,
          ),
        }))
        this.closeModal()
        openNotificationWithIcon({
          type: 'success',
          message: 'C???p nh???t d??? li???u th??nh c??ng!!!',
          description: '',
          placement: 'topRight',
        })
        this.fetchStaffAPI()
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'C???p nh???t d??? li???u kh??ng th??nh c??ng!!!',
          description: error,
          placement: 'topRight',
        }),
      )
  }

  handleDelete = (event) => {
    event.preventDefault()

    const Id = {
      id: this.state.id,
    }
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
          message: 'Xo?? d??? li???u th??nh c??ng!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeDeleteModal()
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'Xo?? d??? li???u kh??ng th??nh c??ng!!!',
          description: error,
          placement: 'topRight',
        }),
      )
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
          spinner={<Spin tip="Loading..." size="large"></Spin>}
          styles={{ wrapper: { backgroundColor: 'black' } }}
          // text="Loading your content..."
        >
          {/* <p>Some content or children or something.</p> */}
        </LoadingOverlay>
        <h2>Nh??n Vi??n</h2>
        <CRow>
          {/* <CCol md={4}>
            <CTooltip content="Create data" placement="top">
              <Link to="/add-customer">
                <CButton color="primary">
                  <CIcon icon={cilPlus} />
                </CButton>
              </Link>
            </CTooltip>
          </CCol> */}
          <CCol md={8}>
            <Input.Search
              placeholder="T??m ki???m..."
              onChange={(event) => this.handleSearch(event)}
              className="mb-3"
            />
          </CCol>
        </CRow>
        <Table dataSource={this.state.staffs} bordered>
          {/* <Column title="M??" dataIndex="company" key="company" /> */}
          <Column
            title="M?? S???"
            dataIndex="staff"
            key="staff"
            sorter={(a, b) => a.staff.length - b.staff.length}
            sortDirections={['descend', 'ascend']}
          />
          <Column title="H???" dataIndex="last_name" key="last_name" />
          <Column title="T??n" dataIndex="first_name" key="first_name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="S??? ??i???n tho???i" dataIndex="phone" key="phone" />
          <Column
            title="B??? ph???n"
            dataIndex="department_data"
            key="department_data"
            filters={this.state.departmentData}
            onFilter={(value, record) => record.department_data.startsWith(value)}
            filterSearch={true}
            width="20%"
          />
          <Column
            title="Ch???c V???"
            dataIndex="position_data"
            key="position_data"
            filters={this.state.positionData}
            onFilter={(value, record) => record.position_data.startsWith(value)}
            filterSearch={true}
          />
          <Column
            title="T??nh Tr???ng"
            dataIndex="is_active_data"
            key="is_active_data"
            filters={[
              { text: 'Ngh??? L??m', value: 'Ngh??? L??m' },
              { text: 'C??n L??m', value: 'C??n L??m' },
            ]}
            onFilter={(value, record) => record.is_active_data.startsWith(value)}
            filterSearch={true}
          />
          <Column
            title="H??nh ?????ng"
            key={this.state.staff}
            render={(text, record) => (
              <Space size="middle">
                <CTooltip content="Edit data" placement="top">
                  <CButton
                    color="warning"
                    style={{ marginRight: '10px' }}
                    // key={record.id}
                    onClick={() => this.openModal(record)}
                  >
                    <EditOutlined />
                  </CButton>
                </CTooltip>
                <CTooltip content="Remove data" placement="top">
                  <CButton color="danger" onClick={() => this.openDeleteModal(text)}>
                    {/* <CIcon icon={cilDelete} /> */}
                    <DeleteOutlined />
                  </CButton>
                </CTooltip>
                <CTooltip content="Setting" placement="top">
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
            <CModalTitle>CH???C N??NG</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <h3 style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                M?? nh??n vi??n: {this.state.staff}
              </h3>
              {/* <h2 style={{ textTransform: 'uppercase' }}>{this.state.name}</h2> */}

              <CTooltip content="Th??ng Tin Kh???n C???p" placement="top">
                <Link to="/staff/contact" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Th??ng Tin Kh???n C???p
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="B???ng C???p" placement="top">
                <Link to="/staff/degree" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}B???ng C???p
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Ch???ng Ch???" placement="top">
                <Link to="/staff/certificate" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */} Ch???ng Ch???
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="K??? N??ng" placement="top">
                <Link to="/staff/skill" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}K??? N??ng
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="C??ng T??c" placement="top">
                <Link to="/staff/on-business" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */} C??ng T??c
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Ch???m C??ng" placement="top">
                <Link to={'#'}>
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Ch???m C??ng
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Ph??p N??m" placement="top">
                <Link to={'#'}>
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Ph??p N??m
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Ti???n L????ng" placement="top">
                <Link to={'#'}>
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Ti???n L????ng
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="??i???u Ch???nh L????ng" placement="top">
                <Link to={'3'}>
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}??i???u Ch???nh L????ng
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="H???p ?????ng Lao ?????ng" placement="top">
                <Link to="/staff/contract" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}H???p ?????ng Lao ?????ng
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="????o T???o" placement="top">
                <Link to={'#'}>
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}????o T???o
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Th??ng Ti???n" placement="top">
                <Link to="/staff/promotion" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Th??ng Ti???n
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="Khen Th?????ng" placement="top">
                <Link to="/staff/bonus" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}Khen Th?????ng
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="K??? Lu???t" placement="top">
                <Link to="/staff/discipline" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}K??? Lu???t
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CTooltip content="S???c Kho???" placement="top">
                <Link to="/staff/health" target="_blank">
                  <div className="d-grid mb-3">
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      {/* <CIcon icon={cilInfo} /> */}S???c Kho???
                    </CButton>
                  </div>{' '}
                </Link>
              </CTooltip>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeSettingModal}>
                  ????NG
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Delete */}
        <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
          <CModalHeader>
            <CModalTitle>DELETE</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleDelete}>
              <h2 style={{ textTransform: 'uppercase' }}>
                B???n c?? ch???c ch???n xo?? {this.state.last_name} {this.state.first_name}?
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
                  HU???
                </CButton>
                <CButton color="danger" type="submit">
                  OK
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
            <CModalTitle style={{ textTransform: 'uppercase' }}>
              C???P NH???T TH??NG TIN NH??N VI??N {this.state.last_name + ' ' + this.state.first_name}{' '}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel header="Th??ng Tin C?? Nh??n" key="1">
                  <CContainer>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">H??? T??n</CFormLabel>
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
                          Th??ng tin n??y kh??ng ???????c ch???nh s???a!
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
                          Th??ng tin n??y kh??ng ???????c ch???nh s???a!
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">S??? ??i???n Tho???i</CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="S??? ??i???n Tho???i"
                          autoComplete="phone"
                          name="phone"
                          value={this.state.phone}
                          // onChange={this.handleInputChange}
                          // required
                          aria-describedby="exampleFormControlInputHelpInline"
                          readOnly
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Th??ng tin n??y kh??ng ???????c ch???nh s???a!
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">M?? S??? Thu???</CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="M?? s??? thu???"
                          autoComplete="tax_code"
                          name="tax_code"
                          value={this.state.tax_code}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nh???p m?? s??? thu???
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          S??? T??i Kho???n Ng??n H??ng
                        </CFormLabel>

                        <CFormInput
                          type="number"
                          placeholder="T??i kho???n ng??n h??ng"
                          autoComplete="bank_account"
                          name="bank_account"
                          value={this.state.bank_account}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ng??y ????ng k?? CCCD
                    </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Qu???c T???ch</CFormLabel>
                        <CFormSelect
                          value={this.state.nationality}
                          name="nationality"
                          aria-label="Vui l??ng ch???n qu???c t???ch"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Ch???n qu???c t???ch
                          </option>
                          {this.state.nationalites.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ????ng d???nh d???ng SDT
                </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">D??n T???c</CFormLabel>
                        <CFormSelect
                          value={this.state.ethnicity}
                          name="ethnicity"
                          aria-label="Vui l??ng ch???n d??n t???c"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Ch???n d??n t???c
                          </option>
                          {this.state.ethnicities.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ????ng d???nh d???ng SDT
                </CFormText> */}
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Gi???i T??nh</CFormLabel>
                        <CFormSelect
                          value={this.state.gender}
                          name="gender"
                          aria-label="Vui l??ng ch???n gi???i t??nh"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Ch???n gi???i t??nh
                          </option>
                          <option key="male" value="male">
                            Nam
                          </option>
                          <option key="female" value="female">
                            N???
                          </option>
                          <option key="unknown" value="unknown">
                            Kh??ng x??c ?????nh
                          </option>
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ????ng d???nh d???ng SDT
                </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          T??nh Tr???ng H??n Nh??n
                        </CFormLabel>
                        <CFormSelect
                          value={this.state.marital_status}
                          name="marital_status"
                          aria-label="Vui l??ng ch???n t??nh tr???ng h??n nh??n"
                          onChange={this.handleInputChange}
                        >
                          {' '}
                          <option key="0" value="">
                            Ch???n t??nh tr???ng h??n nh??n
                          </option>
                          <option key="got_married" value="got_married">
                            ???? l???p gia ????nh
                          </option>
                          <option key="single" value="single">
                            Ch??a l???p gia ????nh
                          </option>
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ????ng d???nh d???ng SDT
                </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">S??? Con</CFormLabel>

                        <CFormInput
                          type="number"
                          placeholder="S??? con"
                          autoComplete="number_of_children"
                          name="number_of_children"
                          value={this.state.number_of_children}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nh???p s??? con n???u ???? l???p gia ????nh
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">T??n Gi??o</CFormLabel>
                        <CFormSelect
                          value={this.state.religion}
                          name="religion"
                          aria-label="Vui l??ng ch???n t??n gi??o"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Ch???n t??n gi??o
                          </option>
                          {this.state.religions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ????ng d???nh d???ng SDT
                </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Tr??nh ????? H???c V???n</CFormLabel>
                        <CFormSelect
                          value={this.state.literacy}
                          name="literacy"
                          aria-label="Vui l??ng ch???n tr??nh ????? h???c v???n"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Ch???n tr??nh ????? h???c v???n
                          </option>
                          {this.state.literacies.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ????ng d???nh d???ng SDT
                </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          T??nh Tr???ng L??m Vi???c
                        </CFormLabel>
                        <CFormSelect
                          value={this.state.is_active}
                          name="is_active"
                          aria-label="T??nh tr???ng l??m vi???c"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Ch???n tr???ng th??i l??m vi???c
                          </option>
                          <option key="true" value={true}>
                            ??ang l??m
                          </option>
                          <option key="false" value={false}>
                            Ngh??? l??m
                          </option>
                        </CFormSelect>
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ????ng d???nh d???ng SDT
                </CFormText> */}
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          ?????a ??i???m L??m CCCD
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="?????a ??i???m l??m CCCD"
                          autoComplete="place_of_issuance"
                          name="place_of_issuance"
                          value={this.state.place_of_issuance}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nh???p ?????a ??i???m l??m ch???ng CCCD (vd: An Giang)
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Th??? CCCD</CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Th??? CCCD"
                          autoComplete="identity_card"
                          name="identity_card"
                          value={this.state.identity_card}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          required
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nh???p ????ng s??? CCCD
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Ng??y ????ng k?? CCCD
                        </CFormLabel>

                        <CFormInput
                          type="date"
                          placeholder="Ng??y ????ng k?? CCCD"
                          autoComplete="issuance_date"
                          name="issuance_date"
                          value={this.state.issuance_date}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nh???p ng??y ????ng k?? CCCD
                        </CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Email C?? Nh??n</CFormLabel>
                        <CFormInput
                          type="email"
                          placeholder="Email c?? nh??n"
                          autoComplete="personal_email"
                          name="personal_email"
                          value={this.state.personal_email}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nh???p ?????a ch??? email n???u c?? (vd: info@gmail.com)
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          ???????ng link Facebook
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
                          Nh???p t??i kho???n facebook n???u c?? (vd: facebook.com/linhha1904)
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          S??? B???o Hi???m X?? H???i
                        </CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="S??? BHXH"
                          autoComplete="social_insurance_number"
                          name="social_insurance_number"
                          value={this.state.social_insurance_number}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ng??y ????ng k?? CCCD
                    </CFormText> */}
                      </CCol>
                    </CRow>
                  </CContainer>
                </Panel>
                <Panel header="Th??ng Tin Nh??n Vi??n" key="2">
                  <CContainer>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Ng??y B???t ?????u L??m Vi???c
                        </CFormLabel>
                        <CFormInput
                          type="date"
                          placeholder="Ng??y b???t ?????u l??m vi???c"
                          autoComplete="start_work_date"
                          name="start_work_date"
                          value={this.state.start_work_date}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p s??? con n???u ???? l??p gia ????nh
                    </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Ng??y K???t Th??c Th??? Vi???c
                        </CFormLabel>

                        <CFormInput
                          type="date"
                          placeholder="Ng??y k???t th??c th??? vi???c"
                          autoComplete="probationary_end_date"
                          name="probationary_end_date"
                          value={this.state.probationary_end_date}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ????ng s??? CCCD
                    </CFormText> */}
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Ng??y K?? H???p ?????ng Lao ?????ng
                        </CFormLabel>

                        <CFormInput
                          type="date"
                          placeholder="Ng??y k?? h???p ?????ng lao ?????ng"
                          autoComplete="labor_contract_signing_date"
                          name="labor_contract_signing_date"
                          value={this.state.labor_contract_signing_date}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ng??y ????ng k?? CCCD
                    </CFormText> */}
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">???????ng D???n</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="???????ng d???n"
                          autoComplete="url"
                          name="url"
                          value={this.state.url}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nh???p ???????ng d???n th??ng tin li??n h??? n???u c??
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">B??? Ph???n</CFormLabel>
                        <CFormSelect
                          value={this.state.department}
                          name="department"
                          aria-label="Vui l??ng ch???n b??? ph???n l??m vi???c"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Ch???n b??? ph???n l??m vi???c
                          </option>
                          {this.state.departments.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Ch???c V???</CFormLabel>
                        <CFormSelect
                          value={this.state.position}
                          name="position"
                          aria-label="Vui l??ng ch???n ch???c v???"
                          onChange={this.handleInputChange}
                        >
                          <option key="0" value="">
                            Ch???n ch???c v???
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
                          Th??ng B??o Tr??ng Tuy???n
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Th??ng b??o tr??ng tuy???n"
                          autoComplete="elect_notifications"
                          name="elect_notifications"
                          value={this.state.elect_notifications}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nh???p ???????ng d???n ?????n th??ng b??o tr??ng tuy???n
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Quy???t ?????nh Tr??ng Tuy???n
                        </CFormLabel>

                        <CFormInput
                          type="text"
                          placeholder="Quy???t ?????nh tr??ng tuy???n"
                          autoComplete="elect_decision"
                          name="elect_decision"
                          value={this.state.elect_decision}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nh???p ???????ng d???n ?????n quy???t ?????nh tr??ng tuy???n
                        </CFormText>
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleFormControlInput1">Ghi Ch??</CFormLabel>
                        <CFormTextarea
                          rows="3"
                          name="note"
                          value={this.state.note}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                        ></CFormTextarea>
                        <CFormText component="span" id="exampleFormControlInputHelpInline">
                          Nh???p t??? 8-20 k?? t???
                        </CFormText>
                      </CCol>
                    </CRow>
                  </CContainer>
                </Panel>
                <Panel header="?????a Ch??? N??i Sinh" key="3">
                  <CContainer>
                    {' '}
                    <CRow>
                      <CCol md={12}>
                        <CFormLabel htmlFor="exampleFormControlInput1">?????a Ch???</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="address"
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Th??nh Ph???</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="city"
                          autoComplete="city"
                          name="city"
                          value={this.state.city}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">T???nh</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="province"
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Huy???n</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="district"
                          autoComplete="district"
                          name="district"
                          value={this.state.district}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">X??</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="commune"
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Qu???c Gia</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="country"
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
                          placeholder="postcode"
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Lo???i</CFormLabel>
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
                <Panel header="?????a Ch??? Th?????ng Tr??" key="4">
                  <CContainer>
                    {' '}
                    <CRow>
                      <CCol md={12}>
                        <CFormLabel htmlFor="exampleFormControlInput1">?????a Ch???</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="address"
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Th??nh Ph???</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="city"
                          autoComplete="city"
                          name="city2"
                          value={this.state.city2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">T???nh</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="province"
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Huy???n</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="district"
                          autoComplete="district"
                          name="district2"
                          value={this.state.district2}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">X??</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="commune"
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Qu???c Gia</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="country"
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
                          placeholder="postcode"
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Lo???i</CFormLabel>
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
                <Panel header="?????a Ch??? T???m Tr??" key="5">
                  <CContainer>
                    {' '}
                    <CRow>
                      <CCol md={12}>
                        <CFormLabel htmlFor="exampleFormControlInput1">?????a Ch???</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="address"
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Th??nh Ph???</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="city"
                          autoComplete="city"
                          name="city3"
                          value={this.state.city3}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">T???nh</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="province"
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Huy???n</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="district"
                          autoComplete="district"
                          name="district3"
                          value={this.state.district3}
                          onChange={this.handleInputChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          className="mb-3"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">X??</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="commune"
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Qu???c Gia</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="country"
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
                          placeholder="postcode"
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
                        <CFormLabel htmlFor="exampleFormControlInput1">Lo???i</CFormLabel>
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
                  Close
                </CButton>
                <CButton color="primary" type="submit">
                  Save changes
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
