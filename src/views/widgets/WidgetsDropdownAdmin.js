import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios'
import { TOKEN } from '../../constants/Config'

import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import Loading from '../../utils/loading'

const WidgetsDropdownAdmin = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchDashboardAPI = async () => {
    await axios
      .get('/admin/dashboard/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    fetchDashboardAPI()
  }, [])
  return (
    <>
      <Loading loading={loading} />

      <CRow className="mb-5">
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="info"
            value={<>{data.total_user} </>}
            title="Người Dùng"
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="warning"
            value={<>{data.total_company} </>}
            title="Công Ty"
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={<>{data.total_branch} </>}
            title="Chi Nhánh"
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
              <>
                {data.total_department}{' '}
                {/* <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span> */}
              </>
            }
            title="Bộ Phận (Phòng Ban)"
          />
        </CCol>
      </CRow>
    </>
  )
}

export default WidgetsDropdownAdmin
