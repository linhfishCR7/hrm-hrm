import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import LoadingOverlay from 'react-loading-overlay'
import openNotificationWithIcon from '../../../utils/notification'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import { Table, Space, Button, Input, Collapse, Card, Spin, BackTop, Select, Divider } from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EyeOutlined } from '@ant-design/icons'
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload, cilInfo, cilLink } from '@coreui/icons'
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
    key: 'LienHeKhanCap',
    tab: 'Liên Hệ Khẩn Cấp',
  },
  {
    key: 'BangCap',
    tab: 'Bằng Cấp',
  },
  {
    key: 'ChungChi',
    tab: 'Chứng Chỉ',
  },
  {
    key: 'KyNang',
    tab: 'Kỹ Năng',
  },
  {
    key: 'CongTac',
    tab: 'Công Tác',
  },
  {
    key: 'ChamCong',
    tab: 'Chấm Công',
  },
  {
    key: 'PhepNam',
    tab: 'Phép Năm',
  },
  {
    key: 'TienLuong',
    tab: 'Tiền Lương',
  },
  {
    key: 'DieuChinhLuong',
    tab: 'Điều Chỉnh Lương',
  },
  {
    key: 'HopDong',
    tab: 'Hợp Đồng',
  },
  {
    key: 'DaoTao',
    tab: 'Đào Tạo',
  },
  {
    key: 'ThangTien',
    tab: 'Thăng Tiến',
  },
  {
    key: 'KhenThuong',
    tab: 'Khen Thưởng',
  },
  {
    key: 'KyLuat',
    tab: 'Kỷ Luật',
  },
  {
    key: 'KhamSucKhoe',
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
      nationality: '',
      ethnicity: '',
      religion: '',
      literacy: '',
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
      urgentContactData: [],
      certificateData: [],
      degreeData: [],
      skillData: [],
      timekeepingData: [],
      kindOffYearData: [],
      salaryData: [],
      upSalaryData: [],
      contractData: [],
      trainningData: [],
      promotionData: [],
      bonusData: [],
      disciplineData: [],
      heathyData: [],
      onBusinessData: [],
      positions: [{}],
      projects: [{}],
      departments: [{}],
      kindofworks: [{}],
      loading: true,
      search: '',
      filter: '',
      staffName: '',
      staffId: '',
      modalSettingIsOpen: false,
    }
  }

  openStaffDetailModal = (item) => {
    localStorage.setItem('staffDetail', item.id)
    this.setState({
      staffName: item.first_name + ' ' + item.last_name,
      staffId: item.staff,
    })
    const staffDetail = localStorage.getItem('staffDetail')
    this.fetchStaffDetail(staffDetail)
    this.fetchUrgentContact(staffDetail)
    this.fetchCertificate(staffDetail)
    this.fetchDegree(staffDetail)
    this.fetchSkill(staffDetail)
    this.fetchTimeKeeping(staffDetail)
    this.fetchDayOffYear(staffDetail)
    this.fetchSalary(staffDetail)
    this.fetchUpSalary(staffDetail)
    this.fetchContract(staffDetail)
    this.fetchTrainning(staffDetail)
    this.fetchPromotion(staffDetail)
    this.fetchBonus(staffDetail)
    this.fetchDiscipline(staffDetail)
    this.fetchHeathy(staffDetail)
    this.fetchOnBussiness(staffDetail)
    this.setState({
      modalSettingIsOpen: true,
    })
  }

  closeSettingModal = () => {
    this.setState({
      modalSettingIsOpen: false,
    })
  }

  fetchDeparmentAPI = (event) => {
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
          departments: data,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchPositionAPI = (event) => {
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
          positions: data,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchProjectAPI = (event) => {
    API({
      REGISTER_URL: '/hrm/projects/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const projectss = res.data
        const data = []
        projectss.map((item) =>
          // this.setState({
          data.push({
            text: item.name,
            value: item.name,
          }),
        )
        this.setState({
          projects: data,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchKindOfWorkAPI = (event) => {
    API({
      REGISTER_URL: '/hrm/kinds-of-work/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const kindofworkss = res.data
        const data = []
        kindofworkss.map((item) =>
          // this.setState({
          data.push({
            text: item.name,
            value: item.name,
          }),
        )
        this.setState({
          kindofworks: data,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchStaffDetail = (id) => {
    API({
      REGISTER_URL: '/hrm/staffs/' + id + '/',
      ACTION: 'GET',
    })
      .then((res) => {
        const staffs = res.data
        this.setState({
          staffData: staffs,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchUrgentContact = (id) => {
    API({
      REGISTER_URL: '/hrm/urgent-contacts/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const urgentContacts = res.data
        this.setState({
          urgentContactData: urgentContacts,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchCertificate = (id) => {
    API({
      REGISTER_URL: '/hrm/certificate/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const certificateData = res.data
        this.setState({
          certificateData: certificateData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchDegree = (id) => {
    API({
      REGISTER_URL: '/hrm/degree/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const degreeData = res.data
        this.setState({
          degreeData: degreeData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchSkill = (id) => {
    API({
      REGISTER_URL: '/hrm/skills/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const skillData = res.data
        this.setState({
          skillData: skillData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchTimeKeeping = (id) => {
    API({
      REGISTER_URL: '/hrm/timekeeping/?no_pagination=true&staff_project__staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const timekeepingData = res.data
        this.setState({
          timekeepingData: timekeepingData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchDayOffYear = (id) => {
    API({
      REGISTER_URL: '/hrm/day-off-years/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const kindOffYearData = res.data
        this.setState({
          kindOffYearData: kindOffYearData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchSalary = (id) => {
    API({
      REGISTER_URL: '/hrm/salary/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const salaryData = res.data
        this.setState({
          salaryData: salaryData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchUpSalary = (id) => {
    API({
      REGISTER_URL: '/hrm/up-salary/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const upSalaryData = res.data
        this.setState({
          upSalaryData: upSalaryData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchContract = (id) => {
    API({
      REGISTER_URL: '/hrm/employment-contract/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const contractData = res.data
        this.setState({
          contractData: contractData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchTrainning = (id) => {
    API({
      REGISTER_URL: '/hrm/trainning-requirement-detail/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const trainningData = res.data
        this.setState({
          trainningData: trainningData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchPromotion = (id) => {
    API({
      REGISTER_URL: '/hrm/promotions/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const promotionData = res.data
        this.setState({
          promotionData: promotionData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchBonus = (id) => {
    API({
      REGISTER_URL: '/hrm/bonuses/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const bonusData = res.data
        this.setState({
          bonusData: bonusData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchDiscipline = (id) => {
    API({
      REGISTER_URL: '/hrm/discipline/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const disciplineData = res.data
        this.setState({
          disciplineData: disciplineData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchHeathy = (id) => {
    API({
      REGISTER_URL: '/hrm/health-status/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const heathyData = res.data
        this.setState({
          heathyData: heathyData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchOnBussiness = (id) => {
    API({
      REGISTER_URL: '/hrm/on-business/?no_pagination=true&staff__id=' + id,
      ACTION: 'GET',
    })
      .then((res) => {
        const onBusinessData = res.data
        this.setState({
          onBusinessData: onBusinessData,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchStaffAPI = (event) => {
    API({
      REGISTER_URL: '/hrm/staffs/?no_pagination=true',
      ACTION: 'GET',
    })
      .then((res) => {
        const staffs = res.data

        this.setState({
          staffs: staffs,
          loading: false,
          staffName: staffs[3].user.first_name + ' ' + staffs[3].user.last_name,
          staffId: staffs[3].staff,
        })
        localStorage.setItem('staffDetail', staffs[3].id)
        const staffDetail = localStorage.getItem('staffDetail')
        this.fetchUrgentContact(staffDetail)
        this.fetchStaffDetail(staffDetail)
        this.fetchCertificate(staffDetail)
        this.fetchDegree(staffDetail)
        this.fetchSkill(staffDetail)
        this.fetchTimeKeeping(staffDetail)
        this.fetchDayOffYear(staffDetail)
        this.fetchSalary(staffDetail)
        this.fetchUpSalary(staffDetail)
        this.fetchContract(staffDetail)
        this.fetchTrainning(staffDetail)
        this.fetchPromotion(staffDetail)
        this.fetchBonus(staffDetail)
        this.fetchDiscipline(staffDetail)
        this.fetchHeathy(staffDetail)
        this.fetchOnBussiness(staffDetail)
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
    this.fetchProjectAPI()
    this.fetchKindOfWorkAPI()
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
    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra)
    }
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
      LienHeKhanCap: (
        <Table dataSource={this.state.urgentContactData} bordered>
          <Column title="Họ Tên" dataIndex="full_name" key="full_name" />
          <Column title="Điện Thoại Bàn" dataIndex="phone" key="phone" />
          <Column title="Điện Thoại Di Động" dataIndex="mobile_phone" key="mobile_phone" />
          <Column title="Địa Chỉ" dataIndex="address" key="address" />
          <Column title="Mối Quan Hệ" dataIndex="type" key="type" />
        </Table>
      ),
      ChungChi: (
        <Table dataSource={this.state.certificateData} bordered>
          <Column title="Số" dataIndex="number" key="number" />
          <Column title="Tên Chứng Chỉ" dataIndex="name" key="name" />
          <Column title="Cấp Độ" dataIndex="level" key="level" />
          <Column title="Cấp Ngày" dataIndex="date" key="date" />
          <Column title="Nơi Cấp" dataIndex="place" key="place" />
          <Column title="Thời Hạn" dataIndex="expire" key="expire" />
          <Column title="Đính Kèm" dataIndex="attach" key="attach" />
          <Column title="Ghi Chú" dataIndex="note" key="note" />
        </Table>
      ),
      BangCap: (
        <Table dataSource={this.state.degreeData} bordered>
          <Column title="Số" dataIndex="number" key="number" />
          <Column title="Tên Bằng Cấp" dataIndex="name" key="name" />
          <Column title="Cấp Ngày" dataIndex="date" key="date" />
          <Column title="Nơi Cấp" dataIndex="place" key="place" />
          <Column title="Đính Kèm" dataIndex="attach" key="attach" />
        </Table>
      ),
      KyNang: (
        <Table dataSource={this.state.skillData} bordered>
          <Column title="Tên Kỹ Năng" dataIndex="name" key="name" />
          <Column title="Loại" dataIndex="type" key="type" />
        </Table>
      ),
      CongTac: (
        <>
          <Table dataSource={this.state.onBusinessData} bordered>
            <Column title="Thời Gian" dataIndex="date_data" key="date_data" />
            <Column title="Công Ty" dataIndex="company" key="company" />
            <Column title="Vị Trí" dataIndex="position" key="position" />
            <Column title="Mô Tả Công Việc" dataIndex="content" key="content" />
          </Table>
        </>
      ),
      ChamCong: (
        <Table dataSource={this.state.timekeepingData} bordered>
          <Column title="Ngày" dataIndex="date" key="date" />
          <Column
            title="Số Lượng Công Việc"
            dataIndex="amount_in_project"
            key="amount_in_project"
          />
          <Column title="Thời Gian Làm Thêm" dataIndex="amount_time" key="amount_time" />
          <Column
            title="Loại Thời Gian Làm Thêm"
            dataIndex="type_time"
            key="type_time"
            filters={[
              { text: 'Giờ Hành Chính', value: 'Giờ Hành Chính' },
              { text: 'Làm Thêm Ngày Thường', value: 'Làm Thêm Ngày Thường' },
              { text: 'Làm Thêm Ngày Cuối Tuần', value: 'Làm Thêm Ngày Cuối Tuần' },
              { text: 'Làm Thêm Ngày Lễ Tết', value: 'Làm Thêm Ngày Lễ Tết' },
            ]}
            onFilter={(value, record) => record.type_time.startsWith(value)}
            filterSearch={true}
            width="40%"
          />
          <Column
            title="Loại Công"
            dataIndex="type_work_name"
            key="type_work_name"
            filters={this.state.kindofworks}
            onFilter={(value, record) => record.type_work_name.startsWith(value)}
            filterSearch={true}
          />
          <Column
            title="Dự Án"
            dataIndex="project_name"
            key="project_name"
            filters={this.state.projects}
            onFilter={(value, record) => record.project_name.startsWith(value)}
            filterSearch={true}
          />
        </Table>
      ),
      PhepNam: (
        <Table dataSource={this.state.kindOffYearData} bordered>
          <Column title="Ngày Xin Nghỉ Phép" dataIndex="date" key="date" />
          <Column title="Lí Do" dataIndex="reason" key="reason" />
          <Column title="Người Liên Hệ" dataIndex="contact" key="contact" />
          <Column title="Người Đảm Nhiệm Tạm Thời" dataIndex="hand_over" key="hand_over" />
          <Column title="Trạng Thái" dataIndex="status_text" key="status_text" />
          <Column title="Người Phê Duyệt" dataIndex="approved_by_name" key="approved_by_name" />
        </Table>
      ),
      TienLuong: (
        <Table dataSource={this.state.salaryData} bordered>
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
          <Column title="Ngày Tạo Phiếu Lương" dataIndex="date" key="date" />
          <Column title="Lương Cơ Bản" dataIndex="basic_salary_data" key="basic_salary_data" />
          <Column title="Phụ Cấp" dataIndex="extra_data" key="extra_data" />
          <Column title="Hỗ Trợ Khác" dataIndex="other_support_data" key="other_support_data" />
          <Column title="Tổng Lương" dataIndex="total_salary" key="total_salary" />
          <Column title="Tiền Lương Thực Tế" dataIndex="actual_salary" key="actual_salary" />
        </Table>
      ),
      DieuChinhLuong: (
        <Table dataSource={this.state.upSalaryData} bordered>
          <Column title="Ngày Tăng Lương" dataIndex="date" key="date" />
          <Column title="Hệ Số Cũ" dataIndex="old_coefficient" key="old_coefficient" />
          <Column title="Hệ Số Mới" dataIndex="coefficient" key="coefficient" />
        </Table>
      ),
      HopDong: (
        <Table dataSource={this.state.contractData} bordered>
          <Column title="Số Hợp Đồng" dataIndex="number_contract" key="number_contract" />
          <Column title="Tên Hợp Đồng" dataIndex="name" key="name" />
          <Column title="Loại Hợp Đồng" dataIndex="type_name" key="type_name" />
          <Column title="Từ Ngày" dataIndex="from_date" key="from_date" />
          <Column title="Đến Ngày" dataIndex="to_date" key="to_date" />
          <Column title="Lương Cơ Bản" dataIndex="basic_salary_data" key="basic_salary_data" />
          <Column title="Phụ Cấp" dataIndex="extra_data" key="extra_data" />
          <Column title="Hỗ Trợ Khác" dataIndex="other_support_data" key="other_support_data" />
          <Column title="Tổng Lương" dataIndex="total_salary" key="total_salary" />
          <Column title="Tình Trạng" dataIndex="status_data" key="status_data" />
        </Table>
      ),
      DaoTao: (
        <Table dataSource={this.state.trainningData} bordered>
          <Column title="Mã" dataIndex="id" key="id" />
          <Column title="Nội Dung Đào Tạo" dataIndex="content" key="content" />
          <Column title="Tên Khoá Học" dataIndex="course_name" key="course_name" />
          <Column
            title="Đơn Vị Tổ Chức"
            dataIndex="organizational_units"
            key="organizational_units"
          />
          <Column
            title="Dự Kiến Chi Phí"
            dataIndex="estimated_cost_data"
            key="estimated_cost_data"
          />
          <Column title="Ngày Yêu Cầu" dataIndex="date_requirement" key="date_requirement" />
          <Column title="Thời Gian" dataIndex="time_organizational" key="time_organizational" />
          <Column title="Số Lượng" dataIndex="amount" key="amount" />
          <Column title="Địa Điểm" dataIndex="place" key="place" />
        </Table>
      ),
      ThangTien: (
        <Table dataSource={this.state.promotionData} bordered>
          <Column title="Ngày" dataIndex="date" key="date" />
          <Column title="Nội Dung" dataIndex="content" key="content" />
          <Column title="Chức Vụ" dataIndex="position_name" key="position_name" />
          <Column title="Ghi Chú" dataIndex="note" key="note" />
        </Table>
      ),
      KhenThuong: (
        <Table dataSource={this.state.bonusData} bordered>
          <Column title="Ngày" dataIndex="date" key="date" />
          <Column title="Lí Do" dataIndex="reason" key="reason" />
          <Column title="Số Lượng" dataIndex="amount_data" key="amount_data" />
          <Column title="Ghi Chú" dataIndex="note" key="note" />
        </Table>
      ),
      KyLuat: (
        <Table dataSource={this.state.disciplineData} bordered>
          <Column title="Ngày" dataIndex="date" key="date" />
          <Column title="Nội Dung" dataIndex="content" key="content" />
          <Column title="Thời Hạn" dataIndex="expire" key="expire" />
          <Column
            title="Hình Thức Kỷ Luật"
            dataIndex="form_of_discipline"
            key="form_of_discipline"
          />
          <Column title="Ghi Chú" dataIndex="note" key="note" />
        </Table>
      ),
      KhamSucKhoe: (
        <Table dataSource={this.state.heathyData} bordered>
          <Column title="Ngày Khám" dataIndex="date" key="date" />
          <Column title="Nội Dung Khám" dataIndex="content" key="content" />
          <Column title="Nơi Khám" dataIndex="place" key="place" />
          <Column title="Tình Trạng Sức Khoẻ" dataIndex="health_status" key="health_status" />
        </Table>
      ),
    }
    const onTab2Change = (key) => {
      this.setState({ activeTabKey2: key })
    }

    return (
      <>
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spin tip="Vui lòng chờ..." size="large"></Spin>}
          styles={{ wrapper: { backgroundColor: 'black' } }}
        >
          {/* <p>Some content or children or something.</p> */}
        </LoadingOverlay>
        <h2>Danh Sách Nhân Viên</h2>
        <CRow>
          <CCol md={4}>
            <Input.Search
              placeholder="Tìm kiếm họ tên, email và số điện thoại"
              onChange={(event) => this.handleSearch(event)}
              className="mb-3"
            />
          </CCol>
        </CRow>
        <Table dataSource={this.state.staffs} bordered scroll={{ y: 500 }}>
          {' '}
          {/*scroll={{ y: 240 }}*/}
          <Column
            title="Mã Nhân Viên"
            dataIndex="staff"
            key="staff"
            sorter={(a, b) => a.staff.length - b.staff.length}
            sortDirections={['descend', 'ascend']}
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
            width="20%"
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
          <Column
            title="Thông Tin Chi Tiết"
            key={this.state.staff}
            render={(text, record) => (
              <Space size="middle">
                <CTooltip content="Chọn" placement="top">
                  <CButton color="info" onClick={() => this.openStaffDetailModal(record)}>
                    <EyeOutlined />
                  </CButton>
                </CTooltip>
              </Space>
            )}
          />
        </Table>
        <Divider />

        {/* Detail */}
        <CModal
          visible={this.state.modalSettingIsOpen}
          onClose={this.closeSettingModal}
          size="xl"
          scrollable={true}
        >
          <CModalHeader>
            <CModalTitle>
              Thông tin chi tiết nhân viên:{' '}
              <i>
                {this.state.staffName} ({this.state.staffId})
              </i>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <Card
              style={{ width: '100%' }}
              tabList={tabListNoTitle}
              activeTabKey={this.state.activeTabKey2}
              // tabBarExtraContent={<a href="#">More</a>}
              onTabChange={(key) => {
                onTab2Change(key)
              }}
            >
              {contentListNoTitle[this.state.activeTabKey2]}
            </Card>
          </CModalBody>
        </CModal>
      </>
    )
  }
}

export default ListStaff
