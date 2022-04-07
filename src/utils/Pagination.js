import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({ PerPage, total, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(total / PerPage); i++) {
    pageNumbers.push(i)
  }
  Pagination.propTypes = {
    PerPage: PropTypes.number,
    total: PropTypes.number,
    paginate: PropTypes.string,
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#/religion" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
