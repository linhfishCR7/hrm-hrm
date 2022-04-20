import LoadingOverlay from 'react-loading-overlay'
import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

const Loading = ({ loading }) => {
  Loading.propTypes = {
    loading: PropTypes.bool,
  }
  return (
    <LoadingOverlay
      active={loading}
      spinner={<Spin tip="Loading..." size="large"></Spin>}
      styles={{ wrapper: { backgroundColor: 'black' } }}
      // text="Loading your content..."
    >
      {/* <p>Some content or children or something.</p> */}
    </LoadingOverlay>
  )
}
export default Loading
