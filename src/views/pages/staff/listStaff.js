import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import '../../../assets/style.css'

import {
  Table,
  Tag,
  Space,
  Button,
  message,
  Input,
  Collapse,
  Card,
  Avatar,
  Spin,
  Alert,
  BackTop,
  Select,
} from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EditOutlined, DeleteOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import {
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTable,
  CButton,
  CRow,
  CCol,
  CTooltip,
  CImage,
  CContainer,
} from '@coreui/react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload, cilEyedropper, cilLink } from '@coreui/icons'
import Modal from 'react-modal'
const { Column, ColumnGroup } = Table
const { Panel } = Collapse
const { Meta } = Card
const { Option } = Select

const tabListNoTitle = [
  {
    key: 'ThongTin',
    tab: 'Thông tin',
  },
  {
    key: 'Liên Hệ Khẩn Cấp',
    tab: 'Liên Hệ Khẩn Cấp',
  },
  {
    key: 'Bằng Cấp',
    tab: 'Bằng Cấp',
  },
  {
    key: 'Chứng Chỉ',
    tab: 'Chứng Chỉ',
  },
  {
    key: 'Kỹ Năng',
    tab: 'Kỹ Năng',
  },
  {
    key: 'Công Tác',
    tab: 'Công Tác',
  },
  {
    key: 'Chấm Công',
    tab: 'Chấm Công',
  },
  {
    key: 'Phép Năm',
    tab: 'Phép Năm',
  },
  {
    key: 'Tiền Lương',
    tab: 'Tiền Lương',
  },
  {
    key: 'Điều Chỉnh Lương',
    tab: 'Điều Chỉnh Lương',
  },
  {
    key: 'Hợp Đồng',
    tab: 'Hợp Đồng',
  },
  {
    key: 'Đào Tạo',
    tab: 'Đào Tạo',
  },
  {
    key: 'Thăng Tiến',
    tab: 'Thăng Tiến',
  },
  {
    key: 'Khen Thưởng',
    tab: 'Khen Thưởng',
  },
  {
    key: 'Kỷ Luật',
    tab: 'Kỷ Luật',
  },
  {
    key: 'Khám Sức Khoẻ',
    tab: 'Khám Sức Khoẻ',
  },
]

class ListStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      staffs: [],
      id: '',
      staffDataId: '',
      activeTabKey2: 'ThongTin',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      is_active: false,
      departments: [{}],
      nationality: '',
      ethnicity: '',
      religion: '',
      literacy: '',
      positions: [{}],
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
      staffData: {},
      loading: true,
      search: '',
      filter: '',
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
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
          departments: data,
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

  fetchStaffDetail = async (id) => {
    await axios
      .get('/hrm/staffs/' + id + '/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const staffs = res.data
        this.setState({
          staffData: staffs,
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
        localStorage.setItem('staffDetail', staffs[3].id)
        const staffDetail = localStorage.getItem('staffDetail')
        this.fetchStaffDetail(staffDetail)
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
          positions: data,
        })
      })
      .catch((error) => console.log(error))
  }

  componentDidMount() {
    this.setState({
      loading: true,
    })
    this.fetchStaffAPI()
    this.fetchDeparmentAPI()
    this.fetchPositionAPI()
  }

  UNSAFE_componentWillMount() {
    Modal.setAppElement('body')
  }

  openModal = (item) => {
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
  }

  closeSettingModal = () => {
    this.setState({
      modalSettingIsOpen: false,
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
  // handleSearch = async (event) => {
  //   let value = event.target.value
  //   const REGISTER_URL = '/hrm/staffs/?no_pagination=true&search=' + value + '&department__name__in'
  //   const res = await axios.get(REGISTER_URL, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${TOKEN}`,
  //     },
  //     withCredentials: true,
  //   })
  //   this.setState({ staffs: res.data })
  // }

  handleGetStaffDetail = (item) => {
    localStorage.setItem('staffDetail', item.id)
    const staffDetail = localStorage.getItem('staffDetail')
    this.fetchStaffDetail(staffDetail)
  }

  render() {
    const contentListNoTitle = {
      ThongTin: (
        <CTable hover color="dark">
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope="row">Mã Nhân Viên</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.staff}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Logo</CTableHeaderCell>
              <CTableDataCell>
                <CImage src={this.state.staffData.logo_url} height={200} width={300} />
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Họ Tên</CTableHeaderCell>
              <CTableDataCell>
                {this.state.staffData.first_name + ' ' + this.state.staffData.last_name}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Tình Trạng Hôn Nhân</CTableHeaderCell>
              <CTableDataCell>
                {this.state.staffData.marital_status === 'single' ? 'Độc Thân' : 'Đã Lập Gia Đình'}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Số Con</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.number_of_children}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Email</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.email}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Bộ Phận</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.department_data}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Số Điện Thoại</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.phone}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Tình Trạng Làm Việc</CTableHeaderCell>
              <CTableDataCell>
                {this.state.staffData.is_active ? 'Đang Làm Việc' : 'Nghỉ Làm'}
              </CTableDataCell>
            </CTableRow>
            {/* <CTableRow>
          <CTableHeaderCell scope="row">Nguyên Quán</CTableHeaderCell>
          <CTableDataCell>
            {this.state.staffData.addresses != '' ? this.state.staffData.addresses : ''}
          </CTableDataCell>
        </CTableRow> */}
            <CTableRow>
              <CTableHeaderCell scope="row">Vị Trí Làm Việc</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.position_data}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Quốc Tịch</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.nationality_data}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Trình Độ Học Vấn</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.literacy_data}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Tôn Giáo</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.religion_data}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Dân Tộc</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.ethnicity_data}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Số CCCD</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.identity_card}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Số Con</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.number_of_children}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Ngày Cấp</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.issuance_date}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Nơi Cấp</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.place_of_issuance}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Ngày Bắt Đầu Làm Việc</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.start_work_date}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Ngày Kết Thúc Thử Việc</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.probationary_end_date}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Ngày Ký Hợp Đồng Lao Động</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.labor_contract_signing_date}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Thông Báo Trúng Tuyển</CTableHeaderCell>
              <CTableDataCell>
                <Space size="middle">
                  <CTooltip
                    content={
                      this.state.staffData.elect_notifications
                        ? this.state.staffData.elect_notifications
                        : 'Link'
                    }
                    placement="top"
                  >
                    <Link
                      to={
                        this.state.staffData.elect_notifications
                          ? this.state.staffData.elect_notifications
                          : '#'
                      }
                      target="_blank"
                    >
                      <CButton color="info" style={{ marginRight: '10px' }}>
                        <CIcon icon={cilLink} />
                      </CButton>
                    </Link>
                  </CTooltip>
                </Space>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Quyết Định Trúng Tuyển</CTableHeaderCell>
              <CTableDataCell>
                <Space size="middle">
                  <CTooltip
                    content={
                      this.state.staffData.elect_decision
                        ? this.state.staffData.elect_decision
                        : 'Link'
                    }
                    placement="top"
                  >
                    <Link
                      to={
                        this.state.staffData.elect_decision
                          ? this.state.staffData.elect_decision
                          : '#'
                      }
                      target="_blank"
                    >
                      <CButton color="info" style={{ marginRight: '10px' }}>
                        <CIcon icon={cilLink} />
                      </CButton>
                    </Link>
                  </CTooltip>
                </Space>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Email Cá Nhân</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.personal_email}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">FaceBook</CTableHeaderCell>
              <CTableDataCell>
                <Space size="middle">
                  <CTooltip
                    content={this.state.staffData.facebook ? this.state.staffData.facebook : 'Link'}
                    placement="top"
                  >
                    <Link
                      to={this.state.staffData.facebook ? this.state.staffData.facebook : '#'}
                      target="_blank"
                    >
                      <CButton color="info" style={{ marginRight: '10px' }}>
                        <CIcon icon={cilLink} />
                      </CButton>
                    </Link>
                  </CTooltip>
                </Space>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Số BHXH</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.social_insurance_number}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Đường link</CTableHeaderCell>
              <CTableDataCell>
                <Space size="middle">
                  <CTooltip
                    content={this.state.staffData.url ? this.state.staffData.url : 'Link'}
                    placement="top"
                  >
                    <Link
                      to={this.state.staffData.url ? this.state.staffData.url : '#'}
                      target="_blank"
                    >
                      <CButton color="info" style={{ marginRight: '10px' }}>
                        <CIcon icon={cilLink} />
                      </CButton>
                    </Link>
                  </CTooltip>
                </Space>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Mã Số Thuế</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.tax_code}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Tài Khoản Ngân Hàng</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.bank_account}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">Ghi Chú</CTableHeaderCell>
              <CTableDataCell>{this.state.staffData.note}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      ),
      app: <p>app content</p>,
      project: <p>project content</p>,
    }
    const onTab2Change = (key) => {
      this.setState({ activeTabKey2: key })
    }

    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra)
    }
    return (
      <>
        <BackTop />
        {/* <BackTop>
          <div style={style}>UP</div>
        </BackTop> */}
        <div className={this.state.loading ? 'spin' : 'hide'}>
          <Spin tip="Loading..." size="large">
            <Alert
              message="Vui lòng chờ tí nhé!"
              // description="Further details about the context of this alert."
              type="info"
            />
          </Spin>
        </div>
        <h2>Nhân Viên</h2>
        <CRow>
          <CCol md={4}>
            <Input.Search
              placeholder="Search..."
              onChange={(event) => this.handleSearch(event)}
              className="mb-3"
            />
          </CCol>
        </CRow>
        <Table dataSource={this.state.staffs} bordered scroll={{ y: 240 }}>
          <Column
            title="Hành động"
            key={this.state.staff}
            render={(text, record) => (
              <Space size="middle">
                <CTooltip content="Chọn" placement="top">
                  <CButton color="info" onClick={() => this.handleGetStaffDetail(record)}>
                    {/* <CIcon icon={cilDelete} /> */}
                    <CIcon icon={cilCloudUpload} />
                  </CButton>
                </CTooltip>
              </Space>
            )}
          />
          <Column
            title="Mã Số"
            dataIndex="staff"
            key="staff"
            sorter={(a, b) => a.staff.length - b.staff.length}
            sortDirections={['descend', 'ascend']}

            // filters={this.state.departments}
            // onFilter={(value, record) => record.staff.startsWith(value)}
            // filterSearch={true}
            // width="40%"
          />
          <Column title="Họ" dataIndex="last_name" key="last_name" />
          <Column title="Tên" dataIndex="first_name" key="first_name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column
            title="Bộ Phận"
            dataIndex="department_data"
            key="department_data"
            filters={this.state.departments}
            onFilter={(value, record) => record.department_data.startsWith(value)}
            filterSearch={true}
            width="40%"
          />
          <Column
            title="Vị Trí"
            dataIndex="position_data"
            key="position_data"
            filters={this.state.positions}
            onFilter={(value, record) => record.position_data.startsWith(value)}
            filterSearch={true}
            // width="40%"
          />
        </Table>
        <br />
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.activeTabKey2}
          tabBarExtraContent={<a href="#">More</a>}
          onTabChange={(key) => {
            onTab2Change(key)
          }}
        >
          {contentListNoTitle[this.state.activeTabKey2]}
        </Card>
        <br />
      </>
    )
  }
}

export default ListStaff
