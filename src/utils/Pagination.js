import React from 'react'
import PropTypes from 'prop-types'
import { CPagination, CPaginationItem, CAlertLink } from '@coreui/react'

const Pagination = ({ PerPage, total, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(total / PerPage); i++) {
    pageNumbers.push(i)
  }
  Pagination.propTypes = {
    PerPage: PropTypes.number,
    total: PropTypes.number,
    paginate: PropTypes.func,
  }
  return (
    <CPagination aria-label="Page navigation example">
      <CPaginationItem aria-label="Previous" disabled>
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>
      {/* <CPaginationItem active>1</CPaginationItem> */}
      {pageNumbers.map((number) => (
        <CPaginationItem key={number}>
          <CAlertLink onClick={() => paginate(number)} href="!#/religion">
            {number}
          </CAlertLink>
        </CPaginationItem>
      ))}
      <CPaginationItem aria-label="Next" {...(pageNumbers + 1)}>
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>
    </CPagination>
  )
}

export default Pagination
