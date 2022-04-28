import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, message, Input, Card } from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
// import { Link } from 'react-router-dom'
import '../../../assets/style.css'
// import LoadingOverlay from 'react-loading-overlay'

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
import { cilCircle, cilCloudUpload, cilCheck } from '@coreui/icons'
import Modal from 'react-modal'
import Loading from '../../../utils/loading'
import openNotificationWithIcon from '../../../utils/notification'

const { Column } = Table
// const { Panel } = Collapse
// const { Meta } = Card
const staff_id = localStorage.getItem('staff')
const staff_name = localStorage.getItem('staff_name')
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
class SalaryStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      salaries: [],
      salaryPast: [],
      activeTabKey2: 'SalaryCurrent',
      loading: true,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      modalDeleteIsOpen: false,
      modalIsOpen: false,
      listStaff: [],
      modalAddSalaryIsOpen: false,
      date: null,
      other_support: 0,
      other: 0,
      note: '',
      staff: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  fetchSalaryCurrentAPI = async (event) => {
    await axios
      .get(`/hrm/salary/current/?no_pagination=true&staff__id=${staff_id}`, {
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
      .get(`/hrm/salary/past/?no_pagination=true&staff__id=${staff_id}`, {
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
  // Open modal //
  openModal = (item) => {
    this.setState({
      modalIsOpen: true,
      id: item.id,
      date: item.date,
      other_support: item.other_support,
      other: item.other,
      note: item.note,
      staff: staff_id,
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

  openAddSalaryModal = (item) => {
    this.setState({
      modalAddSalaryIsOpen: true,
    })
  }
  // //

  closeModal = () => {
    this.fetchSalaryCurrentAPI()
    this.setState({
      modalIsOpen: false,
    })
  }
  // Close Modal //

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

  handleAddSalary = async (event) => {
    event.preventDefault()

    const newItem = {
      date: this.state.date,
      other_support: this.state.other_support,
      other: this.state.other,
      note: this.state.note,
      staff: staff_id,
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
        this.fetchSalaryCurrentAPI()
        this.closeAddSalaryModal()
        openNotificationWithIcon({
          type: 'success',
          message: 'Thêm dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
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
  handleEditSubmit = async (event) => {
    event.preventDefault()

    const newUpdate = {
      date: this.state.date,
      other_support: this.state.other_support,
      other: this.state.other,
      note: this.state.note,
      staff: staff_id,
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
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: error,
          description: '',
          placement: 'topRight',
        }),
      )
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
        setTimeout(function () {
          window.location.reload()
        }, 3000)
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'Xoá dữ liệu không thành công!!!',
          description: '',
          placement: 'topRight',
        }),
      )
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
            <CCol md={4} className="mb-3">
              <Space size="middle">
                <CTooltip content="Thêm Phiếu Lương" placement="top">
                  <CButton color="info" onClick={() => this.openAddSalaryModal(staff_id)}>
                    {/* <CIcon icon={cilDelete} /> */}
                    Thêm Phiếu Lương
                  </CButton>
                </CTooltip>
              </Space>
            </CCol>
            <CCol md={8}>
              {/* <Input.Search
                placeholder="Search..."
                onChange={(event) => this.handleSearchCurrent(event)}
                className="mb-3"
              /> */}
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
            <Column title="Tên Nhân Viên" dataIndex="user_fullname" key="user_fullname" />
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
            <Column title="Tên Nhân Viên" dataIndex="user_fullname" key="user_fullname" />
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
                  {/* <CTooltip content="Edit data" placement="top">
                    <CButton
                      color="warning"
                      style={{ marginRight: '10px' }}
                      // key={record.id}
                      onClick={() => this.openModal(record)}
                    >
                      <EditOutlined />
                    </CButton>
                  </CTooltip> */}
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
        <h2>{staff_name} - Tiền Lương</h2>
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
        {/* Add Salary */}
        <CModal
          visible={this.state.modalAddSalaryIsOpen}
          onClose={this.closeAddSalaryModal}
          size="lg"
        >
          <CModalHeader>
            <CModalTitle>
              THÊM PHIẾU LƯƠNG - NHÂN VIÊN{' '}
              <span style={{ textTransform: 'uppercase' }}>{staff_name}</span>
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
                      Ngày nhập phiếu lương
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
                      Hỗ Trợ Khác
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Khác</CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="Khác"
                      autoComplete="other"
                      name="other"
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày nhập phiếu lương
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
                      Ghi chú
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeAddSalaryModal}>
                  HUỶ
                </CButton>
                <CButton color="info" type="submit">
                  LƯU
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
              CẬP NHẬT PHIẾU LƯƠNG - NHÂN VIÊN{' '}
              <span style={{ textTransform: 'uppercase' }}>{staff_name}</span>
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
                      Ngày nhập phiếu lương
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
                      Hỗ Trợ Khác
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Khác</CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="Khác"
                      autoComplete="other"
                      name="other"
                      value={this.state.other}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày nhập phiếu lương
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
                      Ghi chú
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
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

export default SalaryStaff
