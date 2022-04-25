import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Tag, Space, Button, message, Input, Collapse, Card, Spin, Alert } from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import '../../../assets/style.css'
// import LoadingOverlay from 'react-loading-overlay'
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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCircle, cilInfo, cilCloudUpload, cilCheck } from '@coreui/icons'
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
      staffs: [{}],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      modalActiveIsOpen: false,
      modalDeleteIsOpen: false,
      modalIsOpen: false,
      modalCheckIsOpen: false,
      listStaff: [],
      loadStatusCheck: false,
      loadStatusActive: false,
      modalAddSalaryIsOpen: false,
      first_name: '',
      last_name: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  fetchStaffAPI = async (event) => {
    await axios
      .get(`/hrm/staffs/?no_pagination=true`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const staffss = res.data
        const data = []
        staffss.map((item) =>
          // this.setState({
          data.push({
            text: item.first_name + ' ' + item.last_name,
            value: item.first_name + ' ' + item.last_name,
          }),
        )
        this.setState({
          staffs: data,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchSalaryCurrentAPI = async (event) => {
    await axios
      .get(`/hrm/salary/current/?no_pagination=true`, {
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
    this.fetchStaffAPI()
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
  // Open modal //
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

  openActiveModal = (item) => {
    this.setState({
      modalActiveIsOpen: true,
    })
  }

  openAddSalaryModal = (item) => {
    this.setState({
      first_name: item.first_name,
      last_name: item.last_name,
      modalAddSalaryIsOpen: true,
    })
  }
  // //

  openCheckModal = () => {
    this.setState({
      loadStatusCheck: true,
    })
    axios
      .get('/hrm/salary/check-salary/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message) {
          this.setState({
            loadStatusCheck: false,
          })
          openNotificationWithIcon({
            type: 'success',
            message: res.data.message,
            description: '',
            placement: 'topRight',
          })
        } else {
          axios
            .get('/hrm/staffs/?no_pagination=true&id__in=' + res.data, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`,
              },
              withCredentials: true,
            })
            .then((res) => {
              const staffs = res.data
              console.log(staffs)
              this.setState({
                listStaff: staffs,
                modalCheckIsOpen: true,
                loadStatusCheck: false,
              })
            })
        }
      })
      .catch((error) => {
        this.setState({
          loadStatusCheck: false,
        })
        openNotificationWithIcon({
          type: 'error',
          message: 'Có lỗi xảy ra',
          description: error,
          placement: 'topRight',
        })
      })
  }
  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    })
  }
  // Close Modal //
  closeActiveModal = () => {
    this.setState({
      modalActiveIsOpen: false,
    })
  }
  closeCheckModal = () => {
    this.setState({
      modalCheckIsOpen: false,
    })
  }

  closeDeleteModal = () => {
    this.setState({
      modalDeleteIsOpen: false,
    })
  }

  closeAddSalaryModal = () => {
    this.setState({
      modalAddSalaryIsOpen: false,
    })
  }
  // //

  // Handle Form //
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

  handleActive = (event) => {
    this.setState({
      loadStatusActive: true,
    })
    event.preventDefault()
    axios
      .get('/hrm/salary/active-salary/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        this.setState({
          loadStatusActive: false,
        })
        openNotificationWithIcon({
          type: 'success',
          message: 'Active phiếu lương thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeActiveModal()
      })
      .catch((error) => {
        this.setState({
          loadStatusActive: false,
        })
        openNotificationWithIcon({
          type: 'error',
          message: 'Active phiếu lương không thành công!!!',
          description: error,
          placement: 'topRight',
        })
      })
  }

  handleSearchCurrent = async (event) => {
    let value = event.target.value
    const REGISTER_URL = '/hrm/salary/current/?no_pagination=true&search=' + value
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    })
    this.setState({ staffs: res.data })
  }

  handleSearchPast = async (event) => {
    let value = event.target.value
    const REGISTER_URL = '/hrm/salary/past/?no_pagination=true&search=' + value
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    })
    this.setState({ staffs: res.data })
  }

  // //
  render() {
    const contentListNoTitle = {
      SalaryCurrent: (
        <>
          <CRow>
            <CCol md={8}>
              <Input.Search
                placeholder="Search..."
                onChange={(event) => this.handleSearchCurrent(event)}
                className="mb-3"
              />
            </CCol>
            <CCol md={4}>
              <Space size="middle">
                <CTooltip content="Active Phiếu Lương" placement="top">
                  <CButton
                    color="info"
                    // size="lg"
                    className="mb-3"
                    onClick={() => this.openActiveModal()}
                  >
                    <CIcon icon={cilCloudUpload} /> Active Phiếu Lương
                  </CButton>
                </CTooltip>
                <CTooltip content="Kiểm Tra Phiếu Lương" placement="top">
                  <CButton
                    color="success"
                    // size="lg"
                    className="mb-3"
                    onClick={() => this.openCheckModal()}
                  >
                    {this.state.loadStatusCheck ? (
                      <>
                        <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                        Đang Tiến Hành Kiểm Tra...
                      </>
                    ) : (
                      <>
                        <CIcon icon={cilCheck} /> Kiểm Tra Phiếu Lương
                      </>
                    )}
                  </CButton>
                </CTooltip>
              </Space>
            </CCol>
          </CRow>
          <Table dataSource={this.state.salaryCurrent} bordered>
            <Column
              title="Tháng"
              dataIndex="month"
              key="month"
              // filters={[
              //   { text: 'Tháng 1', value: '01' },
              //   { text: 'Tháng 2', value: '02' },
              //   { text: 'Tháng 3', value: '03' },
              //   { text: 'Tháng 4', value: '04' },
              //   { text: 'Tháng 5', value: '05' },
              //   { text: 'Tháng 6', value: '06' },
              //   { text: 'Tháng 7', value: '07' },
              //   { text: 'Tháng 8', value: '08' },
              //   { text: 'Tháng 9', value: '09' },
              //   { text: 'Tháng 10', value: '10' },
              //   { text: 'Tháng 11', value: '11' },
              //   { text: 'Tháng 12', value: '12' },
              // ]}
              // onFilter={(value, record) => record.month.startsWith(value)}
              // filterSearch={true}
            />
            <Column
              title="Năm"
              dataIndex="year"
              key="year"
              // filters={[
              //   { text: 'Năm 2009', value: '2009' },
              //   { text: 'Năm 2010', value: '2010' },
              //   { text: 'Năm 2011', value: '2011' },
              //   { text: 'Năm 2012', value: '2012' },
              //   { text: 'Năm 2013', value: '2013' },
              //   { text: 'Năm 2014', value: '2014' },
              //   { text: 'Năm 2015', value: '2015' },
              //   { text: 'Năm 2016', value: '2016' },
              //   { text: 'Năm 2017', value: '2017' },
              //   { text: 'Năm 2018', value: '2028' },
              //   { text: 'Năm 2019', value: '2029' },
              //   { text: 'Năm 2020', value: '2020' },
              //   { text: 'Năm 2021', value: '2021' },
              //   { text: 'Năm 2022', value: '2022' },
              //   { text: 'Năm 2023', value: '2023' },
              //   { text: 'Năm 2024', value: '2024' },
              //   { text: 'Năm 2025', value: '2025' },
              //   { text: 'Năm 2026', value: '2026' },
              //   { text: 'Năm 2027', value: '2027' },
              //   { text: 'Năm 2028', value: '2028' },
              // ]}
              // onFilter={(value, record) => record.year.startsWith(value)}
              // filterSearch={true}
            />
            {/* <Column title="Ngày Tạo" dataIndex="date" key="date" /> */}
            <Column title="Mã Nhân Viên" dataIndex="staff_data" key="staff_data" />
            <Column
              title="Tên Nhân Viên"
              dataIndex="user_fullname"
              key="user_fullname"
              filters={this.state.staffs}
              onFilter={(value, record) => record.user_fullname.startsWith(value)}
              filterSearch={true}
            />
            <Column title="Lương Cơ Bản" dataIndex="basic_salary_data" key="basic_salary_data" />
            <Column title="Phụ Cấp" dataIndex="extra_data" key="extra_data" />
            <Column title="Hỗ Trợ Khác" dataIndex="other_support_data" key="other_support_data" />
            <Column title="Tổng Lương" dataIndex="total_salary" key="total_salary" />
            <Column title="Tiền Lương Thực Tế" dataIndex="actual_salary" key="actual_salary" />
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
                onChange={(event) => this.handleSearchPast(event)}
                className="mb-3"
              />
            </CCol>
          </CRow>
          <Table dataSource={this.state.salaryPast} bordered>
            <Column
              title="Tháng"
              dataIndex="month"
              key="month"
              filters={[
                { text: 'Tháng 1', value: '01' },
                { text: 'Tháng 2', value: '02' },
                { text: 'Tháng 3', value: '03' },
                { text: 'Tháng 4', value: '04' },
                { text: 'Tháng 5', value: '05' },
                { text: 'Tháng 6', value: '06' },
                { text: 'Tháng 7', value: '07' },
                { text: 'Tháng 8', value: '08' },
                { text: 'Tháng 9', value: '09' },
                { text: 'Tháng 10', value: '10' },
                { text: 'Tháng 11', value: '11' },
                { text: 'Tháng 12', value: '12' },
              ]}
              onFilter={(value, record) => record.month.startsWith(value)}
              filterSearch={true}
            />
            <Column
              title="Năm"
              dataIndex="year"
              key="year"
              filters={[
                { text: 'Năm 2009', value: '2009' },
                { text: 'Năm 2010', value: '2010' },
                { text: 'Năm 2011', value: '2011' },
                { text: 'Năm 2012', value: '2012' },
                { text: 'Năm 2013', value: '2013' },
                { text: 'Năm 2014', value: '2014' },
                { text: 'Năm 2015', value: '2015' },
                { text: 'Năm 2016', value: '2016' },
                { text: 'Năm 2017', value: '2017' },
                { text: 'Năm 2018', value: '2028' },
                { text: 'Năm 2019', value: '2029' },
                { text: 'Năm 2020', value: '2020' },
                { text: 'Năm 2021', value: '2021' },
                { text: 'Năm 2022', value: '2022' },
                { text: 'Năm 2023', value: '2023' },
                { text: 'Năm 2024', value: '2024' },
                { text: 'Năm 2025', value: '2025' },
                { text: 'Năm 2026', value: '2026' },
                { text: 'Năm 2027', value: '2027' },
                { text: 'Năm 2028', value: '2028' },
              ]}
              onFilter={(value, record) => record.year.startsWith(value)}
              filterSearch={true}
            />
            {/* <Column title="Ngày Tạo" dataIndex="date" key="date" /> */}
            <Column title="Mã Nhân Viên" dataIndex="staff_data" key="staff_data" />
            <Column
              title="Tên Nhân Viên"
              dataIndex="user_fullname"
              key="user_fullname"
              filters={this.state.staffs}
              onFilter={(value, record) => record.user_fullname.startsWith(value)}
              filterSearch={true}
            />
            <Column title="Lương Cơ Bản" dataIndex="basic_salary_data" key="basic_salary_data" />
            <Column title="Phụ Cấp" dataIndex="extra_data" key="extra_data" />
            <Column title="Hỗ Trợ Khác" dataIndex="other_support_data" key="other_support_data" />
            <Column title="Tổng Lương" dataIndex="total_salary" key="total_salary" />
            <Column title="Tiền Lương Thực Tế" dataIndex="actual_salary" key="actual_salary" />
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
              <h2 style={{ textTransform: 'uppercase' }}>Bạn có chắc chắn xoá?</h2>
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
        {/* Active */}
        <CModal visible={this.state.modalActiveIsOpen} onClose={this.closeActiveModal}>
          <CModalHeader>
            <CModalTitle>ACTIVE PHIẾU LƯƠNG</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleActive}>
              <h2 style={{ textTransform: 'uppercase' }}>
                Bạn có muốn active phiếu lương tháng {this.state.currentMonth} năm{' '}
                {this.state.currentYear}
              </h2>

              <CModalFooter>
                <CButton color="secondary" onClick={this.closeActiveModal}>
                  HUỶ
                </CButton>
                <CButton color="info" type="submit">
                  {this.state.loadStatusActive ? (
                    <>
                      <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                      Đang Tiến Hành Active...
                    </>
                  ) : (
                    'OK'
                  )}
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Check */}
        <CModal visible={this.state.modalCheckIsOpen} onClose={this.closeCheckModal} size="xl">
          <CModalHeader>
            <CModalTitle>CHECK PHIẾU LƯƠNG</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <Table dataSource={this.state.listStaff} bordered>
              {/* <Column title="Mã" dataIndex="company" key="company" /> */}
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
              <Column title="Bộ phận" dataIndex="department_data" key="department_data" />
              <Column title="Chức Vụ" dataIndex="position_data" key="position_data" />
              <Column
                title="Hành động"
                key={this.state.listStaff}
                render={(text, record) => (
                  <Space size="middle">
                    <CTooltip content="Thêm Phiếu Lương" placement="top">
                      <CButton color="info" onClick={() => this.openAddSalaryModal(text)}>
                        {/* <CIcon icon={cilDelete} /> */}
                        Thêm Phiếu Lương
                      </CButton>
                    </CTooltip>
                  </Space>
                )}
              />
            </Table>
          </CModalBody>
        </CModal>
        {/* Add Salary */}
        <CModal
          visible={this.state.modalAddSalaryIsOpen}
          onClose={this.closeAddSalaryModal}
          size="lg"
        >
          <CModalHeader>
            <CModalTitle>
              THÊM PHIẾU LƯƠNG - NHÂN VIÊN{' '}
              <span style={{ textTransform: 'uppercase' }}>
                {this.state.first_name} {this.state.last_name}
              </span>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleAddSalary}>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeAddSalaryModal}>
                  HUỶ
                </CButton>
                <CButton color="info" type="submit">
                  SAVE
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
