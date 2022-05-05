import { CContainer, CForm } from '@coreui/react'
import React, { useRef, useState, useEffect, useCallback } from 'react'

import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}

const Addmoreinput = () => {
  const [data, setData] = useState('')
  const fetchTestAPI = () => {
    API({
      REGISTER_URL: '/user/salary/a57ac5c2-ceae-4843-8fec-989b82dad564/',
      ACTION: 'GET',
    })
      .then((res) => {
        const data = res.data.key
        setData(data)
      })
      .catch((error) => {})
  }

  useEffect(() => {
    fetchTestAPI()
  }, [])

  return (
    <CContainer className="content">
      <div className="row">
        <div className="col-sm-12">
          <h5 className="mt-3 mb-4 fw-bold">Dynamically add/remove inputs fields reactjs </h5>
          <embed
            // src="https://hrm-s3.s3.amazonaws.com/Invoice_12341231.pdf"
            src={data}
            type="application/pdf"
            height="1000px"
            width="100%"
          />
        </div>
      </div>
    </CContainer>
  )
}
export default Addmoreinput
