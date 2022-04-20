import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Tag, Space, Button, message, Input, Collapse, Card, Spin, Alert } from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import '../../../assets/style.css'
// import LoadingOverlay from 'react-loading-overlay'

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
import Loading from '../../../utils/loading'
const { Column, ColumnGroup } = Table
const { Panel } = Collapse
const { Meta } = Card

const tabListNoTitle = [
  {
    key: 'SalaryCurrent',
    tab: 'Lương Tháng Hiện Tại',
  },
  {
    key: 'SalaryPast',
    tab: 'Lương Tháng Trước Đó',
  },
]
class Salary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      salaryCurrent: [],
      salaryPast: [],
      activeTabKey2: 'SalaryCurrent',
      loading: true,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  fetchSalaryCurrentAPI = async (event) => {
    await axios
      .get(`/hrm/salary/?no_pagination=true`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const salaryCurrent = res.data
        this.setState({
          salaryCurrent: salaryCurrent,
          loading: false,
        })
      })
      .catch((error) => console.log(error))
  }
  fetchSalaryPastAPI = async (event) => {
    await axios
      .get(`/hrm/salary/past/?no_pagination=true`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const salaryPast = res.data
        this.setState({
          salaryPast: salaryPast,
          loading: false,
        })
      })
      .catch((error) => console.log(error))
  }

  componentDidMount() {
    this.setState({
      loading: true,
    })
    this.fetchSalaryCurrentAPI()
    this.fetchSalaryPastAPI()
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

        this.setState({
          modalIsOpen: true,
          id: staffs.id,
          gender: staffs.gender,
          first_name: staffs.first_name,
          last_name: staffs.last_name,
          email: staffs.email,
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

  handleEditSubmit = async (event) => {
    event.preventDefault()

    const newUpdate = {
      gender: this.state.gender,
      is_active: this.state.is_active,
      marital_status: this.state.marital_status,
      number_of_children: this.state.number_of_children,
      identity_card: this.state.identity_card,
      issuance_date: this.state.issuance_date,
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
        message.success({
          content: 'Update data Success!!!',
          duration: 5,
          maxCount: 1,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        })
        this.fetchStaffAPI()
        // setTimeout(function () {
        //   window.location.reload()
        // }, 3000)
      })
      .catch((error) =>
        message.error({
          content: error,
          duration: 5,
          maxCount: 1,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
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
        message.success({
          content: 'Delete data Success!!!',
          duration: 5,
          maxCount: 1,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        })
        this.closeDeleteModal()
      })
      .catch((error) =>
        message.error({
          content: error,
          duration: 5,
          maxCount: 1,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
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
    const contentListNoTitle = {
      SalaryCurrent: (
        <>
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
                placeholder="Search..."
                onChange={(event) => this.handleSearch(event)}
                className="mb-3"
              />
            </CCol>
          </CRow>
          <Table dataSource={this.state.salaryCurrent} bordered>
            <Column title="Ngày" dataIndex="date" key="date" />
            <Column title="Giờ Công Chuẩn" dataIndex="standard_time" key="standard_time" />
            <Column title="Giờ Công Thực Tế" dataIndex="actual_time" key="actual_time" />
            <Column
              title="Lương Cơ Bản"
              dataIndex="basic_salary"
              key="basic_salary"
              className="column-money"
            />
            <Column title="Hệ Số Lương" dataIndex="coefficient" key="coefficient" />
            <Column title="Phụ Cấp" dataIndex="extra" key="extra" />
            <Column
              title="Hành động"
              key={this.state.salaries}
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
        </>
      ),
      SalaryPast: (
        <>
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
                placeholder="Search..."
                onChange={(event) => this.handleSearch(event)}
                className="mb-3"
              />
            </CCol>
          </CRow>
          <Table dataSource={this.state.salaryPast} bordered>
            <Column title="Ngày" dataIndex="date" key="date" />
            <Column title="Giờ Công Chuẩn" dataIndex="standard_time" key="standard_time" />
            <Column title="Giờ Công Thực Tế" dataIndex="actual_time" key="actual_time" />
            <Column
              title="Lương Cơ Bản"
              dataIndex="basic_salary"
              key="basic_salary"
              className="column-money"
            />
            <Column title="Hệ Số Lương" dataIndex="coefficient" key="coefficient" />
            <Column title="Phụ Cấp" dataIndex="extra" key="extra" />
            <Column
              title="Hành động"
              key={this.state.salaries}
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
        </>
      ),
    }
    const onTab2Change = (key) => {
      this.setState({ activeTabKey2: key })
    }
    return (
      <>
        <Loading loading={this.state.loading} />
        <h2>Tiền Lương</h2>
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.activeTabKey2}
          //   tabBarExtraContent={<a href="#">More</a>}
          onTabChange={(key) => {
            onTab2Change(key)
          }}
        >
          {contentListNoTitle[this.state.activeTabKey2]}
        </Card>
        {/* Delete */}
        <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
          <CModalHeader>
            <CModalTitle>DELETE</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleDelete}>
              <h2 style={{ textTransform: 'uppercase' }}>
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
                  HUỶ
                </CButton>
                <CButton color="danger" type="submit">
                  OK
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
      </>
    )
  }
}

export default Salary
