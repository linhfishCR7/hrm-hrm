import React, { Component } from 'react'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Table, Space, Divider } from 'antd'
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

const { Column, ColumnGroup } = Table
const staff_id = localStorage.getItem('staff')
const staff_name = localStorage.getItem('staff_name')

class Degree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      degree: [],
      degreeType: [{}],
      modalIsOpen: false,
      modalDeleteIsOpen: false,
      id: '',
      name: '',
      loading: true,
      number: '',
      place: '',
      attach: '',
      type_data: '',
      date: null,
    }

    this.openModal = this.openModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }

  componentDidMount() {
    API({ REGISTER_URL: '/hrm/degree-types/?no_pagination=true', ACTION: 'GET' })
      .then((res) => {
        const degreeType = res.data
        this.setState({
          degreeType: degreeType,
        })
      })
      .catch((error) => console.log(error))
    this.setState({
      modalAddIsOpen: true,
      staff: staff_id,
    })
    API({
      REGISTER_URL: '/hrm/degree/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET',
    })
      .then((res) => {
        const degree = res.data
        this.setState({
          degree: degree,
          loading: false,
        })
      })
      .catch((error) =>
        openNotificationWithIcon({
          type: 'error',
          message: 'C?? l???i x???y ra',
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
    API({ REGISTER_URL: '/hrm/degree-types/?no_pagination=true', ACTION: 'GET' })
      .then((res) => {
        const degreeType = res.data
        this.setState({
          degreeType: degreeType,
        })
      })
      .catch((error) => console.log(error))
    this.setState({
      modalIsOpen: true,
      id: item.id,
      number: item.number,
      name: item.name,
      date: item.date,
      place: item.place,
      attach: item.attach,
      type_data: item.type_data,
      staff: staff_id,
    })
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

    API({ REGISTER_URL: '/hrm/degree/' + this.state.id + '/', ACTION: 'DELETE' })
      .then((res) => {
        this.setState((prevState) => ({
          degree: prevState.degree.filter((el) => el.id !== this.state.id),
        }))
        openNotificationWithIcon({
          type: 'success',
          message: 'Xo?? d??? li???u th??nh c??ng!!!',
          description: 'Xo?? d??? li???u th??nh c??ng!!!',
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

  handleEditSubmit = (event) => {
    event.preventDefault()

    const newUpdate = {
      number: this.state.number,
      date: this.state.date,
      place: this.state.place,
      attach: this.state.attach,
      type: this.state.type_data,
      name: this.state.name,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/degree/' + this.state.id + '/',
      ACTION: 'PUT',
      DATA: newUpdate,
    })
      .then((res) => {
        let key = this.state.id
        this.setState((prevState) => ({
          degree: prevState.degree.map((elm) =>
            elm.id === key
              ? {
                  ...elm,
                  number: this.state.number,
                  name: this.state.name,
                  place: this.state.place,
                  attach: this.state.attach,
                  type_data: this.state.type_data,
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
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.closeModal()
          openNotificationWithIcon({
            type: 'error',
            message: 'C???p nh???t d??? li???u kh??ng th??nh c??ng!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          this.closeModal()
          openNotificationWithIcon({
            type: 'error',
            message: 'C???p nh???t d??? li???u kh??ng th??nh c??ng!!!',
            description: error,
            placement: 'topRight',
          })
        }
      })
  }

  handleAddSubmit = (event) => {
    event.preventDefault()

    const newData = {
      number: this.state.number,
      name: this.state.name,
      date: this.state.date,
      place: this.state.place,
      attach: this.state.attach,
      type: this.state.type_data,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/hrm/degree/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        let degree = this.state.degree
        degree = [newData, ...degree]
        this.setState({ degree: degree })
        openNotificationWithIcon({
          type: 'success',
          message: 'Th??m d??? li???u th??nh c??ng!!!',
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
            message: 'Th??m d??? li???u kh??ng th??nh c??ng!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Th??m d??? li???u kh??ng th??nh c??ng!!!',
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
        <h2>{staff_name} - B???ng C???p</h2>
        <CForm onSubmit={this.handleAddSubmit}>
          <CContainer>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">S??? B???ng C???p</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="S??? B???ng C???p"
                  autoComplete="number"
                  name="number"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Th??ng tin n??y kh??ng ???????c ch???nh s???a!
                    </CFormText> */}
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">T??n B???ng C???p</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="T??n B???ng C???p"
                  autoComplete="name"
                  name="name"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui l??ng nh???p t??n B???ng C???p
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">C???p Ng??y</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="C???p Ng??y"
                  autoComplete="date"
                  name="date"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ng??y c???p B???ng C???p
                </CFormText>
              </CCol>

              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">N??i C???p</CFormLabel>

                <CFormInput
                  type="text"
                  placeholder="N??i C???p"
                  autoComplete="place"
                  name="place"
                  onChange={this.handleInputChange}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui l??ng nh???p n??i c???p B???ng C???p
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">????nh K??m</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="????nh K??m"
                  autoComplete="attach"
                  name="attach"
                  onChange={this.handleInputChange}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Nh???p ????nh k??m n???u c??
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Lo???i B???ng C???p</CFormLabel>

                <CFormSelect
                  name="type_data"
                  aria-label="Vui l??ng ch???n lo???i B???ng C???p"
                  onChange={this.handleInputChange}
                >
                  <option key="0" value="">
                    Ch???n lo???i B???ng C???p
                  </option>
                  {this.state.degreeType.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Vui l??ng ch???n lo???i B???ng C???p!
                </CFormText>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CButton color="primary" type="submit">
                  L??U
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </CForm>{' '}
        <Divider />
        <Table dataSource={this.state.degree} bordered>
          <Column title="S???" dataIndex="number" key="number" />
          <Column title="T??n B???ng C???p" dataIndex="name" key="name" />
          <Column title="C???p Ng??y" dataIndex="date" key="date" />
          <Column title="N??i C???p" dataIndex="place" key="place" />
          <Column title="????nh K??m" dataIndex="attach" key="attach" />
          <Column
            title="H??nh ?????ng"
            key={this.state.degree}
            render={(text, record) => (
              <Space size="middle">
                <CTooltip content="C???p Nh???t D??? Li???u" placement="top">
                  <CButton
                    color="warning"
                    style={{ marginRight: '10px' }}
                    onClick={() => this.openModal(record)}
                  >
                    <EditOutlined />
                  </CButton>
                </CTooltip>
                <CTooltip content="Xo?? D??? Li???u" placement="top">
                  <CButton color="danger" onClick={() => this.openDeleteModal(text)}>
                    <DeleteOutlined />
                  </CButton>
                </CTooltip>
              </Space>
            )}
          />
        </Table>
        {/* Update */}
        <CModal visible={this.state.modalIsOpen} onClose={this.closeModal} size="lg">
          <CModalHeader>
            <CModalTitle>C???P NH???T</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={this.handleEditSubmit}>
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">S??? B???ng C???p</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="S??? B???ng C???p"
                      autoComplete="number"
                      name="number"
                      value={this.state.number}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    {/* <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Th??ng tin n??y kh??ng ???????c ch???nh s???a!
                    </CFormText> */}
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">T??n B???ng C???p</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="T??n B???ng C???p"
                      autoComplete="name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui l??ng nh???p t??n B???ng C???p
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">C???p Ng??y</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="C???p Ng??y"
                      autoComplete="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ng??y c???p B???ng C???p
                    </CFormText>
                  </CCol>

                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">N??i C???p</CFormLabel>

                    <CFormInput
                      type="text"
                      placeholder="N??i C???p"
                      autoComplete="place"
                      name="place"
                      value={this.state.place}
                      onChange={this.handleInputChange}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui l??ng nh???p n??i c???p B???ng C???p
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">????nh K??m</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="????nh K??m"
                      autoComplete="attach"
                      name="attach"
                      value={this.state.attach}
                      onChange={this.handleInputChange}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Nh???p ????nh k??m n???u c??
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Lo???i B???ng C???p</CFormLabel>

                    <CFormSelect
                      value={this.state.type_data}
                      name="type_data"
                      aria-label="Vui l??ng ch???n lo???i B???ng C???p"
                      onChange={this.handleInputChange}
                    >
                      <option key="0" value="">
                        Ch???n lo???i B???ng C???p
                      </option>
                      {this.state.degreeType.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Vui l??ng ch???n lo???i B???ng C???p!
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeModal}>
                  ????NG
                </CButton>
                <CButton color="primary" type="submit">
                  C???P NH???T
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
        {/* Delete */}
        <CModal visible={this.state.modalDeleteIsOpen} onClose={this.closeDeleteModal}>
          <CModalHeader>
            <CModalTitle>XO??</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {' '}
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
                  placeholder="degree_types"
                  autoComplete="degree_types"
                  name="id"
                  value={this.state.id}
                  onChange={this.handleInputChange}
                  required
                />
              </CInputGroup>{' '}
              <CModalFooter>
                <CButton color="secondary" onClick={this.closeDeleteModal}>
                  HU???
                </CButton>
                <CButton color="danger" type="submit">
                  ?????NG ??
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
        </CModal>
      </>
    )
  }
}

export default Degree
