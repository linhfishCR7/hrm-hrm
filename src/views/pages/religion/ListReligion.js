import React, { useState } from 'react'
import axios from '../../../utils/axios'

import {
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTable,
  CSpinner,
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
} from '@coreui/react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPencil, cilPlus, cilCircle } from '@coreui/icons'

export const ListReligion = ({ religions, loading, data = '', status }) => {
  ListReligion.propTypes = {
    religions: PropTypes.array,
    loading: PropTypes.bool,
    data: PropTypes.string,
    status: PropTypes.bool,
  }
  const [visible, setVisible] = useState(false)
  const [religiondata, setReligionData] = useState('')
  const [namedata, setNameData] = useState('')
  const [message, setMessage] = useState('')
  const [isMesage, setIsMesage] = useState(false)
  const [isError, setIsError] = useState(false)

  const onSubmitUpdate = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const REGISTER_URL = '/hrm/religions/'
    const data = {
      religion: religiondata,
      name: namedata,
    }
    const res = await axios
      .post(REGISTER_URL, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setVisible(false)
        setReligionData('')
        setNameData('')
        setMessage('You Added Data successfully!')
        setIsMesage(true)
        setIsError(false)
        // #TODO Autoload when added successfully
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          setMessage(error.response.data.message)
          setIsMesage(true)
          setIsError(true)
        }
      })
  }

  if (loading) {
    return (
      <CRow className="justify-content-center">
        <CCol md={2}>
          <CSpinner />
        </CCol>
      </CRow>
    )
  } else {
    return (
      <>
        {status ? (
          <CRow className="justify-content-center">
            <CCol md={2}>{data}</CCol>
          </CRow>
        ) : (
          <>
            <CTooltip content="Create data" placement="top">
              <CButton color="primary" onClick={() => setVisible(true)} className="mb-3">
                <CIcon icon={cilPlus} />
              </CButton>
            </CTooltip>

            <CTable responsive bordered hover>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Region</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {religions.map((religion) => (
                  <CTableRow key={religion.id}>
                    <CTableHeaderCell scope="row">{religion.religion}</CTableHeaderCell>
                    <CTableDataCell>{religion.name}</CTableDataCell>
                    <CTableDataCell>
                      <CTableDataCell>
                        <CTooltip content="Edit data" placement="top">
                          <CButton
                            color="warning"
                            onClick={() => setVisible(true)}
                            className="mr-3"
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </CTooltip>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CTooltip content="Remove data" placement="top">
                          <CButton color="danger" onClick={() => setVisible(true)}>
                            <CIcon icon={cilDelete} />
                          </CButton>
                        </CTooltip>
                      </CTableDataCell>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </>
        )}
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Religion</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={onSubmitUpdate}>
              <CInputGroup className="mb-3 mt-3">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="Religion"
                  autoComplete="religion"
                  value={religiondata}
                  onChange={(event) => setReligionData(event.target.value)}
                  required
                />
              </CInputGroup>{' '}
              <CInputGroup className="mb-4">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />{' '}
                </CInputGroupText>{' '}
                <CFormInput
                  type="text"
                  placeholder="Name"
                  autoComplete="name"
                  value={namedata}
                  onChange={(event) => setNameData(event.target.value)}
                  required
                />
              </CInputGroup>{' '}
              {/* <CRow>
                <CCol md={6}>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                  <CButton color="primary" type="submit">
                    Save changes
                  </CButton>
                </CCol>
              </CRow> */}
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton color="primary" type="submit">
                  Save changes
                </CButton>
              </CModalFooter>
            </CForm>{' '}
          </CModalBody>
          {/* <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" typr="submit">
              Save changes
            </CButton>
          </CModalFooter> */}
        </CModal>

        <CModal visible={isMesage} onClose={() => setIsMesage(false)}>
          <CModalHeader>
            <CModalTitle>{isError ? 'ERROR' : 'NOTICE'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <h2>{message}</h2>
          </CModalBody>
          <CModalFooter>
            <CButton color={isError ? 'danger' : 'primary'} onClick={() => setIsMesage(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    )
  }
}
