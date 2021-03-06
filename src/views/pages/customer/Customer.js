import React, { Component } from 'react'
import axios from '../../../utils/axios'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Tag, Space, Button, message, Input } from 'antd'
import { TOKEN } from '../../../constants/Config'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import {
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTable,
  CSpinner,
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
import Loading from '../../../utils/loading'
const { Column, ColumnGroup } = Table

class Customer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: [],
      companies: [{}],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      name: '',
      phone: '',
      email: '',
      file: '',
      website: '',
      company: '',
      address: '',
      country: '',
      city: '',
      province: '',
      district: '',
      commune: '',
      postcode: '',
      lat: '',
      lng: '',
      type: 'head_office_address',
      loading: true,
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  async componentDidMount() {
    await axios
      .get('/hrm/customers/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const customers = res.data
        this.setState({
          customers: customers,
          logo: res.data.logo,
          loading: false,
        })
      })
      .catch((error) => console.log(error))
  }

  fetchCompanyAPI = async (event) => {
    await axios
      .get('/hrm/companies/?no_pagination=true', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const companies = res.data
        this.setState({
          companies: companies,
        })
      })
      .catch((error) => console.log(error))
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
    this.fetchCompanyAPI()
    axios
      .get('/hrm/customers/' + item.id + '/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const customers = res.data
        this.setState({
          modalIsOpen: true,
          id: customers.id,
          company: customers.company.id,
          name: customers.name,
          email: customers.email,
          phone: customers.phone,
          file: customers.file,
          website: customers.website,
          address: customers.addresses[0].address,
          country: customers.addresses[0].country,
          city: customers.addresses[0].city,
          province: customers.addresses[0].province,
          district: customers.addresses[0].district,
          commune: customers.addresses[0].commune,
          postcode: customers.addresses[0].postcode,
          lat: customers.addresses[0].lat,
          lng: customers.addresses[0].lng,
          type: 'head_office_address',
        })
      })
      .catch((error) => console.log(error))
  }
  openDeleteModal = (item) => {
    this.setState({
      modalDeleteIsOpen: true,
      id: item.id,
      name: item.name,
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
  handleEditSubmit = async (event) => {
    event.preventDefault()

    const newUpdate = {
      //   id: this.state.id,
      company: this.state.company,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      file: this.state.file,
      website: this.state.website,

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
          type: 'head_office_address',
        },
      ],
    }

    await axios
      .put('/hrm/customers/' + this.state.id + '/', newUpdate, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        let key = this.state.id
        this.setState((prevState) => ({
          companies: prevState.companies.map((elm) =>
            elm.id === key
              ? {
                  ...elm,
                  name: this.state.name,
                  email: this.state.email,
                  phone: this.state.phone,
                  file: this.state.file,
                  website: this.state.website,
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
      .delete('/hrm/customers/' + this.state.id + '/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        this.setState((prevState) => ({
          customers: prevState.customers.filter((el) => el.id !== this.state.id),
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
    const REGISTER_URL = '/hrm/customers/?no_pagination=true&search=' + value
    const res = await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    })
    this.setState({ customers: res.data })
  }
  render() {
    return (
      <>
        <Loading loading={this.state.loading} />
        <h2>Kh??ch H??ng</h2>
        <CRow>
          <CCol md={4}>
            <CTooltip content="Create data" placement="top">
              <Link to="/add-customer">
                <CButton color="primary">
                  <CIcon icon={cilPlus} />
                </CButton>
              </Link>
            </CTooltip>
          </CCol>
          <CCol md={8}>
            <Input.Search
              placeholder="Search..."
              onChange={(event) => this.handleSearch(event)}
              className="mb-3"
            />
          </CCol>
        </CRow>
        <Table dataSource={this.state.customers} bordered scroll={{ y: 240 }}>
          {/* <Column title="M??" dataIndex="company" key="company" /> */}
          <Column title="T??n" dataIndex="name" key="name" />
          <Column title="S??T" dataIndex="phone" key="phone" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Website" dataIndex="website" key="website" />
          <Column title="File" dataIndex="file" key="file" />
          <Column
            title="H??nh ?????ng"
            key={this.state.companies}
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
                <CTooltip content="Detail data" placement="top">
                  <Link to={'/customer/' + record.id}>
                    <CButton color="info" style={{ marginRight: '10px' }}>
                      <CIcon icon={cilInfo} />
                    </CButton>
                  </Link>
                </CTooltip>
              </Space>
            )}
          />
        </Table>
        <CModal visible={this.state.modalIsOpen} onClose={this.closeModal} size="xl">
          <CModalHeader>
            <CModalTitle>UPDATE</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">M?? C??ng Ty</CFormLabel>
                    <CFormSelect
                      value={this.state.company}
                      name="company"
                      aria-label="Please choose your company"
                      onChange={this.handleInputChange}
                    >
                      {this.state.companies.map((item) => (
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
                    <CFormLabel htmlFor="exampleFormControlInput1">T??n C??ng Ty</CFormLabel>

                    <CFormInput
                      type="text"
                      placeholder="T??n C??ng Ty"
                      autoComplete="name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ????ng d???nh d???ng SDT
                </CFormText> */}
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ????ng d???nh d???ng Email
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
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ????ng d???nh d???ng SDT
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">???????ng d???n file</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="???????ng d???n file"
                      autoComplete="file"
                      name="file"
                      value={this.state.file}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ????ng d???nh d???ng Email
                    </CFormText> */}
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Website</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Website"
                      autoComplete="website"
                      name="website"
                      value={this.state.website}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ????ng d???nh d???ng Email
                    </CFormText> */}
                  </CCol>
                </CRow>
              </CContainer>
              <h4>?????a Ch???</h4>

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
                      required
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
                      value={this.state.type}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                      className="mb-3"
                    />
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
        <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
          <CModalHeader>
            <CModalTitle>DELETE</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleDelete}>
              <h2 style={{ textTransform: 'uppercase' }}>
                B???n c?? ch???c ch???n xo?? {this.state.name}?
              </h2>
              <CInputGroup className="mb-3 mt-3" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="company"
                  autoComplete="company"
                  name="id"
                  value={this.state.id}
                  onChange={this.handleInputChange}
                />
              </CInputGroup>{' '}
              <CInputGroup className="mb-4" style={{ display: 'none' }}>
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="Name"
                  autoComplete="name"
                  name="name"
                  value={this.state.name}
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
      </>
    )
  }
}

export default Customer
