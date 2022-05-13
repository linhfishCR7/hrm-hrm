import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Input, Card } from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
// import { Link } from 'react-router-dom'
import '../../../assets/style.css'
// import LoadingOverlay from 'react-loading-overlay'
import openNotificationWithIcon from '../../../utils/notification'

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
  CSpinner,
  CContainer,
  CFormLabel,
  CFormText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCircle, cilSend, cilCheck, cilPlus } from '@coreui/icons'
import Modal from 'react-modal'
import Loading from '../../../utils/loading'

const { Column } = Table
// const { Panel } = Collapse
// const { Meta } = Card
const today = new Date().toISOString().slice(0, 10)

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
      salaries: [],
      activeTabKey2: 'SalaryCurrent',
      loading: true,
      loadingModal: false,
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
      modalAddAllSalaryIsOpen: false,
      first_name: '',
      last_name: '',
      full_name: '',
      staff_id: '',
      date: null,
      other_support: 0,
      other: 0,
      note: '',
      statusLoadProcess: false,
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
    this.setState({
      modalIsOpen: true,
      id: item.id,
      date: item.date,
      other_support: item.other_support,
      other: item.other,
      note: item.note,
      staff_id: item.staff_id,
      full_name: item.user_fullname,
    })
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
      staff_id: item.id,
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
          description: '',
          placement: 'topRight',
        })
      })
  }

  openAddAllSalaryModal = () => {
    this.setState({
      modalAddAllSalaryIsOpen: true,
    })
  }

  // Close Modal //
  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    })
  }

  closeAddAllSalaryModal = () => {
    this.setState({
      modalAddAllSalaryIsOpen: false,
    })
  }

  closeActiveModal = () => {
    this.setState({
      modalActiveIsOpen: false,
    })
  }
  closeCheckModal = () => {
    this.fetchSalaryCurrentAPI()
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
      date: this.state.date,
      other_support: this.state.other_support,
      other: this.state.other,
      note: this.state.note,
      staff: this.state.staff_id,
    }
    await axios
      .put('/hrm/salary/' + this.state.id + '/', newUpdate, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        this.fetchSalaryCurrentAPI()
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
      .delete('/hrm/salary/' + this.state.id + '/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        this.setState((prevState) => ({
          salaries: prevState.salaries.filter((el) => el.id !== this.state.id),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Xoá dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.closeDeleteModal()
        this.fetchSalaryCurrentAPI()
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
          message: res.data.message,
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
          description: '',
          placement: 'topRight',
        })
      })
  }

  handleAddSalary = async (event) => {
    event.preventDefault()

    const newItem = {
      date: this.state.date,
      other_support: this.state.other_support,
      other: this.state.other,
      note: this.state.note,
      staff: this.state.staff_id,
    }

    await axios
      .post('/hrm/salary/', newItem, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        let salaries = this.state.salaries
        salaries = [newItem, ...salaries]
        this.setState({ salaries: salaries })
        this.closeAddSalaryModal()
        openNotificationWithIcon({
          type: 'success',
          message: 'Thêm dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        this.setState({
          loadingModal: true,
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
                loadingModal: false,
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
                  this.setState({
                    listStaff: staffs,
                    modalCheckIsOpen: true,
                    loadStatusCheck: false,
                    loadingModal: false,
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
              description: '',
              placement: 'topRight',
            })
          })
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Thêm dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Thêm dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
        }
      })
  }

  handleAddAllSalary = (event) => {
    event.preventDefault()
    this.state.listStaff.map(async (item) => {
      const newItem = {
        date: new Date().toISOString().slice(0, 10),
        note: '',
        other: 0.0,
        other_support: 0.0,
        staff: item.id,
      }
      await axios
        .post('/hrm/salary/', newItem, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          this.closeAddAllSalaryModal()
          this.closeCheckModal()
        })
        .catch((error) => {
          if (error.response.status === 400) {
            openNotificationWithIcon({
              type: 'error',
              message: 'Thêm phiếu lương không thành công!!!',
              description: '',
              placement: 'topRight',
            })
            this.closeAddAllSalaryModal()
            this.closeCheckModal()
          } else {
            openNotificationWithIcon({
              type: 'error',
              message: 'Thêm phiếu lương không thành công!!!',
              description: '',
              placement: 'topRight',
            })
            this.closeAddAllSalaryModal()
            this.closeCheckModal()
          }
        })
    })

    openNotificationWithIcon({
      type: 'success',
      message: 'Thêm phiếu lương thành công!!!',
      description: '',
      placement: 'topRight',
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
                placeholder="Tìm kiếm họ tên nhân viên"
                onChange={(event) => this.handleSearchCurrent(event)}
                className="mb-3"
              />
            </CCol>
            <CCol md={4}>
              <Space size="middle">
                <CTooltip content="Gửi Phiếu Lương" placement="top">
                  <CButton
                    color="info"
                    // size="lg"
                    className="mb-3"
                    onClick={() => this.openActiveModal()}
                  >
                    <CIcon icon={cilSend} /> Gửi Phiếu Lương
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
                        Đang tiến hành kiểm tra...
                      </>
                    ) : (
                      <>
                        <CIcon icon={cilCheck} /> Kiểm tra phiếu lương
                      </>
                    )}
                  </CButton>
                </CTooltip>
              </Space>
            </CCol>
          </CRow>
          <h5 className="mb-3"> Hôm nay: {today}</h5>
          <Table dataSource={this.state.salaryCurrent} bordered scroll={{ y: 500 }}>
            {/* <Column title="Tháng" dataIndex="month" key="month" />
            <Column title="Năm" dataIndex="year" key="year" /> */}
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
                  <CTooltip content="Cập Nhật Dữ Liệu" placement="top">
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
            <CTooltip content="Thêm Dữ Liệu" placement="top">
              <Link to="/add-customer">
                <CButton color="primary">
                  <CIcon icon={cilPlus} />
                </CButton>
              </Link>
            </CTooltip>
          </CCol> */}
            <CCol md={8}>
              <Input.Search
                placeholder="Tìm kiếm họ tên nhân viên"
                onChange={(event) => this.handleSearchPast(event)}
                className="mb-3"
              />
            </CCol>
          </CRow>
          <Table dataSource={this.state.salaryPast} bordered scroll={{ y: 500 }}>
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
                  <CTooltip content="Xoá Dữ Liệu" placement="top">
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
            <CModalTitle>Xoá</CModalTitle>{' '}
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleDelete}>
              <h2>Bạn có chắc chắn xoá?</h2>
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
        {/* Active */}
        <CModal visible={this.state.modalActiveIsOpen} onClose={this.closeActiveModal}>
          <CModalHeader>
            <CModalTitle>Gửi phiếu lương</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleActive}>
              <h2>
                Bạn có muốn gửi phiếu lương tháng {this.state.currentMonth + 1} năm{' '}
                {this.state.currentYear}
              </h2>

              <CModalFooter>
                <CButton color="secondary" onClick={this.closeActiveModal}>
                  Huỷ
                </CButton>
                <CButton color="info" type="submit">
                  {this.state.loadStatusActive ? (
                    <>
                      <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                      Đang tiến hành gửi...
                    </>
                  ) : (
                    'Đồng ý'
                  )}
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Check */}
        <CModal visible={this.state.modalCheckIsOpen} onClose={this.closeCheckModal} size="xl">
          <Loading loading={this.state.loadingModal} />
          <CModalHeader>
            <CModalTitle>Kiểm tra phiếu lương</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow className="mb-3">
              <CCol md={8}>
                <Space>
                  <CTooltip content="Thêm phiếu lương cho tất cả nhân viên còn lại" placement="top">
                    <CButton color="info" onClick={() => this.openAddAllSalaryModal()}>
                      <CIcon icon={cilPlus} /> Thêm phiếu lương cho tất cả nhân viên còn lại
                    </CButton>
                  </CTooltip>
                </Space>
              </CCol>
            </CRow>
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
                title="Thêm phiếu lương"
                key={this.state.listStaff}
                render={(text, record) => (
                  <Space size="middle">
                    <CTooltip content="Thêm phiếu lương" placement="top">
                      <CButton color="info" onClick={() => this.openAddSalaryModal(record)}>
                        <CIcon icon={cilPlus} />
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
              Thêm phiếu lương - nhân viên: {this.state.first_name} {this.state.last_name}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleAddSalary}>
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày"
                      autoComplete="date"
                      name="date"
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày nhập phiếu lương bắt buộc có
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
                      Hỗ trợ khác có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Khoản Khác</CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="Khoản Khác"
                      autoComplete="other"
                      name="other"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Khoản khác có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ghi Chú</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Ghi Chú"
                      autoComplete="note"
                      name="note"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ghi chú có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeAddSalaryModal}>
                  Huỷ
                </CButton>
                <CButton color="info" type="submit">
                  Lưu
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Update */}
        <CModal
          visible={this.state.modalIsOpen}
          onClose={this.closeModal}
          size="lg"
          scrollable={true}
        >
          <CModalHeader>
            <CModalTitle style={{ textTransform: 'uppercase' }}>
              Cập nhật phiếu lương - nhân viên: {this.state.full_name}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày"
                      autoComplete="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày nhập phiếu lương bắt buộc chọn
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
                      Hỗ trợ khác có thể có hoặc không
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Khoản Khác</CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="Khoản Khác"
                      autoComplete="other"
                      name="other"
                      value={this.state.other}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Khoản khác có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ghi Chú</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Ghi Chú"
                      autoComplete="note"
                      name="note"
                      onChange={this.handleInputChange}
                      value={this.state.note}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ghi chú có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
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
        {/* Add All Salary */}
        <CModal visible={this.state.modalAddAllSalaryIsOpen} onClose={this.closeAddAllSalaryModal}>
          <CModalHeader>
            <CModalTitle>Thêm phiếu lương cho tất cả nhân viên</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleAddAllSalary}>
              <h6>
                Bạn có muốn thêm phiếu lương cho tất cả nhân viên trong: tháng{' '}
                {this.state.currentMonth + 1} năm {this.state.currentYear}
              </h6>

              <CModalFooter>
                <CButton color="secondary" onClick={this.closeAddAllSalaryModal}>
                  Huỷ
                </CButton>
                <CButton color="info" type="submit">
                  {this.state.statusLoadProcess ? (
                    <>
                      <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                      Đang tiến hành thêm...
                    </>
                  ) : (
                    'Đồng ý'
                  )}
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
